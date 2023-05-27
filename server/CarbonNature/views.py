from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi

from .models import Evaluation, Goal, Method, CompanyGoal
from .serializer import (EvaluationSerializer,
                         EmissionInfoSerializer,
                         GoalSerializer,
                         MethodSerializer,
                         CompanyGoalSerializer)
from Company.models import Company, Department
from Carbon.models import Carbon, Category, CarbonInfo
from Swag import HuSwag
import func

import datetime
from dateutil.relativedelta import relativedelta

class EvaluationView(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="탄소 배출량 평가에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨", 404: "요청 받은 조직이 없음"},
    )
    def get(self, request, depart_name, format=None):
        UserRoot = func.GetUserRoot(request)
        
        try:  # 요청받은 회사가 루트가 아닌 경우
            Root = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Root = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
        base_year, base_emission = Evaluation.objects.get(Com_id=Root.pk).values('BaseYear', 'BaseEmissions')
        serializer = EmissionInfoSerializer(GruopName=depart_name, BaseYear=base_year, BaseEmissions=base_emission)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MethodView(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="carbon nature의 method에 관한 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, format=None):
        categories = Method.objects.all()
        server_method = []
        for cate in categories:
            server_method.append({'name':cate.Category,
                                  'content':cate.DecreMethid,
                                  'img':None})
        return Response(server_method, status=status.HTTP_200_OK)
    
class CompanyGoalView(APIView):
    @swagger_auto_schema(
        operation_summary="특정 기업의 탄소 배출량 목표에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, com_id, goal_id, format=None):
        result = CompanyGoal.objects.get(Com_id=com_id, Goal_id=goal_id)
        serializer = CompanyGoalSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EmissionInfoView(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="기준년도와 기준량을 정하는 Api", request_body=EmissionInfo,
        resposes={400: "입력한 group name이 이미 존재함", 201: "API가 정상적으로 실행 됨"}
    )
    def post(self, request, formant=None):

        GroupData = request.data
        Com_id = Company.objects.filter(ComName=GroupData["GroupName"]).get('pk')

        try:
            Evaluation.objects.create(
                Com_id=Com_id,
                BaseYear=GroupData.BaseYear,
                BaseEmissions=GroupData.BaseEmissions
            )

            return Response("Create Group Base Data Success", status=status.HTTP_200_OK)
        
        # 이미 존재
        except:
            return Response(
                "This group name already exist.", status=status.HTTP_400_BAD_REQUEST
            )
        
class CarbonYearQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    year = datetime.date.__str__(datetime.date.today())[:4]
    # datetime.date.today().year 로 바꿀 수 있음

    @swagger_auto_schema(
        operation_summary="요청한 조직의 측정 연도 목표 탄소 배출량을 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )

    def get(self, request, Depart, year, is_category, format=None):

        UserRoot = func.GetUserRoot(request)
        
        try:  # 요청받은 회사가 루트가 아닌 경우
            Root = Department.objects.get(
                DepartmentName=Depart, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Root = Company.objects.get(ComName=Depart)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
        
        Goal_id = CompanyGoal.objects.filter(Com_id=Root.pk, GoalDate=year).get('pk')
        
        goal_carbon_category = []
        server_targetTotal_data = 0

        categories = Category.objects.get('pk')
        for cate_id in categories:
            goal_with_cate = Goal.objects.filter(Coal_id=Goal_id, cate_id=cate_id).get('DecreTotalEmission')
            goal_carbon_category.append(goal_with_cate)
            server_targetTotal_data += goal_with_cate
        
        if bool(is_category):
            return Response(goal_carbon_category, status=status.HTTP_200_OK)
        else:
            return Response(server_targetTotal_data, status=status.HTTP_200_OK)
        
class TargetListQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    year = datetime.date.__str__(datetime.date.today())[:4]
    # datetime.date.today().year 로 바꿀 수 있음

    @swagger_auto_schema(
        operation_summary="조직명과 년도를 받아 target list를 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )

    def get(self, request, depart_name, year, format=None):

        UserRoot = func.GetUserRoot(request)
        
        try:  # 요청받은 회사가 루트가 아닌 경우
            Root = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Root = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
        
        target_list = []

        Goal_id = CompanyGoal.objects.filter(Com_id=Root.pk, GoalDate=year).get('pk')
        categories = Category.objects.values_list('pk', 'Category')
        for i, (cate_id, cate) in enumerate(categories):
            goal_data = Goal.objects.filter(Coal_id=Goal_id, cate_id=cate_id)
            target_list.append(
                {
                    'listkind' : int(goal_data.IncreaseKind), # True:1, False:0
                    'index' : i,
                    'id' : Goal_id,
                    'category' : cate,
                    'percentage' : goal_data.DecrePercent,
                    'target' : goal_data.TransEnergy if not goal_data.IncreaseKind else None
                }
            )

        return Response(target_list, status=status.HTTP_200_OK)


    @swagger_auto_schema(
        operation_summary="조직명과 년도, target list받아 저장하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )
    def post(self, request, formant=None):

        request_data = request.data
        GoalData = request_data.tList
        Com_id = Company.objects.filter(ComName=GoalData["GroupName"]).get('pk')

        try:
            for data in GoalData:
                goal_obj = Goal.objects.create(
                    Cate_id=Category.objects.filter(Category=Goal.category).values_list('pk'),
                    IncreaseKind=data.category,
                    TransEnergy=data.target,
                    DecrePercent=data.percentage,
                    #DecreTotalEmission=
                )
                CompanyGoal.objects.create(
                    Com_id=Com_id,
                    Goal_id=goal_obj.pk,
                    GoalDate=GoalData.year
                )

            return Response("Create Group Goal Data Success", status=status.HTTP_201_CREATED)
        
        # 이미 존재
        except:
            return Response(
                "This goal data already exist.", status=status.HTTP_400_BAD_REQUEST
            )
    

    @swagger_auto_schema(
        operation_summary="goal id를 입력받아 그 데이터를 삭제하는 Api",
        responses={404: "ERROR", 200: "API가 정상적으로 실행 됨"},
    )
    def delete(self, request, format=None):
        """
        더 이상 탄소배출에 포함하지 않을 회사를 삭제하는 Api\n
        해당하는 회사의 이름을 URL에 입력하여 요청.\n
        단, 동일한 이름의 회사는 동일한 Root에서는 존재하지 않는다고 가정.
        """

        GoalId_list = request.data

        for goal_id in GoalId_list:
            try:
                Goal.objects.filter(Goal_id=goal_id).delete()
            except:
                return Response("Delete Error", status=status.HTTP_404_NOT_FOUND)
        
        return Response("Delete Complete", status=status.HTTP_200_OK)
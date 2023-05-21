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
                         EmissionInfo,
                         GoalSerializer,
                         MethodSerializer,
                         CompanyGoalSerializer)
from Company.models import Company, Department
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

        result = Evaluation.objects.get(Com_id=Root.pk)
        serializer = EvaluationSerializer(result).values('BaseYear', 'BaseEmissions')
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GoalView(APIView):
    @swagger_auto_schema(
        operation_summary="탄소 배출량 감축 목표에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, cate_id, format=None):
        #ComId = ComModel.Company.objects.get(ComName=CompanyName) # 만약 이름으로 쿼리를 한다면
        result = Goal.objects.get(Cate_id=cate_id)
        serializer = GoalSerializer(result)
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
    def get(self, request, com_id, goal_id format=None):
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
        operation_summary="요청한 조직에서 발생한 특정 기간의 탄소 배출량을 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 201: "API가 정상적으로 실행 됨"},
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
        
        
        goal_carbon_category = []

        server_targetTotal_data = 0

        categories = Category.objects.values_list('Category')
        for cate in categories:
            carbon_info = CarbonInfo.objects.filter(StartDate=start_date,
                                                            EndtDate=start_date + relativedelta(month=1),
                                                            Chief=Root.Chief,
                                                            Category=cate)
            carbon_data = Carbon.objects.filter(RootCom=Root.RootCom,
                                                            BelongDepart=Root.BelongCom,
                                                            CarbonInfo=carbon_info.pk)
            total_data += carbon_data
        start_date += relativedelta(month=1)
        
        if is_cartegory:
            return Response(server_category_data, status=status.HTTP_201_CREATED)
        else:
            return Response(server_total_data, status=status.HTTP_201_CREATED)
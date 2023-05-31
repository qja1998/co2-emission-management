from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse
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

from .models import *
from .serializer import *
from Company.models import Company, Department
from Carbon.models import Carbon, Category, CarbonInfo
from Swag import HuSwag
import func

from collections import defaultdict
import datetime
from dateutil.relativedelta import relativedelta

import trade_price

class EvaluationView(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="탄소 배출량 평가에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨", 404: "요청 받은 조직이 없음"},
    )
    def get(self, request, depart_name, format=None):

        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            ).RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Com_id = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
        eval_info =  Evaluation.objects.get(Com_id=Com_id)
        serializer = EmissionInfoGetSerializer(eval_info)

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
            method = Method.objects.filter(Category=cate.Category).values('DecreMethod')[0]['DecreMethod']
            server_method.append({'name':cate.Category,
                                  'content':method,
                                  'img':''})
        return JsonResponse(server_method, safe=False,status=status.HTTP_200_OK)
    
# class CompanyGoalView(APIView):
#     @swagger_auto_schema(
#         operation_summary="특정 기업의 탄소 배출량 목표에 관한 데이터를 반환하는 Api",
#         responses={200: "API가 정상적으로 실행 됨"},
#     )
#     def get(self, request, com_id, goal_id, format=None):
#         result = CompanyGoal.objects.get(Com_id=com_id, Goal_id=goal_id)
#         serializer = CompanyGoalSerializer(result)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class EvaluationInfoView(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="기준년도와 기준량을 정하는 Api",
        request_body=EmissionInfoPostSerializer,
        resposes={404: "입력한 회사가 존재하지 않음", 400: "입력한 group name이 evaluation에 이미 존재함", 201: "API가 정상적으로 실행 됨"}
    )
    def post(self, request, formant=None):
        
        GroupData = request.data
        depart_name = GroupData["group_name"]

        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Com_id = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        try:
            Evaluation.objects.create(
                Com_id=Com_id,
                BaseYear=GroupData["BaseYear"],
                BaseEmissions=GroupData['BaseEmissions']
            )

            return Response("Create Group Base Data Success", status=status.HTTP_200_OK)
        
        # 이미 존재
        except Exception as e:
            return Response(
                f"{e}", status=status.HTTP_400_BAD_REQUEST
            )
        
class CarbonYearQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    year = datetime.date.__str__(datetime.date.today())[:4]
    # datetime.date.today().year 로 바꿀 수 있음

    @swagger_auto_schema(
        operation_summary="요청한 조직의 측정 연도 목표 탄소 배출량을 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )

    def get(self, request, depart_name, year, is_category, format=None):
        
        '''
        is_category는 1 또는 0
        1: categorical, 0: total
        '''
        
        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            ).RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Com_id = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
            
        Goal_id = CompanyGoal.objects.filter(Com_id=Com_id, GoalDate=year)
        
        goal_carbon_category = []
        server_targetTotal_data = 0

        categories = Category.objects.all()
        for cate_id in categories:
            try:
                goal_with_cate = Goal.objects.filter(Cate_id=cate_id).values('DecreTotalEmission')[0]['DecreTotalEmission']
            except:
                continue
            goal_carbon_category.append(goal_with_cate)
            server_targetTotal_data += goal_with_cate
        
        if bool(is_category):
            return JsonResponse(goal_carbon_category, safe=False, status=status.HTTP_200_OK)
        else:
            return JsonResponse(server_targetTotal_data, safe=False, status=status.HTTP_200_OK)
        
class TargetListQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="조직명과 년도를 받아 target list를 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )

    def get(self, request, depart_name, year, format=None):

        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            ).RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Com_id = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )
            

        target_list = []
        categories = Category.objects.all()
        for i, cate in enumerate(categories):
            try:
                Goal_id = Goal.objects.get(Cate_id=cate)
                goal_data = Goal.objects.filter(Cate_id=cate).values('IncreaseKind','DecrePercent', 'TransEnergy')[0]
                IncreaseKind = goal_data['IncreaseKind']
                DecrePercent = goal_data['DecrePercent']
                TransEnergy = goal_data['TransEnergy']
            except:
                continue

            target_list.append(
                    {'listkind' : int(IncreaseKind),
                    'index' : i,
                    'goal_id' : Goal_id.id,
                    'category' : cate.CarbonUnit,
                    'percentage' : DecrePercent,
                    'target' : TransEnergy if not IncreaseKind else None}
                )
            
        
        return JsonResponse(target_list, safe=False, status=status.HTTP_200_OK)

class TargetListPost(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="조직명과 년도, target list받아 저장하는 Api",
        request_body=TargetListPostSerializer,
        responses={404: "입력한 회사가 이미 존재함", 200: "API가 정상적으로 실행 됨"},
    )
    def post(self, request, formant=None):

        UserRoot = func.GetUserRoot(request)
        request_data = request.data
        group_name, year, GoalData = request_data['group_name'], request_data['BaseYear'], request_data['tList']
        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Department.objects.get(
                DepartmentName=group_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Com_id = Company.objects.get(ComName=group_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        total_emissions = func.get_base_emission(year, Com_id, UserRoot.Chief)

        try:

            for data in GoalData:
                cate = Category.objects.filter(CarbonUnit = data['category']).values('Category')[0]['Category']
                goal_obj = Goal.objects.create(
                    Cate_id=Category.objects.get(Category=cate),
                    IncreaseKind=data['listkind'],
                    TransEnergy=data['target'],
                    DecrePercent=data['percentage'],
                    DecreTotalEmission=total_emissions[cate] * (1 - (data['percentage'] / 100))
                )
                CompanyGoal.objects.create(
                    Com_id=Com_id,
                    Goal_id=goal_obj,
                    GoalDate=year
                )

            return Response("Create Group Goal Data Success", status=status.HTTP_201_CREATED)
        
        # 이미 존재
        except Exception as e:
            return Response(
                f"{e}", status=status.HTTP_400_BAD_REQUEST
            )
    

class TargetListDelete(APIView):
    @swagger_auto_schema(
        operation_summary="goal id를 입력받아 그 데이터를 삭제하는 Api",
        # request_body=TargetListDeletSerializer,
        responses={404: "ERROR", 200: "API가 정상적으로 실행 됨"},
    )
    def delete(self, request, id, format=None):
        '''
        id는 int이며 '_'로 구분하여 여러개를 한 번에 입력할 수 있음
        '''
        ids = id.split('_')
        for i in ids:
            try:
                Goal.objects.filter(id=i).delete()
            except:
                return Response("Delete Error", status=status.HTTP_404_NOT_FOUND)
        
        return Response("Delete Complete", status=status.HTTP_200_OK)
    
class TradePriceGet(APIView):

    @swagger_auto_schema(
        operation_summary="탄소배출권의 가격을 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )

    def get(self, request, format=None):

        '''
        에러 있음, 추후에 해결
        '''

        price = TradePriceSerializer(trade_price.get_price())

        return Response(price.data, status=status.HTTP_200_OK)

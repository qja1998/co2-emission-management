from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
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
from .serializer import EvaluationSerializer, GoalSerializer, MethodSerializer, CompanyGoalSerializer
from Company.models import Company, Department
from Swag import HuSwag
import func

class EvaluationView(APIView):
    @swagger_auto_schema(
        operation_summary="탄소 배출량 평가에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, com_id, format=None):
        #ComId = ComModel.Company.objects.get(ComName=CompanyName) # 만약 이름으로 쿼리를 한다면
        result = Evaluation.objects.get(Com_id=com_id)
        serializer = EvaluationSerializer(result)
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
    @swagger_auto_schema(
        operation_summary="carbon nature의 method에 관한 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, cate_id, format=None):
        #CateId = ComModel.Company.objects.get(CateName=CategoryName) # 만약 이름으로 쿼리를 한다면
        result = Method.objects.get(Com_id=cate_id)
        serializer = MethodSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CompanyGoalView(APIView):
    @swagger_auto_schema(
        operation_summary="특정 기업의 탄소 배출량 목표에 관한 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, com_id, goal_id format=None):
        result = CompanyGoal.objects.get(Com_id=com_id, Goal_id=goal_id)
        serializer = CompanyGoalSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from .models import CarbonPrediction
from rest_framework.views import APIView
from .serializer import CarbonPredictionSerializer
from Swag import ComSwag
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from Carbon.models import Carbon, CarbonInfo, Category
from Company.models import Department, Company
from .serializer import *

import func
import datetime
from dateutil.relativedelta import relativedelta

# 현재 시간과 한 달 후의 시간
CUR_TIME = datetime.date.today()
AFTER_MON = CUR_TIME + relativedelta(months=1)

class CategoryPredictionView(APIView):
    
    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="조직명을 받아 다음달 탄소 배출 예측 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨", 404: "요청받은 회사가 존재하지 않음"},
    )
    def get(self, request, depart_name, format=None): #request.GET[' ']으로 얻을 수 있음

        depart = Department.objects.filter(DepartmentName=depart_name)

        carbon_info = CarbonInfo.objects.filter(EndtDate=CUR_TIME, Chief=depart.RootCom.Chief)
        cur_data = Carbon.objects.filter(RootCom=depart.RootCom,
                                         BelongDepart=depart.BelongCom,
                                         CarbonInfo=carbon_info
                                         ).values('CarbonData')
        predictions = CarbonPrediction.objects.filter(Com_id=depart.RootCom.pk, PredictDate=AFTER_MON)
        categories = Category.objects.all()
        
        category_server = []
        for cate in categories:
            prediction = predictions.get(Cate_id=cate.pk)
            category_server.append(
                CarbonPredictionSerializer(
                    name=cate.Category,
                    data=cur_data,
                    predictData=prediction.PredCarbonDate
                )
            )

        return Response(category_server.data, status=status.HTTP_200_OK)

# 6개월간의 탄소 배출량 리턴
class CarbonPartQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    year = datetime.date.__str__(datetime.date.today())[:4]

    @swagger_auto_schema(
        operation_summary="요청한 조직의 6개월간의 탄소 배출량 예측값을 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, depart_name, is_category, format=None):

        '''
        is_category는 1 또는 0
        1: categorical, 0: total
        '''
        
        depart = Department.objects.filter(DepartmentName=depart_name)

        start_date = CUR_TIME.replace(day=1)
        end_date = (end_date + relativedelta(month=1)).replace(day=1) + relativedelta(day=-1)
        server_category_predict_data = []
        server_predict_data = []
        for _ in range(6):
            cate_pred_data = []
            total_pred_data = 0
            categories = Category.objects.values_list('pk')
            for cate in categories:
                predictions = CarbonPrediction.objects.filter(Com_id=depart.RootCom.pk,
                                                              Cate_id=cate,
                                                              PredictDate=start_date + relativedelta(month=1)).value('PredCarbonData')
                cate_pred_data.append(predictions)
                total_pred_data += predictions
                start_date += relativedelta(month=1)
            server_category_predict_data.append(PartCatePredictionSerializer(pred_list=cate_pred_data))
            server_predict_data.append(PartPredictionSerializer(PredictDate=total_pred_data))

        if bool(is_category):
            return Response(server_category_predict_data.data, status=status.HTTP_200_OK)
        else:
            return Response(server_predict_data.data, status=status.HTTP_201_CHTTP_200_OKREATED)
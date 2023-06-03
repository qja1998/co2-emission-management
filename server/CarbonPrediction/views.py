from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from .models import CarbonPrediction
from django.http import JsonResponse
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
    def get(self, request, depart_name, start_date, end_date, format=None): #request.GET[' ']으로 얻을 수 있음
        
        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Com_id = Company.objects.get(
                ComName=depart_name  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
            return Response(
                "This Company/Department doesn't exist.",
                status=status.HTTP_404_NOT_FOUND,
            )
        
        try:  # 요청받은 회사가 루트가 아닌 경우
            RootCom = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            ).RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                RootCom = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        categories = Category.objects.values('Category')

        cur_total_list = [0 for _ in categories]
        while start_date < end_date: # for while 바꾸기
            cur_total_data = 0
            for cate in categories:
                cate = cate['Category']
                tmp_date = start_date.replace(day=28)
                next_date = tmp_date if tmp_date < end_date else end_date
                try:
                    carbon_info = CarbonInfo.objects.get(StartDate=start_date,
                                                                    EndDate=next_date,
                                                                    Chief=UserRoot.Chief,
                                                                    Category=cate)
                except:
                    continue
                carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                            CarbonInfo=carbon_info).values('CarbonData')
                # if not carbon_data:
                #     continue

                carbon_data = carbon_data[0]['CarbonData']
                #cate_data.append(serializer.CarbonTotalSerializer(CarbonData=carbon_data))
                cur_total_data += carbon_data
            cur_total_list[cate] = cur_total_data
            start_date += relativedelta(months=1)
        
        start_date = CUR_TIME
        predictions = CarbonPrediction.objects.filter(Com_id=Com_id, PredictDate=AFTER_MON)
        categories = Category.objects.all()
        
        pred_total_list = [0 for _ in categories]

        for cate in categories:
            cate = cate['Category']
            total_prediction = 0
            start_date = CUR_TIME
            while start_date < AFTER_MON:
                pred = CarbonPrediction.objects.filter(Com=Com_id, Cate = cate).values('PredCarbonData')
                total_prediction += pred[0]['PredCarbonData']
                start_date += relativedelta(days=1)
            pred_total_list[cate] = total_prediction

        category_server = []

        for cate in categories:
            prediction = predictions.get(Cate_id=cate.pk)
            category_server.append(
                {
                    'name' : cate.Category,
                    'data' : cur_total_data,
                    'predictData' : total_prediction
                }
            )

        return JsonResponse(category_server, safe=False, status=status.HTTP_200_OK)

# 6개월간의 탄소 배출량 리턴
class PartPredictionQuery(APIView):

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
            categories = Category.objects.all()
            for cate in categories:
                predictions = CarbonPrediction.objects.filter(Com_id=depart.RootCom.pk,
                                                              Cate_id=cate,
                                                              PredictDate=start_date + relativedelta(month=1)
                                                              ).values('PredCarbonData')[0]['PredCarbonData']
                cate_pred_data.append(predictions)
                total_pred_data += predictions
                start_date += relativedelta(month=1)
            server_category_predict_data.append(cate_pred_data)
            server_predict_data.append(total_pred_data)

        if bool(is_category):
            return Response(server_category_predict_data, status=status.HTTP_200_OK)
        else:
            return Response(server_predict_data, status=status.HTTP_200_OK)
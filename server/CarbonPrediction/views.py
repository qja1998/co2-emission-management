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

from prediction.transformer_multistep import get_prediction

# 현재 시간과 한 달 후의 시간
CUR_TIME = datetime.date.today()
AFTER_MON = CUR_TIME + relativedelta(months=1)
LAST_PRED_DATE = 0
MONTH_LAST = {1 : 31, 2 : 28, 3 : 31, 4 : 30, 5 : 31, 6 : 30, 7 : 31, 8 : 31, 9 : 30, 10 : 31, 11 : 30, 12 :31}
PREDICTION = []

class CategoryPredictionView(APIView):
    
    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="조직명을 받아 다음달 탄소 배출 예측 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨", 404: "요청받은 회사가 존재하지 않음"},
    )
    def get(self, request, depart_name, format=None): #request.GET[' ']으로 얻을 수 있음
        
        UserRoot = func.GetUserRoot(request)
        department = None
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
            department = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
            RootCom = department.RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                RootCom = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        categories = Category.objects.all()
        start_date = (CUR_TIME - relativedelta(months=6)).replace(day=1)
        end_date = CUR_TIME
        cur_carbon_list = {c.CarbonUnit:[] for c in categories}
        cur_month_cate = {c.CarbonUnit:0 for c in categories}

        while start_date < end_date: # for while 바꾸기
            cur_total_data = 0
            for cate in categories:
                cate_name = cate.CarbonUnit
                cate = cate.Category

                try:
                    pre_date = start_date
                    next_month = (start_date + relativedelta(months=1)).replace(day=1)
                    next_month = next_month if next_month < end_date else end_date
                    while pre_date < next_month:
                        carbon_info = CarbonInfo.objects.get(StartDate=pre_date,
                                                                    EndDate=pre_date,
                                                                    Chief=UserRoot.Chief,
                                                                    Category=cate)
                        if department != None:
                            carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                                    BelongDepart=department,
                                                                    CarbonInfo=carbon_info).values('CarbonData')
                        else:
                            carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                                 CarbonInfo=carbon_info).values('CarbonData')
                        carbon_data = carbon_data[0]['CarbonData']
                        cur_carbon_list[cate_name].append(carbon_data)
                        pre_date += datetime.timedelta(days=1)

                        if next_month.month == end_date.month:
                            cur_month_cate[cate_name] += carbon_data

                except Exception as e:
                    tmp_date = start_date.replace(day=28)
                    next_date = tmp_date if tmp_date < end_date else end_date
                    try:
                        carbon_info = CarbonInfo.objects.get(StartDate=start_date,
                                                                        EndDate=next_date,
                                                                        Chief=UserRoot.Chief,
                                                                        Category=cate)
                    except Exception as e:
                        # print(cate, e)
                        continue

                    carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                                CarbonInfo=carbon_info).values('CarbonData')
                    # if not carbon_data:
                    #     continue

                    carbon_data = carbon_data[0]['CarbonData']
                    cur_carbon_list[cate_name] += func.make_random_values(carbon_data, MONTH_LAST[start_date.month])
                    #cate_data.append(serializer.CarbonTotalSerializer(CarbonData=carbon_data))
                    if next_date.month == end_date.month:
                        cur_month_cate[cate_name] += carbon_data

            start_date += relativedelta(months=1)
            start_date = start_date.replace(day=1)



        category_server = []

        for cate in categories:
            cate_name = cate.CarbonUnit
            cate = cate.Category

            input_data = [[d] for d in cur_carbon_list[cate_name]]
            try:
                pred_data = sum(get_prediction(input_data)[-180:-180 + MONTH_LAST[AFTER_MON.month]])
            except Exception as e:
                pred_data = 0

            category_server.append(
                {
                    'name' : cate_name,
                    'data' : int(cur_month_cate[cate_name]),
                    'predictData' : int(pred_data)
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
        
        UserRoot = func.GetUserRoot(request)
        department = None
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
            department = Department.objects.get(
                DepartmentName=depart_name, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
            RootCom = department.RootCom
        except Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                RootCom = Company.objects.get(ComName=depart_name)
            except Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        categories = Category.objects.all()
        start_date = (CUR_TIME - relativedelta(months=6)).replace(day=1)
        end_date = CUR_TIME
        cur_carbon_list = {c.CarbonUnit:[] for c in categories}
        cur_total_data_list = []
        while start_date < end_date: # for while 바꾸기
            cur_total_data = 0
            for cate in categories:
                cate_name = cate.CarbonUnit
                cate = cate.Category

                try:
                    pre_date = start_date
                    next_month = (start_date + relativedelta(months=1)).replace(day=1)
                    next_month = next_month if next_month < end_date else end_date
                    while pre_date < next_month:
                        carbon_info = CarbonInfo.objects.get(StartDate=pre_date,
                                                                    EndDate=pre_date,
                                                                    Chief=UserRoot.Chief,
                                                                    Category=cate)
                        if department != None:
                            carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                                    BelongDepart=department,
                                                                    CarbonInfo=carbon_info).values('CarbonData')
                        else:
                            carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                                 CarbonInfo=carbon_info).values('CarbonData')
                        carbon_data = carbon_data[0]['CarbonData']
                        cur_carbon_list[cate_name].append(carbon_data)
                        pre_date += datetime.timedelta(days=1)
                    print(cate_name, len(cur_carbon_list[cate_name]))

                except Exception as e:
                    print('eeeee', cate, type(e), pre_date)
                    tmp_date = start_date.replace(day=28)
                    next_date = tmp_date if tmp_date < end_date else end_date
                    try:
                        carbon_info = CarbonInfo.objects.get(StartDate=start_date,
                                                                        EndDate=next_date,
                                                                        Chief=UserRoot.Chief,
                                                                        Category=cate)
                    except Exception as e:
                        print('eeeee', cate, e)
                        continue
                        

                    carbon_data = Carbon.objects.filter(RootCom=RootCom,
                                                        CarbonInfo=carbon_info).values('CarbonData')
                    # if not carbon_data:
                    #     continue

                    carbon_data = carbon_data[0]['CarbonData']
                    cur_carbon_list[cate_name] += func.make_random_values(carbon_data, MONTH_LAST[start_date.month])
                    #cate_data.append(serializer.CarbonTotalSerializer(CarbonData=carbon_data))

            start_date += relativedelta(months=1)
            start_date = start_date.replace(day=1)

        server_category_predict_data = {c.CarbonUnit:[] for c in categories}
        server_predict_data = [0 for _ in range(6)]
        for cate in categories:
            cate_name = cate.CarbonUnit
            cate = cate.Category
            input_data = [[d] for d in cur_carbon_list[cate_name]]
            try:
                preds_data = get_prediction(input_data)[120:]
            except Exception as e:
                preds_data = [0]

            cur_mon = CUR_TIME.month
            end_mon = CUR_TIME.month + 6
            i = 0
            idx = 0
            while cur_mon < end_mon:
                end_day = MONTH_LAST[cur_mon]
                pred = int(sum(preds_data[i:i + end_day]))
                server_predict_data[idx] += pred
                server_category_predict_data[cate_name].append(pred)

                i += end_day
                cur_mon += 1
                idx += 1

        if bool(is_category):
            return JsonResponse(server_category_predict_data, safe=False, status=status.HTTP_200_OK)
        else:
            return JsonResponse(server_predict_data, safe=False, status=status.HTTP_200_OK)
        
class TestPredict(APIView):

    @swagger_auto_schema(
        operation_summary="prediction test",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, format=None):

        '''
        is_category는 1 또는 0
        1: categorical, 0: total
        '''

        global LAST_PRED_DATE, PREDICTION

        if LAST_PRED_DATE != CUR_TIME:

            from pandas import read_csv
            series = read_csv('./prediction/data/korea/kor_gas_day.csv', header=0, index_col=0)#, parse_dates=True, squeeze=True)
            series = series.loc[series.type == 'A']
            data = list(series.supply)
            print(data)

            LAST_PRED_DATE = CUR_TIME
            PREDICTION = []

            preds = get_prediction(data)[180:]
            print(len(preds))
            cur_mon = CUR_TIME.month
            end_mon = CUR_TIME.month + 6
            i = 0
            while cur_mon < end_mon:
                end_day = MONTH_LAST[cur_mon]
                PREDICTION.append(sum(preds[i:i + end_day]))

                i += end_day
                cur_mon += 1

        return JsonResponse(PREDICTION, safe=False, status=status.HTTP_200_OK)
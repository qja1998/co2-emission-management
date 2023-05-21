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
from ..Carbon.models import Carbon, CarbonInfo, Category
from ..Company.models import Department, Company

import func
import datetime
from dateutil.relativedelta import relativedelta

# 현재 시간과 한 달 후의 시간
CUR_TIME = datetime.date.now()
AFTER_MON = CUR_TIME + relativedelta(months=1)

class CarbonPredictionView(APIView):
    
    permission_classes = (IsAuthenticated,)  # 로그인 검증

    @swagger_auto_schema(
        operation_summary="탄소 배출 예측 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, department_name, format=None): #request.GET[' ']으로 얻을 수 있음
        department = Department.objects.filter(DepartmentName=department_name)
        carbon_info = CarbonInfo.objects.filter(EndtDate=CUR_TIME, Chief=department.RootCom.Chief)
        cur_data = Carbon.objects.filter(RootCom=department.RootCom,
                                         BelongDepart=department.BelongCom,
                                         CarbonInfo=carbon_info
                                         ).values('CarbonData')
        predictions = CarbonPrediction.objects.filter(Com_id=department.RootCom.pk, PredictDate=AFTER_MON)
        categories = Category.objects.all()
        
        category_server = []
        for cate in categories:
            prediction = predictions.get(Cate_id=cate.pk)
            category_server.append({'name':cate.Category,
                               'data':cur_data,
                               'predictData':prediction.PredCarbonDate})

        return Response(category_server.data, status=status.HTTP_200_OK)
    
        '''
        UserRoot = func.GetUserRoot(request)

        try:  # 요청받은 회사가 루트가 아닌 경우
            Root_id = ComModel.Department.objects.get(
                DepartmentName=Depart, RootCom=UserRoot  # 로그인이 구현된 이후에는 사용자의 root와 비교
            )
        except ComModel.Department.DoesNotExist:  # 요청받은 회사가 루트인 경우
            try:
                Root_id = ComModel.Company.objects.get(ComName=Depart)
            except ComModel.Company.DoesNotExist:  # 요청받은 회사가 존재하지 않는 경우
                return Response(
                    "This Company/Department doesn't exist.",
                    status=status.HTTP_404_NOT_FOUND,
                )

        # 요청받은 회사가 루트인 경우
        if type(Root_id) == ComModel.Company:

            data = CarModel.Carbon.objects.filter(RootCom=Root_id)
            serial = serializer.CarbonSerializer(data, many=True)

            return Response(serial.data, status=status.HTTP_201_CREATED)

        else:  # 요청 받은 회사가 루트, 모회사가 아닌 경우
            Coms = [Root_id]
            func.getChildDepart(Root_id.RootCom, Root_id.SelfCom, Coms)

            CarbonList = []

            for Com in Coms:

                temp = CarModel.Carbon.objects.filter(BelongDepart=Com)
                serial = serializer.CarbonSerializer(temp, many=True)
                CarbonList += serial.data

            return Response(CarbonList, status=status.HTTP_201_CREATED)
            '''
        
# 일정 기간에 맞게 리턴
class CarbonPartQuery(APIView):

    permission_classes = (IsAuthenticated,)  # 로그인 검증

    year = datetime.date.__str__(datetime.date.today())[:4]

    @swagger_auto_schema(
        operation_summary="요청한 조직의 6갸월간의 탄소 배출량 예측값을 반환하는 Api",
        responses={404: "입력한 회사가 존재하지 않음", 201: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, Depart, is_category, format=None):

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

        start_date = CUR_TIME.replace(day=1)
        end_date = (end_date + relativedelta(month=1)).replace(day=1) + relativedelta(day=-1)
        server_category_predict_data = []
        server_predict_data = []
        for _ in range(6):
            cate_pred_data = []
            total_pred_data = 0
            categories = Category.objects.values_list('pk')
            for cate in categories:
                predictions = CarbonPrediction.objects.filter(Com_id=Root.RootCom.pk,
                                                              Cate_id=cate,
                                                              PredictDate=start_date + relativedelta(month=1)).value('PredCarbonData')
                cate_pred_data.append(predictions)
                total_pred_data += predictions
                start_date += relativedelta(month=1)
            server_category_predict_data.append(cate_pred_data)
            server_predict_data.append(total_pred_data)

        if is_category:
            return Response(server_category_predict_data, status=status.HTTP_201_CREATED)
        else:
            return Response(server_predict_data, status=status.HTTP_201_CREATED)
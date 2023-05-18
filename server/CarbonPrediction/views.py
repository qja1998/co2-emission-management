from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from .models import CarbonPrediction
from rest_framework.views import APIView
from .serializer import CarbonPredictionSerializer
from Swag import ComSwag
from drf_yasg.utils import swagger_auto_schema


class CarbonPredictionView(APIView):
    @swagger_auto_schema(
        operation_summary="탄소 배출 예측 데이터를 반환하는 Api",
        responses={200: "API가 정상적으로 실행 됨"},
    )
    def get(self, request, com_id, cate_id, format=None):
        queryset = CarbonPrediction.objects.all()
        #ComId = ComModel.Company.objects.get(ComName=CompanyName) # 만약 이름으로 쿼리를 한다면
        #CateId = ComModel.Company.objects.get(CateName=CategoryName) # 만약 이름으로 쿼리를 한다면
        prediction = CarbonPrediction.objects.get(Com_id=com_id, Cate_id=cate_id)
        serializer = CarbonPredictionSerializer(prediction)
        return Response(serializer.data, status=status.HTTP_200_OK)
from rest_framework import serializers
from . import models


# CarbonPrediction 직렬화(객체를 json으로 변환)
class CarbonPredictionSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    class Meta:
        model = models.CarbonPrediction
        fields = ('name', 'PredictDate', 'PredCarbonData')

class PartPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CarbonPrediction
        fields = ('PredictDate',)
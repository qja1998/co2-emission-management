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

# class PartCatePredictionSerializer(serializers.ModelSerializer):
# #    scores = serializers.ListField(
# #    child=serializers.IntegerField(min_value=0, max_value=100)
# #    )
#     pred_list = serializers.ListField()
#     class Meta:
#         fields = ('pred_list',)
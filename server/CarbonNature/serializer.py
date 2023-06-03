from rest_framework import serializers
from . import models

from django.core.validators import MaxValueValidator, MinValueValidator

# CarbonPrediction 직렬화(객체를 json으로 변환)
class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Evaluation
        fields = "__all__"

class EmissionInfoGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Evaluation
        fields = ('BaseYear', 'BaseEmissions')

class EmissionInfoPostSerializer(serializers.ModelSerializer):
    groupName = serializers.CharField()
    class Meta:
        model = models.Evaluation
        fields = ('groupName', 'BaseYear', 'BaseEmissions')


class TListPostSerializer(serializers.Serializer):
    listkind = serializers.IntegerField(validators=[
            MaxValueValidator(1),
            MinValueValidator(0)
        ])
    index = serializers.IntegerField()
    i = serializers.IntegerField()
    category = serializers.CharField()
    percentage = serializers.IntegerField()
    target = serializers.CharField(required=False)

class TargetListPostSerializer(serializers.Serializer):
    groupName = serializers.CharField()
    year = serializers.IntegerField()
    tList = serializers.ListField(child=TListPostSerializer())
    
class TargetListDeletSerializer(serializers.Serializer):
    id_list = serializers.ListField()

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Goal
        fields = "__all__"

class MethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Method
        fields = "__all__"

class CompanyGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompanyGoal
        fields = "__all__"

class TradePriceSerializer(serializers.Serializer):
    trade_price = serializers.IntegerField()
from rest_framework import serializers
from . import models


# CarbonPrediction 직렬화(객체를 json으로 변환)
class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Evaluation
        fields = "__all__"

class EmissionInfoSerializer(serializers.ModelSerializer):
    GroupName = serializers.SerializerMethodField()
    class Meta:
        model = models.Evaluation
        fields = ('GruopName', 'BaseYear', 'BaseEmissions')


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

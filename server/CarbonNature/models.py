from django.db import models


# 탄소 예측 결과를 저장하는 테이블
class Evaluation(models.Model):
    Com_id = models.ForeignKey(
		"Company.Company",
		related_name="ComEval",
		on_delete=models.CASCADE,
	)
    BaseYear = models.IntegerField() #기준년도
    BaseEmissions= models.IntegerField() #기준량

#감축목표 내용, 양을 저장하는 테이블
class Goal(models.Model):
	Cate_id = models.ForeignKey(
		"Carbon.Category",
		related_name="CateGoal",
		on_delete = models.CASCADE,
	)
	IncreaseKind= models.BooleanField()
	TransEnergy = models.TextField(null=True, blank=True)
	DecrePercent = models.IntegerField()
	DecreTotalEmission = models.IntegerField()

#어떤 조직이 몇년도에 어떤 감축목표를 가지는지 저장하는 테이블
class CompanyGoal(models.Model):
	Com_id = models.ForeignKey( 
		"Company.Company",
		related_name="GoalDepartment",
		on_delete=models.CASCADE
	)
	Goal_id = models.ForeignKey(
		"CarbonNature.Goal",
		related_name="ComGoal",
		on_delete=models.CASCADE
	) 
	GoalDate = models.IntegerField() #감축 목표 년도

#카테고리별 감축 방법을 저장하는 테이블
class Method(models.Model):
	Category = models.IntegerField()
	DecreMethod = models.TextField(null=True, blank=True)
from django.db import models


# 탄소 예측 결과를 저장하는 테이블
class Evaluation(models.Model):
    Com_id = models.ForeignKey(
		"Company.Company",
		related_name="ID",
		on_delete=models.CASCADE,
		null = True
	)
    BaseYear = models.DateField() #기준년도
    BaseEmissions= models.IntegerField() #기준량

#감축목표 내용, 양을 저장하는 테이블
class Goal(models.Model):
	Cate_id=models.ForeignKey(
		"Carbon.category",
		related_name="ID",
		on_delete = models.CASCADE,
		null = True
	),
	IncreaseKind= models.BooleanField(),
	TransEnergy = models.TextField(),
	DecrePercent = models.IntegerField(),
	DecreTotalEmission = models.IntegerField()

#카테고리별 감축 방법을 저장하는 테이블
class Method(models.Model):
	Category = models.IntegerField()
	DecreMethid = models.TextField(null = True, blank= True)

#어떤 조직이 몇년도에 어떤 감축목표를 가지는지 저장하는 테이블
class CompanyGoal(models.Model):
	Com_id = models.ForeignKey( 
		"Company.Company",
		related_name="Com_id",
		on_delete=models.CASCADE,
		null = True
	),
	Goal_id = models.ForeignKey(
		"CarbonNature.Goal",
		related_name="ID",
		on_delete=models.CASCADE,
		null = True
	) 
	GoalDate = models.DateField() #감축 목표 년도
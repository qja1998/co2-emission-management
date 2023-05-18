from django.db import models

class CarbonPredict(models.Model):
    Com_id = models.ForeignKey(
			"Company.Company",
            #related_name="ID",
			on_delete=models.CASCADE,
		)
    # Cate_id = models.ForeignKey(
	# 		"Carbon.Category",
    #       related_name="ID",
	# 		on_delete = models.CASCADE,
	# 	)
    PredCarbonData= models.FloatField() #카테고리별 예측 사용량
    PredictDate= models.DateField()  #예측 날짜
    PredCarbonTrans= models.FloatField() #탄소 배출량으로 전환된 예측량
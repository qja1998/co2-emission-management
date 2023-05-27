from django.contrib import admin

from . import models

# Register your models here.

admin.site.register(models.Evaluation)
admin.site.register(models.Goal)
admin.site.register(models.Method)
admin.site.register(models.CompanyGoal)
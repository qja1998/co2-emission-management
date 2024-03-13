from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.Carbon)
admin.site.register(models.CarbonInfo)
admin.site.register(models.Category)
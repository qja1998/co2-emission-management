from django.urls import path

from . import views

app_name = "CarbonPrecition"
urlpatterns = [
    path(
        "CarbonPrediction/<str:depart_name>",
        views.CarbonPredictionView.as_view(),
        name="CarbonPredictionGet",
    ),
    path(
        "CarbonPartQuery/<str:depart_name>/<int:is_category>",
        views.CarbonPartQuery.as_view(),
        name="CarbonPartQuery",
    ),
]
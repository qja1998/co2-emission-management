from django.urls import path

from . import views

app_name = "CarbonPrecition"
urlpatterns = [
    path(
        "CategoryPrediction/<str:depart_name>",
        views.CategoryPredictionView.as_view(),
        name="CategoryPredictionGet",
    ),
    path(
        "PartPrediction/<str:depart_name>/<int:is_category>",
        views.PartPredictionQuery.as_view(),
        name="PartPredictionQuery",
    ),
]
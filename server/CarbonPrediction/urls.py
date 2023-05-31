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
        "CarbonPartPrediction/<str:depart_name>/<int:is_category>",
        views.CarbonPartQuery.as_view(),
        name="CarbonPartQuery",
    ),
]
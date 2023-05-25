from django.urls import path

from . import views

app_name = "CarbonNature"
urlpatterns = [
    path(
        "Evaluation/<str:depart_name>",
        views.EvaluationView.as_view(),
        name="EvaluationGet",
    ),
    path(
        "Method",
        views.MethodView.as_view(),
        name="MethodGet",
    ),
    path(
        "CompanyGoal",
        views.CompanyGoalView.as_view(),
        name="CompanyGoalGet",
    ),
    path(
        "EmissionInfo",
        views.EmissionInfoView.as_view(),
        name="EmissionInfoGet",
    ),
    path(
        "CarbonYear/<str:depart_name>/<int:year>/<int:is_category>",
        views.CarbonYearQuery.as_view(),
        name="CarbonYearGet",
    ),
]
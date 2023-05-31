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
    # path(
    #     "CompanyGoal",
    #     views.CompanyGoalView.as_view(),
    #     name="CompanyGoalGet",
    # ),
    path(
        "EvaluationInfo",
        views.EvaluationInfoView.as_view(),
        name="EvaluationInfoPost",
    ),
    path(
        "CarbonYear/<str:depart_name>/<int:year>/<int:is_category>",
        views.CarbonYearQuery.as_view(),
        name="CarbonYearGet",
    ),
    path(
        "TargetList/<str:depart_name>/<int:year>",
        views.TargetListQuery.as_view(),
        name="TargetListGet",
    ),
    path(
        "TargetList",
        views.TargetListPost.as_view(),
        name="TargetListPost",
    ),
    path(
        "TargetList/<int:id>",
        views.TargetListDelete.as_view(),
        name="TargetListDelete",
    ),
    path(
        "TradePrice",
        views.TradePriceGet.as_view(),
        name="TradePrice",
    ),
]
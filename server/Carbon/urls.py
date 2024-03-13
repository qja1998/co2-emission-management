from django.urls import path

from . import views

app_name = "Carbon"

urlpatterns = [
    path("<int:pk>", views.CarbonFixingQuery.as_view()),
    path(
        "<str:Depart>",
        views.CarbonEmissionQuery.as_view(),
    ),
    path(
        "PartEmission/<str:depart_name>/<str:start_date>/<str:end_date>/<int:is_category>",
        views.CarbonPartQuery.as_view(),
        name="CarbonPartEmission"
    ),
]

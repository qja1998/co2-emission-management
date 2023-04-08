from django.urls import path

from . import views

app_name = "Carbon"

urlpatterns = [
    path("<int:pk>", views.CarbonFixingQuery.as_view()),
    path(
        "<str:Depart>",
        views.CarbonEmissionQuery.as_view(),
    ),
]

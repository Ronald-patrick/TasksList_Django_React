from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('',views.apiOverview,name="api-overview"),
    path('task-list/',views.taskList,name="task-list"),
    path('task-detail/<str:pk>/',views.taskDetail,name="task-detail"),
    path('task-create/',views.taskCreate,name="task-create"),
    path('task-create/<str:pk>/',views.updateTask,name="task-update"),
    path('task-delete/<str:pk>/',views.taskDelete,name="task-delete"),
]
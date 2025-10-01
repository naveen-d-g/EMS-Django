# employees/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import EmployeeViewSet, RegisterUserView
from . import views

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    # API routes
    path("", include(router.urls)),
    path("register/", RegisterUserView.as_view(), name="api_register"),
    path("login/", obtain_auth_token, name="api_login"),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),  

    # Template routes
    path("", views.employee_list, name="employee_list"),
    path("create/", views.employee_create, name="employee_create"),
    path("update/<int:pk>/", views.employee_update, name="employee_update"),
    path("delete/<int:pk>/", views.employee_delete, name="employee_delete"),
    path("register-form/", views.register_view, name="register_form"),

    # Django auth routes
    path("accounts/", include("django.contrib.auth.urls")),
]

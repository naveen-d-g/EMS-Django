from rest_framework import viewsets, filters, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from .forms import EmployeeForm, RegisterForm
from .models import Employee
from .serializers import EmployeeSerializer


# ----------------- API Views -----------------
class EmployeeViewSet(viewsets.ModelViewSet):
    """
    API endpoints for Employee CRUD (with photo support).
    """
    queryset = Employee.objects.filter(is_deleted=False)
    serializer_class = EmployeeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # Needed for handling file uploads (photo)
    parser_classes = [MultiPartParser, FormParser]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'position', 'department']
    ordering_fields = ['name', 'date_joined']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_destroy(self, instance):
        instance.soft_delete(user=self.request.user)


class RegisterUserView(APIView):
    """
    API endpoint for user registration (returns token).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)


# ----------------- Django Template Views -----------------
@login_required
def employee_list(request):
    employees = Employee.objects.filter(is_deleted=False)
    return render(request, "employees/employee_list.html", {"employees": employees})


@login_required
def employee_create(request):
    if request.method == "POST":
        form = EmployeeForm(request.POST, request.FILES)  # handle file upload
        if form.is_valid():
            employee = form.save(commit=False)
            employee.created_by = request.user
            employee.save()
            return redirect("employee_list")
    else:
        form = EmployeeForm()
    return render(request, "employees/employee_form.html", {"form": form})


@login_required
def employee_update(request, pk):
    employee = get_object_or_404(Employee, pk=pk, is_deleted=False)
    if request.method == "POST":
        form = EmployeeForm(request.POST, request.FILES, instance=employee)
        if form.is_valid():
            employee = form.save(commit=False)
            employee.updated_by = request.user
            employee.save()
            return redirect("employee_list")
    else:
        form = EmployeeForm(instance=employee)
    return render(request, "employees/employee_form.html", {"form": form})


@login_required
def employee_delete(request, pk):
    employee = get_object_or_404(Employee, pk=pk, is_deleted=False)
    employee.soft_delete(user=request.user)
    return redirect("employee_list")


def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("employee_list")
    else:
        form = RegisterForm()
    return render(request, "registration/register.html", {"form": form})

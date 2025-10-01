# employees/forms.py

from django import forms
from .models import Employee
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        # include only editable fields (exclude auto_now_add / auto_now fields)
        fields = ["name", "email", "department", "position", "salary", "photo"]
        widgets = {
            "date_joined": forms.DateInput(attrs={"type": "date"}),  # not used here; kept if needed elsewhere
        }

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

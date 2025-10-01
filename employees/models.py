from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    position = models.CharField(max_length=50, default="Unknown")
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Photo upload
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

    # Audit fields
    date_joined = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='employees_created'
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='employees_updated'
    )

    # Status flags
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def soft_delete(self, user=None):
        """Soft delete instead of actual delete."""
        self.is_deleted = True
        self.is_active = False
        if user:
            self.updated_by = user
        self.save()

    def __str__(self):
        return f"{self.name} ({self.department} - {self.position})"

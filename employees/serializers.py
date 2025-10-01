from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User


class EmployeeSerializer(serializers.ModelSerializer):
    # Return photo URL for frontend instead of just file name
    photo = serializers.ImageField(required=False, allow_null=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            'id',
            'name',
            'email',
            'department',
            'position',
            'salary',
            'photo',
            'photo_url',
            'date_joined',
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
            'is_active',
            'is_deleted',
        ]
        read_only_fields = [
            'id',
            'created_at',
            'updated_at',
            'created_by',
            'updated_by',
            'is_deleted',
            'date_joined',
        ]

    def get_photo_url(self, obj):
        request = self.context.get("request")
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        elif obj.photo:
            return obj.photo.url
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

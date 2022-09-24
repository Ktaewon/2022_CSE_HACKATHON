from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm, UserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('email', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('nickname', 'genre', 'instrument','profile_message',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email','nickname','genre','instrument','profile_message',)
    ordering = ('email',)
    filter_horizontal = ()
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)

# Register your models here.
# class UserAdmin(admin.ModelAdmin):
#     list_display = (
#         'nickname',
#         'email',
#         'genre',
#     )
#     list_display_links = (
#         'nickname',
#         'email',
#         'genre',
#     )
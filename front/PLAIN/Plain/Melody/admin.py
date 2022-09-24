from django.contrib import admin
from .models import Melody, Comment, Like, Follow,Joiner, Chat, Joiner_like

# Register your models here.
"""
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'modify_dt', 'tag_list')		# 추가
    list_filter = ('modify_dt',)
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

    def get_queryset(self, request):    # 추가
        return super().get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):            # 추가
        return ', '.join(o.name for o in obj.tags.all())


admin.site.register(Melody, PostAdmin)
"""
admin.site.register(Melody)
admin.site.register(Joiner)

admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Follow)

admin.site.register(Chat)
admin.site.register(Joiner_like)
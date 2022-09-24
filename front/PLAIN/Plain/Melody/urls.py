from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.melody),
    path("uploads/", views.upload_melody, name="upload"),
    path("detail/<str:id>", views.detail, name="detail"),
    path('comment/<str:id>', views.createcomment, name='comment'),
    path("default/<str:id>", views.detail, name="default"),
    path('preview',views.preview,name="preview"),

    #path('tag/', views.TagCloudTV.as_view(), name='tag_cloud'),
    #path('tag/<str:tag>', views.TaggedObjectLV.as_view(), 
    #    name='tagged_object_list'),

    
    path('comment/delete/<str:comment_id>', views.comment_delete, name='comment_delete'),
    # Like
    path('like/<str:melody_id>', views.post_like, name='post_like'),
    path('joiner_like/<str:joiner_id>', views.joiner_like, name='joiner_like'),
    # Chats
    path('chat/<str:melody_id>', views.chat, name="chat"),
    path('chat/delete/<str:chat_id>', views.chat_delete, name="chat_delete"),
   
]   


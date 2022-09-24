from django import forms
from .models import Melody

class MelodyForm(forms.ModelForm):
    class Meta:
        model=Melody
        fields = ['title', 'img', 'deadline', 'hashtags', 'body',]
        labels = {
            'title' : '1. Title', 
            'img' : 'Thumnail image', 
            "body" : "Leave a comment for your music!", 
            "deadline" : "Plain Deadline", 
            'hashtags' : "Hashtags",
            }
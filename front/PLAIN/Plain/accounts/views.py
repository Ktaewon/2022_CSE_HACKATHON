from django.shortcuts import render, redirect
from .models import User
from django.contrib import auth
from django.apps import apps
import simplejson as json
# from flask import request
# import re

# regex = re.compile('^HTTP_')
# dict((regex.sub('', header), value) for (header, value) 
#        in request.META.items() if header.startswith('HTTP_'))
def signup(request):
    # if request.META.get('HTTP_DATE'):
    # return request.META.get('HTTP_DATE');
    if request.method == "POST":
        # request.META['HTTP_MY_HEADER'] 
        if request.POST['password1'] == request.POST['password2']:
            user=User.objects.create_user(request.POST['username'], password=request.POST['password1'])
            auth.login(request, user)
            return redirect('home')
    return render(request, 'signup.html')
    
def create(request):
    if request.method == "POST":
        if request.POST['password1'] == request.POST['password2']:
            new_user=User.objects.create_user(request.POST['email'], password=request.POST['password1'])
            # new_user.img = request.FILES.get("imgInput")
            #new_user.email=request.POST['email']
            new_user.nickname=request.POST['nickname']
            new_user.genre=request.POST['genre']
            new_user.instrument=request.POST['instrument']
            new_user.profile_message = request.POST['profile_message']
            new_user.save()
            return redirect('login')

def login(request):
    if request.method == "POST":
        username=request.POST['username']
        password=request.POST['password']
        print(username, password)
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            print("로그인 성공")
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'username or password is incorrect'})
    else:
        return render(request, 'login.html')
    
# def login(request):
#     # 해당 쿠키에 값이 없을 경우 None을 return 한다.
#     if request.COOKIES.get('connect.sid') is not None:
#         email = request.COOKIES.get('email')
#         password = request.COOKIES.get('password')
#         user = auth.authenticate(request, email=email, password=password)
#         if user is not None:
#             auth.login(request, user)
#             return redirect('home')  
#         else:
#             return render(request, 'login.html')

#     elif request.method == "POST":
#         email = request.POST["email"]
#         password = request.POST["password"]
#         # 해당 user가 있으면 username, 없으면 None
#         user = auth.authenticate(request, email=email, password=password)

#         if user is not None:
#             auth.login(request, user)
#             if request.POST.get("keep_login") == "TRUE":
#                 response = render(request, 'home.html')
#                 response.set_cookie('email',email)
#                 response.set_cookie('password',password)
#                 return response
#             return redirect('home')
#         else:
#             return render(request, 'login.html', {'error':'username or password is incorrect'})
#     else:
#         return render(request, 'login.html')
#     return render(request, 'login.html') 

def home(request):
        Melody=apps.get_model('Melody',"Melody")
        preview=Melody.objects.all()
        return render(request, 'home.html',{"melodys":preview})
def profile(request):
        return render(request, 'profile.html')

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('home')
    return render(request, 'home.html')

def home2(request):
    return render(request, 'home.html')




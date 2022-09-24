from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
#세번째로 한거
class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    nickname=models.CharField(verbose_name='nickname', max_length=20, blank=False)
    genre=models.CharField(verbose_name='genre',max_length=30, blank=False)
    instrument=models.CharField(verbose_name='instrument',max_length=30, blank=False)
    profile_message=models.CharField(verbose_name='profile-message', max_length=30, blank=False)
    # img = models.ImageField(null=True, upload_to="accounts/img/", blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
        return True
    def has_module_perms(self, app_label):
        return True
    @property
    def is_staff(self):
        return self.is_admin
#두번째로 한거
#BaseUserManger클래스에서 User를 생성할 때 사용하는 클래스이고, AbstractBaseUserManager는 상속받아 생성하는 클래스.
# Create your models here.
# class MyUserManager(BaseUserManager):
#     def create_user(self, email, company_name, phone, password=None): #User생성함수
#         if not email:
#             raise ValueError("email is required")
#         if not company_name:
#             raise ValueError("company name is required")
#         if not phone:
#             raise ValueError("please provide an active phone number")
#         user = self.model(
#             email = self.normalize_email(email), 
#             company_name = company_name,
#             phone = phone
#         )
#         user.set_password(password)
#         user.save(using = self._db)
#         return user
#     def create_superuser(self, email, company_name, phone, password=None): #superUser생성함수
#         user = self.create_user(
#             email = email,
#             company_name= company_name,
#             phone = phone,
#             password=password
#         )
#         user.is_admin = True
#         user.is_superuser = True
#         user.save(using = self._db)
#         return user

# class MyUser(AbstractBaseUser): #AbstractBaseUser클래스는 기본 필드에  password, last_login, is_active=True로 정의되어 있다. is_active, is_admin은 django 필수 모델이기 때문에 반드시 정의되어야 한다. 
#     objects= MyUserManager()
#     email = models.EmailField(verbose_name="email address", max_length=60, unique=True)
#     company_name = models.CharField(verbose_name="company name", max_length=200, unique=True)
#     phone = models.CharField(max_length=20, verbose_name="company phone")
#     date_joined = models.DateTimeField(auto_now_add=True, verbose_name="date joined")
#     last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
#     is_admin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ['company_name', 'phone']
#     def __str__(self):
#         return self.company_name
#     def has_perm(self, perm, obj=None):
#         return True
#     def has_module_perms(self, app_label):
#         return True

#첫번째로 한거
# class UserManager(BaseUserManager):
#     def create_user(self, name, email, nickname, genre, instrument, password=None):
#         if not name:
#             raise ValueError('must have user Id')
#         if not email:
#             raise ValueError('must have user email')
#         user = self.model(
#             name=name,
#             email=self.normalize_email(email),
#             nickname=nickname,
#             genre=genre,
#             instrument=instrument,
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, name, email, password):
#         user = self.create_user(
#             name=name,
#             email=self.normalize_email(email),
#             password=password,
#         )
#         user.is_admin = True
#         user.save(using=self._db)
#         return user

# class User(AbstractBaseUser):
#     objects = UserManager()
#     name = models.CharField(max_length=100)
#     email = models.EmailField(max_length=255,unique=True,)
#     nickname=models.CharField(max_length=20, blank=True, null=False)
#     genre=models.CharField(max_length=20, blank=True)
#     instrument=models.TextField()
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     USERNAME_FIELD = 'name'
#     REQUIRED_FIELDS = ['email','nickname','genre', 'instrument']
#     def __str__(self):
#         return self.name
    
# def has_perm(self, perm, obj=None):
#     return True

# def has_module_perms(self, app_label):
#     return True

# @property
# def is_staff(self):
#     return self.is_admin
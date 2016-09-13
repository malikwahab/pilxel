"""django_photo_app URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from pilxel.api import FacebookLogin, ImageViewSet, ImageDetailsViewSet
from rest_framework import routers
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token


router = routers.DefaultRouter()
router.register(r'images', ImageViewSet, base_name='image')
router.register(r'image-details', ImageDetailsViewSet,
                base_name="image-details")

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/', include('rest_auth.urls')),
    url(r'^api/v1/auth/register/', include('rest_auth.registration.urls')),
    url(r'^api/v1/auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^api/v1/auth/token-verify/', verify_jwt_token),
    url(r'^api/v1/auth/token-refresh/', refresh_jwt_token),
]

from django.urls import path

from .views import (
    FavouritesListView,UserDetailsView
)

urlpatterns = [
    path('', FavouritesListView.as_view()),
    path('user/$', UserDetailsView.as_view(), name='rest_user_details'),
]
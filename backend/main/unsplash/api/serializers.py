from rest_framework import serializers
from django.contrib.auth import get_user_model
from unsplash.models import Favourites
UserModel = get_user_model()

class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = ('id', 'item')


class UserDetailsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('email', )

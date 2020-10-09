from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView, RetrieveUpdateAPIView
)
from rest_framework.permissions import IsAuthenticated
from .app_settings import (UserDetailsSerializer)
from unsplash.models import Favourites
from .serializers import FavouritesSerializer


class FavouritesListView(ListAPIView):
    queryset = Favourites.objects.all()
    serializer_class = FavouritesSerializer
    permission_classes = (permissions.AllowAny, )


class UserDetailsView(RetrieveUpdateAPIView):
  
    serializer_class = UserDetailsSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.none()

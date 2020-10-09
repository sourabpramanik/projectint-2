from rest_auth.serializers import (UserDetailsSerializer as DefaultUserDetailsSerializer)
from django.conf import settings
from .utils import import_callable, default_create_token




serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})


UserDetailsSerializer = import_callable(
    serializers.get('USER_DETAILS_SERIALIZER', DefaultUserDetailsSerializer)
)
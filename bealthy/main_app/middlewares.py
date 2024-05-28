from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware #.base
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser, User
import jwt
from django.conf import settings

@database_sync_to_async
def get_user(token):
    try:
        valid_data = AccessToken(token)
        user_id = valid_data['user_id']
        return User.objects.get(id=user_id)
    except jwt.ExpiredSignatureError:
        return AnonymousUser()
    except jwt.InvalidTokenError:
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get('token', None)
        
        if token:
            scope['user'] = await get_user(token[0])
        else:
            scope['user'] = AnonymousUser()

        return await super().__call__(scope, receive, send)

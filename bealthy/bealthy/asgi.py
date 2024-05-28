# asgi.py
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bealthy.settings')
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from main_app.routing import websocket_urlpatterns
from main_app.middlewares import JWTAuthMiddleware



django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddleware(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})

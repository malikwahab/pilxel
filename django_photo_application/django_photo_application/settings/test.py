# Test specific settings
from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(os.path.dirname(__file__), 'test.db')
    }
}

SECRET_KEY = '5t^0i5ix$q2)(%r+cjqd48-^8_)hhn=_@6=^_kdk9%hp&2j9of'

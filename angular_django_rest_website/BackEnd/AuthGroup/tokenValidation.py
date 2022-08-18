import time
from rest_framework.authentication import get_authorization_header
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

import datetime

def token_timeout_check(request):
    stopTime = 60480000
    startTime = 9000000
    token = get_authorization_header(request)
    # print("Token time out function: ", token)
    if token == b'' or ' ' not in str(token):
        return None
    else:
        token = str(token).split(' ')
        name = token[0][2:]
        key = token[1][:-1]
        if name == 'Token' and Token.objects.filter(key=key).exists():
            currentTime = datetime.datetime.now(datetime.timezone.utc)
            token = Token.objects.get(key=key)
            tokenTime = token.created
            timeExpended = (currentTime - tokenTime).total_seconds()
            user_id = token.user_id
            if timeExpended < startTime:
                # print("Object before start time:", token)
                return (token, True)
            elif timeExpended > startTime and timeExpended < stopTime:
                token.delete()
                token = Token.objects.get_or_create(user_id=user_id)
                # print("Object on middle time:", token)
                return token
            else:
                # print("end time ran...")
                token.delete()
                return None
        else:
            print("token does not exist....")


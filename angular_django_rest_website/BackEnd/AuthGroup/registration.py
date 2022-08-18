from unicodedata import category
from django.contrib.auth.tokens import default_token_generator 
from .serializers import EmailMetaDataSerializer
from .models import EmailMetaData

import secrets
import random
import smtplib, ssl

# class EmailMetaData(models.Model):
#     user = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#     )
#     djangoToken = models.TextField(unique=True)
#     category = models.CharField(max_length=50)
#     secretToken = models.TextField(unique=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
def registration_email(user):

    port = 465  # For SSL
    password = 'TojoDezeonicE3f31'

    # Create a secure SSL context
    context = ssl.create_default_context()
    djangoToken = default_token_generator.make_token(user)
    secretToken = secrets.token_urlsafe(random.randint(16,22))
    data = {
        "user" : user.id,
        'djangoToken' : djangoToken,
        "category" : "Registration",
        "secretToken" : secretToken
    }
    if EmailMetaData.objects.filter(user=user, category=data['category']).exists():
        EmailMetaData.objects.filter(user=user, category=data['category']).delete()

    serializer = EmailMetaDataSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        print("invalid data... on email meta data serializer")
        return


    sender_email = "Dezeonic@Gmail.com"
    # message = f"""
    # <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”%3E<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <html xmlns=”https://www.w3.org/1999/xhtml”%3E<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <head><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <title>Test Email Sample</title><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <meta http-equiv=”Content-Type” content=”text/html; charset=UTF-8″ /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <meta http-equiv=”X-UA-Compatible” content=”IE=edge” /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <meta name=”viewport” content=”width=device-width, initial-scale=1.0 ” /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <style><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # <!— CSS code (if any) —><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # </style><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    # </head>

    #     http://127.0.0.1:8000/verification/{djangoToken}/{secretToken}/
    #     http://104.254.15.78:8000/verification/{djangoToken}/{secretToken}/
    # """


    message =f"""
        Hello click the link below to verify your email.
        click respective token
        hello i am bolded
        http://127.0.0.1:8000/verification/{djangoToken}/{secretToken}/
        http://104.254.15.78:8000/verification/{djangoToken}/{secretToken}/
    """
    print(message)


    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login("Dezeonic@Gmail.com", password)
        server.sendmail(sender_email,user.email,message)

    print("mail sent")
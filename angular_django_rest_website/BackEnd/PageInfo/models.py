from django.db import models

class Footer(models.Model):
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to ='Footer/',null=True, blank=True)


class FooterLinks(models.Model):
    footer = models.ForeignKey(Footer,on_delete = models.CASCADE)
    urlLink = models.URLField()
    type = models.CharField(max_length=35)

    class Meta:
        unique_together =('type', 'urlLink')
    
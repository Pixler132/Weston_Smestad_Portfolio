# Generated by Django 4.0.1 on 2022-03-21 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0005_remove_profile_lightmode'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='lower_username',
            field=models.CharField(default=None, max_length=150, unique=True),
            preserve_default=False,
        ),
    ]
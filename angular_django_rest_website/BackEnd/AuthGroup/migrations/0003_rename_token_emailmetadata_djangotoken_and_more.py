# Generated by Django 4.0.1 on 2022-03-23 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AuthGroup', '0002_emailmetadata_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emailmetadata',
            old_name='token',
            new_name='djangoToken',
        ),
        migrations.RemoveField(
            model_name='emailmetadata',
            name='number',
        ),
        migrations.AddField(
            model_name='emailmetadata',
            name='secretToken',
            field=models.TextField(default=-1, unique=True),
            preserve_default=False,
        ),
    ]

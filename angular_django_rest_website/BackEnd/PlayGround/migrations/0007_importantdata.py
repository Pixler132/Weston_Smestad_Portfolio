# Generated by Django 4.0.1 on 2022-02-22 03:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PlayGround', '0006_data_number'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImportantData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('number', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

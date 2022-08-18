# Generated by Django 4.0.1 on 2022-02-28 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0003_profile_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='emailVerfied',
            new_name='emailVerified',
        ),
        migrations.CreateModel(
            name='ProfileLinks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('urlLink', models.URLField()),
                ('type', models.CharField(max_length=35)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='UserManagement.profile')),
            ],
            options={
                'unique_together': {('type', 'urlLink')},
            },
        ),
    ]

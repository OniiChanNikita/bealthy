# Generated by Django 5.0.4 on 2024-05-17 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0011_post_slug_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='research',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]

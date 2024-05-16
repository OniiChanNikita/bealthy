# Generated by Django 5.0.4 on 2024-05-12 00:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0008_post_main_image_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='main_image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_main_image', to='main_app.image'),
        ),
    ]
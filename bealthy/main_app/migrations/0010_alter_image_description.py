# Generated by Django 5.0.4 on 2024-05-15 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0009_alter_post_main_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='description',
            field=models.CharField(max_length=255, null=True),
        ),
    ]

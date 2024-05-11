# Generated by Django 5.0.4 on 2024-05-11 00:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Images',
            new_name='Image',
        ),
        migrations.AddField(
            model_name='post',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main_app.profile'),
        ),
    ]

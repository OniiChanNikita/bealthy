# Generated by Django 5.0.4 on 2024-07-28 01:54

import django.db.models.deletion
import main_app.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=main_app.models.image_file_path)),
                ('description', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_profile', models.ImageField(default='default_profile.jpg', upload_to=main_app.models.image_file_path)),
                ('rating', models.FloatField(default='0', max_length=10)),
                ('hidden_rating', models.FloatField(default='0', max_length=10)),
                ('qualification', models.BooleanField()),
                ('description', models.TextField()),
                ('subscriptions', models.IntegerField()),
                ('slug_profile', models.SlugField(blank=True, unique=True)),
                ('name', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('conversation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='main_app.conversation')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Research',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_research', models.IntegerField(blank=True, null=True, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('datetime', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('type_post', models.CharField(choices=[('traning', 'traning program'), ('nutrion', 'nutrion program'), ('product', 'products recommended')], max_length=255)),
                ('content', models.TextField()),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('slug_post', models.SlugField(blank=True, unique=True)),
                ('image', models.ManyToManyField(blank=True, related_name='post_image', to='main_app.image')),
                ('main_image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_main_image', to='main_app.image')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.profile')),
                ('research', models.ManyToManyField(blank=True, to='main_app.research')),
            ],
        ),
        migrations.CreateModel(
            name='ReviewPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='main_app.post')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='main_app.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.conversation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.profile')),
            ],
            options={
                'unique_together': {('conversation', 'user')},
            },
        ),
    ]

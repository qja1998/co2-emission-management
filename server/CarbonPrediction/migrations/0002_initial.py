# Generated by Django 4.1.4 on 2023-05-31 09:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Company', '0001_initial'),
        ('CarbonPrediction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carbonprediction',
            name='Com',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='PredCom', to='Company.company'),
        ),
    ]
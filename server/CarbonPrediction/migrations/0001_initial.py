# Generated by Django 4.1.4 on 2023-05-31 09:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Carbon', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarbonPrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PredCarbonData', models.FloatField()),
                ('PredictDate', models.DateField()),
                ('PredCarbonTrans', models.FloatField()),
                ('Cate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='PredCate', to='Carbon.category')),
            ],
        ),
    ]
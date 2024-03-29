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
            name='CompanyGoal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GoalDate', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('BaseYear', models.IntegerField()),
                ('BaseEmissions', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Method',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Category', models.IntegerField()),
                ('DecreMethod', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('IncreaseKind', models.BooleanField()),
                ('TransEnergy', models.TextField()),
                ('DecrePercent', models.IntegerField()),
                ('DecreTotalEmission', models.IntegerField()),
                ('Cate_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CateGoal', to='Carbon.category')),
            ],
        ),
    ]

# Generated by Django 4.1.4 on 2023-06-03 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CarbonNature', '0003_alter_goal_transenergy_tlistreturnmodel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TListReturnModel',
        ),
    ]
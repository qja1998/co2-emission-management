from datetime import datetime

from rest_framework_simplejwt.tokens import AccessToken

from Company import models as ComModel
from Human import models as HuModel
from Carbon import models as CarModel
from CarbonNature import models as CNModel
from Company import serializer
from CarbonConstant import CarbonDef

from collections import defaultdict
import datetime
from dateutil.relativedelta import relativedelta


# import sys
# limit_number = 15000
# sys.setrecursionlimit(limit_number)


# 조직 구조를 반환하는 함수
def getStruct(RootCom, HeadCom, result, TransData):
    data = ComModel.Department.objects.filter(RootCom=RootCom, BelongCom=HeadCom)
    if type(data) == None:
        return None
    else:
        result["expand"] = True

        for Depart in data:
            temp = serializer.ComStructSerializer(Depart.SelfCom)
            temp = temp.data

            if temp["Chief"] != None:
                temp["Chief"] = HuModel.Employee.objects.get(id=temp["Chief"]).Name
            temp["Children"] = []
            temp["label"] = temp["ComName"]
            result["Children"].append(temp)

            Trans = [0, 0, 0]
            getStruct(RootCom, Depart.SelfCom, result["Children"][-1], Trans)

            temp["Scope1"] += Trans[0]
            temp["Scope2"] += Trans[1]
            temp["Scope3"] += Trans[2]

            if HeadCom != None:
                HeadCom.Scope1 += temp["Scope1"]
                HeadCom.Scope2 += temp["Scope2"]
                HeadCom.Scope3 += temp["Scope3"]
            else:
                RootCom.Scope1 += temp["Scope1"]
                RootCom.Scope2 += temp["Scope2"]
                RootCom.Scope3 += temp["Scope3"]

            TransData[0] += temp["Scope1"]
            TransData[1] += temp["Scope2"]
            TransData[2] += temp["Scope3"]


def getChildDepart(RootCom, HeadCom, Children):
    data = ComModel.Department.objects.filter(RootCom=RootCom, BelongCom=HeadCom)
    if type(data) == None:
        return None
    else:
        for Depart in data:
            if type(Depart) == None:
                continue
            Children.append(Depart)
            getChildDepart(RootCom, Depart.SelfCom, Children)


def getChildCom(RootCom, HeadCom, Children):
    data = ComModel.Department.objects.filter(RootCom=RootCom, BelongCom=HeadCom)
    if type(data) == None:
        return None
    else:
        for Depart in data:
            Children.append(Depart.SelfCom)
            getChildDepart(RootCom, Depart.SelfCom, Children)


# jwt 헤더로부터 User의 RootCom을 찾아 반환하는 함수
def getRootViaJWT(token_str):
    access_token = AccessToken(token_str)
    Email = access_token["user_id"]
    RootCom = HuModel.User.objects.get(Email=Email).DetailInfo.RootCom
    return RootCom


# jwt 헤더로부터 User의 BelongCom을 찾아 반환하는 함수
def getBelongViaJWT(token_str):
    access_token = AccessToken(token_str)
    Email = access_token["user_id"]
    BelongCom = HuModel.User.objects.get(Email=Email).DetailInfo.BelongCom
    return BelongCom


def GetUserRoot(request):
    token_str = request.META.get("HTTP_AUTHORIZATION").split()[1]
    UserRoot = getRootViaJWT(token_str)
    return UserRoot


def AddZero(date):
    date = date.split("-")
    for i in range(len(date)):
        if len(date[i]) < 2:
            date[i] = "0{}".format(date[i])

    num = 0
    temp = str()
    for i in date:
        temp += i
        if num != 2:
            temp += "-"
            num += 1
    date = temp
    del temp

    return date


# 소속된 회사를 가져오는 함수
def GetBelong():
    pass


# db에 Carbon 생성
def CreateCarbon(CarbonData, CarTrans, usage, Root, Belong, CarInfo):
    CarModel.Carbon.objects.create(
        CarbonActivity=CarbonData["CarbonData"]["CarbonActivity"],
        CarbonData=usage,
        CarbonUnit=CarbonData["CarbonData"]["CarbonUnit"],
        CarbonTrans=CarTrans,
        RootCom=Root,
        BelongDepart=Belong,
        CarbonInfo=CarInfo,
    )


# db에 CarbonInfo 생성
def CreateCarbonInfo(CarbonData, Root, Type):
    ans = CarModel.CarbonInfo.objects.create(
        StartDate=CarbonData["CarbonData"]["StartDate"],
        EndDate=CarbonData["CarbonData"]["EndDate"],
        Location=CarbonData["CarbonData"]["Location"],
        Scope=CarbonData["CarbonData"]["Scope"],
        Chief=HuModel.Employee.objects.get(
            RootCom=Root, Name=CarbonData["CarbonData"]["Chief"]
        ),
        Category=CarbonDef.CarbonCategories.index(Type),
        Division=str(CarbonData),
    )
    return ans


def CreateEmployee(EmployeeData, RootCom, BelongCom):

    Employee = HuModel.Employee.objects.create(
        Name=EmployeeData["Name"],
        PhoneNum=EmployeeData["PhoneNum"],
        JobPos=EmployeeData["JobPos"],
        IdentityNum=EmployeeData["IdentityNum"],
        Authorization=EmployeeData["Authorization"],
        RootCom=RootCom,
        BelongCom=BelongCom,
    )

    return Employee

def get_base_emission(year, com_id, root_id, chief):
        start_date = datetime.datetime.strptime(f"{year}-01-01", '%Y-%m-%d')
        end_date = datetime.datetime.strptime(f"{year}-12-31", '%Y-%m-%d')

        cate_total_emissions = defaultdict(int)

        while start_date < end_date:
            categories = CarModel.Category.objects.values('Category')
            for cate in categories:
                cate = cate['Category']
                try:
                    pre_date = start_date
                    next_month = (start_date + relativedelta(months=1)).replace(day=1)
                    next_month = next_month if next_month < end_date else end_date

                    while pre_date < next_month:
                        carbon_info = CarModel.CarbonInfo.objects.get(StartDate=pre_date,
                                                                    EndDate=pre_date,
                                                                    Chief=chief,
                                                                    Category=cate)
                        carbon_data = CarModel.Carbon.objects.filter(RootCom=root_id,
                                                                 CarbonInfo=carbon_info).values('CarbonData')
                        cate_total_emissions[cate] += carbon_data[0]['CarbonData']
                        pre_date += datetime.timedelta(days=1)

                except:
                    tmp_date = start_date.replace(day=28)
                    next_date = tmp_date if tmp_date < end_date else end_date

                    try:
                        carbon_info = CarModel.CarbonInfo.objects.get(StartDate=start_date,
                                                                        EndDate=next_date,
                                                                        Chief=chief,
                                                                        Category=cate)
                    except Exception as e:
                        continue
                    carbon_data = CarModel.Carbon.objects.filter(RootCom=root_id,
                                                                CarbonInfo=carbon_info).values('CarbonData')
                    cate_total_emissions[cate] += carbon_data[0]['CarbonData']

            start_date += relativedelta(months=1)
        return cate_total_emissions


def DivideByMonthOrYear(Start, End, data, MorY):
    if MorY == 0:  # 월로 나누기
        divider = diff_month(End, Start)
        if divider == 0:
            return data
        else:
            return data / (divider + 1)
    else:
        divider = diff_month(End, Start) // 12
        if divider == 0:
            return data
        else:
            return data / (divider + 1)


def diff_month(d1, d2):
    return (d1.year - d2.year) * 12 + d1.month - d2.month


# 유저의 권환을 확인하는 함수
def CheckUserAuthorization(Authori):
    pass


def make_random_values(total_month, last_day):
    mean = total_month / last_day
    from numpy import random, append, array
    # 32080.026735458807 4686.484019639064
    std = 4686.48401963906 / 32080.026735458807
    randoms = random.normal(loc=mean, scale=std*mean, size=(last_day - 1))
    randoms = append(randoms, array(total_month - randoms.sum()))

    return list(randoms)
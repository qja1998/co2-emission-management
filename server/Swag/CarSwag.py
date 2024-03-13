from drf_yasg import openapi

# Carbon Swagger params

Type = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
                        현재 입력하는 데이터의 카테고리를 입력\n\
                        ex) 고정연소, 이동연소",
)


DetailType = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
                현재 입력하는 데이터의 형태 입력\n\
                ex) 원유",
)


StartDate = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n \
            해당 활동이 시작된 날짜를 기록\n \
            ex) 2001-10-15",
)

EndDate = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n \
            해당 활동이 시작된 날짜를 기록\n \
            ex) 2001-10-15",
)

Location = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동이 진행된 위치를 기록\n\
            ex) 진주, 부산",
)

Scope = openapi.Schema(
    type=openapi.TYPE_INTEGER,
    description="int 형태\n\
            해당 활동의 탄소 배출 단계를 기록\n\
            ex) scope1인 경우는 1",
)

usage = openapi.Schema(
    type=openapi.TYPE_INTEGER,
    description="int 형태\n\
            해당 활동의 탄소 배출량을 기록\n\
            ex) 원유 2kg을 사용한 경우 2",
)

CarbonUnit = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동의 단위를 기록\n\
            ex) kg, L etc",
)

Chief = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동의 관리자를 기록\n\
            ex) 홍길동",
)

CarbonActivity = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동의 이름을 기록\n\
            ex) 홍길동 부산 출장",
)

Division = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동 상세 정보들을 기록\n\
            ex) \{ 건물명:경상대, 설비명:기업 소유 \}}",
)

kind = openapi.Schema(
    type=openapi.TYPE_STRING,
    description="문자열 형태\n\
            해당 활동의 물질 이름을 기록\n\
            ex) HFC-134a",
)

CarbonData = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "StartDate": StartDate,
        "EndDate": EndDate,
        "Location": Location,
        "Scope": Scope,
        "usage": usage,
        "CarbonUnit": CarbonUnit,
        "Chief": Chief,
        "kind": kind,
        "CarbonActivity": CarbonActivity,
        "Division": Division,
    },
)

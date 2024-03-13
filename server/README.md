# carbon-footprint 프로젝트의 서버

# 서버 실행 방법
## 1. 우분투 20.04 환경을 준비합니다.
## 2. 해당 환경에 docker와 docker-compose를 설치합니다.
## 3. 이 깃허브에서 코드를 git clone "repository" 하여 가져옵니다.
## 4. CarbonServerDjango 디렉토리에서 bash runServer.sh를 실행합니다.
## 5. 해당 서버에 접속하여 제대로 동작하는지 확인합니다.
이 서버의 경우 Api 서버이며, ~서버 ip/{사용자가 설정한 포트 번호}/swagger로 이동하면 Api에 관한 설명을 확인할 수 있습니다.

## 서버 실행 시 주의 사항
.env 파일과 config.py 보안 상의 이유로 파일이 제공되지 않습니다. 본인의 원하는 형태로 작성하여 주십시요. 


logs 폴더는 생성하지 않은 상태입니다. 해당 폴더를 생성한 후, 해당 폴더에 Server.log 파일을 생성해 주십시요.


## runServer.sh 셸스크립트 실행 시 선행 조건
git clone한 디렉토리 위의 디렉토리에 CarMigrate, ComMigrate, HuMigrate 폴더가 존재해야 합니다.



docker-compose가 빌드 될 때 MySQL 도커가 실행되는 도커 볼륨에 .env 파일에서 정의한 데이터베이스의 이름이 존재하지 않으면 실행되지 않습니다.



mysql이 실행되는 도커의 경우, .env 파일에서 정의한 도커 볼륨을 사용하여 생성됩니다.

## config.py 예시
SECRET_KEY = "본인이 선택한 비밀 암호화 키"


DATABASES = {



    "default": {



        "ENGINE": "django.db.backends.mysql",



        "NAME": "mysql에서 본인이 생성한 데이터베이스의 이름",



        "USER": "root",



        "PASSWORD": "본인이 선택한 비밀번호",



        "HOST": "db"



    }



}


## .env 예시
MYSQL_ROOT_PASSWORD="본인이 설정한 mysql의 루트 비밀번호"



DB_VOLUME="데이터를 저장할 볼륨 이름"



CARBON_PORT=본인이 사용할 포트 번호

# Api 명세 및 사용법
## Api 명세 및 사용법의 경우는 서버를 실행한 후 swagger를 참조하길 바랍니다.
## swagger 참조 방법
해당 서버를 로컬 환경에서 실행한 경우 : 127.0.0.1:본인이 .env에서 지정한 외부 포트/swagger 



해당 서버를 외부 서버에서 실행한 경우 : 외부 서버의 ip 주소:본인이 .env에서 지정한 외부 포트/swagger 



# 각 폴더에 대한 설명
자세한 설명은 각 폴더 내부의 마크다운 파일을 참조하십시요.

## 공통 사항
- models.py는 데이터베이스의 스키마를 정의하는 파일입니다.
- admin.py는 해당 폴더에서 정의된 스키마(models.py)를 관리자 페이지에 등록하는 파일입니다.
- serializer.py는 데이터베이스에서 쿼리한 데이터를 코드에서 사용가능하도록 변환하는 파일입니다.
- urls.py는 해당 폴더에서 정의한 함수들을 어떤 url을 통해 실행하도록 할지 정의하는 파일입니다.
- view.py는 urls.py에서 정의된 경로에서 실행할 함수들이 정의된 파일입니다. api의 동장 방식을 변경하고 싶다면 가장 먼저 확인하여야 합니다.
- dockerfile의 git clone에서 주소는 자신이 원하는 레포지토리로 변경하여 사용합니다.



## Carbon
- 탄소 배출량의 입력과 계산과 관련된 폴더(App)
- 탄소 배출량의 정보를 저장하는 데이터베이스를 정의하는 부분과 해당 값들의 입출력을 위한 파일들로 구성

## CarbonConstant
- 탄소 배출량의 계산을 위한 폴더
- 탄소 배출량을 모두 동일한 단위로 환산하기 위한 상수들과 수식을 class 형태로 정의 및 저장

## Company
- 웹페이지를 사용하는 회사의 정보를 저장하기 위한 폴더(App)
- 회사의 정보를 데이터베이스에 정의하는 부분과 해당 값들의 입출력을 위한 파일들로 구성

## Human
- 회사의 직원과 웹페이지에 회원가입한 사용자를 관리하기 위한 폴더(App)
- 직원과 사용자의 정보를 정의하는 부분과 해당 값들의 입출력을 위한 파일들로 구성
- 로그인 api의 일부가 테스트 코드의 실행을 위해 변경되어 있으므로 실제 실행 전에 반드시 코드 수정.
- LogInView class의 post 함수에서 if (PW == User.password)를 if check_password(PW, User.password)로 수정할 것

## logs
- 서버가 동작하면서 발생한 로그를 저장하기 위한 폴더

## Server
- 위에서 설명한 모든 것들을 관리하기 위한 App
- 해당 서버에 접근한다면 가장 첫번째로 만나게 되는 폴더 

## Swag
- Api문서화 도구인 swagger 작성을 위해 필요한 내용을 저장하는 폴더
- 반드시 필요한 것은 아니지만 없을 경우 코드 파일에 불필요한 코드가 길어저 생성

## TestDir
- 각 Api들이 이상없이 동작하는지 확인하기 위한 테스트 코드들이 저장된 폴더

# 폴더 외의 기타 파일에 대한 설명
## Dockerfile
- CarbonServerDjango를 실행하기 위한 가상환경(도커)를 정의하는 파일

## docker-compose.yml
- 위의 Dockerfile과 mysql을 실행하기 위해 필요한 내용들을 모두 합쳐 1번에 서버을 실행시켜주는 파일

## runServer.sh
- 소스코드가 업데이트 되었을 경우 소스코드의 업데이트와 서버의 실행을 모두 1번에 실행시켜주는 셸스크립트

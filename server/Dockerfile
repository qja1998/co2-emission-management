FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

# INSTALL DEPENDENCIES
RUN apt-get install -y curl unzip openjdk-8-jre-headless xvfb libxi6 libgconf-2-4

# INSTALL CHROME
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get -y update \
    && apt-get -y install google-chrome-stable

# INSTALL CHROMEDRIVER
RUN wget -N https://chromedriver.storage.googleapis.com/113.0.5672.63/chromedriver_linux64.zip -P ~/ \
    && unzip ~/chromedriver_linux64.zip -d ~/ \
    && rm ~/chromedriver_linux64.zip \
    && mv -f ~/chromedriver /usr/local/bin/chromedriver \
    && chown root:root /usr/local/bin/chromedriver \
    && chmod 0755 /usr/local/bin/chromedriver

RUN apt-get update && apt-get install -y --no-install-recommends; \
    apt-get install -y python3;\
    apt-get install -y python3-pip;\
    pip install --upgrade pip;\
    pip install virtualenv;\
    mkdir myproject;\
    virtualenv venv;\
    . venv/bin/activate;\
    pip install selenium;\
    pip install django==4.1.4;\
    pip install djangorestframework==3.14.0;\
    pip install dj_rest_auth==2.2.5;\
    pip install django-allauth==0.51.0; \
    apt-get install python-dev libmysqlclient-dev -y;\
    pip install setuptools;\
    apt-get install python3-dev;\
    pip install mysqlclient;\
    pip install gunicorn;\
    pip install drf_yasg;\
    pip install tzdata;\
    pip install djangorestframework-simplejwt;\
    pip install python-dateutil;\
    pip3 install torch torchvision torchaudio;\
    pip3 install numpy pandas;\
    pip3 install scikit-learn


CMD cd /; . /venv/bin/activate;\
    cd /; cd /home;\
    sleep 10; \
    #python3 manage.py migrate CarbonNature zero; \
    python3 manage.py makemigrations --noinput; \
    python3 manage.py migrate; \
    python3 manage.py runserver 0.0.0.0:8000\ 
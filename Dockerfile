FROM python:3.9-slim

ENV PATH="/scripts:${PATH}"

COPY ./Requirments.txt /Requirments.txt
#COPY ./environment /environment

RUN apt-get update \
&& apt-get install gcc python3-dev libpq-dev postgresql postgresql-contrib build-essential -y \
&& apt-get clean

# Install Rust and Cargo
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"


# RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers python3 py3-pip python3-dev linux-headers
RUN pip install --upgrade pip
RUN pip install -r /Requirments.txt

RUN pip install django-pandas
RUN pip install fiscalyear
RUN pip install pdfkit
RUN pip install reportlab

# RUN apk del .tmp
RUN mkdir /backend

COPY ./backend /backend

# RUN find . -path "*/migrations/*.py" -not -name "__init__.py" -delete

WORKDIR /backend

COPY ./scripts /scripts

RUN chmod +x /scripts/*
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser  user
RUN chown -R user:user /vol
RUN chown -R 777 /vol
RUN mkdir -p /backend/staticfiles
RUN chown -R 777 /backend/staticfiles
RUN chmod -R 777 /backend/staticfiles
RUN chown -R 777 /backend/static
RUN chmod -R 777 /backend/static

RUN mkdir -p /backend/media
RUN chown -R 777 /backend/media
RUN chmod -R 777 /backend/media

USER user
#RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

#RUN python manage.py migrate


CMD ["python", "manage.py", "runserver", "0.0.0.0:4000"]




cd django_photo_application/
python manage.py makemigrations --settings=django_photo_application.settings.production
python manage.py migrate sites
python manage.py migrate --settings=django_photo_application.settings.production
gunicorn django_photo_application.wsgi --log-file=-

 ### PilXel - A mini-Photo Editor built with Django Rest framework and Reactjs
[![Build Status](https://travis-ci.org/andela-aabdulwahab/pilxel.svg?branch=develop)](https://travis-ci.org/andela-aabdulwahab/pilxel)
[![Coverage Status](https://coveralls.io/repos/github/andela-aabdulwahab/pilxel/badge.svg?branch=develop)](https://coveralls.io/github/andela-aabdulwahab/pilxel?branch=develop)


### Description
A Photo Editor that allow basic manipulation of images such as cropping, rotating, flipping and also the addition of filters to images, with functionality to enhance images.


##### Features
- Create account or Sign in with Facebook
- Manipulate Images - Flip, Mirror, Crop and Rotate
- Enhance Image color, contrast, brightness and sharpness
- Add 20+ available filters to images.
- Share your images with your friends on Facebook
- Download Images Edited with the application
- Create Folders to organize images

##### Technologies Used
- Language: Python && Javascript
- Framework: Django
- Database: PostgreSQL
- Social Authentication: [django-rest-auth](https://github.com/Tivix/django-rest-auth)
- Image filtering: [Pillow](https://github.com/python-pillow/Pillow) with [PILImageFilters](https://github.com/andela-aabdulwahab/PILImageFilters)
- Frontend framework: Reactjs with Redux

## Installation
Clone the repo
```
git clone https://github.com/andela-aabdulwahab/pilxel.git
```
After cloning, create a virtual environment and install the requirements. For Linux and Mac users:

 ```sh
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements
 ```
 If you are on Windows, then use the following commands instead:

 ```sh
$ virtualenv venv
$ venv\Scripts\activate
(venv) $ pip install -r requirements.txt
```

#### Perform migrations
```
python manage.py makemigrations
python manage.py migrate
```

#### Testing
To run the tests for the app, and see the coverage, run
```
python manage.py test
```

#### React Building
```
npm run bundle

```
#### Screen Shots
![screen shot 2016-09-20 at 5 15 12 pm](https://cloud.githubusercontent.com/assets/17270426/18679245/a509b25e-7f56-11e6-8752-7b47294eed63.png)
Home Page

![screen shot 2016-09-20 at 5 16 13 pm](https://cloud.githubusercontent.com/assets/17270426/18679244/a5098ab8-7f56-11e6-8177-4c1db91775d7.png)
Image Upload

![screen shot 2016-09-20 at 5 20 04 pm](https://cloud.githubusercontent.com/assets/17270426/18679243/a5095aa2-7f56-11e6-879b-dd4b37790a9a.png)
Image Editor Filters apply

![screen shot 2016-09-20 at 5 24 04 pm](https://cloud.githubusercontent.com/assets/17270426/18679328/147c0024-7f57-11e6-9b2f-dd24d9859534.png)
Image Editor

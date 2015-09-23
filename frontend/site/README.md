skel
====
Skeleton para desarrollo frontend configurado con GruntJS.

Requisitos
==============
NodeJS >= 0.10 (http://nodejs.org/)

Python >= 2.7 (https://www.python.org/downloads/)

Glue <= 0.9.2 (http://glue.readthedocs.org/en/latest/installation.html)

Grunt CLI (http://gruntjs.com/getting-started)

BrowserSync (http://www.browsersync.io/docs/command-line/)

Growl Windows (http://www.growlforwindows.com/gfw/)

Instalacion de dependencias
===========================


----------


```shell
npm install browser-sync -g
cd frontend/site
npm install
```

Flujo de Trabajo integrado con Django
================


----------


Frontend
--------

Activar watch y connect(servidor estático)
```shell
grunt connect
grunt watch
```
Activar BrowserSync para el testeo multidispositivo (opcional)
```shell
browser-sync start --proxy localhost:8000
```

**Nota:** 
El proxy es la url del proyecto corriendo en producción, el puerto varia en base a la configuración del server de django o la web puesta en marcha(Ejp: www.gatorade.com).


Backend
-------

Agregar a local_settings.py o local.py
```shell
 STATIC_URL = 'http://localhost:8080/static/'
```

Activar livereload agregar a local_settings.py o local.py **(Opcional)**

```shell
 LIVERELOAD = True
```

Correr django
```shell
python manage.py runserver
```

Tareas disponibles
================


----------


**Deploy de todos los archivos**
```shell
grunt deploy
```


**Compilacion de archivos stylus**
```shell
grunt styles
```


**Compilacion de archivos jade**
```shell
grunt templates
```

**Generacion de sprites**

```shell
grunt sprites
```

**Minificado de css**

```shell
grunt cssmin
```

**Servidor de archivos estaticos**

```shell
grunt connect
```

**Watch de cambios en templates o styles y compilacion automatica**

```shell
grunt watch
```

**Minificación de archivos HTML**

```shell
grunt htmlmin
```


**Compilacion de modulos de requirejs**

```shell
grunt requirejs
```

Clone este repo en un nuevo proyecto
================

Leer Aquí (http://stackoverflow.com/questions/9527999/how-do-i-create-a-new-github-repo-from-a-branch-in-an-existing-repo)
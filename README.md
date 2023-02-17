# Primeros pasos

## Instalar dependencias

Después de haber clonado el repositorio, y estar dentro de la carpeta raiz del proyecto clonado, debes abrir tu terminal y teclear

> `npm i`

Esto para instalar todas las dependencias que se necesitan para correr el proyecto

## Ejecutar el proyecto

Para ejecutar la aplicación en modo desarrollo, en tu terminal y dentro de la carpeta raiz debes poner

> `npm start`

Ahora, tienes dos opciones, esperar a que la página se abra automaticamente en tu navegador, que de preferencia debes tener abierto ó mirar la dirección que te arroja en la terminal , normalmente es   *[http://localhost:3000]*

Para este proyecto, la pagina principal será un *Login* , por lo que tendrás que loguearte, puedes usar estas credenciales:

```
   correo: "soyeladmin@gmail.com"
   contraseña: "1234567"
```

Si llegaras a realizar modificaciones y si todo va bien, la página se volverá a cargar. o en el peor de los casos se mostrará un error

### Preparar para producción

Suponemos que ya tenemos una versión estable de nuestro proyecto, y queremos subirlo a un servidor, antes que todo, debemos prepararlo para produción, normalmente es con
Y digo normalmente porque aveces se necesitan de pasos extras dependiendo del servidor al que lo quieras subir.

> `npm run build`

Este comando debería create una carpeta /build

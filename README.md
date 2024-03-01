
## Description
Prueba tecnica Avila tek para el cargo de desarrollador backend


## Modelo entidad relacion de la base de datos

![Organigrama](https://github.com/gamboaalejandro/avila_test/assets/46832210/9996ff1b-bcab-4bba-a112-e5b9fe138a78)

## Arquitectura

Se implemento una arquitectura hexagonal, de caracter escalable separando el dominio del problema, de los detalles de infraestructura, frameworks y librerias externas
 * se implementaron los siguientes patrones de diseño:
       - Singleton
       - Repository
       - Inyeccion de dependencias

se utilizo la base de datos mongo db ya que atraves de los esquemas ofrecemos flexibilidad a los cambios y escalibilidad tanto vertical como horizontalmente ya que 
si el sistema presenta un grande volumen de transacciones esto suele ser lo mas eficiente y las consultas suelen ser mucho mas sencillas ya que estan basadas en JSON

se implementaron varios enviroments para garantizar la escalabilidad a traves de ambientes

se utilizaron coontraros para garantizar extension de funcionalidad, respetando el principio SOLID correspondiente,


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


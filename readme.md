# REST API SMS validacion

### Correr la aplicacion 
`npm run`

> Reviza la ruta que te da la consola para conocer el puerto que en el que se abrio la API

### probar la aplicacion
`npm test`
> Los test se realizan con JEST esto realiza pruebas unitarias de las rutas registradas en la aplicacion

# ejemplos

```javascript
http://localhost:{PORT}/ => 
JSON {saludo:"hola que tal continual en la ruta /login para ingresar tu telefono"}
```

* Registro solo enviara mensajes si tu numero esta verificado ya que el servicio que se utiliza es trial y es necesario registrar dicho numero en la plataforma para que pueda recibir SMS

```javascript
http://localhost:{PORT}/registro 
BODY:{usuario:{TU USUARIO},telefono:{CELULAR}} => 
//Si tu numero esta verificado 
JSON { sesion: '{JWT_TOKEN}', mgs: 'mensaje enviado correctamente' }
// si tu numero NO esta verificado
JSON {sesion: token,
validacion: `Hi Eduardo! Your verification code for Rever is 9090`,
mgs: 'mensaje no se envio correctamente',
validacion:9090}

```
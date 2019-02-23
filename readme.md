# REST API SMS validacion

### Correr la aplicacion 
`npm run`

> Reviza la ruta que te da la consola para conocer el puerto que en el que se abrio la API

### probar la aplicacion
`npm test`
> Los test se realizan con JEST esto realiza pruebas unitarias de las rutas registradas en la aplicacion

# ejemplos

### index
```javascript
http://localhost:{PORT}/ => 
JSON {saludo:"hola que tal continual en la ruta /login para ingresar tu telefono"}
```

### registro
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
### registro
* En el login debes asignar un header llamado 'token' con el valor 'sesion' recibido en la respuesta de registro

```javascript
http://localhost:{PORT}/login 
BODY:{verificacion:{9090}} 
HEADER:{token:{JWT_TOKEN}}=> 
//Si tu numero esta verificado 
JSON {msg: `Hi Eduardo, youhave been verified!`,
infomacion: 
[{ 
    archivo: 'Super secreto',
    nivel: 10 
 }]
			}
// si tu numero de verificacion no es valido
JSON { 
    msg: 'Codigo de validacion incorrecto, vuelve a intentarlo' }
// si el token de el HEADER "token" es INVALIDO
JSON { 
    msg: 'Token invalido!', err:"ERROR"
     }
```
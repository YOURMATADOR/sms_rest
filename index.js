const express = require('express')
const bp = require('body-parser')

const index = require('./routes/index')
const app = express()

const PORT = process.env.PORT|| 3000;
app.use(bp.json())
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*') //* dominios por donde se permite el acceso
    res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,UPDATE,PUT') //* metodos permitidos por el cliente
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization') //* dominios por donde se permite el acceso
    next();
})
app.use(index)
app.listen(PORT,()=> console.log('ESCUCHANDO DESDE PUERTO',PORT))
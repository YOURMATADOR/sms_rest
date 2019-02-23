const express = require('express')
const bp = require('body-parser')

const index_r = require('./routes/index')
const login_r = require('./routes/login')
const app = express()

const PORT = process.env.PORT|| 3000;
app.use(bp.json())
app.use(bp.urlencoded({extended:false}))
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*') //* dominios por donde se permite el acceso
    res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,UPDATE,PUT') //* metodos permitidos por el cliente
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization') //* dominios por donde se permite el acceso
    next();
})
app.use(index_r)
app.use(login_r)
app.listen(PORT,()=> console.log('ESCUCHANDO DESDE PUERTO',PORT))

module.exports= app
const getIndex =(req,res,next)=>{
    
    
    res.status(200).send({saludo:"hola que tal continual en la ruta /login para ingresar tu telefono",
                })
}

module.exports = {getIndex}
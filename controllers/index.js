const getIndex =(req,res,next)=>{
    console.log('resp');
    
    res.send({saludo:"hola que tal",
                })
}

module.exports = {getIndex}
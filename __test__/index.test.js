const request = require('supertest')
const app = require('../index.js')
const PORT = process.env.PORT|| 3000;
const jwt_helper = require('../helpers/jtw')

it('Obtener respuesta de index',(done)=> {
    request(app)
    .get(`/`)
    .expect(200)   
    .end((err,r)=>{
        let {text} = r
        text = JSON.parse(text)
        let respuesta ={"saludo":"hola que tal continual en la ruta /login para ingresar tu telefono"}
        expect(text).toEqual(respuesta)
        if (err) return done(err);
        done();
        });    
})
it('Registrarte en plataforma - enviar mensaje',async (done)=> {
    let usuario = "TUMATADOR"
    request(app)
    .post(`/registro`)    
    .set('Accept', 'application/json')
    .send({
        telefono:"+523311022387",
        usuario
    })
    .expect(200)   
    .end((err,r)=>{
        let {text} = r
        
        
        text = JSON.parse(text)
        let respuesta ="mensaje enviado correctamente"
        expect(text.mgs).toEqual(respuesta)
        if (err) return done(err);
        done();
        });    
})
it('Registrarte en plataforma - entradas invalidas',async (done)=> {
    let usuario = "TUMATADOR"
    request(app)
    .post(`/registro`)    
    .set('Accept', 'application/json')
    .send({
        telefono:"+lmlmlml",
        usuario
    })
    .expect(422)   
    .end((err,r)=>{
        let {text} = r
        
        
        text = JSON.parse(text)
        let respuesta ="numero no valido!"
        expect(text.msg).toEqual(respuesta)
        if (err) return done(err);
        done();
        });    
})
it('Registrarte en plataforma - mensaje consola',async (done)=> {
    let usuario = "TUMATADOR"
    request(app)
    .post(`/registro`)    
    .set('Accept', 'application/json')
    .send({
        telefono:"+523312768988",
        usuario
    })
    .expect(200)   
    .end((err,r)=>{
        let {text} = r
        
        
        text = JSON.parse(text)
        let respuesta ='mensaje no se envio correctamente'
        expect(text.mgs).toEqual(respuesta)
        if (err) return done(err);
        done();
        });    
})

it('Ingresar a plataforma - token valido',async (done)=> {
    let usuario = "TUMATADOR"
    request(app)
    .post(`/registro`)    
    .set('Accept', 'application/json')
    .send({
        telefono:"+523311022387",
        usuario
    })
    .expect(200)   
    .end(async (err,r)=>{
        try{
        let {text} = r
        text = JSON.parse(text)
        console.log(text);
        
        let validacion = await jwt_helper.desifrarToken(text.sesion)
        request(app)
        .post(`/login`)    
        .set('Accept', 'application/json')
        .set('token', text.sesion)
        .send({
            validacion:validacion.validacion
        })
        .expect(200) 
        .end((error,result)=> {
        let text_login = JSON.parse(result.text)
        let respuesta =`Hi ${validacion.usuario}, youhave been verified!`
        expect(text_login.msg).toEqual(respuesta)
        if (error) return done(err);
        done();
        })               
    }
    catch(error_try){
        console.log(error_try);
        
    }
    })
})
it('NO Ingresar a plataforma - token invalido',async (done)=> {
    let usuario = "TUMATADOR"
    request(app)
    .post(`/registro`)    
    .set('Accept', 'application/json')
    .send({
        telefono:"+523311022387",
        usuario
    })
    .expect(200)   
    .end(async (err,r)=>{
        try{
        let {text} = r
        text = JSON.parse(text)
        console.log(text);
        
        let validacion = await jwt_helper.desifrarToken(text.sesion)
        request(app)
        .post(`/login`)    
        .set('Accept', 'application/json')
        .set('token', text.sesion+'2')
        .send({
            validacion:validacion.validacion
        })
        .expect(422) 
        .end((error,result)=> {
        let text_login = JSON.parse(result.text)
        let respuesta =`Token invalido!`
        expect(text_login.msg).toEqual(respuesta)
        if (error) return done(err);
        done();
        })               
    }
    catch(error_try){
        console.log(error_try);
        
    }
    })
})

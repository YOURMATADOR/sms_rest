const jwt_helper = require('../helpers/jtw')
const { validationResult } = require('express-validator/check')
process.env.PLIVO_AUTH_TOKEN = 'YThjNDc5MTk2MDI3NzM1NjU2ZGE1YzgwYmIzYzAy'
process.env.PLIVO_AUTH_ID = 'MANJHJZMJIYMZHMJVHMJ'
const plivo = require('plivo')
var client = new plivo.Client()
const radomatic = require('randomatic')

const postRegistro = async (req, res, next) => {
	
	let token
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			
			return res
				.status(422)
				.json({ msg: 'numero no valido!', errors: errors.array() })
		} else {
			let validacion = radomatic('0', 4)
			let { telefono, usuario } = req.body
			
			token = new jwt_helper({
				telefono,
				validacion,
				usuario
			})
			token = await token.crearToken()
			
			client.messages
				.create(
					'+17603349746', // src
					telefono,
					`Hi ${usuario}! Your verification code for Rever is ${validacion}`
				)
				.then((message) => {
					

					return res
						.status(200)
						.json({ sesion: token, mgs: 'mensaje enviado correctamente' })
				})
				.catch((err) => {
					

					return res.status(200).json({
						sesion: token,
						validacion: `Hi ${usuario}! Your verification code for Rever is ${validacion}`,
						mgs: 'mensaje no se envio correctamente',
						validacion
					})
				})
		}
	} catch (e) {
		return res.status(400).json({ error: e, mgs: 'entradas invalidas!' })
	}
}

const postLogin = async (req, res, next) => {
	try {
		let token = req.get('token')
		let { validacion } = req.body
		
		
		let token_desifrado = await jwt_helper.desifrarToken(token)
		if (+validacion === +token_desifrado.validacion) {
			res.status(200).json({
				msg: `Hi ${token_desifrado.usuario}, youhave been verified!`,
				infomacion: [{ archivo: 'Super secreto', nivel: 10 }]
			})
		} else {
			res
				.status(422)
				.json({ msg: 'Codigo de validacion incorrecto, vuelve a intentarlo' })
		}
	} catch (err) {
		res.status(422).json({ msg: 'Token invalido!', err })
	}
}

module.exports = { postRegistro, postLogin }

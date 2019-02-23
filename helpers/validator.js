const { check } = require('express-validator/check')
var PhoneNumber = require('awesome-phonenumber')

const validar_registro = [
	check('telefono', 'Numero de telefono invalido')
		.exists()
		.custom((v) => {
			var pn = new PhoneNumber(v, 'MX')

			if (pn.isValid(v)) {
				return true
			} else {
				return Promise.reject('Error numero invalido')
			}
		}),
	check('usuario')
		.isString()
		.exists()
		.isLength({ min: 4 })
]
const validar_login = [
	check('token')
		.exists()
		.isJWT(),
	check('validacion')
		.isInt()
		.isLength({ min: 4 })
]

module.exports = { validar_login, validar_registro }

const express = require('express')
const router = express.Router()

const validator_helper = require('../helpers/validator')
const login_controller = require('../controllers/login')

router.post('/registro',validator_helper.validar_registro,login_controller.postRegistro)
router.post('/login',validator_helper.validar_login,login_controller.postLogin)

module.exports = router
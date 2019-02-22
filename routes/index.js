const express = require('express')
const router = express.Router()

const index_controller = require('../controllers/index')

router.get('/',index_controller.getIndex)

module.exports = router
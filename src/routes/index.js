const { Router } = require('express')
const router = Router();

const { getTransacciones, crearTransfer } = require('../controllers/index.controller')

router.get('/transactions', getTransacciones)
router.post('/transfer', crearTransfer);

module.exports = router;
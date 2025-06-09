const express = require('express');
const router = express.Router();
const { enviarNotificacion } = require('../controllers/correoController');

// POST o PUT para enviar notificación
router.post('/', enviarNotificacion);
router.put('/', enviarNotificacion);

module.exports = router;

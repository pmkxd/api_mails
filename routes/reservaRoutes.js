const express = require('express');
const router = express.Router();
const { confirmarReserva, cancelarReserva } = require('../controllers/reservaController');

router.get('/reservas/:id/confirmar', confirmarReserva);
router.get('/reservas/:id/cancelar', cancelarReserva);

module.exports = router;
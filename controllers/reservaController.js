const pool = require('../services/db');

const confirmarReserva = async (req, res) => {
  const idReserva = req.params.id;

  try {
    const [rows] = await pool.execute("SELECT estado FROM Reserva WHERE id = ?", [idReserva]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const estadoActual = rows[0].estado;

    if (estadoActual === 'CONFIRMADA') {
      return res.status(200).json({ mensaje: "La reserva ya está confirmada." });
    }

    if (estadoActual === 'CANCELADA') {
      return res.status(200).json({ mensaje: "La reserva fue cancelada previamente y no puede confirmarse." });
    }

    await pool.execute("UPDATE Reserva SET estado = 'CONFIRMADA' WHERE id = ?", [idReserva]);

    res.json({ mensaje: "Reserva confirmada exitosamente." });

  } catch (error) {
    console.error("Error al confirmar reserva:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const cancelarReserva = async (req, res) => {
  const idReserva = req.params.id;

  try {
    const [rows] = await pool.execute("SELECT estado FROM Reserva WHERE id = ?", [idReserva]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const estadoActual = rows[0].estado;

    if (estadoActual === 'CANCELADA') {
      return res.status(200).json({ mensaje: "La reserva ya está cancelada." });
    }

    if (estadoActual === 'CONFIRMADA') {
      return res.status(200).json({ mensaje: "La reserva ya fue confirmada y no puede cancelarse." });
    }

    await pool.execute("UPDATE Reserva SET estado = 'CANCELADA' WHERE id = ?", [idReserva]);

    res.json({ mensaje: "Reserva cancelada exitosamente." });

  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};


module.exports = { confirmarReserva, cancelarReserva };
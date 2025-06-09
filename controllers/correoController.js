const mailService = require('../services/mailService');

const enviarNotificacion = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Cuerpo recibido:", req.body);

  if (!req.body) {
    return res.status(400).json({ error: "Cuerpo vacío" });
  }

  try {
    const { para, asunto, mensaje } = req.body;

    if (!para || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // ✅ Envío de correo usando el servicio
    await mailService.enviarCorreo({ para, asunto, mensaje });

    res.status(200).json({ mensaje: "Correo enviado correctamente" });
  } catch (err) {
    console.error("Error al procesar:", err.message);
    res.status(500).json({ error: "Error en servidor" });
  }
};

module.exports = { enviarNotificacion };

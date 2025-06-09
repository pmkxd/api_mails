const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarCorreo = async ({ para, asunto, mensaje }) => {
  const opciones = {
    from: `"Aerolínea Reservas" <${process.env.EMAIL_USER}>`,
    to: para,
    subject: asunto,
    html: `<p>${mensaje}</p>`
  };

  await transporter.sendMail(opciones);

  await pool.execute(`
  INSERT INTO AuditoriaCorreo (rut_cliente, id_reserva, correo_destino, asunto, mensaje, tipo_evento)
  VALUES (?, ?, ?, ?, ?, ?)
`, [rutCliente, idReserva, para, asunto, mensaje, tipoEvento]);
};

module.exports = { enviarCorreo };

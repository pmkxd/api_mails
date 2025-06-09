const express = require('express');
const app = express();
require('dotenv').config();
const correoRoutes = require('./routes/correoRoutes');
const reservaController = require('./routes/reservaRoutes');

app.use(express.json());
app.use('/api/notificaciones', correoRoutes);
app.use('/api', reservaController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

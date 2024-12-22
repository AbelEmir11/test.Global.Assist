const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientRoutes = require('./rutas/clientesrutas');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api', clientRoutes);

app.get('/', (req, res) => {
  res.send('servidor corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
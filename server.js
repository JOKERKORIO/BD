const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Reemplaza <TU_URI_DE_MONGODB> con la que te dé MongoDB Atlas
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión", err));

const ItemSchema = new mongoose.Schema({ nombre: String });
const Item = mongoose.model('Item', ItemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item({ nombre: req.body.nombre });
  await newItem.save();
  res.json(newItem);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

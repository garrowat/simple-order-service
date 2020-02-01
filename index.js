const express = require('express');
const { sequelize } = require('./models');
const { inventory, orders } = require('./controllers');

const app = express();
const PORT = process.env.PORT || '3000';

app.use(express.json());

app.post('/inventory', inventory.create);

app.get('/inventory', inventory.readAll);

app.get('/inventory/:id', inventory.readOne);

app.put('/inventory/:id', inventory.update);

app.delete('/inventory/:id', inventory.delete);

app.post('/orders', orders.create);

app.get('/orders', orders.readAll);

app.get('/orders/:id', orders.readOne);

app.put('/orders/:id', orders.update);

app.delete('/orders/:id', orders.delete);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });
});


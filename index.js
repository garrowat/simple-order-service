const express = require('express');
const { inventory, orders } = require('./controllers');

const app = express();

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

module.exports = app;

const express = require('express');
const { inventory, orders } = require('./controllers');

const app = express();
const PORT = process.env.PORT || '3000';

app.post('/inventory', inventory);

app.get('/inventory', inventory);

app.get('/inventory/:id', inventory);

app.put('/inventory/:id', inventory);

app.delete('/inventory/:id', inventory);

app.post('/orders', orders);

app.get('/orders', orders);

app.get('/orders/:id', orders);

app.put('/orders/:id', orders);

app.delete('/orders/:id', orders);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

const express = require('express');

const app = express();
const PORT = process.env.PORT || '3000';

app.post('/inventories', () => {

});

app.get('/inventories', () => {

});

app.get('/inventories/:id', () => {

});

app.put('/inventories/:id', () => {

});

app.delete('/inventories/:id', () => {

});

app.post('/orders', () => {

});

app.get('/orders', () => {

});

app.get('/orders/:id', () => {

});

app.put('/orders/:id', () => {

});

app.delete('/orders/:id', () => {

});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

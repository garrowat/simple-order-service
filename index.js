const express = require('express');
const app = express.app();

const PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

require('dotenv').config();

const app = require('./')
const { sequelize } = require('./models');

const PORT = process.env.PORT || '3000';

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
  });
});

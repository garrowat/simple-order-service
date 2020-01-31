const { models } = require('../models');

module.exports = {
  inventory: {
    create: async (req, res) => {
      const { name, description, price, quantity } = req.body;
      console.log( req.body )
      await models.Inventory.create(
        {
          name,
          description,
          price,
          units_available: quantity,
        },
      ).catch((err) => res.status(500).send('Could not create record'))
      res.status(201).send('Record created');
    },
    readAll: (req, res) => {

    },
    readOne: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
  },

  orders: {
    create: (req, res) => {
      const order = req.body;
    },
    readAll: (req, res) => {

    },
    readOne: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
  },
};

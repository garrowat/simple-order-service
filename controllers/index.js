const { models } = require('../models');

module.exports = {
  inventory: {

    create: async (req, res) => {
      const { name, description, price, quantity } = req.body;
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

    readAll: async (req, res) => {
      const items = await models.Inventory.findAll()
        .catch((err) => res.status(500).send('Could not read Inventory.'));
      res.status(200).send(items);
    },

    readOne: async (req, res) => {
      const { id } = req.params;
      const item = await models.Inventory.findByPk(id).catch((err) => {
        res.status(500).send('Error searching inventory.');
      });
      if (!item) {
        res.status(400).send('Could not find item.')
      } else {
        res.status(200).send(item);
      }
    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    }
  },

  orders: {

    create: async (req, res) => {
      const order = req.body;
    },

    readAll: async (req, res) => {

    },

    readOne: async (req, res) => {

    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    }
  },
};

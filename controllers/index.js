const { models } = require('../models');

const inventory = {
  create: async (req, res) => {
    const { name, description, price, quantity } = req.body;
    await models.Inventory.create(
      {
        name,
        description,
        price,
        units_available: quantity,
      },
    ).catch((err) => res.status(500).send('Could not create record.'))
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
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const original = await models.Inventory.findByPk(id).catch((err) => {
      res.status(500).send('Error searching inventory.');
    });
    if (!original) {
      res.status(400).send('Item does not exist in inventory.');
    } else {
      await models.Inventory.update({
        name,
        description,
        price,
        units_available: quantity,
      }, {
        where: {
          id
        }
      });
      res.status(200).send(original);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const original = await models.Inventory.findByPk(id).catch((err) => {
      res.status(500).send('Error searching inventory.');
    });
    if (!original) {
      res.status(400).send('Item does not exist in inventory.');
    } else {
      await models.Inventory.destroy({
        where: {
          id
        }
      });
      return res.status(200).send(original);
    }
  },
};

const orders = {

  create: async (req, res) => {
    const { email, order_date, status } = req.body;
    let { items } = req.body;

    items.forEach(async item => {
      const stock = await inventory.readOne(req, res);
      if (stock.units_available < item.quantity) {
        res.status(400).send('Not enough stock, order cancelled');
      }
    });

    const order = await models.Order.create(
      {
        email,
        order_date,
        status,
      },
    ).catch((err) => res.status(500).send('Error creating order.'))

    if (order != null) {
      items = items.map(item => {
        const newItem = { ...item };
        newItem.orderId = order.id;
        return newItem;
      });

      const details = await models.OrderDetails.bulkCreate(items)
        .catch((err) => res.status(500).send('Error adding items to order.'));



      res.status(201).send(details);
    }
  },

  readAll: async (req, res) => {

  },

  readOne: async (req, res) => {

  },

  update: async (req, res) => {

  },

  delete: async (req, res) => {

  }
};

module.exports = { inventory, orders };
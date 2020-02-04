const { models } = require('../models');

const inventory = {
  create: async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const item = await models.Inventory.create(
      {
        name,
        description,
        price,
        units_available: quantity,
      },
    ).catch((err) => res.status(500).send(`Could not create record: ${err}`))
    res.status(201).send({ item });
  },

  readAll: async (req, res) => {
    const items = await models.Inventory.findAll()
      .catch((err) => res.status(500).send(`Could not read Inventory: ${err}`));
    res.status(200).send({ items });
  },

  readOne: async (req, res) => {
    const { id } = req.params;
    const item = await models.Inventory.findByPk(id).catch((err) => {
      res.status(500).send(`Error searching inventory: ${err}`);
    });
    if (!item) {
      res.status(400).send([ 'Could not find item.' ])
    } else {
      res.status(200).send({ item });
    }
    return item;
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const original = await models.Inventory.findByPk(id).catch((err) => {
      res.status(500).send(`Error searching inventory: ${err}`);
    });
    if (!original) {
      res.status(400).send('Item does not exist in inventory.');
    } else {
      const item = await models.Inventory.update({
        name,
        description,
        price,
        units_available: quantity,
      }, {
        where: {
          id
        }
      });
      res.status(200).send({ item });
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

  // Non-responding helper methods for use by responding controller methods
  adjustAvailableInventory: async ({ inventoryId, quantity }) => {
    const adjustment = await models.Inventory.increment('units_available', {
      by: quantity,
      where: {
        id: inventoryId,
      },
    }).catch((err) => console.log(err));
    return adjustment;
  },

  getAvailableInventory: async (id) => {
    const item = await models.Inventory.findOne({
      where: {
        id
      },
    }).catch((err) => console.log(err));;
    return item.units_available;
  },

};

const orders = {

  create: async (req, res) => {
    const { email, order_date, status } = req.body;
    let { items } = req.body;

    let inStock = true;
    items.forEach(async item => {
      const id = item.inventoryId;
      const unitsAvailable = await inventory.getAvailableInventory(id)
       .catch((err) => res.status(500).send(`Error getting inventory: ${err}`));
      if (unitsAvailable < item.quantity) {
        if (inStock) res.status(400).send('Not enough stock, order cancelled');
        inStock = false;
      }
    });
    if (!inStock) return;

    const order = await models.Order.create(
      {
        email,
        order_date,
        status,
      },
    ).catch((err) => res.status(500).send(`Error creating order: ${err}`));
    if (order == null) return;

    items = await Promise.all(items.map(async item => {
      const { inventoryId, quantity } = item;
      await inventory.adjustAvailableInventory({ inventoryId, quantity: -quantity })
        .catch((err) => res.status(500).send(`Error adjusting inventory: ${err}`));
      const newItem = { ...item };
      newItem.orderId = order.id;
      return newItem;
    }));

    const details = await models.OrderDetails.bulkCreate(items)
      .catch((err) => res.status(500).send(`Error adding items to order: ${err}`));

    res.status(201).send({ order, details });
  },

  readAll: async (req, res) => {
    const orders = await models.Order.findAll()
      .catch((err) => res.status(500).send(`Error getting orders: ${err}`));
    res.status(200).send({ orders });
  },

  readOne: async (req, res) => {
    const { id } = req.params;
    const order = await models.Order.findByPk(id).catch((err) => {
      res.status(500).send(`Error searching orders: ${err}`);
    });
    if (!order) {
      res.status(400).send('Could not find order.')
    } else {
      const details = await orderDetails.getAllByOrderId(id)
        .catch((err) => res.status(500).send(`Error getting order details: ${err}`));
      res.status(200).send({ order, details });
    }
    return { order, details };
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { email, order_date, status } = req.body;

    if (status === 'cancelled') {
      const details = await orderDetails.getAllByOrderId(id);
      details.forEach(async (orderDetail) => {
        await inventory.adjustAvailableInventory(orderDetail) // if cancelling the order, return to inventory
          .catch((err) => res.status(500).send(`Error adjusting inventory: ${err}`));
      });
    }

    const original = await models.Order.findByPk(id).catch((err) => {
      res.status(500).send(`Error searching inventory: ${err}`);
    });
    if (!original) {
      res.status(400).send('Order does not exist.');
      return;
    } else {
      await models.Order.update({
        email,
        order_date,
        status,
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
    const original = await models.Order.findByPk(id)
      .catch((err) => {res.status(500).send(`Error deleting order: ${err}`);
    });
    if (!original) {
      res.status(400).send('Order does not exist.');
      return;
    } else {
      if (original.status !== 'cancelled') { // if the order isn't already cancelled, return items to inventory
        const details = await orderDetails.getAllByOrderId(id);
        details.forEach(async (orderDetail) => {
          await inventory.adjustAvailableInventory(orderDetail)
            .catch((err) => res.status(500).send(`Error adjusting inventory: ${err}`));
        });
      }
      await models.Order.destroy({
        where: {
          id
        }
      });
      return res.status(200).send(original);
    }
  },
};

const orderDetails = {

  getAllByOrderId: async (orderId) => {
    const allOrderDetails = await models.OrderDetails.findAll({
      where: {
        orderId,
      },
    }).catch((err) => res.status(500).send(`Error getting order details: ${err}`));
    return allOrderDetails;
  },
};

module.exports = { inventory, orders };
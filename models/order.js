const order = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    email: {
      type: DataTypes.STRING,
    },
    order_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  });

  Order.associate = models => {
    Order.hasMany(models.OrderDetails, { onDelete: 'CASCADE' });
  };

  return Order;
};

module.exports = order;

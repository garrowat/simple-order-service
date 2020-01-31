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

  return Order;
};

module.exports = order;

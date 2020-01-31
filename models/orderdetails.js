const orderDetails = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('order_details', {
    order_id: {
      type: DataTypes.INTEGER,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  return OrderDetails;
};

module.exports = orderDetails;

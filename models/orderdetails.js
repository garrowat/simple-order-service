const orderDetails = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('order_details', {
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  OrderDetails.associate = models => {
    OrderDetails.belongsTo(models.Order);
    OrderDetails.belongsTo(models.Inventory);
  };

  return OrderDetails;
};

module.exports = orderDetails;

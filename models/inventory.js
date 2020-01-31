const inventory = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('inventory', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(12,2),
    },
    units_available: {
      type: DataTypes.INTEGER,
    },
  });

  return Inventory;
};


module.exports = inventory;

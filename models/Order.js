const { PAYMENT_PAID, PAYMENT_UNPAID } = require("../config/constants");

module.exports = (Sequelize, DataTypes) => {
  const Order = Sequelize.define(
    "Order",
    {
      status: {
        type: DataTypes.ENUM(PAYMENT_PAID, PAYMENT_UNPAID),
        allowNull: false,
        defaultValue: "UNPAID",
      },
      paymentAmount: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: true,
        },
      },
      oderList: {
        type: DataTypes.STRING,
      },
      datetime: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
    Order.hasOne(models.PayMent, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };
  return Order;
};

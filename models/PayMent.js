const { PAYMENT_PAID, PAYMENT_UNPAID } = require("../config/constants");

module.exports = (Sequelize, DataTypes) => {
  const PayMent = Sequelize.define("PayMent", {
    status: {
      type: DataTypes.ENUM(PAYMENT_PAID, PAYMENT_UNPAID),
      allowNull: false,
      defaultValue: "UNPAID",
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  PayMent.associate = (models) => {
    PayMent.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
  };
  return PayMent;
};

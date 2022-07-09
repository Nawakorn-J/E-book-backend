module.exports = (Sequelize, DataTypes) => {
  const PublishingHouse = Sequelize.define(
    "PublishingHouse",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  PublishingHouse.associate = (models) => {
    PublishingHouse.hasMany(models.Product, {
      foreignKey: {
        name: "publishingHouseId",
        allowNull: false,
      },
    });
  };
  return PublishingHouse;
};

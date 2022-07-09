const { EBOOK_PDF, EBOOK_HTML } = require("../config/constants");

module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.ENUM(EBOOK_PDF, EBOOK_HTML),
        allowNull: false,
        defaultValue: "PDF",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      printLength: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      amount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  Product.associate = (models) => {
    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
    });
    Product.belongsTo(models.PublishingHouse, {
      foreignKey: {
        name: "publishingHouseId",
        allowNull: false,
      },
    });
    Product.hasMany(models.Comment, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
    });
  };
  return Product;
};

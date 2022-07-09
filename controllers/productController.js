const { Product } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
// exports.createProduct = async (req, res, next) => {
//   try {
//     const { productName, category, printLength, price, title } = req.body;

//     if (!productName) {
//       createError("productName  is required", 400);
//     }
//     if (!category) {
//       createError("category  is required", 400);
//     }
//     if (!printLength) {
//       createError("printLength  is required", 400);
//     }
//     if (!price) {
//       createError("price  is required", 400);
//     }
//     const product = await Product.create({
//       productName,
//       category,
//       printLength,
//       price,
//       title,
//     });
//     let image;
//     if (req.file) {
//       const result = await cloudinary.upload(req.file.path);
//       image = result.secure_url;
//     }

//     res.status(201).json({ product });
//   } catch (err) {
//     next(err);
//   }
// };
exports.createProduct = async (req, res, next) => {
  try {
    // console.log(req.file);
    const { productName, category, printLength, price, title } = req.body;
    if (!title && !req.file) {
      createError("title or image is required", 400);
    }
    if (!productName) {
      createError("productName  is required", 400);
    }
    if (!category) {
      createError("category  is required", 400);
    }
    if (!printLength) {
      createError("printLength  is required", 400);
    }
    if (!price) {
      createError("price  is required", 400);
    }
    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
    }
    const product = await Product.create({
      productName,
      category,
      printLength,
      price,
      image,
      title,
      publishingHouseId: 1,
    });
    res.json({ product });
  } catch (err) {
    next(err);
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    // const { productId } = req.params;
    const product = await Product.findAll();
    if (!product) {
      createError("product not found", 400);
    }
    const result = JSON.parse(JSON.stringify(product));

    res.json(result);
  } catch (err) {
    next(err);
  }
};

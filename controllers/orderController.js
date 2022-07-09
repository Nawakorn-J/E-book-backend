const createError = require("../utils/createError");
const { Order, OrderItem } = require("../models");
const { PAYMENT_UNPAID } = require("../config/constants");

exports.createOrders = async (req, res, next) => {
  try {
    const { id } = req.user;
    // const { products, productId, quantity } = req.body;
    console.log("body", req.body.products.products);

    // console.log(id);
    // console.log(productId);
    // console.log(Array.isArray(productId));

    // if (Array.isArray(products)) {
    //   const createdOrder = await Order.create({
    //     userId: id,
    //     status: PAYMENT_UNPAID,
    //   });
    const createdOrder = await Order.create({
      userId: id,
      status: PAYMENT_UNPAID,
    });
    for (const el of req.body.products.products) {
      await OrderItem.create({
        orderId: createdOrder.id,
        productId: el.productId,
        amount: el.amount,
        quantity: el.quantity,
      });
    }

    res.json({ createdOrder });
    // } else {
    //   const createdOrder = await Order.create({
    //     userId: id,
    //     status: PAYMENT_UNPAID,
    //   });
    //   await OrderItem.create({
    //     orderId: createdOrder.id,
    //     productId: productId,
    //     amount: amount,
    //     quantity: quantity,
    //   });
    //   res.json({ createdOrder });
    // }
  } catch (err) {
    next(err);
  }
};

exports.createOrderSinger = async (req, res, next) => {
  try {
    const createdOrder = await Order.create({
      userId: id,
      status: PAYMENT_UNPAID,
    });
    await OrderItem.create({
      orderId: createdOrder.id,
      productId: productId,
      amount: amount,
      quantity: quantity,
    });
    res.json({ createdOrder });
  } catch (err) {
    next(err);
  }
};

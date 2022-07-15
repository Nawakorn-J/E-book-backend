const createError = require("../utils/createError");
const { Order, OrderItem, Product } = require("../models");
const { PAYMENT_UNPAID } = require("../config/constants");

exports.createOrders = async (req, res, next) => {
  try {
    const { id } = req.user;
    // const { products, productId, quantity } = req.body;
    console.log("body", req.body.products.products);

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
exports.getMyOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const order = await Order.findAll({
      where: { userId: id, status: PAYMENT_UNPAID },
      include: [{ model: OrderItem, include: [{ model: Product }] }],
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await OrderItem.findOne({
      where: { id: orderItemId },
    });
    if (!orderItem) {
      createError("order item not found", 404);
    }
    await orderItem.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

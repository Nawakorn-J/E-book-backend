exports.createCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const cartItem = await CartItem.create({
      quantity,
      productId,
      userId: req.user.id,
    });
    res.status(201).json({ cartItem });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { id, productId } = req.params;
    const cartItem = await CartItem.findOne({ where: { id, productId } });
    if (!cartItem) {
      createError("cartItem not found", 400);
    }

    if (cartItem.userId !== req.user.id) {
      createError("you have no permission", 403);
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ cartItem });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const cartItem = await CartItem.findOne({ where: { id, productId } });
    if (!cartItem) {
      createError("cartItem not found", 400);
    }
    if (cartItem.userId !== req.user.id) {
      createError("you have no permission", 403);
    }
    await cartItem.destroy();
    res.status(204).json();
  } catch (err) {
    console.log(err);
  }
};

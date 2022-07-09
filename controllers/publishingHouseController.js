const createError = require("../utils/createError");

exports.createPublishingHouse = async (req, res, next) => {
  try {
    const { name, address, phoneNumber } = req.body;
    if (!name) {
      createError("name is not found", 400);
    }
    if (!address) {
      createError("address is not found", 400);
    }
    if (!phoneNumber) {
      createError("phoneNumber is not found", 400);
    }
    const publishingHouse = await PublishingHouse.create({
      name,
      address,
      phoneNumber,
    });
    res.json({ publishingHouse });
  } catch (err) {
    next(err);
  }
};

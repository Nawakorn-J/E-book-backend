module.exports = (req, res) => {
  res.status(404).json({ message: "resoure not found on this server" });
};

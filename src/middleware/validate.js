const validate = (req, res, next) => {
  const { name, category, quantity, price } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ success: false, message: "Field 'name' wajib diisi dan harus berupa string" });
  }
  if (!category || typeof category !== "string") {
    return res.status(400).json({ success: false, message: "Field 'category' wajib diisi dan harus berupa string" });
  }
  if (quantity === undefined || isNaN(quantity) || parseInt(quantity) < 0) {
    return res.status(400).json({ success: false, message: "Field 'quantity' wajib diisi dan harus berupa angka non-negatif" });
  }
  if (price === undefined || isNaN(price) || parseFloat(price) < 0) {
    return res.status(400).json({ success: false, message: "Field 'price' wajib diisi dan harus berupa angka non-negatif" });
  }

  next();
};

module.exports = validate;

const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const validate = require("../middleware/validate");

// GET /api/items — Ambil semua barang
router.get("/", (req, res) => {
  const items = Item.findAll();
  res.json({
    success: true,
    data: items,
    total: items.length,
  });
});

// GET /api/items/:id — Ambil barang by ID
router.get("/:id", (req, res) => {
  const item = Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: "Barang tidak ditemukan" });
  }
  res.json({ success: true, data: item });
});

// POST /api/items — Tambah barang baru
router.post("/", validate, (req, res) => {
  const newItem = Item.create(req.body);
  res.status(201).json({
    success: true,
    message: "Barang berhasil ditambahkan",
    data: newItem,
  });
});

// PUT /api/items/:id — Update barang
router.put("/:id", validate, (req, res) => {
  const updated = Item.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Barang tidak ditemukan" });
  }
  res.json({
    success: true,
    message: "Barang berhasil diperbarui",
    data: updated,
  });
});

// DELETE /api/items/:id — Hapus barang
router.delete("/:id", (req, res) => {
  const deleted = Item.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Barang tidak ditemukan" });
  }
  res.json({ success: true, message: "Barang berhasil dihapus" });
});

module.exports = router;

const request = require("supertest");
const app = require("../src/app");

describe("Inventory API - Items", () => {
  // GET all items
  describe("GET /api/items", () => {
    it("should return all items with success true", async () => {
      const res = await request(app).get("/api/items");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.total).toBe("number");
    });
  });

  // GET single item
  describe("GET /api/items/:id", () => {
    it("should return item by id", async () => {
      const res = await request(app).get("/api/items/1");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(1);
    });

    it("should return 404 for non-existent id", async () => {
      const res = await request(app).get("/api/items/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // POST create item
  describe("POST /api/items", () => {
    it("should create a new item", async () => {
      const newItem = { name: "Keyboard Mechanical", category: "Aksesori", quantity: 20, price: 750000 };
      const res = await request(app).post("/api/items").send(newItem);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(newItem.name);
    });

    it("should return 400 if name is missing", async () => {
      const res = await request(app).post("/api/items").send({ category: "Test", quantity: 5, price: 1000 });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return 400 if price is negative", async () => {
      const res = await request(app).post("/api/items").send({ name: "X", category: "Y", quantity: 1, price: -100 });
      expect(res.statusCode).toBe(400);
    });
  });

  // PUT update item
  describe("PUT /api/items/:id", () => {
    it("should update an existing item", async () => {
      const res = await request(app)
        .put("/api/items/1")
        .send({ name: "Laptop Updated", category: "Elektronik", quantity: 10, price: 9000000 });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Laptop Updated");
    });

    it("should return 404 for non-existent item", async () => {
      const res = await request(app)
        .put("/api/items/9999")
        .send({ name: "Ghost", category: "X", quantity: 1, price: 100 });
      expect(res.statusCode).toBe(404);
    });
  });

  // DELETE item
  describe("DELETE /api/items/:id", () => {
    it("should delete an item", async () => {
      const res = await request(app).delete("/api/items/2");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 404 if item does not exist", async () => {
      const res = await request(app).delete("/api/items/9999");
      expect(res.statusCode).toBe(404);
    });
  });
});

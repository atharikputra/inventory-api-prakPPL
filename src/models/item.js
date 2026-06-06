let items = [
  { id: 1, name: "Laptop Asus VivoBook", category: "Elektronik", quantity: 15, price: 8500000, createdAt: new Date().toISOString() },
  { id: 2, name: "Mouse Logitech M235", category: "Aksesori", quantity: 40, price: 150000, createdAt: new Date().toISOString() },
  { id: 3, name: "Kursi Ergonomis", category: "Furnitur", quantity: 8, price: 2300000, createdAt: new Date().toISOString() },
];

let nextId = 4;

const ItemModel = {
  findAll: () => [...items],

  findById: (id) => items.find((i) => i.id === parseInt(id)),

  create: ({ name, category, quantity, price }) => {
    const newItem = {
      id: nextId++,
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    return newItem;
  },

  update: (id, data) => {
    const index = items.findIndex((i) => i.id === parseInt(id));
    if (index === -1) return null;
    items[index] = { ...items[index], ...data, id: parseInt(id) };
    return items[index];
  },

  delete: (id) => {
    const index = items.findIndex((i) => i.id === parseInt(id));
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  },
};

module.exports = ItemModel;

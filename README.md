# 📦 Inventory API

> RESTful API Manajemen Inventori Barang — dibangun dengan Node.js + Express, dikontainerisasi dengan Docker, dan diotomatisasi via GitHub Actions.

![CI Status](https://github.com/YOUR_USERNAME/inventory-api/actions/workflows/ci.yml/badge.svg)
![CS Status](https://github.com/YOUR_USERNAME/inventory-api/actions/workflows/cs.yml/badge.svg)

---

## 1. Deskripsi Project

**Inventory API** adalah RESTful API sederhana untuk mengelola data inventori barang. API ini memungkinkan pengguna melakukan operasi CRUD (Create, Read, Update, Delete) terhadap data barang, mencakup informasi seperti nama, kategori, jumlah stok, dan harga satuan.

API ini dibangun menggunakan:
- **Runtime**: Node.js 20 + Express.js
- **Containerization**: Docker + Docker Compose
- **Testing**: Jest + Supertest
- **CI/CD**: GitHub Actions (Unit Testing & Security Scan)

---

## 2. Dokumentasi API

**Base URL**: `http://localhost:3000`

### Endpoint List

| Method | Endpoint         | Deskripsi                   |
|--------|------------------|-----------------------------|
| GET    | `/`              | Health check API            |
| GET    | `/api/items`     | Ambil semua data barang     |
| GET    | `/api/items/:id` | Ambil barang berdasarkan ID |
| POST   | `/api/items`     | Tambah barang baru          |
| PUT    | `/api/items/:id` | Perbarui data barang        |
| DELETE | `/api/items/:id` | Hapus barang                |

### Request Body (POST / PUT)

```json
{
  "name": "Laptop Asus VivoBook",
  "category": "Elektronik",
  "quantity": 15,
  "price": 8500000
}
```

### Format Response

#### ✅ Success — GET /api/items

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop Asus VivoBook",
      "category": "Elektronik",
      "quantity": 15,
      "price": 8500000,
      "createdAt": "2025-06-03T08:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### ✅ Success — POST /api/items (201 Created)

```json
{
  "success": true,
  "message": "Barang berhasil ditambahkan",
  "data": {
    "id": 4,
    "name": "Keyboard Mechanical",
    "category": "Aksesori",
    "quantity": 20,
    "price": 750000,
    "createdAt": "2025-06-03T09:00:00.000Z"
  }
}
```

#### ✅ Success — DELETE /api/items/:id

```json
{
  "success": true,
  "message": "Barang berhasil dihapus"
}
```

#### ❌ Error — 404 Not Found

```json
{
  "success": false,
  "message": "Barang tidak ditemukan"
}
```

#### ❌ Error — 400 Bad Request (Validasi Gagal)

```json
{
  "success": false,
  "message": "Field 'name' wajib diisi dan harus berupa string"
}
```

---

## 3. Panduan Instalasi (Docker)

### Prasyarat

- [Docker](https://www.docker.com/) v24+
- [Docker Compose](https://docs.docker.com/compose/) v2+

### Langkah Menjalankan Aplikasi

**1. Clone repository**

```bash
git clone https://github.com/YOUR_USERNAME/inventory-api.git
cd inventory-api
```

**2. Build dan jalankan container**

```bash
docker-compose up --build
```

**3. Cek apakah API berjalan**

```bash
curl http://localhost:3000/
# Expected: {"status":"ok","message":"Inventory API is running 🚀"}
```

**4. Hentikan container**

```bash
docker-compose down
```

### Informasi Port

| Port (Host) | Port (Container) | Keterangan        |
|-------------|------------------|-------------------|
| `3000`      | `3000`           | HTTP API server   |

> Port host dapat diubah di `docker-compose.yml` pada bagian `ports: - "HOST:3000"`.

---

## 4. Alur Kerja Git

### Branch Strategy — Feature Branch Flow

```
main
 └── develop
      ├── feature/add-items-endpoint
      ├── feature/add-docker-setup
      └── feature/add-github-actions
```

| Branch       | Fungsi                                         |
|--------------|------------------------------------------------|
| `main`       | Branch produksi — hanya menerima PR dari develop |
| `develop`    | Branch integrasi — semua fitur di-merge ke sini  |
| `feature/**` | Branch untuk pengembangan fitur individual       |

### Conventional Commits

Format commit yang digunakan:

```
<type>(<scope>): <deskripsi singkat>
```

Contoh commit dalam project ini:

```
feat(api): add GET /api/items endpoint
feat(api): add POST /api/items with validation middleware
feat(docker): add Dockerfile and docker-compose configuration
feat(ci): add GitHub Actions workflow for unit testing
fix(middleware): fix price validation for zero value
test(items): add unit tests for CRUD operations
docs(readme): add installation and API documentation
chore(deps): add express and jest dependencies
```

| Prefix   | Digunakan untuk                              |
|----------|----------------------------------------------|
| `feat`   | Penambahan fitur baru                        |
| `fix`    | Perbaikan bug                                |
| `test`   | Menambah atau memperbaiki test               |
| `docs`   | Perubahan dokumentasi                        |
| `chore`  | Pembaruan dependencies, konfigurasi, dll     |
| `refactor` | Refactoring kode tanpa perubahan fungsional |

---

## 5. Status Automasi (GitHub Actions)

### Workflow yang Digunakan

#### 🧪 CI — Unit Testing (`ci.yml`)

**Trigger**: Setiap `push` atau `pull_request` ke branch `main`, `develop`, atau `feature/**`.

**Steps yang dijalankan:**
1. Checkout repository
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Run unit tests dengan coverage (`npm test`)
5. Upload coverage report sebagai artifact

**Tujuan**: Memastikan semua endpoint API lolos pengujian sebelum kode di-merge.

```yaml
# Trigger otomatis pada push ke semua branch aktif
on:
  push:
    branches: [main, develop, "feature/**"]
```

#### 🔒 CS — Security Scan (`cs.yml`)

**Trigger**: Setiap `push` ke `main`/`develop`, setiap PR ke `main`, dan terjadwal setiap Senin pukul 00:00 UTC.

**Steps yang dijalankan:**
1. Checkout repository
2. `npm audit` — cek vulnerabilitas dependency
3. Snyk scan — analisis keamanan mendalam (memerlukan `SNYK_TOKEN` di repository secrets)
4. Trivy scan — scan filesystem dan Dockerfile dari kerentanan HIGH/CRITICAL

**Tujuan**: Mendeteksi celah keamanan pada dependency dan konfigurasi container secara otomatis.

### Badge Status

> Ganti `YOUR_USERNAME` dengan username GitHub kamu.

```markdown
![CI Status](https://github.com/YOUR_USERNAME/inventory-api/actions/workflows/ci.yml/badge.svg)
![CS Status](https://github.com/YOUR_USERNAME/inventory-api/actions/workflows/cs.yml/badge.svg)
```

---

## Struktur Project

```
inventory-api/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Workflow Unit Testing
│       └── cs.yml          # Workflow Security Scan
├── src/
│   ├── middleware/
│   │   └── validate.js     # Input validation middleware
│   ├── models/
│   │   └── item.js         # In-memory data store
│   ├── routes/
│   │   └── items.js        # CRUD route handlers
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
├── tests/
│   └── items.test.js       # Unit tests (Jest + Supertest)
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---


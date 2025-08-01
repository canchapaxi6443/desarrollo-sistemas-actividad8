# Actividad #8: Gestión de Inventarios Fullstack

**Repositorio monolítico** con dos carpetas principales:

- **backend/**: API RESTful con Node.js, Express y SQLite.
- **frontend/**: Aplicación React + Material-UI en TypeScript.

Este proyecto implementa un sistema completo de gestión de inventario que cumple con los requisitos de la Actividad #8 de la Unidad 4 de la asignatura: CRUD de productos, autenticación de usuarios, control de stock, reportes y exportación.

---

## 📂 Estructura de directorios

```
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── seed.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── products-controller.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── route.ts
│   │   ├── data/
│   │   │   └── database.sqlite
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── layout/
    │   │   └── DashboardLayout.tsx
    │   ├── pages/
    │   │   ├── DashboardPage.tsx
    │   │   ├── DashboardPage.css
    │   │   ├── LoginPage.tsx
    │   │   ├── ProductFormPage.tsx
    │   │   ├── ProductsPage.tsx
    │   │   └── ReportPage.tsx
    │   ├── theme/
    │   │   └── AppTheme.tsx
    │   ├── App.tsx
    │   ├── AppContent.tsx
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## 🚀 Tecnologías

**Backend**:

- Node.js & TypeScript
- Express
- SQLite (sqlite3 + sqlite)
- dotenv
- Axios (para pruebas manuales)

**Frontend**:

- React 18 + TypeScript
- React Router v6
- Material-UI (MUI)
- Axios
- html2canvas, jsPDF (exportar PDF)
- xlsx, file-saver (exportar Excel/CSV)

---

## 🔧 Prerrequisitos

- Node.js ≥ 16.x / npm
- Git

---

## ⚙️ Configuración del Backend

1. Entra a la carpeta **backend/**:
   ```bash
   cd backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Copia el archivo `.env.example` a `.env` y ajusta variables:
   ```env
   PORT=3333
   ```
4. Inicializa y popula la base de datos:
   ```bash
   npx ts-node src/seed.ts
   ```
5. Arranca el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

El backend quedará escuchando en `http://localhost:3333`.

---

## 🏃‍♂️ Configuración del Frontend

1. Entra a la carpeta **frontend/**:
   ```bash
   cd frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz de **frontend/** con:
   ```env
   VITE_API_URL=http://localhost:3333
   ```
4. Inicia la aplicación de desarrollo (Vite):
   ```bash
   npm run dev
   ```

El frontend quedará disponible en `http://localhost:5173` (o el puerto que indique Vite).

---

## 📋 Funcionalidades

- **CRUD de Productos**: crear, listar, ver, actualizar y eliminar.
- **Autenticación**: login con usuario fijo (`admin` / `admin`) y protección de rutas.
- **Control de Stock**: campo `stock` y dashboard con conteo.
- **Reportes**: tabla de inventario con valor total (`stock × price`).
- **Exportación**: descarga de reportes en JSON, CSV, Excel y PDF.
- **Responsive Design**: tablas con scroll en desktop y tarjetas en móvil.

---

## 📑 Uso

1. Accede a `http://localhost:5173/login` y usa las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin`
2. Tras autenticar, podrás navegar al dashboard, productos y reportes.
3. En la sección **Report** encontrarás los botones para exportar el reporte.

---

## 📝 Contribuir

Se aceptan correcciones y mejoras vía pull requests. Por favor, mantén la misma estructura y estilo de código.

---

## 📄 Licencia

Este proyecto se entrega como parte de la Actividad #8 de la Unidad 4, sin licencia comercial.


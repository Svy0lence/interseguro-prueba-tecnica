# API de Operaciones con Matrices

API REST desarrollada con Node.js y TypeScript para realizar operaciones con matrices y cálculos estadísticos.

## 🚀 Tecnologías

- Node.js
- TypeScript
- Express
- MongoDB
- Docker
- JWT para autenticación
- MathJS para operaciones matemáticas
- Class Validator para validación de datos

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- Docker y Docker Compose
- MongoDB (si se ejecuta localmente sin Docker)

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd matrix-operations-api
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3001
JWT_SECRET=tu_secreto_jwt
MONGODB_URI=mongodb://localhost:27017/matrix_operations
```

## 🐳 Ejecución con Docker

1. Construir y levantar los contenedores:
```bash
docker-compose up --build
```

2. Para ejecutar en segundo plano:
```bash
docker-compose up -d
```

3. Para detener los contenedores:
```bash
docker-compose down
```

## 🏗️ Estructura del Proyecto

```
src/
├── config/         # Configuraciones (MongoDB, etc.)
├── controllers/    # Controladores de la API
├── dtos/          # Data Transfer Objects
├── middlewares/    # Middlewares (auth, validación, etc.)
├── models/         # Modelos de MongoDB
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
├── types/          # Definiciones de tipos TypeScript
├── validators/     # Validadores de datos
└── index.ts        # Punto de entrada de la aplicación
```

## 📦 Scripts Disponibles

- `npm run build`: Compila el proyecto TypeScript
- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con hot-reload
- `npm test`: Ejecuta las pruebas con Jest

## 🛠️ Dependencias Principales

- `express`: Framework web
- `mongoose`: ODM para MongoDB
- `mathjs`: Biblioteca para operaciones matemáticas
- `class-validator`: Validación de datos
- `class-transformer`: Transformación de objetos
- `jsonwebtoken`: Manejo de JWT
- `bcryptjs`: Encriptación de contraseñas
- `cors`: Middleware para CORS
- `dotenv`: Manejo de variables de entorno

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a rutas protegidas:

1. Obtener token mediante login
2. Incluir el token en el header de las peticiones:
```
Authorization: Bearer <tu_token>
```

## 📝 API Endpoints

### Autenticación
- POST `/auth/register` - Registro de nuevos usuarios
- POST `/auth/login` - Inicio de sesión y obtención de token JWT

### Operaciones con Matrices
- POST `/matrix/qr` - Realiza la factorización QR de una matriz
  - Requiere: Matriz en formato MatrixDto
  - Retorna: Matrices Q y R resultantes de la factorización

### Estadísticas
- POST `/stats/calculate` - Calcula estadísticas sobre un conjunto de datos
  - Requiere: Datos en formato StatsDto
  - Retorna: Resultados de los cálculos estadísticos

## 📚 Documentación Adicional



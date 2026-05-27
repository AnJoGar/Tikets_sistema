# 🔧 Backend - Plataforma de Gestión de Tickets

Backend desarrollado con **Node.js + Express + TypeScript + Prisma + PostgreSQL**.

## 📋 Requisitos Previos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del backend:

```env
DATABASE_URL="postgresql://postgres:mbappe2019@localhost:5432/sistemas_tickets"
NODE_ENV="development"
PORT=3000
JWT_SECRET="your_super_secret_jwt_key_change_in_production_12345"
JWT_EXPIRES_IN="7d"
```

**Cambiar credenciales según tu configuración de PostgreSQL.**

### 3. Crear la base de datos

```bash
# En PostgreSQL
psql -U postgres
CREATE DATABASE sistemas_tickets;
\q
```

### 4. Ejecutar migraciones

```bash
npm run prisma:migrate
```

Este comando:
- ✅ Crea todas las tablas
- ✅ Genera Prisma Client
- ✅ Crea el historial de migraciones

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm run build
npm start
```

Debería mostrar:
```
✅ Servidor corriendo en puerto 3000
✅ BD conectada
```

---

## 📚 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecutar en desarrollo con hot reload |
| `npm run build` | Compilar TypeScript a JavaScript |
| `npm start` | Ejecutar versión compilada |
| `npm test` | Ejecutar tests unitarios |
| `npm run test:coverage` | Tests con coverage report |
| `npm run test:watch` | Tests en modo watch |
| `npm run prisma:migrate` | Crear/aplicar migraciones |
| `npm run prisma:studio` | Abrir Prisma Studio (GUI) |
| `npm run lint` | Ejecutar ESLint |

---

## 🗄️ Base de Datos

### Modelos Prisma (8 total)

1. **Profile** - Roles del sistema (ADMIN, SOPORTE, CLIENTE)
2. **Module** - Módulos de la aplicación
3. **Option** - Opciones/menús dentro de módulos
4. **ProfileOption** - Control de accesos (M:M)
5. **User** - Usuarios del sistema
6. **Ticket** - Incidencias/Tickets
7. **Comment** - Comentarios en tickets
8. **Assignment** - Asignaciones de tickets

### Enums

- `TicketStatus`: OPEN, IN_PROGRESS, RESOLVED, REJECTED
- `TicketPriority`: LOW, MEDIUM, HIGH

Ver `prisma/schema.prisma` para detalles completos.

---

## 🔐 Autenticación

### JWT

- **Secret Key**: Definida en `.env` (JWT_SECRET)
- **Expiration**: 7 días (configurable en JWT_EXPIRES_IN)
- **Algorithm**: HS256

### Endpoints de Autenticación

```
POST /api/auth/register
{
  "name": "Juan García",
  "email": "juan@example.com",
  "password": "Password123",
  "profileId": "profile_id_aqui"
}

POST /api/auth/login
{
  "email": "juan@example.com",
  "password": "Password123"
}
```

Retorna:
```json
{
  "status": "success",
  "data": {
    "user": { id, name, email, profileId },
    "token": "jwt_token_aqui"
  }
}
```

---

## 📡 Endpoints Disponibles

### Autenticación (3 endpoints)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| POST | `/api/auth/login` | Login | ❌ |

### Tickets (6 endpoints)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/tickets` | Listar tickets | ✅ |
| GET | `/api/tickets/:id` | Obtener ticket | ✅ |
| POST | `/api/tickets` | Crear ticket | ✅ |
| PATCH | `/api/tickets/:id/status` | Cambiar estado | ✅ |
| PATCH | `/api/tickets/:id/assign` | Asignar ticket | ✅ |
| POST | `/api/tickets/:id/comments` | Agregar comentario | ✅ |

### Usuarios (5 endpoints)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/users` | Listar usuarios | ✅ |
| GET | `/api/users/:id` | Obtener usuario | ✅ |
| POST | `/api/users` | Crear usuario | ✅ |
| PUT | `/api/users/:id` | Actualizar usuario | ✅ |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ |

### Perfiles (5 endpoints)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/profiles` | Listar perfiles | ✅ |
| GET | `/api/profiles/:id` | Obtener perfil | ✅ |
| POST | `/api/profiles` | Crear perfil | ✅ |
| PUT | `/api/profiles/:id` | Actualizar perfil | ✅ |
| DELETE | `/api/profiles/:id` | Eliminar perfil | ✅ |

**Total: 19 endpoints**

---

## 🧪 Testing

### Tests Unitarios

```bash
npm test
```

Tests incluyen:
- JWT utilities (generateToken, verifyToken, extractToken)
- Password utilities (hashPassword, comparePassword, validatePasswordStrength)
- Validators (email, ticket status, priority, names)

### Tests de Integración

```bash
npm test -- --testPathPattern=integration
```

Tests para:
- Auth endpoints (register, login)
- Ticket endpoints (CRUD, status changes)
- User endpoints (CRUD)

### Coverage Report

```bash
npm run test:coverage
```

**Requisito: 80%+ coverage**

---

## 🏗️ Estructura del Proyecto

```
backend/
├── src/
│   ├── app.ts                 # Configuración Express
│   ├── server.ts              # Entrada principal
│   ├── controllers/           # Lógica de endpoints
│   │   ├── auth.controller.ts
│   │   ├── ticket.controller.ts
│   │   ├── user.controller.ts
│   │   └── profile.controller.ts
│   ├── services/              # Lógica de negocio
│   │   ├── auth.service.ts
│   │   ├── ticket.service.ts
│   │   ├── user.service.ts
│   │   └── profile.service.ts
│   ├── routes/                # Definición de rutas
│   │   ├── auth.routes.ts
│   │   ├── ticket.routes.ts
│   │   ├── user.routes.ts
│   │   └── profile.routes.ts
│   ├── middleware/            # Middlewares custom
│   │   └── auth.middleware.ts
│   ├── utils/                 # Funciones auxiliares
│   │   ├── errors.ts
│   │   ├── jwt.utils.ts
│   │   ├── password.utils.ts
│   │   └── validators.ts
│   ├── types/                 # Tipos TypeScript
│   │   └── api.types.ts
│   └── prisma/                # Cliente Prisma
│       └── client.ts
├── prisma/
│   ├── schema.prisma          # Esquema de BD
│   └── migrations/            # Historial de migraciones
├── tests/
│   ├── unit/                  # Tests unitarios
│   └── integration/           # Tests de integración
├── package.json
├── tsconfig.json
├── jest.config.js
├── .env
└── README.md
```

---

## 🛠️ Desarrollo

### Agregar un nuevo endpoint

1. **Crear servicio** en `src/services/`
2. **Crear controlador** en `src/controllers/`
3. **Crear rutas** en `src/routes/`
4. **Importar en app.ts**: `app.use('/api/ruta', rutasImportadas)`
5. **Escribir tests** en `tests/`
6. **Verificar coverage**: `npm run test:coverage`

### Cambiar la BD

Editar `.env` → `DATABASE_URL` y ejecutar:

```bash
npm run prisma:migrate
```

### Prisma Studio (GUI para BD)

```bash
npm run prisma:studio
```

Se abrirá en `http://localhost:5555`

---

## 🔧 Troubleshooting

### Error: "Cannot connect to PostgreSQL"

- Verifica que PostgreSQL está corriendo
- Verifica `DATABASE_URL` en `.env`
- Verifica que la BD existe: `psql -l`

### Error: "PORT 3000 already in use"

```bash
# Cambiar puerto en .env
PORT=3001

# O matar el proceso
lsof -i :3000
kill -9 <PID>
```

### Error: "Migration failed"

```bash
# Resetear BD (cuidado: borra datos)
npx prisma migrate reset

# O eliminar migration y reintentar
rm -r prisma/migrations/<nombre>
npm run prisma:migrate
```

---

## 📖 Documentación

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [JWT.io](https://jwt.io/)

---

## 👥 Equipo

Desarrollo guiado por IA mediante prompts específicos.

**Status:** ✅ Producción (BACKEND_001 a BACKEND_007 completados)

---

## 📝 Licencia

MIT

---

**Última actualización:** 2026-05-27  
**Versión:** 1.0.0
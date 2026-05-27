# BACKEND_001: Setup Node.js + TypeScript + Prisma + PostgreSQL

## 📋 Objetivo
Configurar proyecto Node.js con TypeScript, Express, Prisma y PostgreSQL para una plataforma de gestión de tickets.

## 🎯 Requisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn
- Credenciales PostgreSQL: usuario `postgres`, contraseña `mbappe2019`, puerto 5432

## 📝 Prompt Exacto Enviado

```
Crea un proyecto Node.js con Express, TypeScript y Prisma para una 
plataforma de gestión de tickets. Incluye:

1. package.json con:
   - Express
   - TypeScript
   - ts-node-dev
   - jsonwebtoken@^9.0.2
   - bcrypt
   - Prisma
   - Jest para testing

2. tsconfig.json con strict mode y ES2020

3. jest.config.js con ts-jest preset

4. .env con credenciales PostgreSQL:
   - DATABASE_URL="postgresql://postgres:mbappe2019@localhost:5432/sistemas_tickets"
   - PORT=3000
   - JWT_SECRET y JWT_EXPIRES_IN

5. Estructura de carpetas:
   src/
   ├── app.ts
   ├── server.ts
   ├── controllers/
   ├── services/
   ├── routes/
   ├── middleware/
   ├── utils/
   ├── types/
   └── prisma/

No crear BD aún, solo estructura del proyecto.
```

## ✅ Entregables

### Archivos Creados
- `package.json` - Dependencias del proyecto
- `tsconfig.json` - Configuración TypeScript (strict mode)
- `jest.config.js` - Configuración Jest con ts-jest
- `.env` - Variables de entorno
- `.gitignore` - Archivos a ignorar
- `README.md` - Instrucciones de setup

### Dependencias Instaladas
```
npm install express typescript ts-node-dev @types/express 
npm install jsonwebtoken@^9.0.2 bcrypt prisma @prisma/client
npm install --save-dev @types/node typescript jest ts-jest @types/jest
```

### Cambios Realizados
- Estructura de carpetas creada
- Scripts de desarrollo configurados
- `npm run dev` → ts-node-dev con hot reload
- `npm test` → Jest
- `npm run build` → TypeScript a JavaScript

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: jsonwebtoken version
- **Error**: `jsonwebtoken@^9.1.2` no existe
- **Solución**: Cambiar a `^9.0.2` (versión estable)

### Problema 2: npm install warnings
- **Aviso**: Deprecation warnings son normales
- **Solución**: Ignorar, funcionan correctamente

### Problema 3: TypeScript strict mode
- **Issue**: Muchos errores de tipos en principio
- **Solución**: Necesario para calidad del código, se resuelven en próximos pasos

## 🚀 Próximos Pasos
- BACKEND_002: Crear schema.prisma con 8 modelos
- Ejecutar migraciones Prisma
- Crear BD en PostgreSQL

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~15 minutos  
Archivos: 7  
Configuración: 100%
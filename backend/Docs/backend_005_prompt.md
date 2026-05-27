cat > /mnt/user-data/outputs/backend_005_prompt.md << 'EOF'
# BACKEND_005: CRUD Users + Profiles

## 📋 Objetivo
Implementar CRUD completo de Users y Profiles con validaciones y control de acceso.

## 🎯 Componentes a Crear
1. UserService - CRUD de usuarios
2. ProfileService - CRUD de perfiles
3. UserController - Endpoints GET/POST/PUT/DELETE
4. ProfileController - Endpoints GET/POST/PUT/DELETE
5. user.routes.ts - Rutas de usuarios
6. profile.routes.ts - Rutas de perfiles

## 📝 Prompt Exacto Enviado

```
Crea el CRUD completo de Users y Profiles:

1. src/services/user.service.ts:
   - getAllUsers(filters?): Promise<User[]>
   - getUserById(id: string): Promise<User>
   - createUser(data: { name, email, password, profileId }): Promise<User>
   - updateUser(id: string, data: Partial<User>): Promise<User>
   - deleteUser(id: string): Promise<User>
   - getUserByEmail(email: string): Promise<User | null>

2. src/services/profile.service.ts:
   - getAllProfiles(): Promise<Profile[]>
   - getProfileById(id: string): Promise<Profile>
   - createProfile(data: { name, description }): Promise<Profile>
   - updateProfile(id: string, data: Partial<Profile>): Promise<Profile>
   - deleteProfile(id: string): Promise<Profile>
   - getDefaultProfiles(): ADMIN, SOPORTE, CLIENTE

3. src/controllers/user.controller.ts:
   - GET /api/users (solo ADMIN)
   - GET /api/users/:id (usuario mismo o ADMIN)
   - POST /api/users (solo ADMIN)
   - PUT /api/users/:id (usuario mismo o ADMIN)
   - DELETE /api/users/:id (solo ADMIN)

4. src/controllers/profile.controller.ts:
   - GET /api/profiles (sin auth para registro)
   - GET /api/profiles/:id (sin auth)
   - POST /api/profiles (sin auth setup temporal)
   - PUT /api/profiles/:id (solo ADMIN)
   - DELETE /api/profiles/:id (solo ADMIN)

5. Validaciones:
   - Email único y válido
   - Nombre: 3-100 caracteres
   - Perfiles por defecto: ADMIN, SOPORTE, CLIENTE (no eliminar)
   - No permitir duplicar perfiles por defecto

6. src/routes/user.routes.ts:
   - Todas protegidas con authenticateToken
   - Validar roles en authorize middleware

7. src/routes/profile.routes.ts:
   - GET/POST sin autenticación
   - PUT/DELETE con autenticación (solo ADMIN)

Usar error handling, validadores, timestamps, soft delete si aplica.
```

## ✅ Entregables

### Archivos Creados
- `src/services/user.service.ts` - Servicio de usuarios
- `src/services/profile.service.ts` - Servicio de perfiles
- `src/controllers/user.controller.ts` - Controlador
- `src/controllers/profile.controller.ts` - Controlador
- `src/routes/user.routes.ts` - Rutas
- `src/routes/profile.routes.ts` - Rutas

### Endpoints Creados (10 total)
```
# Users (5 endpoints)
GET    /api/users                (solo ADMIN)
GET    /api/users/:id            (usuario o ADMIN)
POST   /api/users                (solo ADMIN)
PUT    /api/users/:id            (usuario o ADMIN)
DELETE /api/users/:id            (solo ADMIN)

# Profiles (5 endpoints)
GET    /api/profiles             (sin auth)
GET    /api/profiles/:id         (sin auth)
POST   /api/profiles             (sin auth temporal)
PUT    /api/profiles/:id         (solo ADMIN)
DELETE /api/profiles/:id         (solo ADMIN)
```

### Características
- Control de acceso granular
- Perfiles protegidos por defecto
- Email único validado
- Relaciones con tickets
- Soft delete opcional
- Timestamps automáticos

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Email no único
- **Error**: "Duplicate key value violates unique constraint"
- **Solución**: Agregar UNIQUE constraint en schema.prisma
- **Fix**: `email String @unique`

### Problema 2: No poder eliminar perfiles por defecto
- **Error**: "Cannot delete default profiles"
- **Solución**: Verificar name en (ADMIN, SOPORTE, CLIENTE) y retornar error

### Problema 3: Contraseña visible en respuesta
- **Error**: "Password leaking in GET /api/users"
- **Solución**: `.select({ password: false })` o `.omit({ password: true })`

### Problema 4: Autoría de actualización
- **Error**: "User updated other user's password"
- **Solución**: Verificar userId === req.user.id || role === ADMIN

## 🚀 Próximos Pasos
- BACKEND_006: Tests unitarios (JWT, password, validators)
- BACKEND_007: Tests de integración (auth, tickets, users)
- Documentación completa

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~35 minutos  
Archivos: 6  
Endpoints: 10  
Líneas de código: ~700
EOF
cat /mnt/user-data/outputs/backend_005_prompt.md
Salida

# BACKEND_005: CRUD Users + Profiles

## 📋 Objetivo
Implementar CRUD completo de Users y Profiles con validaciones y control de acceso.

## 🎯 Componentes a Crear
1. UserService - CRUD de usuarios
2. ProfileService - CRUD de perfiles
3. UserController - Endpoints GET/POST/PUT/DELETE
4. ProfileController - Endpoints GET/POST/PUT/DELETE
5. user.routes.ts - Rutas de usuarios
6. profile.routes.ts - Rutas de perfiles

## 📝 Prompt Exacto Enviado

```
Crea el CRUD completo de Users y Profiles:

1. src/services/user.service.ts:
   - getAllUsers(filters?): Promise<User[]>
   - getUserById(id: string): Promise<User>
   - createUser(data: { name, email, password, profileId }): Promise<User>
   - updateUser(id: string, data: Partial<User>): Promise<User>
   - deleteUser(id: string): Promise<User>
   - getUserByEmail(email: string): Promise<User | null>

2. src/services/profile.service.ts:
   - getAllProfiles(): Promise<Profile[]>
   - getProfileById(id: string): Promise<Profile>
   - createProfile(data: { name, description }): Promise<Profile>
   - updateProfile(id: string, data: Partial<Profile>): Promise<Profile>
   - deleteProfile(id: string): Promise<Profile>
   - getDefaultProfiles(): ADMIN, SOPORTE, CLIENTE

3. src/controllers/user.controller.ts:
   - GET /api/users (solo ADMIN)
   - GET /api/users/:id (usuario mismo o ADMIN)
   - POST /api/users (solo ADMIN)
   - PUT /api/users/:id (usuario mismo o ADMIN)
   - DELETE /api/users/:id (solo ADMIN)

4. src/controllers/profile.controller.ts:
   - GET /api/profiles (sin auth para registro)
   - GET /api/profiles/:id (sin auth)
   - POST /api/profiles (sin auth setup temporal)
   - PUT /api/profiles/:id (solo ADMIN)
   - DELETE /api/profiles/:id (solo ADMIN)

5. Validaciones:
   - Email único y válido
   - Nombre: 3-100 caracteres
   - Perfiles por defecto: ADMIN, SOPORTE, CLIENTE (no eliminar)
   - No permitir duplicar perfiles por defecto

6. src/routes/user.routes.ts:
   - Todas protegidas con authenticateToken
   - Validar roles en authorize middleware

7. src/routes/profile.routes.ts:
   - GET/POST sin autenticación
   - PUT/DELETE con autenticación (solo ADMIN)

Usar error handling, validadores, timestamps, soft delete si aplica.
```

## ✅ Entregables

### Archivos Creados
- `src/services/user.service.ts` - Servicio de usuarios
- `src/services/profile.service.ts` - Servicio de perfiles
- `src/controllers/user.controller.ts` - Controlador
- `src/controllers/profile.controller.ts` - Controlador
- `src/routes/user.routes.ts` - Rutas
- `src/routes/profile.routes.ts` - Rutas

### Endpoints Creados (10 total)
```
# Users (5 endpoints)
GET    /api/users                (solo ADMIN)
GET    /api/users/:id            (usuario o ADMIN)
POST   /api/users                (solo ADMIN)
PUT    /api/users/:id            (usuario o ADMIN)
DELETE /api/users/:id            (solo ADMIN)

# Profiles (5 endpoints)
GET    /api/profiles             (sin auth)
GET    /api/profiles/:id         (sin auth)
POST   /api/profiles             (sin auth temporal)
PUT    /api/profiles/:id         (solo ADMIN)
DELETE /api/profiles/:id         (solo ADMIN)
```

### Características
- Control de acceso granular
- Perfiles protegidos por defecto
- Email único validado
- Relaciones con tickets
- Soft delete opcional
- Timestamps automáticos

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Email no único
- **Error**: "Duplicate key value violates unique constraint"
- **Solución**: Agregar UNIQUE constraint en schema.prisma
- **Fix**: `email String @unique`

### Problema 2: No poder eliminar perfiles por defecto
- **Error**: "Cannot delete default profiles"
- **Solución**: Verificar name en (ADMIN, SOPORTE, CLIENTE) y retornar error

### Problema 3: Contraseña visible en respuesta
- **Error**: "Password leaking in GET /api/users"
- **Solución**: `.select({ password: false })` o `.omit({ password: true })`

### Problema 4: Autoría de actualización
- **Error**: "User updated other user's password"
- **Solución**: Verificar userId === req.user.id || role === ADMIN

## 🚀 Próximos Pasos
- BACKEND_006: Tests unitarios (JWT, password, validators)
- BACKEND_007: Tests de integración (auth, tickets, users)
- Documentación completa

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~35 minutos  
Archivos: 6  
Endpoints: 10  
Líneas de código: ~700
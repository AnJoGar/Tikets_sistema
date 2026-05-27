cat > /mnt/user-data/outputs/frontend_001_prompt.md << 'EOF'
# FRONTEND_001: Setup Angular 21 Standalone

## 📋 Objetivo
Configurar proyecto Angular 21 con componentes standalone, servicios y modelos TypeScript para comunicación con backend.

## 🎯 Componentes a Crear
1. Modelos TypeScript (auth, ticket, profile)
2. Servicios (API, Auth, Ticket, Profile)
3. Configuración Angular (routes, config)
4. Guard de autenticación
5. Interceptor para JWT (opcional)

## 📝 Prompt Exacto Enviado

```
Crea un proyecto Angular 21 Standalone con:

1. src/app/models/auth.model.ts:
   - interface User { id, name, email, profileId }
   - interface AuthResponse { user, token }
   - interface LoginRequest { email, password }
   - interface RegisterRequest { name, email, password, profileId }

2. src/app/models/ticket.model.ts:
   - interface Ticket { id, title, description, status, priority, userId, createdAt, updatedAt, creator?, assignee?, comments? }
   - interface Comment { id, content, userId, ticketId, createdAt, user? }
   - type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'
   - type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH'

3. src/app/models/profile.model.ts:
   - interface Profile { id, name, description }

4. src/app/services/api.service.ts:
   - Wrapper HTTP con HttpClient
   - Métodos: get<T>, post<T>, put<T>, patch<T>, delete<T>
   - Headers automáticos con JWT token
   - Manejo de localStorage para token
   - URL base: http://localhost:3000/api

5. src/app/services/auth.service.ts:
   - login(email, password): Observable<AuthResponse>
   - register(name, email, password, profileId): Observable<AuthResponse>
   - logout(): void
   - isAuthenticated(): boolean
   - getToken(): string | null
   - getCurrentUser(): User | null
   - BehaviorSubject para currentUser$

6. src/app/services/ticket.service.ts:
   - getTickets(filters?): Observable<any>
   - getTicketById(id): Observable<any>
   - createTicket(title, description, priority): Observable<any>
   - updateTicketStatus(id, status): Observable<any>
   - addComment(ticketId, content): Observable<any>

7. src/app/services/profile.service.ts:
   - getProfiles(): Observable<Profile[]>
   - getProfileById(id): Observable<Profile>

8. src/app/app.routes.ts:
   - Rutas con lazy loading de componentes
   - Redirect root a /dashboard

9. src/app/app.config.ts:
   - provideRouter(routes)
   - provideHttpClient()
   - provideAnimations()

10. src/app/app.ts:
    - Componente standalone raíz
    - Imports: [RouterOutlet, CommonModule]

Usar TypeScript strict mode, RxJS, interfaces, tipos completos.
```

## ✅ Entregables

### Archivos Creados
- `src/app/models/auth.model.ts`
- `src/app/models/ticket.model.ts`
- `src/app/models/profile.model.ts`
- `src/app/services/api.service.ts`
- `src/app/services/auth.service.ts`
- `src/app/services/ticket.service.ts`
- `src/app/services/profile.service.ts`
- `src/app/app.routes.ts`
- `src/app/app.config.ts`
- `src/app/app.ts`

### Características Implementadas
- Componentes standalone (sin módulos)
- HttpClient con header Authorization automático
- LocalStorage para persistencia de sesión
- Observable streams con RxJS
- Tipos TypeScript completos
- URL base configurable

### Dependencias Necesarias
```bash
npm install @angular/core @angular/common @angular/router @angular/platform-browser-dynamic
npm install @angular/platform-browser rxjs
```

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Angular 21 no tiene app.module.ts
- **Error**: "Cannot find app.module.ts"
- **Solución**: Usar standalone components con bootstrapApplication
- **Ubicación**: main.ts usa bootstrapApplication(App, appConfig)

### Problema 2: LocalStorage no disponible en SSR
- **Error**: "localStorage is not defined"
- **Solución**: Verificar typeof window !== 'undefined' antes de usar
- **Fix**: `if (typeof window !== 'undefined') { localStorage.getItem(...) }`

### Problema 3: Tipos de respuesta del backend
- **Error**: "response.data es undefined"
- **Solución**: Backend retorna { data, message, statusCode }
- **Fix**: Usar `response.data` en lugar de `response`

### Problema 4: CORS desde localhost:4200 a 3000
- **Error**: "No 'Access-Control-Allow-Origin' header"
- **Solución**: Verificar CORS habilitado en backend
- **Backend**: `app.use(cors({ origin: '*' }))`

## 🚀 Próximos Pasos
- FRONTEND_002: Autenticación y Guards
- FRONTEND_003: Componentes Pages
- FRONTEND_004: Tests y Estilos

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~20 minutos  
Archivos: 10  
Servicios: 4  
Modelos: 3
EOF
cat /mnt/user-data/outputs/frontend_001_prompt.md
Salida

# FRONTEND_001: Setup Angular 21 Standalone

## 📋 Objetivo
Configurar proyecto Angular 21 con componentes standalone, servicios y modelos TypeScript para comunicación con backend.

## 🎯 Componentes a Crear
1. Modelos TypeScript (auth, ticket, profile)
2. Servicios (API, Auth, Ticket, Profile)
3. Configuración Angular (routes, config)
4. Guard de autenticación
5. Interceptor para JWT (opcional)

## 📝 Prompt Exacto Enviado

```
Crea un proyecto Angular 21 Standalone con:

1. src/app/models/auth.model.ts:
   - interface User { id, name, email, profileId }
   - interface AuthResponse { user, token }
   - interface LoginRequest { email, password }
   - interface RegisterRequest { name, email, password, profileId }

2. src/app/models/ticket.model.ts:
   - interface Ticket { id, title, description, status, priority, userId, createdAt, updatedAt, creator?, assignee?, comments? }
   - interface Comment { id, content, userId, ticketId, createdAt, user? }
   - type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'
   - type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH'

3. src/app/models/profile.model.ts:
   - interface Profile { id, name, description }

4. src/app/services/api.service.ts:
   - Wrapper HTTP con HttpClient
   - Métodos: get<T>, post<T>, put<T>, patch<T>, delete<T>
   - Headers automáticos con JWT token
   - Manejo de localStorage para token
   - URL base: http://localhost:3000/api

5. src/app/services/auth.service.ts:
   - login(email, password): Observable<AuthResponse>
   - register(name, email, password, profileId): Observable<AuthResponse>
   - logout(): void
   - isAuthenticated(): boolean
   - getToken(): string | null
   - getCurrentUser(): User | null
   - BehaviorSubject para currentUser$

6. src/app/services/ticket.service.ts:
   - getTickets(filters?): Observable<any>
   - getTicketById(id): Observable<any>
   - createTicket(title, description, priority): Observable<any>
   - updateTicketStatus(id, status): Observable<any>
   - addComment(ticketId, content): Observable<any>

7. src/app/services/profile.service.ts:
   - getProfiles(): Observable<Profile[]>
   - getProfileById(id): Observable<Profile>

8. src/app/app.routes.ts:
   - Rutas con lazy loading de componentes
   - Redirect root a /dashboard

9. src/app/app.config.ts:
   - provideRouter(routes)
   - provideHttpClient()
   - provideAnimations()

10. src/app/app.ts:
    - Componente standalone raíz
    - Imports: [RouterOutlet, CommonModule]

Usar TypeScript strict mode, RxJS, interfaces, tipos completos.
```

## ✅ Entregables

### Archivos Creados
- `src/app/models/auth.model.ts`
- `src/app/models/ticket.model.ts`
- `src/app/models/profile.model.ts`
- `src/app/services/api.service.ts`
- `src/app/services/auth.service.ts`
- `src/app/services/ticket.service.ts`
- `src/app/services/profile.service.ts`
- `src/app/app.routes.ts`
- `src/app/app.config.ts`
- `src/app/app.ts`

### Características Implementadas
- Componentes standalone (sin módulos)
- HttpClient con header Authorization automático
- LocalStorage para persistencia de sesión
- Observable streams con RxJS
- Tipos TypeScript completos
- URL base configurable

### Dependencias Necesarias
```bash
npm install @angular/core @angular/common @angular/router @angular/platform-browser-dynamic
npm install @angular/platform-browser rxjs
```

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Angular 21 no tiene app.module.ts
- **Error**: "Cannot find app.module.ts"
- **Solución**: Usar standalone components con bootstrapApplication
- **Ubicación**: main.ts usa bootstrapApplication(App, appConfig)

### Problema 2: LocalStorage no disponible en SSR
- **Error**: "localStorage is not defined"
- **Solución**: Verificar typeof window !== 'undefined' antes de usar
- **Fix**: `if (typeof window !== 'undefined') { localStorage.getItem(...) }`

### Problema 3: Tipos de respuesta del backend
- **Error**: "response.data es undefined"
- **Solución**: Backend retorna { data, message, statusCode }
- **Fix**: Usar `response.data` en lugar de `response`

### Problema 4: CORS desde localhost:4200 a 3000
- **Error**: "No 'Access-Control-Allow-Origin' header"
- **Solución**: Verificar CORS habilitado en backend
- **Backend**: `app.use(cors({ origin: '*' }))`

## 🚀 Próximos Pasos
- FRONTEND_002: Autenticación y Guards
- FRONTEND_003: Componentes Pages
- FRONTEND_004: Tests y Estilos

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~20 minutos  
Archivos: 10  
Servicios: 4  
Modelos: 3
Listo
# 🎯 Frontend - Plataforma de Gestión de Tickets

Angular 21 Standalone Components con RxJS y Reactive Forms

## 📊 Resumen

**Stack**: Angular 21 | RxJS | Reactive Forms | SCSS | TypeScript  
**Componentes**: 8 principales  
**Servicios**: 4 (Auth, API, Ticket, Profile)  
**Pages**: 5 (Login, Register, Dashboard, Tickets, Ticket Detail)  
**Versión**: 1.0.0  

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o yarn
- Angular CLI 21

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/proyecto-tickets.git
cd proyecto-tickets/frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
ng serve

# O directamente
npm start
```

**Frontend disponible en**: `http://localhost:4200`

---

## 📁 Estructura del Proyecto

```
src/app/
├── app.ts                      # Componente raíz (standalone)
├── app.html                    # Template raíz
├── app.scss                    # Estilos globales
├── app.routes.ts              # Rutas de la aplicación
├── app.config.ts              # Configuración (providers)
│
├── models/                     # Tipos TypeScript
│   ├── auth.model.ts          # User, AuthResponse
│   ├── ticket.model.ts        # Ticket, Comment
│   └── profile.model.ts       # Profile
│
├── services/                   # Lógica de negocio
│   ├── api.service.ts         # HTTP client wrapper
│   ├── auth.service.ts        # Autenticación + localStorage
│   ├── ticket.service.ts      # CRUD de tickets
│   └── profile.service.ts     # CRUD de perfiles
│
├── guards/                     # Route guards
│   └── auth.guard.ts          # Protección de rutas autenticadas
│
├── pages/                      # Componentes de página
│   ├── login/
│   │   ├── login.ts           # LoginComponent
│   │   ├── login.html
│   │   └── login.scss
│   ├── register/
│   │   ├── register.ts        # RegisterComponent
│   │   ├── register.html
│   │   └── register.scss
│   ├── dashboard/
│   │   ├── dashboard.ts       # DashboardComponent
│   │   ├── dashboard.html
│   │   └── dashboard.scss
│   ├── tickets/
│   │   ├── tickets.ts         # TicketsComponent (listado + crear)
│   │   ├── tickets.html
│   │   └── tickets.scss
│   └── ticket-detail/
│       ├── ticket-detail.ts   # TicketDetailComponent
│       ├── ticket-detail.html
│       └── ticket-detail.scss
│
└── components/                 # Componentes reutilizables
    ├── navbar/                # Navegación
    │   ├── navbar.ts
    │   ├── navbar.html
    │   └── navbar.scss
    ├── ticket-list/           # Tabla de tickets
    │   ├── ticket-list.ts
    │   ├── ticket-list.html
    │   └── ticket-list.scss
    └── ticket-form/           # Formulario de creación
        ├── ticket-form.ts
        ├── ticket-form.html
        └── ticket-form.scss
```

---

## 🔐 Autenticación

### Flujo Auth

1. **Registro** (`/register`)
   - Usuario se registra con nombre, email, contraseña y perfil
   - Sistema carga perfiles desde backend (GET /api/profiles)
   - Al registrar, recibe token JWT

2. **Login** (`/login`)
   - Usuario inicia sesión con email y contraseña
   - Recibe token JWT válido por 7 días

3. **Almacenamiento**
   - Token se guarda en `localStorage`
   - Usuario se guarda en `localStorage`
   - Observable `currentUser$` se actualiza

4. **Protección**
   - `authGuard` verifica token antes de acceder a rutas
   - Si no hay token, redirige a `/login`
   - Token se envía automáticamente en header `Authorization: Bearer <token>`

### AuthService API

```typescript
// Login
authService.login(email: string, password: string): Observable<AuthResponse>

// Registro
authService.register(name: string, email: string, password: string, profileId: string): Observable<AuthResponse>

// Logout
authService.logout(): void

// Verificación
authService.isAuthenticated(): boolean
authService.getToken(): string | null
authService.getCurrentUser(): User | null

// Observable de usuario actual
authService.currentUser$: Observable<User | null>
```

---

## 📡 Servicios

### ApiService
Wrapper HTTP con manejo automático de JWT

```typescript
// GET
api.get<T>(endpoint: string): Observable<T>

// POST
api.post<T>(endpoint: string, data: any): Observable<T>

// PUT
api.put<T>(endpoint: string, data: any): Observable<T>

// PATCH
api.patch<T>(endpoint: string, data: any): Observable<T>

// DELETE
api.delete<T>(endpoint: string): Observable<T>
```

### TicketService
CRUD de tickets

```typescript
getTickets(filters?: any): Observable<Ticket[]>
getTicketById(id: string): Observable<Ticket>
createTicket(title: string, description: string, priority: string): Observable<Ticket>
updateTicketStatus(id: string, status: string): Observable<Ticket>
addComment(ticketId: string, content: string): Observable<Comment>
```

### AuthService
Manejo de autenticación

```typescript
login(email: string, password: string): Observable<AuthResponse>
register(name: string, email: string, password: string, profileId: string): Observable<AuthResponse>
logout(): void
isAuthenticated(): boolean
```

### ProfileService
Obtener perfiles disponibles

```typescript
getProfiles(): Observable<Profile[]>
getProfileById(id: string): Observable<Profile>
```

---

## 🎨 Componentes

### Pages

#### LoginComponent
- Formulario de login con validaciones
- Campos: email, contraseña
- Redirección a dashboard post-login

#### RegisterComponent
- Formulario de registro
- Campos: nombre, email, contraseña, perfil
- Carga dinámicamente perfiles del backend

#### DashboardComponent
- Vista de inicio con estadísticas
- Últimos 5 tickets
- Links a secciones principales

#### TicketsComponent
- Listado de todos los tickets
- Filtros por estado y prioridad
- Crear nuevo ticket
- Cartas visuales por ticket

#### TicketDetailComponent
- Detalle completo del ticket
- Cambio de estado (4 botones)
- Sección de comentarios
- Agregar comentario

### Componentes Reutilizables

#### NavbarComponent
- Navegación principal
- Mostrar usuario actual
- Botón de logout
- Menú responsive

#### TicketListComponent
- Tabla reutilizable de tickets
- Badges de estado y prioridad
- Link a detalle

#### TicketFormComponent
- Formulario para crear/editar tickets
- Validaciones reactivas
- Campos: título, descripción, prioridad

---

## 🎯 Rutas

```
/                    → Redirige a /dashboard
/login              → LoginComponent (sin auth)
/register           → RegisterComponent (sin auth)
/dashboard          → DashboardComponent (con auth)
/tickets            → TicketsComponent (con auth)
/tickets/:id        → TicketDetailComponent (con auth)
```

---

## 🧪 Testing

```bash
# Ejecutar tests
ng test

# Tests con coverage
ng test --code-coverage

# Tests en modo watch
ng test --watch
```

---

## 🎨 Estilos

### SCSS Features
- Variables de color
- Mixins para responsive
- Breakpoints mobile/tablet/desktop
- Componentes con estilos encapsulados

### Paleta de Colores
- **Primary**: `#007bff` (Azul)
- **Success**: `#28a745` (Verde)
- **Warning**: `#ffc107` (Amarillo)
- **Danger**: `#dc3545` (Rojo)
- **Info**: `#17a2b8` (Cyan)

### Responsive
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔧 Configuración

### app.config.ts
```typescript
providers: [
  provideRouter(routes),
  provideHttpClient(withFetch()),
  provideAnimations()
]
```

### app.routes.ts
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => LoginComponent },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => DashboardComponent },
  // ...
]
```

---

## 📝 Formularios Reactivos

Todos los formularios usan `ReactiveFormsModule` con validaciones

```typescript
// Ejemplo LoginComponent
this.loginForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});
```

---

## 🚨 Manejo de Errores

- **401 Unauthorized**: Redirige a login
- **404 Not Found**: Muestra mensaje de error
- **500 Server Error**: Muestra alerta al usuario
- **Network Error**: Intenta reconectar

---

## 📊 Tipos/Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  profileId: string;
}
```

### Ticket
```typescript
{
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: string;
  createdAt: string;
  updatedAt: string;
  creator?: { id, name, email };
  assignee?: { id, name, email };
  comments?: Comment[];
}
```

### Comment
```typescript
{
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  createdAt: string;
  user?: { id, name };
}
```

---

## 🐛 Troubleshooting

### Port 4200 ya en uso
```bash
ng serve --port 4300
```

### localStorage no disponible (SSR)
```typescript
if (typeof window !== 'undefined') {
  localStorage.getItem('token');
}
```

### Backend no responde
```bash
# Verificar que backend está corriendo
curl http://localhost:3000/health

# Verificar CORS en backend
# En backend/src/app.ts: app.use(cors())
```

### Componentes no se cargan
```bash
# Clear Angular cache
rm -rf .angular/

# Reinstall
npm install
ng serve
```

---

## 📚 Librerías Utilizadas

- **@angular/core** - Framework
- **@angular/forms** - Reactive forms
- **@angular/common** - Common utilities
- **@angular/router** - Routing
- **rxjs** - Observables
- **@angular/platform-browser** - DOM rendering

---

## 🚀 Build para Producción

```bash
# Compilar para producción
ng build --configuration production

# Archivos en: dist/

# Servir en producción
npm install -g http-server
http-server dist/
```

---

## 📖 Documentación Adicional

- [README Principal](../README.md)
- [README Backend](../backend/README.md)
- [Documentación de Prompts](../docs/)
- [Angular Docs](https://angular.io/docs)
- [RxJS Docs](https://rxjs.dev/)

---

## 👤 Autor

Desarrollo mediante prompts a Claude (IA).

**Versión**: 1.0.0  
**Fecha**: 2026-05-27  
**Estado**: ✅ Production Ready
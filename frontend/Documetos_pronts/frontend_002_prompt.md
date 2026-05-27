cat > /mnt/user-data/outputs/frontend_002_prompt.md << 'EOF'
# FRONTEND_002: Autenticación + Guards

## 📋 Objetivo
Implementar autenticación con JWT, guards de rutas y componentes de login/registro.

## 🎯 Componentes a Crear
1. LoginComponent - Formulario de login
2. RegisterComponent - Formulario de registro
3. AuthGuard - Protección de rutas
4. Auth interceptor (opcional)

## 📝 Prompt Exacto Enviado

```
Crea autenticación completa en Angular:

1. src/app/guards/auth.guard.ts:
   - Implementar CanActivateFn
   - Verificar token con authService.isAuthenticated()
   - Redirigir a /login si no autenticado
   - Guardar returnUrl para post-login redirect
   - Usar inject() para inyección moderno

2. src/app/pages/login/login.component.ts:
   - Componente standalone
   - Formulario reactivo (FormBuilder)
   - Campos: email, password
   - Validaciones: required, email, minLength(8)
   - Botones: Login, Link a Registro
   - Error handling con mensaje visual
   - Redirect a /dashboard post-login

3. src/app/pages/login/login.html:
   - Formulario con validación visual
   - Mostrar errores de validación
   - Loading state durante login
   - Link "No tienes cuenta? Regístrate"

4. src/app/pages/login/login.scss:
   - Estilos responsive
   - Centrado en pantalla
   - Input styling profesional
   - Error messages en rojo

5. src/app/pages/register/register.component.ts:
   - Componente standalone
   - Campos: name, email, password, profileId
   - Cargar perfiles desde backend (GET /api/profiles)
   - Validaciones completas
   - Error handling
   - Link a Login

6. src/app/pages/register/register.html:
   - Select dropdown para perfiles
   - Mostrar "Cargando perfiles..." mientras se obtienen
   - Validaciones visuales
   - Link "¿Ya tienes cuenta? Inicia sesión"

7. src/app/pages/register/register.scss:
   - Estilos consistentes con login
   - Responsive design
   - Dropdown styling

8. LocalStorage handling:
   - Verificar typeof window !== 'undefined'
   - Token se guarda en localStorage
   - Usuario se guarda en localStorage
   - Limpiar en logout

Usar Reactive Forms, RxJS, error handling, localStorage seguro.
```

## ✅ Entregables

### Archivos Creados
- `src/app/guards/auth.guard.ts`
- `src/app/pages/login/login.component.ts`
- `src/app/pages/login/login.html`
- `src/app/pages/login/login.scss`
- `src/app/pages/register/register.component.ts`
- `src/app/pages/register/register.html`
- `src/app/pages/register/register.scss`

### Características Implementadas
- CanActivateFn guard moderno
- Formularios reactivos con validación
- Carga dinámica de perfiles
- Manejo de localStorage seguro
- Error messages visuales
- Redirect post-login
- Responsive design

### Endpoints Utilizados
```
GET  /api/profiles (sin auth) - Cargar perfiles
POST /api/auth/register (sin auth)
POST /api/auth/login (sin auth)
```

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: CanActivate vs CanActivateFn
- **Error**: "CanActivate clase obsoleta"
- **Solución**: Usar CanActivateFn que es más moderno
- **Patrón**: `export const authGuard: CanActivateFn = (route, state) => { ... }`

### Problema 2: Perfiles no cargan en registro
- **Error**: "Error cargando perfiles"
- **Solución**: GET /api/profiles sin autenticación
- **Backend**: Verificar que GET /api/profiles no requiere auth

### Problema 3: localStorage undefined en SSR
- **Error**: "localStorage is not defined"
- **Solución**: Verificar typeof window !== 'undefined'
- **Fix**: Envolver acceso a localStorage

### Problema 4: Token expirado durante sesión
- **Error**: "401 Unauthorized durante navegación"
- **Solución**: Implementar refresh token o re-login
- **Temporal**: Redirigir a /login en 401

## 🚀 Próximos Pasos
- FRONTEND_003: Components (Navbar, Pages)
- FRONTEND_004: Tests y estilos globales
- Implementar refresh token

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~25 minutos  
Archivos: 7  
Componentes: 2  
Guards: 1
EOF
cat /mnt/user-data/outputs/frontend_002_prompt.md
Salida

# FRONTEND_002: Autenticación + Guards

## 📋 Objetivo
Implementar autenticación con JWT, guards de rutas y componentes de login/registro.

## 🎯 Componentes a Crear
1. LoginComponent - Formulario de login
2. RegisterComponent - Formulario de registro
3. AuthGuard - Protección de rutas
4. Auth interceptor (opcional)

## 📝 Prompt Exacto Enviado

```
Crea autenticación completa en Angular:

1. src/app/guards/auth.guard.ts:
   - Implementar CanActivateFn
   - Verificar token con authService.isAuthenticated()
   - Redirigir a /login si no autenticado
   - Guardar returnUrl para post-login redirect
   - Usar inject() para inyección moderno

2. src/app/pages/login/login.component.ts:
   - Componente standalone
   - Formulario reactivo (FormBuilder)
   - Campos: email, password
   - Validaciones: required, email, minLength(8)
   - Botones: Login, Link a Registro
   - Error handling con mensaje visual
   - Redirect a /dashboard post-login

3. src/app/pages/login/login.html:
   - Formulario con validación visual
   - Mostrar errores de validación
   - Loading state durante login
   - Link "No tienes cuenta? Regístrate"

4. src/app/pages/login/login.scss:
   - Estilos responsive
   - Centrado en pantalla
   - Input styling profesional
   - Error messages en rojo

5. src/app/pages/register/register.component.ts:
   - Componente standalone
   - Campos: name, email, password, profileId
   - Cargar perfiles desde backend (GET /api/profiles)
   - Validaciones completas
   - Error handling
   - Link a Login

6. src/app/pages/register/register.html:
   - Select dropdown para perfiles
   - Mostrar "Cargando perfiles..." mientras se obtienen
   - Validaciones visuales
   - Link "¿Ya tienes cuenta? Inicia sesión"

7. src/app/pages/register/register.scss:
   - Estilos consistentes con login
   - Responsive design
   - Dropdown styling

8. LocalStorage handling:
   - Verificar typeof window !== 'undefined'
   - Token se guarda en localStorage
   - Usuario se guarda en localStorage
   - Limpiar en logout

Usar Reactive Forms, RxJS, error handling, localStorage seguro.
```

## ✅ Entregables

### Archivos Creados
- `src/app/guards/auth.guard.ts`
- `src/app/pages/login/login.component.ts`
- `src/app/pages/login/login.html`
- `src/app/pages/login/login.scss`
- `src/app/pages/register/register.component.ts`
- `src/app/pages/register/register.html`
- `src/app/pages/register/register.scss`

### Características Implementadas
- CanActivateFn guard moderno
- Formularios reactivos con validación
- Carga dinámica de perfiles
- Manejo de localStorage seguro
- Error messages visuales
- Redirect post-login
- Responsive design

### Endpoints Utilizados
```
GET  /api/profiles (sin auth) - Cargar perfiles
POST /api/auth/register (sin auth)
POST /api/auth/login (sin auth)
```

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: CanActivate vs CanActivateFn
- **Error**: "CanActivate clase obsoleta"
- **Solución**: Usar CanActivateFn que es más moderno
- **Patrón**: `export const authGuard: CanActivateFn = (route, state) => { ... }`

### Problema 2: Perfiles no cargan en registro
- **Error**: "Error cargando perfiles"
- **Solución**: GET /api/profiles sin autenticación
- **Backend**: Verificar que GET /api/profiles no requiere auth

### Problema 3: localStorage undefined en SSR
- **Error**: "localStorage is not defined"
- **Solución**: Verificar typeof window !== 'undefined'
- **Fix**: Envolver acceso a localStorage

### Problema 4: Token expirado durante sesión
- **Error**: "401 Unauthorized durante navegación"
- **Solución**: Implementar refresh token o re-login
- **Temporal**: Redirigir a /login en 401

## 🚀 Próximos Pasos
- FRONTEND_003: Components (Navbar, Pages)
- FRONTEND_004: Tests y estilos globales
- Implementar refresh token

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~25 minutos  
Archivos: 7  
Componentes: 2  
Guards: 1
cat > /mnt/user-data/outputs/backend_004_prompt.md << 'EOF'
# BACKEND_004: CRUD Tickets

## 📋 Objetivo
Implementar CRUD completo de Tickets con filtros, cambio de estado, asignaciones y comentarios.

## 🎯 Componentes a Crear
1. TicketService - Lógica de tickets (CRUD, filtros, estado, comentarios)
2. TicketController - Endpoints GET/POST/PATCH
3. ticket.routes.ts - Rutas protegidas
4. Validadores específicos para tickets

## 📝 Prompt Exacto Enviado

```
Crea el CRUD completo de Tickets:

1. src/services/ticket.service.ts:
   - getAllTickets(filters?: { status?, priority?, userId? }): Promise<Ticket[]>
   - getTicketById(id: string): Promise<Ticket>
   - createTicket(data: { title, description, priority, userId }): Promise<Ticket>
   - updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket>
   - addComment(ticketId: string, userId: string, content: string): Promise<Comment>
   - getComments(ticketId: string): Promise<Comment[]>
   - assignTicket(ticketId: string, assignedToId: string): Promise<Ticket>

2. src/controllers/ticket.controller.ts:
   - GET /api/tickets - Listar con filtros
   - GET /api/tickets/:id - Obtener detalle
   - POST /api/tickets - Crear nuevo
   - PATCH /api/tickets/:id/status - Cambiar estado
   - POST /api/tickets/:id/comments - Agregar comentario
   - GET /api/tickets/:id/comments - Ver comentarios
   - PATCH /api/tickets/:id/assign - Asignar usuario

3. src/routes/ticket.routes.ts:
   - Todas las rutas protegidas con authenticateToken
   - Validar que userId coincida con creator o sea ADMIN/SOPORTE

4. Validaciones:
   - Título: mínimo 5 caracteres, máximo 255
   - Descripción: mínimo 10 caracteres
   - Status: OPEN, IN_PROGRESS, RESOLVED, REJECTED
   - Priority: LOW, MEDIUM, HIGH
   - Solo el creator o ADMIN pueden cambiar estado
   - Solo ADMIN/SOPORTE pueden asignar

5. Manejo de relaciones Prisma:
   - Ticket.creator (User who created)
   - Ticket.assignee (User assigned to)
   - Ticket.comments[] (List of comments)
   - Comment.user (User who commented)

Usar error handling específico, validadores reutilizables, timestamps automáticos.
```

## ✅ Entregables

### Archivos Creados
- `src/services/ticket.service.ts` - Servicio
- `src/controllers/ticket.controller.ts` - Controlador
- `src/routes/ticket.routes.ts` - Rutas
- `src/utils/validators/ticket.validator.ts` - Validaciones

### Endpoints Creados (6 total)
```
GET    /api/tickets              (con filtros)
GET    /api/tickets/:id
POST   /api/tickets              (crear nuevo)
PATCH  /api/tickets/:id/status   (cambiar estado)
POST   /api/tickets/:id/comments (agregar comentario)
PATCH  /api/tickets/:id/assign   (asignar)
```

### Características
- Filtros por status, priority, userId
- Validación de permisos (creator, ADMIN, SOPORTE)
- Relaciones con User y Comment
- Timestamps automáticos
- Error handling completo

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Enum de Prisma
- **Error**: "Cannot use 'status.toUpperCase()' on enum"
- **Solución**: Usar `as any` para conversión o comparar directamente
- **Fix**: `const status = newStatus.toUpperCase() as TicketStatus`

### Problema 2: Relaciones no cargadas
- **Error**: "ticket.creator is undefined"
- **Solución**: Incluir relaciones en Prisma: `.include({ creator: true, assignee: true })`

### Problema 3: Permisos anidados
- **Error**: "No permission to update"
- **Solución**: Verificar creator.id === userId || role === ADMIN

### Problema 4: Comentarios con usuario
- **Error**: "comment.user es null"
- **Solución**: `.include({ user: { select: { id: true, name: true, email: true } } })`

## 🚀 Próximos Pasos
- BACKEND_005: CRUD de Users + Profiles
- BACKEND_006: Tests unitarios
- BACKEND_007: Tests de integración

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~40 minutos  
Archivos: 4  
Endpoints: 6  
Líneas de código: ~600
EOF
cat /mnt/user-data/outputs/backend_004_prompt.md
Salida

# BACKEND_004: CRUD Tickets

## 📋 Objetivo
Implementar CRUD completo de Tickets con filtros, cambio de estado, asignaciones y comentarios.

## 🎯 Componentes a Crear
1. TicketService - Lógica de tickets (CRUD, filtros, estado, comentarios)
2. TicketController - Endpoints GET/POST/PATCH
3. ticket.routes.ts - Rutas protegidas
4. Validadores específicos para tickets

## 📝 Prompt Exacto Enviado

```
Crea el CRUD completo de Tickets:

1. src/services/ticket.service.ts:
   - getAllTickets(filters?: { status?, priority?, userId? }): Promise<Ticket[]>
   - getTicketById(id: string): Promise<Ticket>
   - createTicket(data: { title, description, priority, userId }): Promise<Ticket>
   - updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket>
   - addComment(ticketId: string, userId: string, content: string): Promise<Comment>
   - getComments(ticketId: string): Promise<Comment[]>
   - assignTicket(ticketId: string, assignedToId: string): Promise<Ticket>

2. src/controllers/ticket.controller.ts:
   - GET /api/tickets - Listar con filtros
   - GET /api/tickets/:id - Obtener detalle
   - POST /api/tickets - Crear nuevo
   - PATCH /api/tickets/:id/status - Cambiar estado
   - POST /api/tickets/:id/comments - Agregar comentario
   - GET /api/tickets/:id/comments - Ver comentarios
   - PATCH /api/tickets/:id/assign - Asignar usuario

3. src/routes/ticket.routes.ts:
   - Todas las rutas protegidas con authenticateToken
   - Validar que userId coincida con creator o sea ADMIN/SOPORTE

4. Validaciones:
   - Título: mínimo 5 caracteres, máximo 255
   - Descripción: mínimo 10 caracteres
   - Status: OPEN, IN_PROGRESS, RESOLVED, REJECTED
   - Priority: LOW, MEDIUM, HIGH
   - Solo el creator o ADMIN pueden cambiar estado
   - Solo ADMIN/SOPORTE pueden asignar

5. Manejo de relaciones Prisma:
   - Ticket.creator (User who created)
   - Ticket.assignee (User assigned to)
   - Ticket.comments[] (List of comments)
   - Comment.user (User who commented)

Usar error handling específico, validadores reutilizables, timestamps automáticos.
```

## ✅ Entregables

### Archivos Creados
- `src/services/ticket.service.ts` - Servicio
- `src/controllers/ticket.controller.ts` - Controlador
- `src/routes/ticket.routes.ts` - Rutas
- `src/utils/validators/ticket.validator.ts` - Validaciones

### Endpoints Creados (6 total)
```
GET    /api/tickets              (con filtros)
GET    /api/tickets/:id
POST   /api/tickets              (crear nuevo)
PATCH  /api/tickets/:id/status   (cambiar estado)
POST   /api/tickets/:id/comments (agregar comentario)
PATCH  /api/tickets/:id/assign   (asignar)
```

### Características
- Filtros por status, priority, userId
- Validación de permisos (creator, ADMIN, SOPORTE)
- Relaciones con User y Comment
- Timestamps automáticos
- Error handling completo

## ⚠️ Problemas Encontrados y Soluciones

### Problema 1: Enum de Prisma
- **Error**: "Cannot use 'status.toUpperCase()' on enum"
- **Solución**: Usar `as any` para conversión o comparar directamente
- **Fix**: `const status = newStatus.toUpperCase() as TicketStatus`

### Problema 2: Relaciones no cargadas
- **Error**: "ticket.creator is undefined"
- **Solución**: Incluir relaciones en Prisma: `.include({ creator: true, assignee: true })`

### Problema 3: Permisos anidados
- **Error**: "No permission to update"
- **Solución**: Verificar creator.id === userId || role === ADMIN

### Problema 4: Comentarios con usuario
- **Error**: "comment.user es null"
- **Solución**: `.include({ user: { select: { id: true, name: true, email: true } } })`

## 🚀 Próximos Pasos
- BACKEND_005: CRUD de Users + Profiles
- BACKEND_006: Tests unitarios
- BACKEND_007: Tests de integración

## 📊 Status
✅ **COMPLETADO**

Tiempo: ~40 minutos  
Archivos: 4  
Endpoints: 6  
Líneas de código: ~600
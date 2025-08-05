# 🚀 CMS Nova - Publicado en NPM

**Sistema de administración modular con diseño estilo Notion**

CMS Nova es un CMS completo y moderno que te permite gestionar usuarios, contenido dinámico, y más. Con una interfaz limpia estilo Notion y funcionalidades avanzadas listas para producción.

## 🎯 **ESTADO: PUBLICADO EN NPM** ✅

[![NPM Version](https://img.shields.io/npm/v/@danielcadev/cms-nova?style=flat-square)](https://www.npmjs.com/package/@danielcadev/cms-nova)
[![NPM Downloads](https://img.shields.io/npm/dm/@danielcadev/cms-nova?style=flat-square)](https://www.npmjs.com/package/@danielcadev/cms-nova)

## ✨ Características Implementadas

- ✅ **Autenticación completa** con Better Auth
- ✅ **Gestión de usuarios** con roles y permisos
- ✅ **🎨 Constructor de plantillas visual** - drag & drop sin programar
- ✅ **CMS Headless flexible** - crea tipos de contenido dinámicos
- ✅ **Sistema de templates predefinidos** (planes turísticos, etc.)
- ✅ **UI estilo Notion** - moderna y limpia (no iOS 26)
- ✅ **Dashboard administrativo** con estadísticas
- ✅ **API REST completa** para integración
- ✅ **TypeScript** - completamente tipado
- ✅ **Base de datos PostgreSQL** con Prisma
- ✅ **Deployment ready** - Docker, Vercel, VPS

## 📦 **Instalación Rápida desde NPM**

```bash
# Instalar CMS Nova
npm install @danielcadev/cms-nova@beta

# Instalar dependencias
npm install better-auth @prisma/client prisma next react react-dom
```

## 🚀 **Uso Básico**

```tsx
// app/admin/layout.tsx
import { AdminLayout } from '@danielcadev/cms-nova/src/components/admin/AdminLayout';
import '@danielcadev/cms-nova/dist/styles.css';

export default function MyAdminLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}

// app/admin/page.tsx
import { Dashboard } from '@danielcadev/cms-nova/src/components/admin/dashboard/DashboardPage/Dashboard';

export default function AdminPage() {
  return <Dashboard />;
}
```

## 🛠️ **Instalación Completa (Desarrollo)**

### Opción 1: Clonar Repositorio
```bash
git clone https://github.com/danielcadev/cms-nova.git
cd cms-nova
npm install
cp .env.example .env
# Configurar .env con tus datos
npm run dev
```

## 🎨 **Constructor Visual de Plantillas**

Los usuarios pueden crear sus propias plantillas **sin programar**:

### Interfaz Drag & Drop
- 📝 Arrastra campos desde la paleta
- 🔄 Reordena campos fácilmente
- 👀 Vista previa en tiempo real
- ⚙️ Configuración avanzada por campo

### Tipos de Campo Disponibles
- **Texto Corto/Largo** - Títulos, descripciones
- **Número** - Precios, cantidades, calificaciones
- **Sí/No** - Opciones booleanas
- **Fecha** - Fechas y horarios
- **Media** - Imágenes y archivos

## 🌐 **Disponible en NPM**

**Paquete:** [`@danielcadev/cms-nova`](https://www.npmjs.com/package/@danielcadev/cms-nova)

```bash
# Instalar versión beta
npm install @danielcadev/cms-nova@beta

# Ver todas las versiones
npm view @danielcadev/cms-nova versions --json
```

## 📚 **Documentación Completa**

📖 **[Ver guía completa de creación de plantillas](docs/CREATE-TEMPLATES.md)**
📖 **[Ver guía de integración](INTEGRATION.md)**
📖 **[Ver guía de deployment](DEPLOYMENT.md)**
📖 **[Ver demo del constructor visual](examples/template-builder-demo.md)**

## 🎯 Ejemplos de Uso por Industria

### 🏖️ Agencia de Viajes
```tsx
const travelConfig = {
  ui: { title: 'Travel Admin', primaryColor: '#0ea5e9' },
  features: {
    users: true,
    plans: true,        // ✅ Templates de planes turísticos
    contentTypes: true  // Destinos, hoteles, actividades
  }
};
```

### 🛍️ E-commerce
```tsx
const ecommerceConfig = {
  ui: { title: 'Store Admin', primaryColor: '#10b981' },
  features: {
    users: true,
    contentTypes: true  // Productos, categorías, marcas
  }
};
```

### 📰 Blog/Revista
```tsx
const blogConfig = {
  ui: { title: 'Editorial Admin', primaryColor: '#8b5cf6' },
  features: {
    users: true,
    contentTypes: true  // Posts, categorías, autores
  }
};
```

### 🏥 Clínica/Hospital
```tsx
const clinicConfig = {
  ui: { title: 'Clinic Admin', primaryColor: '#ef4444' },
  features: {
    users: true,
    contentTypes: true  // Doctores, servicios, citas
  }
};
```

## 🎯 Uso Básico

### Dashboard Principal
```typescript
import { AdminDashboard } from '@nova/cms-admin';

// Dashboard con estadísticas automáticas
<AdminDashboard />
```

### Gestión de Usuarios
```typescript
import { UsersManager } from '@nova/cms-admin';

// Sistema completo de usuarios
<UsersManager />
```

### Gestión de Planes/Contenido
```typescript
import { PlansManager } from '@nova/cms-admin';

// CRUD completo para planes
<PlansManager />
```

## ⚙️ Configuración Avanzada

### Personalizar UI
```typescript
const config = {
  ui: {
    theme: 'dark',
    primaryColor: '#10b981',
    logo: '/mi-logo.png',
    title: 'Mi CMS Personalizado',
    customCSS: `
      .admin-sidebar { background: linear-gradient(...); }
    `
  }
};
```

### Roles y Permisos Personalizados
```typescript
const config = {
  auth: {
    adminRoles: ['ADMIN', 'SUPER_ADMIN', 'EDITOR'],
  },
  permissions: {
    customRoles: ['EDITOR', 'VIEWER'],
    permissions: {
      'EDITOR': ['users.read', 'plans.write'],
      'VIEWER': ['plans.read']
    }
  }
};
```

### Features Opcionales
```typescript
const config = {
  features: {
    users: true,
    plans: true,
    analytics: false,
    fileManager: true,
    backup: true
  }
};
```

## 🔧 Componentes Individuales

Si prefieres usar componentes específicos:

```typescript
import { 
  UserTable, 
  UserForm, 
  PlanForm,
  useNovaAuth,
  useUsers 
} from '@nova/cms-admin';

function MiComponentePersonalizado() {
  const { user } = useNovaAuth();
  const { users, createUser } = useUsers();
  
  return (
    <div>
      <UserTable users={users} />
      <UserForm onSubmit={createUser} />
    </div>
  );
}
```

## 🗄️ Schema Extendido

Puedes extender el schema base para tus necesidades:

```typescript
import { extendNovaSchema } from '@nova/cms-admin';

const miSchema = extendNovaSchema({
  models: `
    model Producto {
      id    String @id @default(cuid())
      name  String
      price Float
      planId String?
      plan   Plan?  @relation(fields: [planId], references: [id])
    }
  `,
  enums: `
    enum ProductStatus {
      AVAILABLE
      OUT_OF_STOCK
      DISCONTINUED
    }
  `
});

// Usar en tu schema.prisma
```

## 🚀 Ejemplos Completos

### E-commerce con Admin
```typescript
// Configuración para tienda online
const ecommerceConfig = {
  features: { users: true, plans: false, products: true },
  ui: { title: 'Admin E-commerce' }
};
```

### Blog/CMS
```typescript
// Configuración para blog
const blogConfig = {
  features: { users: true, posts: true, comments: true },
  ui: { title: 'Blog Admin' }
};
```

### Sistema de Viajes
```typescript
// Configuración para agencia de viajes
const travelConfig = {
  features: { users: true, plans: true, bookings: true },
  ui: { title: 'Travel Admin' }
};
```

## 📚 API Reference

### Hooks Principales

#### `useNovaAuth()`
```typescript
const { 
  user,           // Usuario actual
  isAdmin,        // ¿Es admin?
  login,          // Función de login
  logout,         // Función de logout
  loading         // Estado de carga
} = useNovaAuth();
```

#### `useUsers()`
```typescript
const {
  users,          // Lista de usuarios
  loading,        // Estado de carga
  createUser,     // Crear usuario
  updateUser,     // Actualizar usuario
  deleteUser,     // Eliminar usuario
  refreshUsers    // Refrescar lista
} = useUsers();
```

#### `usePlans()`
```typescript
const {
  plans,          // Lista de planes
  loading,        // Estado de carga
  createPlan,     // Crear plan
  updatePlan,     // Actualizar plan
  deletePlan,     // Eliminar plan
  refreshPlans    // Refrescar lista
} = usePlans();
```

## 🔐 Seguridad

CMS Nova incluye:

- ✅ Autenticación con Better Auth
- ✅ Verificación de roles por middleware
- ✅ Validación de datos con Zod
- ✅ Sanitización de inputs
- ✅ Protección CSRF
- ✅ Rate limiting (configurable)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - puedes usarlo en proyectos comerciales sin problemas.

## 🙋‍♂️ Soporte

- 📖 [Documentación completa](https://cms-nova-docs.vercel.app)
- 💬 [Discord](https://discord.gg/cms-nova)
- 🐛 [Issues](https://github.com/tuusuario/cms-nova/issues)
- 📧 Email: soporte@cms-nova.com

---

**¿Te gusta CMS Nova?** Dale una ⭐ en GitHub y compártelo con otros developers! 

## Versión Mínima Funcional

Esta versión incluye las funcionalidades básicas necesarias para comenzar:

- Autenticación básica
- Gestión de usuarios
- Gestión de planes
- UI minimalista

### Configuración Rápida

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno:
```env
NOVA_AUTH_SECRET=tu-clave-secreta
DATABASE_URL=tu-url-de-base-de-datos
```

3. Importa y usa el componente principal:
```tsx
import { NovaAdminProvider } from '@nova/cms-admin';
import { defaultConfig } from '@nova/cms-admin/config';

function App() {
  return (
    <NovaAdminProvider config={defaultConfig}>
      {/* Tu contenido aquí */}
    </NovaAdminProvider>
  );
}
```

### Estructura Mínima

```
cms-nova/
  ├── src/
  │   ├── components/
  │   │   ├── NovaAdminProvider.tsx
  │   │   └── ui/
  │   ├── contexts/
  │   │   └── AuthContext.tsx
  │   ├── types/
  │   │   └── index.ts
  │   └── config/
  │       └── default-config.ts
  └── examples/
      └── minimal-setup.tsx
```

### Próximos Pasos

1. Implementar componentes de usuarios
2. Implementar componentes de planes
3. Mejorar el sistema de autenticación
4. Agregar más características según necesidad

## Licencia

MIT 

# Nova CMS

Nova CMS es un sistema de administración de contenido (CMS) modular y extensible construido con Next.js, Prisma, y `better-auth`.

## Requisitos

- Node.js (v18 o superior)
- npm, pnpm, o yarn
- Una base de datos PostgreSQL

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade tu URL de conexión a la base de datos PostgreSQL:
     ```env
     DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBREDELABD"
     ```

4. **Sincronizar la base de datos:**
   Este comando leerá tu `schema.prisma` y creará las tablas correspondientes en tu base de datos.
   ```bash
   npx prisma db push
   ```

5. **Generar el cliente de Prisma:**
   Aunque `db push` a veces lo hace automáticamente, es una buena práctica ejecutarlo explícitamente.
   ```bash
   npx prisma generate
   ```

6. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Primeros Pasos

Al iniciar la aplicación por primera vez, serás redirigido a la página `/signup`. Aquí podrás crear la primera cuenta de administrador.

Una vez que el primer usuario ha sido creado, la página de registro se desactiva automáticamente. Cualquier usuario adicional deberá ser creado desde el panel de administración por un usuario con los permisos adecuados.

Para acceder al panel, ve a la ruta de inicio de sesión (normalmente `/admin/auth/SignIn`) después de que el primer usuario haya sido creado.

---

## 🎨 **Diseño Estilo Notion**

CMS Nova utiliza un diseño limpio y moderno inspirado en Notion, con interfaz minimalista y funcional.

### ✨ **Características del Diseño**

- **🎯 Interfaz Limpia**: Diseño minimalista y funcional
- **📱 Responsive**: Adaptado a todos los dispositivos
- **🎨 Colores Modernos**: Paleta de colores profesional
- **⚡ Animaciones Suaves**: Transiciones fluidas y naturales
- **📐 Espaciado Consistente**: Grid system bien estructurado

### 🧩 **Componentes Implementados**

#### Dashboard Principal
- Cards con estadísticas en tiempo real
- Sidebar navegable y colapsable
- Header con información del usuario

#### Constructor Visual
- Drag & drop para crear plantillas
- Vista previa en tiempo real
- Paleta de campos disponibles

#### Gestión de Contenido
- Tablas interactivas con filtros
- Formularios dinámicos
- Modales para edición rápida

### 🎯 **Tecnologías de UI**

- **Tailwind CSS**: Framework de utilidades
- **Radix UI**: Componentes accesibles
- **Lucide Icons**: Iconografía moderna
- **Framer Motion**: Animaciones fluidas

---

## 🌐 **Disponible en NPM**

**Paquete:** [`@danielcadev/cms-nova`](https://www.npmjs.com/package/@danielcadev/cms-nova)

```bash
# Instalar versión beta
npm install @danielcadev/cms-nova@beta

# Ver todas las versiones
npm view @danielcadev/cms-nova versions --json
```

---

## 📚 **Documentación Completa**

📖 **[Ver guía de creación de plantillas](docs/CREATE-TEMPLATES.md)**
📖 **[Ver guía de integración](INTEGRATION.md)**
📖 **[Ver guía de deployment](DEPLOYMENT.md)**
📖 **[Ver demo del constructor visual](examples/template-builder-demo.md)**

---

## 🤝 **Contribuir**

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 **Licencia**

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 **Autor**

**Daniel CA** - [@danielcadev](https://github.com/danielcadev)

---

**¡Gracias por usar CMS Nova!** 🚀
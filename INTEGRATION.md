# 🔌 Guía de Integración - CMS Nova

## Instalación en Proyecto Existente

### 1. Clonar CMS Nova
```bash
git clone https://github.com/tu-usuario/cms-nova.git
cd cms-nova
npm install
```

### 2. O Instalar como Dependencia (cuando esté publicado)
```bash
npm install @nova/cms-admin
npm install better-auth @prisma/client prisma react react-dom next
```

### 3. Configurar Variables de Entorno
```env
# .env.local
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="tu-clave-secreta"
BETTER_AUTH_URL="https://tu-dominio.com"
```

## Integración Básica

### 1. Configurar Prisma Schema
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Copiar modelos de CMS Nova
// (User, ContentType, ContentEntry, Plan, etc.)
```

### 2. Usar Componentes Directamente
```tsx
// app/admin/layout.tsx
import { AdminLayout } from '@nova/cms-admin/src/components/admin/AdminLayout';
import '@nova/cms-admin/dist/styles.css';

export default function MyAdminLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
```

### 3. Páginas Principales
```tsx
// app/admin/page.tsx
import { Dashboard } from '@nova/cms-admin/src/components/admin/dashboard/DashboardPage/Dashboard';

export default function AdminPage() {
  return <Dashboard />;
}

// app/admin/login/page.tsx
import SignIn from '@nova/cms-admin/src/components/admin/auth/SignIn';

export default function LoginPage() {
  return <SignIn />;
}
```

## Ejemplos de Uso por Industria

### 🏖️ Agencia de Viajes
```tsx
// Configuración específica para turismo
const travelConfig = {
  ui: {
    title: 'Travel Admin',
    primaryColor: '#0ea5e9'
  },
  features: {
    users: true,
    plans: true,        // Templates de planes turísticos
    contentTypes: true  // Destinos, hoteles, actividades
  }
};

// Usar templates predefinidos
import { PlansManager } from '@nova/cms-admin';
<PlansManager />

// Crear tipos de contenido personalizados
// - Destinos
// - Hoteles  
// - Actividades
// - Testimonios
```

### 🛍️ E-commerce
```tsx
const ecommerceConfig = {
  ui: {
    title: 'Store Admin',
    primaryColor: '#10b981'
  },
  features: {
    users: true,
    contentTypes: true  // Productos, categorías, marcas
  }
};

// Tipos de contenido sugeridos:
// - Productos
// - Categorías
// - Marcas
// - Reviews
// - Promociones
```

### 📰 Blog/Revista
```tsx
const blogConfig = {
  ui: {
    title: 'Editorial Admin',
    primaryColor: '#8b5cf6'
  },
  features: {
    users: true,
    contentTypes: true  // Posts, categorías, autores
  }
};

// Tipos de contenido sugeridos:
// - Posts
// - Categorías
// - Autores
// - Tags
// - Comentarios
```

### 🏥 Clínica/Hospital
```tsx
const clinicConfig = {
  ui: {
    title: 'Clinic Admin',
    primaryColor: '#ef4444'
  },
  features: {
    users: true,
    contentTypes: true  // Doctores, servicios, citas
  }
};

// Tipos de contenido sugeridos:
// - Doctores
// - Servicios
// - Especialidades
// - Testimonios
// - Horarios
```

## Personalización Avanzada

### Componentes Individuales
```tsx
import { 
  UsersManager,
  ContentTypesManager,
  useAuth,
  useContentTypes 
} from '@nova/cms-admin';

function MiPanelPersonalizado() {
  const { user } = useAuth();
  const { contentTypes } = useContentTypes();
  
  return (
    <div>
      <h1>Bienvenido {user?.name}</h1>
      <UsersManager />
      <ContentTypesManager />
    </div>
  );
}
```

### Hooks Disponibles
```tsx
import { 
  useAuth,
  useUsers,
  useContentTypes,
  usePlans 
} from '@nova/cms-admin';

// Autenticación
const { user, login, logout, isAdmin } = useAuth();

// Usuarios
const { users, createUser, updateUser, deleteUser } = useUsers();

// Tipos de contenido
const { contentTypes, createContentType } = useContentTypes();

// Planes (template específico)
const { plans, createPlan, updatePlan } = usePlans();
```

## API Integration

### Endpoints Disponibles
```
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/[id]
DELETE /api/admin/users/[id]

GET    /api/content-types
POST   /api/content-types
PUT    /api/content-types/[id]

GET    /api/content-entries
POST   /api/content-entries
PUT    /api/content-entries/[id]

GET    /api/plans
POST   /api/plans
PUT    /api/plans/[id]
```

### Uso desde Frontend
```tsx
// Obtener contenido para mostrar en tu sitio
const response = await fetch('/api/content-entries?type=productos');
const productos = await response.json();

// Obtener planes turísticos
const planesResponse = await fetch('/api/plans');
const planes = await planesResponse.json();
```

## Deployment

### Variables de Entorno Requeridas
```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="clave-secreta-64-chars"
BETTER_AUTH_URL="https://tu-dominio.com"
```

### Next.js Config
```js
// next.config.js
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
};
```

## Troubleshooting

### Error: "NovaAdminProvider not found"
- Asegúrate de importar `@nova/cms-admin/dist/styles.css`
- Verifica que el provider esté en el layout correcto

### Error de Base de Datos
- Ejecuta `npx prisma migrate dev`
- Verifica la `DATABASE_URL`

### Error de Autenticación
- Verifica `BETTER_AUTH_SECRET`
- Verifica `BETTER_AUTH_URL`

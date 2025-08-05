# 🏖️ Ejemplo: Agencia de Viajes con CMS Nova

## Caso de Uso
Tienes una agencia de viajes llamada "Aventuras Tropicales" y quieres agregar un panel administrativo para gestionar:
- Planes turísticos
- Destinos
- Hoteles
- Actividades
- Testimonios de clientes
- Usuarios/clientes

## Instalación

### 1. Proyecto Existente
```bash
# En tu proyecto de agencia de viajes
npm install @nova/cms-admin
npm install better-auth @prisma/client prisma
```

### 2. Configuración
```env
# .env.local
DATABASE_URL="postgresql://user:pass@localhost:5432/aventuras_tropicales"
BETTER_AUTH_SECRET="tu-clave-secreta-para-aventuras-tropicales"
BETTER_AUTH_URL="https://aventurastropicales.com"
```

### 3. Schema Prisma
```prisma
// prisma/schema.prisma
// Copiar modelos base de CMS Nova + agregar específicos

model Destination {
  id          String @id @default(cuid())
  name        String @unique
  country     String
  description String @db.Text
  image       String?
  plans       Plan[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Hotel {
  id          String @id @default(cuid())
  name        String
  destination String
  stars       Int
  description String @db.Text
  images      Json[]
  amenities   String[]
  priceRange  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Configuración del Admin

### Layout Principal
```tsx
// app/admin/layout.tsx
import { NovaAdminProvider } from '@nova/cms-admin';
import '@nova/cms-admin/dist/styles.css';

const travelConfig = {
  auth: {
    secret: process.env.BETTER_AUTH_SECRET!,
    adminRoles: ['ADMIN', 'TRAVEL_MANAGER'],
    baseUrl: process.env.BETTER_AUTH_URL!
  },
  database: {
    url: process.env.DATABASE_URL!,
    provider: 'postgresql' as const
  },
  ui: {
    title: 'Aventuras Tropicales - Admin',
    primaryColor: '#0ea5e9',
    logo: '/logo-aventuras.png',
    theme: 'light' as const
  },
  features: {
    users: true,
    plans: true,        // ✅ Templates de planes turísticos
    contentTypes: true, // ✅ Destinos, hoteles, actividades
    analytics: true
  }
};

export default function AdminLayout({ children }) {
  return (
    <NovaAdminProvider config={travelConfig}>
      {children}
    </NovaAdminProvider>
  );
}
```

### Dashboard Principal
```tsx
// app/admin/page.tsx
import { AdminDashboard } from '@nova/cms-nova';

export default function TravelAdminPage() {
  return <AdminDashboard />;
}
```

### Páginas Específicas
```tsx
// app/admin/planes/page.tsx
import { PlansManager } from '@nova/cms-admin';

export default function PlanesPage() {
  return <PlansManager />;
}

// app/admin/destinos/page.tsx
import { ContentTypesManager } from '@nova/cms-admin';

export default function DestinosPage() {
  return (
    <ContentTypesManager 
      contentType="destinos"
      title="Gestión de Destinos"
    />
  );
}
```

## Tipos de Contenido Sugeridos

### 1. Destinos
```json
{
  "name": "Destinos",
  "apiIdentifier": "destinos",
  "fields": [
    { "label": "Nombre", "type": "TEXT", "required": true },
    { "label": "País", "type": "TEXT", "required": true },
    { "label": "Descripción", "type": "RICH_TEXT", "required": true },
    { "label": "Imagen Principal", "type": "MEDIA", "required": true },
    { "label": "Galería", "type": "MEDIA", "required": false },
    { "label": "Clima", "type": "TEXT", "required": false },
    { "label": "Mejor Época", "type": "TEXT", "required": false }
  ]
}
```

### 2. Hoteles
```json
{
  "name": "Hoteles",
  "apiIdentifier": "hoteles",
  "fields": [
    { "label": "Nombre", "type": "TEXT", "required": true },
    { "label": "Destino", "type": "TEXT", "required": true },
    { "label": "Estrellas", "type": "NUMBER", "required": true },
    { "label": "Descripción", "type": "RICH_TEXT", "required": true },
    { "label": "Imágenes", "type": "MEDIA", "required": true },
    { "label": "Servicios", "type": "TEXT", "required": false },
    { "label": "Precio por Noche", "type": "NUMBER", "required": false }
  ]
}
```

### 3. Actividades
```json
{
  "name": "Actividades",
  "apiIdentifier": "actividades",
  "fields": [
    { "label": "Nombre", "type": "TEXT", "required": true },
    { "label": "Destino", "type": "TEXT", "required": true },
    { "label": "Tipo", "type": "TEXT", "required": true },
    { "label": "Descripción", "type": "RICH_TEXT", "required": true },
    { "label": "Duración", "type": "TEXT", "required": false },
    { "label": "Precio", "type": "NUMBER", "required": false },
    { "label": "Dificultad", "type": "TEXT", "required": false }
  ]
}
```

### 4. Testimonios
```json
{
  "name": "Testimonios",
  "apiIdentifier": "testimonios",
  "fields": [
    { "label": "Nombre Cliente", "type": "TEXT", "required": true },
    { "label": "Plan Realizado", "type": "TEXT", "required": true },
    { "label": "Testimonio", "type": "RICH_TEXT", "required": true },
    { "label": "Calificación", "type": "NUMBER", "required": true },
    { "label": "Foto Cliente", "type": "MEDIA", "required": false },
    { "label": "Fecha Viaje", "type": "DATE", "required": false }
  ]
}
```

## Uso en el Frontend

### Mostrar Planes en tu Sitio
```tsx
// components/PlanesSection.tsx
import { useEffect, useState } from 'react';

export function PlanesSection() {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => setPlanes(data.plans));
  }, []);

  return (
    <section className="py-16">
      <h2>Nuestros Planes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planes.map(plan => (
          <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3>{plan.mainTitle}</h3>
            <p>{plan.promotionalText}</p>
            <div className="mt-4">
              {plan.priceOptions.map(price => (
                <span key={price.id} className="text-2xl font-bold">
                  ${price.amount}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Mostrar Destinos
```tsx
// components/DestinosSection.tsx
export function DestinosSection() {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetch('/api/content-entries?type=destinos')
      .then(res => res.json())
      .then(data => setDestinos(data.entries));
  }, []);

  return (
    <section>
      <h2>Destinos Populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinos.map(destino => (
          <div key={destino.id} className="relative">
            <img 
              src={destino.data.imagen} 
              alt={destino.data.nombre}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <h3>{destino.data.nombre}</h3>
              <p>{destino.data.pais}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Resultado Final

Con esta configuración tendrás:

✅ **Panel administrativo completo** en `/admin`
✅ **Gestión de planes turísticos** con templates predefinidos
✅ **Gestión flexible de contenido** (destinos, hoteles, actividades)
✅ **API automática** para consumir desde tu frontend
✅ **Sistema de usuarios** con roles
✅ **Interfaz moderna** estilo Notion

Tu agencia de viajes tendrá un CMS profesional sin necesidad de desarrollar desde cero.

# 🎨 Demo: Constructor de Plantillas Visual

## Ejemplo Real: Crear Plantilla de "Productos" para E-commerce

### Paso 1: Información Básica
```
┌─────────────────────────────────────────┐
│ 📝 Crear Nuevo Tipo de Contenido       │
├─────────────────────────────────────────┤
│ Nombre: Productos                       │
│ Identificador API: productos            │
│ Descripción: Catálogo de productos      │
│ de la tienda online                     │
└─────────────────────────────────────────┘
```

### Paso 2: Constructor Visual Drag & Drop

#### Paleta de Campos Disponibles
```
┌─────────────────────┐
│ 🎨 PALETA DE CAMPOS │
├─────────────────────┤
│ 📝 Texto Corto      │ ← Arrastra
│ 📄 Texto Largo      │ ← Arrastra  
│ 🔢 Número           │ ← Arrastra
│ ✅ Sí/No            │ ← Arrastra
│ 📅 Fecha            │ ← Arrastra
│ 🖼️ Media            │ ← Arrastra
└─────────────────────┘
```

#### Área de Construcción
```
┌─────────────────────────────────────────────────────────┐
│ 🏗️ CONSTRUCTOR DE PLANTILLA                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. 📝 Nombre del Producto                              │
│    ├─ Tipo: Texto Corto                               │
│    ├─ Obligatorio: ✅                                  │
│    └─ API ID: nombre_producto                          │
│                                                         │
│ 2. 💰 Precio                                           │
│    ├─ Tipo: Número                                     │
│    ├─ Obligatorio: ✅                                  │
│    └─ API ID: precio                                   │
│                                                         │
│ 3. 📄 Descripción                                      │
│    ├─ Tipo: Texto Largo                               │
│    ├─ Obligatorio: ✅                                  │
│    └─ API ID: descripcion                             │
│                                                         │
│ 4. 🖼️ Imagen Principal                                 │
│    ├─ Tipo: Media                                      │
│    ├─ Obligatorio: ✅                                  │
│    └─ API ID: imagen_principal                         │
│                                                         │
│ 5. 📦 En Stock                                         │
│    ├─ Tipo: Sí/No                                     │
│    ├─ Obligatorio: ✅                                  │
│    └─ API ID: en_stock                                │
│                                                         │
│ 6. 🏷️ Categoría                                        │
│    ├─ Tipo: Texto Corto                               │
│    ├─ Obligatorio: ❌                                  │
│    └─ API ID: categoria                               │
│                                                         │
│ [+ Agregar Campo]                                       │
└─────────────────────────────────────────────────────────┘
```

### Paso 3: Vista Previa del Formulario Generado
```
┌─────────────────────────────────────────────────────────┐
│ 👀 VISTA PREVIA - Formulario de Producto               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Nombre del Producto *                                   │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ iPhone 15 Pro                                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Precio *                                                │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 1299                                                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Descripción *                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ El iPhone más avanzado con chip A17 Pro y cámara   │ │
│ │ profesional de 48MP. Diseño en titanio con...      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Imagen Principal *                                      │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📁 Seleccionar archivo o URL                        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ En Stock * ✅ Sí ❌ No                                  │
│                                                         │
│ Categoría                                               │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Smartphones                                         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [💾 Guardar Producto]                                   │
└─────────────────────────────────────────────────────────┘
```

## Resultado: API Automática Generada

### Endpoints Creados Automáticamente
```
GET    /api/content-entries?type=productos
POST   /api/content-entries
PUT    /api/content-entries/[id]
DELETE /api/content-entries/[id]
```

### Estructura de Datos JSON
```json
{
  "id": "prod_123",
  "contentTypeId": "productos",
  "data": {
    "nombre_producto": "iPhone 15 Pro",
    "precio": 1299,
    "descripcion": "El iPhone más avanzado...",
    "imagen_principal": "https://example.com/iphone15.jpg",
    "en_stock": true,
    "categoria": "Smartphones"
  },
  "status": "published",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Uso en el Frontend

### Mostrar Productos en tu Sitio Web
```tsx
// components/ProductGrid.tsx
import { useEffect, useState } from 'react';

export function ProductGrid() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/api/content-entries?type=productos&status=published')
      .then(res => res.json())
      .then(data => setProductos(data.entries));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {productos.map(producto => (
        <div key={producto.id} className="bg-white rounded-lg shadow-lg p-6">
          <img 
            src={producto.data.imagen_principal} 
            alt={producto.data.nombre_producto}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-2">
            {producto.data.nombre_producto}
          </h3>
          <p className="text-gray-600 mb-4">
            {producto.data.descripcion}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">
              ${producto.data.precio}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              producto.data.en_stock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {producto.data.en_stock ? 'En Stock' : 'Agotado'}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              Categoría: {producto.data.categoria}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Ventajas del Constructor Visual

### ✅ Para Usuarios No Técnicos
- **Sin código**: Crear plantillas arrastrando campos
- **Intuitivo**: Interfaz visual fácil de usar
- **Inmediato**: Ver resultados en tiempo real
- **Flexible**: Modificar plantillas cuando sea necesario

### ✅ Para Desarrolladores
- **API automática**: Endpoints REST generados automáticamente
- **TypeScript**: Tipos generados automáticamente
- **Validación**: Validación automática basada en configuración
- **Escalable**: Agregar nuevos tipos de campo fácilmente

### ✅ Para el Negocio
- **Rápido**: Lanzar nuevos tipos de contenido en minutos
- **Económico**: Sin necesidad de desarrollador para cada cambio
- **Adaptable**: Evolucionar el CMS según las necesidades
- **Profesional**: Interfaz moderna y confiable

## 🎯 Casos de Uso Reales

### E-commerce
- Productos, Categorías, Marcas, Reviews, Promociones

### Agencia de Viajes  
- Destinos, Hoteles, Actividades, Testimonios, Paquetes

### Blog/Revista
- Artículos, Autores, Categorías, Tags, Comentarios

### Clínica/Hospital
- Doctores, Servicios, Especialidades, Horarios, Testimonios

### Restaurante
- Platos, Categorías, Ingredientes, Menús, Reviews

¡Con CMS Nova, cualquier negocio puede tener un sistema de gestión de contenido profesional y personalizado!

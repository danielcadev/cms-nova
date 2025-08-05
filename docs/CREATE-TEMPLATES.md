# 🎨 Crear Plantillas Personalizadas - CMS Nova

## 🧱 Sistema de Plantillas Dinámicas (Headless CMS)

CMS Nova permite a los usuarios crear sus propias plantillas de contenido sin programar. Esto es perfecto para cualquier tipo de negocio.

## ✨ Características del Constructor de Plantillas

### 🎯 **Interfaz Visual Drag & Drop**
- Arrastra y suelta campos desde la paleta
- Reordena campos fácilmente
- Vista previa en tiempo real

### 📝 **Tipos de Campo Disponibles**
- **Texto Corto**: Para títulos, nombres, URLs
- **Texto Largo**: Para descripciones, contenido
- **Número**: Para precios, cantidades, calificaciones
- **Sí/No**: Para opciones booleanas
- **Fecha**: Para fechas y horarios
- **Media**: Para imágenes y archivos

### ⚙️ **Configuración Avanzada**
- Campos obligatorios/opcionales
- Identificadores API automáticos
- Validación automática

## 🚀 Cómo Crear una Plantilla

### Paso 1: Acceder al Constructor
```
Panel Admin → Contenido → Tipos de Contenido → Crear Nuevo
```

### Paso 2: Información Básica
```
Nombre: "Productos"
Descripción: "Catálogo de productos de la tienda"
```

### Paso 3: Agregar Campos
Arrastra campos desde la paleta:

#### Ejemplo: Plantilla de Producto
```
1. 📝 Nombre del Producto (Texto Corto) - Obligatorio
2. 💰 Precio (Número) - Obligatorio  
3. 📄 Descripción (Texto Largo) - Obligatorio
4. 🖼️ Imagen Principal (Media) - Obligatorio
5. 📦 En Stock (Sí/No) - Obligatorio
6. 🏷️ Categoría (Texto Corto) - Opcional
7. ⭐ Calificación (Número) - Opcional
```

### Paso 4: Configurar Cada Campo
- **Etiqueta**: Nombre visible en el formulario
- **Tipo**: Seleccionar el tipo apropiado
- **Obligatorio**: Marcar si es requerido
- **API ID**: Se genera automáticamente

### Paso 5: Guardar y Usar
Una vez guardada, la plantilla estará disponible para crear contenido.

## 📋 Ejemplos de Plantillas por Industria

### 🏖️ Agencia de Viajes

#### Plantilla: "Destinos"
```
- Nombre del Destino (Texto Corto) ✅
- País (Texto Corto) ✅
- Descripción (Texto Largo) ✅
- Imagen Principal (Media) ✅
- Galería (Media)
- Mejor Época para Visitar (Texto Corto)
- Clima Promedio (Texto Corto)
- Actividades Principales (Texto Largo)
- Presupuesto Estimado (Número)
```

#### Plantilla: "Hoteles"
```
- Nombre del Hotel (Texto Corto) ✅
- Destino (Texto Corto) ✅
- Estrellas (Número) ✅
- Descripción (Texto Largo) ✅
- Precio por Noche (Número) ✅
- Imágenes (Media) ✅
- Servicios Incluidos (Texto Largo)
- WiFi Gratis (Sí/No)
- Piscina (Sí/No)
- Desayuno Incluido (Sí/No)
```

### 🛍️ E-commerce

#### Plantilla: "Productos"
```
- Nombre (Texto Corto) ✅
- Precio (Número) ✅
- Descripción (Texto Largo) ✅
- Imagen Principal (Media) ✅
- Galería (Media)
- SKU (Texto Corto) ✅
- Stock (Número) ✅
- En Oferta (Sí/No)
- Precio Oferta (Número)
- Categoría (Texto Corto)
- Marca (Texto Corto)
- Peso (Número)
```

#### Plantilla: "Categorías"
```
- Nombre Categoría (Texto Corto) ✅
- Descripción (Texto Largo)
- Imagen (Media) ✅
- Activa (Sí/No) ✅
- Orden (Número)
- SEO Título (Texto Corto)
- SEO Descripción (Texto Largo)
```

### 📰 Blog/Revista

#### Plantilla: "Artículos"
```
- Título (Texto Corto) ✅
- Contenido (Texto Largo) ✅
- Imagen Destacada (Media) ✅
- Resumen (Texto Largo)
- Autor (Texto Corto) ✅
- Fecha Publicación (Fecha) ✅
- Categoría (Texto Corto)
- Tags (Texto Corto)
- Publicado (Sí/No) ✅
```

#### Plantilla: "Autores"
```
- Nombre (Texto Corto) ✅
- Biografía (Texto Largo) ✅
- Foto (Media)
- Email (Texto Corto)
- Redes Sociales (Texto Largo)
- Especialidad (Texto Corto)
```

### 🏥 Clínica/Hospital

#### Plantilla: "Doctores"
```
- Nombre Completo (Texto Corto) ✅
- Especialidad (Texto Corto) ✅
- Biografía (Texto Largo) ✅
- Foto (Media) ✅
- Años Experiencia (Número)
- Consulta Disponible (Sí/No) ✅
- Precio Consulta (Número)
- Horarios (Texto Largo)
- Teléfono (Texto Corto)
- Email (Texto Corto)
```

#### Plantilla: "Servicios"
```
- Nombre Servicio (Texto Corto) ✅
- Descripción (Texto Largo) ✅
- Precio (Número)
- Duración (Texto Corto)
- Preparación Requerida (Texto Largo)
- Disponible (Sí/No) ✅
- Imagen (Media)
```

## 🔧 Uso Programático

### Crear Plantilla via API
```javascript
const response = await fetch('/api/content-types', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Productos',
    apiIdentifier: 'productos',
    description: 'Catálogo de productos',
    fields: [
      { label: 'Nombre', apiIdentifier: 'nombre', type: 'TEXT', isRequired: true },
      { label: 'Precio', apiIdentifier: 'precio', type: 'NUMBER', isRequired: true },
      { label: 'Descripción', apiIdentifier: 'descripcion', type: 'RICH_TEXT', isRequired: true }
    ]
  })
});
```

### Crear Contenido
```javascript
const producto = await fetch('/api/content-entries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contentTypeId: 'productos-id',
    data: {
      nombre: 'iPhone 15',
      precio: 999,
      descripcion: 'El nuevo iPhone con tecnología avanzada'
    },
    status: 'published'
  })
});
```

## 💡 Mejores Prácticas

### ✅ Recomendaciones
- **Nombres descriptivos**: Usa nombres claros para campos
- **Campos obligatorios**: Marca como obligatorios los campos esenciales
- **Organización lógica**: Ordena campos de manera intuitiva
- **Validación**: Usa tipos de campo apropiados

### ❌ Evitar
- Demasiados campos opcionales
- Nombres de campo confusos
- Duplicar información entre plantillas
- Campos sin propósito claro

## 🎯 Resultado

Con el constructor de plantillas de CMS Nova, cualquier usuario puede:

✅ **Crear tipos de contenido** sin programar
✅ **Personalizar campos** según sus necesidades
✅ **Gestionar contenido** con formularios automáticos
✅ **Consumir via API** para mostrar en el frontend
✅ **Escalar fácilmente** agregando nuevos campos

¡Tu CMS se adapta a cualquier negocio sin límites!

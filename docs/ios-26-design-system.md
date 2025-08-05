# iOS 26 Design System - Nova CMS Admin

## 📱 Visión General

Este documento describe la implementación completa del sistema de diseño iOS 26 en Nova CMS Admin Dashboard. El diseño está inspirado en las últimas tendencias de Apple y proporciona una experiencia de usuario moderna, fluida y familiar.

## 🎨 Características Principales

### Glassmorphism Avanzado
- Efectos de vidrio con blur y saturación
- Bordes sutiles y sombras naturales
- Transparencias calculadas para legibilidad

### Tipografía SF Pro
- SF Pro Display para títulos y encabezados
- SF Pro Text para contenido y cuerpo
- Jerarquía tipográfica completa de iOS

### Paleta de Colores iOS
- Colores oficiales del sistema iOS
- Variables CSS para consistencia
- Adaptación automática a contextos

### Espaciado 8pt Grid
- Sistema de espaciado consistente
- Múltiplos de 8pt para armonía visual
- Responsive design integrado

## 🛠️ Implementación Técnica

### 1. Configuración de Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Fuentes iOS
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
        'sf-display': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'sf-text': ['SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      
      // Colores iOS
      colors: {
        ios: {
          primary: '#007AFF',
          secondary: '#5856D6',
          success: '#34C759',
          warning: '#FF9500',
          danger: '#FF3B30',
          // ... más colores
        }
      },
      
      // Border Radius iOS
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px', 
        'ios-xl': '20px',
        'ios-2xl': '24px',
        'ios-3xl': '28px',
      },
      
      // Sombras iOS
      boxShadow: {
        'ios': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'ios-lg': '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.06)',
        'ios-xl': '0 4px 16px rgba(0, 0, 0, 0.08), 0 12px 48px rgba(0, 0, 0, 0.12)',
      },
      
      // Animaciones iOS
      animation: {
        'ios-bounce': 'ios-bounce 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ios-fade-in': 'ios-fade-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Espaciado iOS
      spacing: {
        'ios': '16px',
        'ios-lg': '24px', 
        'ios-xl': '32px',
        'ios-2xl': '40px',
        'ios-3xl': '48px',
      }
    },
  },
  plugins: [
    // Plugin personalizado para componentes iOS
    function({ addComponents }) {
      addComponents({
        '.ios-menu-item': {
          'border-radius': '12px',
          'transition': 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            'border-radius': '12px !important',
            'background': 'var(--ios-surface-secondary)',
            'transform': 'scale(1.02) translateY(-1px)',
          }
        },
        '.ios-section-header': {
          'border-radius': '20px',
          'transition': 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            'border-radius': '20px !important',
            'background': 'var(--ios-surface-secondary)',
            'transform': 'scale(1.01) translateY(-1px)',
          }
        }
      })
    }
  ],
};
```

### 2. CSS Global (globals.css)

```css
/* Variables CSS iOS */
:root {
  --ios-primary: #007AFF;
  --ios-secondary: #5856D6;
  --ios-success: #34C759;
  --ios-warning: #FF9500;
  --ios-danger: #FF3B30;
  --ios-gray-1: #F2F2F7;
  --ios-gray-2: #E5E5EA;
  --ios-gray-3: #D1D1D6;
  --ios-gray-4: #C7C7CC;
  --ios-gray-5: #AEAEB2;
  --ios-gray-6: #8E8E93;
  --ios-surface: rgba(255, 255, 255, 0.92);
  --ios-surface-secondary: rgba(242, 242, 247, 0.8);
}

/* Efectos Glass iOS */
.ios-glass {
  background: var(--ios-surface);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 0.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.ios-glass-secondary {
  background: var(--ios-surface-secondary);
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Botones iOS */
.ios-button-primary {
  background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
  border: none;
  box-shadow: 
    0 2px 8px rgba(0, 122, 255, 0.25),
    0 8px 32px rgba(0, 122, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.ios-button-secondary {
  background: var(--ios-surface);
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  color: var(--ios-primary);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 4px 16px rgba(0, 0, 0, 0.08);
}

/* Interacciones iOS */
.ios-interactive {
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.ios-interactive:hover {
  transform: scale(1.02) translateY(-1px);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 12px 48px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.ios-interactive:active {
  transform: scale(0.98) translateY(0px);
  transition: all 0.1s ease;
}
```

### 3. Tipografía iOS

```css
/* Jerarquía Tipográfica iOS */
.ios-title-1 {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.ios-title-2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.ios-title-3 {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.ios-headline {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.005em;
}

.ios-body {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.4;
}

.ios-callout {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.35;
}

.ios-subhead {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.35;
}

.ios-footnote {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.35;
}

.ios-caption {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.35;
}
```

## 🧩 Componentes Implementados

### 1. Dashboard Principal
**Archivo**: `src/components/admin/dashboard/DashboardPage/Dashboard.tsx`

**Características**:
- Fondo con gradientes iOS y orbes flotantes
- Botón flotante estilo iOS
- Layout responsive con espaciado iOS

**Clases clave**:
```tsx
<div className="min-h-screen relative bg-ios-gray-1">
  <div className="container mx-auto px-ios-lg py-ios-2xl max-w-7xl relative">
    <Button className="h-14 w-14 rounded-ios-xl ios-button-primary ios-interactive shadow-ios-button">
```

### 2. WelcomeHeader
**Archivo**: `src/components/admin/dashboard/DashboardPage/components/WelcomeHeader.tsx`

**Características**:
- Badge de estado con glass effect
- Tipografía SF Pro Display/Text
- Card de usuario estilo widget iOS

**Clases clave**:
```tsx
<h1 className="ios-title-1 bg-gradient-to-r from-black via-ios-primary to-ios-secondary bg-clip-text text-transparent font-sf-display">
<div className="ios-glass-secondary px-ios py-ios rounded-ios-lg shadow-ios ios-interactive">
```

### 3. StatsGrid
**Archivo**: `src/components/admin/dashboard/DashboardPage/components/StatsGrid.tsx`

**Características**:
- Cards estilo widgets iOS
- Iconos con gradientes iOS
- Badges de tendencia con colores iOS

**Clases clave**:
```tsx
<div className="ios-glass rounded-ios-xl shadow-ios ios-interactive">
<div className="ios-title-2 text-black tabular-nums font-sf-display">
```

### 4. QuickActionsGrid
**Archivo**: `src/components/admin/dashboard/DashboardPage/components/QuickActionsGrid.tsx`

**Características**:
- Cards estilo aplicaciones iOS
- Iconos con gradientes vibrantes
- Call-to-action con colores iOS

**Clases clave**:
```tsx
<div className="ios-glass rounded-ios-xl shadow-ios ios-interactive">
<h3 className="ios-headline text-black font-sf-display">
```

### 5. Sidebar
**Archivo**: `src/components/admin/dashboard/Sidebar.tsx`

**Características**:
- Menu items estilo apps iOS
- Secciones colapsables con glass effect
- Optimizado para evitar parpadeo

**Clases clave**:
```tsx
<Link className="ios-menu-item group relative flex items-center gap-3 px-ios py-3 ios-callout font-sf-text">
<div className="ios-section-header flex items-center justify-between w-full p-ios border">
```

### 6. Header
**Archivo**: `src/components/admin/dashboard/Header.tsx`

**Características**:
- Barra superior con glass effect
- Buscador estilo iOS
- Dropdown menu iOS style

**Clases clave**:
```tsx
<header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between ios-glass-secondary border-b border-white/10 px-ios-lg shadow-ios">
```

### 7. Button Component
**Archivo**: `src/components/ui/button.tsx`

**Características**:
- Variantes iOS (primary, secondary, outline)
- Border-radius iOS consistente
- Tipografía SF Pro

**Clases clave**:
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ios-lg ios-callout font-semibold transition-all duration-300 ios-interactive font-sf-text"
)
```

## 🎯 Guía de Uso

### Colores
```tsx
// Colores principales
text-ios-primary      // #007AFF
text-ios-secondary    // #5856D6
text-ios-success      // #34C759
text-ios-warning      // #FF9500
text-ios-danger       // #FF3B30

// Grises iOS
text-ios-gray-1       // #F2F2F7
text-ios-gray-6       // #8E8E93
bg-ios-gray-1         // Fondo principal
```

### Tipografía
```tsx
// Títulos
className="ios-title-1 font-sf-display"    // 34px, bold
className="ios-title-2 font-sf-display"    // 28px, bold
className="ios-title-3 font-sf-display"    // 22px, semibold

// Contenido
className="ios-headline font-sf-display"   // 17px, semibold
className="ios-body font-sf-text"          // 17px, regular
className="ios-callout font-sf-text"       // 16px, regular
className="ios-subhead font-sf-text"       // 15px, regular
className="ios-footnote font-sf-text"      // 13px, regular
className="ios-caption font-sf-text"       // 12px, regular
```

### Espaciado
```tsx
// Padding/Margin
p-ios           // 16px
p-ios-lg        // 24px
p-ios-xl        // 32px
p-ios-2xl       // 40px
p-ios-3xl       // 48px

// Gaps
gap-ios         // 16px
gap-ios-lg      // 24px
space-y-ios     // 16px vertical
```

### Border Radius
```tsx
rounded-ios         // 12px
rounded-ios-lg      // 16px
rounded-ios-xl      // 20px
rounded-ios-2xl     // 24px
rounded-ios-3xl     // 28px
```

### Efectos Glass
```tsx
ios-glass           // Glass básico
ios-glass-secondary // Glass más opaco
```

### Sombras
```tsx
shadow-ios          // Sombra básica iOS
shadow-ios-lg       // Sombra media iOS
shadow-ios-xl       // Sombra grande iOS
shadow-ios-button   // Sombra específica para botones
```

### Interacciones
```tsx
ios-interactive     // Hover y active states iOS
ios-menu-item       // Específico para items de menú
ios-section-header  // Específico para headers de sección
```

## 🚀 Mejores Prácticas

### 1. Consistencia Tipográfica
- Usar siempre `font-sf-display` para títulos
- Usar `font-sf-text` para contenido
- Respetar la jerarquía tipográfica iOS

### 2. Espaciado Consistente
- Usar múltiplos del sistema iOS (16px base)
- Mantener consistencia en padding y margins
- Usar el sistema de gaps iOS

### 3. Colores Semánticos
- Usar colores iOS para estados (success, warning, danger)
- Mantener contraste adecuado
- Usar variables CSS para consistencia

### 4. Animaciones Fluidas
- Usar curvas de bezier iOS: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Duraciones entre 200-300ms
- Evitar animaciones excesivas

### 5. Responsive Design
- Diseño mobile-first
- Breakpoints consistentes
- Adaptación de espaciado en móviles

## 🔧 Troubleshooting

### Problema: Hover pierde border-radius
**Solución**: Usar clases personalizadas `ios-menu-item` o `ios-section-header`

### Problema: Parpadeo en navegación
**Solución**: Evitar animaciones CSS complejas, usar transiciones simples

### Problema: Tipografía inconsistente
**Solución**: Siempre especificar `font-sf-display` o `font-sf-text`

### Problema: Colores no coinciden
**Solución**: Usar variables CSS definidas en `:root`

## 📱 Resultado Final

El sistema de diseño iOS 26 implementado proporciona:

- ✅ **Experiencia familiar**: Interfaz similar a iOS nativo
- ✅ **Performance optimizada**: Sin parpadeos ni lag
- ✅ **Consistencia visual**: Colores, tipografía y espaciado unificados
- ✅ **Responsive design**: Funciona en todos los dispositivos
- ✅ **Mantenibilidad**: Código limpio y bien documentado
- ✅ **Accesibilidad**: Contraste y navegación optimizados

---

**Autor**: Kiro AI Assistant  
**Fecha**: 2025  
**Versión**: 1.0  
**Proyecto**: Nova CMS Admin Dashboard
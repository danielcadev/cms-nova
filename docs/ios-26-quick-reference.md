# iOS 26 Design System - Referencia Rápida

## 🎨 Clases CSS Principales

### Colores iOS
```css
/* Principales */
text-ios-primary      /* #007AFF - Azul iOS */
text-ios-secondary    /* #5856D6 - Púrpura iOS */
text-ios-success      /* #34C759 - Verde iOS */
text-ios-warning      /* #FF9500 - Naranja iOS */
text-ios-danger       /* #FF3B30 - Rojo iOS */

/* Grises */
text-ios-gray-1       /* #F2F2F7 - Gris muy claro */
text-ios-gray-6       /* #8E8E93 - Gris medio */
bg-ios-gray-1         /* Fondo principal */
```

### Tipografía iOS
```css
/* Títulos */
ios-title-1 font-sf-display     /* 34px, bold */
ios-title-2 font-sf-display     /* 28px, bold */
ios-title-3 font-sf-display     /* 22px, semibold */

/* Contenido */
ios-headline font-sf-display    /* 17px, semibold */
ios-body font-sf-text          /* 17px, regular */
ios-callout font-sf-text       /* 16px, regular */
ios-subhead font-sf-text       /* 15px, regular */
ios-footnote font-sf-text      /* 13px, regular */
ios-caption font-sf-text       /* 12px, regular */
```

### Espaciado iOS
```css
/* Padding/Margin */
p-ios           /* 16px */
p-ios-lg        /* 24px */
p-ios-xl        /* 32px */
p-ios-2xl       /* 40px */
p-ios-3xl       /* 48px */

/* Gaps */
gap-ios         /* 16px */
gap-ios-lg      /* 24px */
space-y-ios     /* 16px vertical */
```

### Border Radius iOS
```css
rounded-ios         /* 12px */
rounded-ios-lg      /* 16px */
rounded-ios-xl      /* 20px */
rounded-ios-2xl     /* 24px */
rounded-ios-3xl     /* 28px */
```

### Efectos Glass
```css
ios-glass           /* Glass básico con blur */
ios-glass-secondary /* Glass más opaco */
```

### Sombras iOS
```css
shadow-ios          /* Sombra básica */
shadow-ios-lg       /* Sombra media */
shadow-ios-xl       /* Sombra grande */
shadow-ios-button   /* Sombra para botones */
```

### Interacciones
```css
ios-interactive     /* Hover y active states */
ios-menu-item       /* Items de menú con hover perfecto */
ios-section-header  /* Headers de sección con hover */
```

### Botones iOS
```css
ios-button-primary    /* Botón principal con gradiente */
ios-button-secondary  /* Botón secundario con glass */
```

## 🧩 Componentes Ejemplo

### Card iOS Básica
```tsx
<div className="ios-glass rounded-ios-xl shadow-ios p-ios-lg">
  <h3 className="ios-headline font-sf-display text-black mb-2">Título</h3>
  <p className="ios-body font-sf-text text-ios-gray-6">Contenido</p>
</div>
```

### Botón iOS
```tsx
<Button className="ios-button-primary rounded-ios-lg px-ios-lg py-ios ios-callout font-sf-text">
  Acción Principal
</Button>
```

### Menu Item iOS
```tsx
<Link className="ios-menu-item group flex items-center gap-3 px-ios py-3 ios-callout font-sf-text text-ios-gray-6 hover:text-black">
  <Icon className="h-4 w-4" />
  <span>Opción de Menú</span>
</Link>
```

### Header iOS
```tsx
<header className="ios-glass-secondary border-b border-white/10 px-ios-lg py-ios shadow-ios">
  <h1 className="ios-title-3 font-sf-display text-black">Título de Página</h1>
</header>
```

### Widget iOS
```tsx
<div className="ios-glass rounded-ios-xl shadow-ios p-ios-lg ios-interactive">
  <div className="flex items-center gap-3 mb-ios">
    <div className="w-10 h-10 bg-gradient-to-br from-ios-primary to-ios-secondary rounded-ios-lg flex items-center justify-center">
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div>
      <h3 className="ios-headline font-sf-display text-black">Estadística</h3>
      <p className="ios-caption font-sf-text text-ios-gray-6">Descripción</p>
    </div>
  </div>
  <div className="ios-title-2 font-sf-display text-black">1,234</div>
</div>
```

## 🎯 Patrones Comunes

### Layout Principal
```tsx
<div className="min-h-screen bg-ios-gray-1">
  <div className="container mx-auto px-ios-lg py-ios-2xl max-w-7xl">
    {/* Contenido */}
  </div>
</div>
```

### Grid de Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-ios-lg">
  {/* Cards aquí */}
</div>
```

### Sidebar iOS
```tsx
<aside className="ios-glass-secondary shadow-ios-xl border-r border-white/10">
  <nav className="p-ios-lg space-y-ios">
    {/* Menu items aquí */}
  </nav>
</aside>
```

## 🚀 Variables CSS Disponibles

```css
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
```

## ⚡ Animaciones iOS

### Curva de Bezier iOS
```css
transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Hover States
```css
.ios-interactive:hover {
  transform: scale(1.02) translateY(-1px);
}

.ios-interactive:active {
  transform: scale(0.98);
}
```

## 📱 Breakpoints Recomendados

```css
/* Mobile First */
sm: '640px'   /* Tablet pequeña */
md: '768px'   /* Tablet */
lg: '1024px'  /* Desktop pequeño */
xl: '1280px'  /* Desktop */
2xl: '1536px' /* Desktop grande */
```

---

**💡 Tip**: Siempre combinar las clases iOS para obtener el mejor resultado:
```tsx
className="ios-glass rounded-ios-xl shadow-ios p-ios-lg ios-interactive"
```
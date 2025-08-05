---
description: 'Nova CMS - Modular admin system development guidelines'
applyTo: '**/*.tsx, **/*.ts, **/*.jsx, **/*.js'
---

# Nova CMS Development Instructions

## Project Overview
Nova CMS is a modular, reusable admin library (`@nova/cms-admin`) for Next.js projects, with **DUAL ARCHITECTURE** for content management:

### 🎯 Template System (Formularios Predefinidos)
Specialized forms for specific content types like tourist plans:
- **Location**: `src/components/forms/TemplateSystem/TouristPlan/`
- **Components**: `EditPlanForm.tsx`, `CreatePlanForm.tsx` + sections
- **Schema**: Zod schemas like `planSchema` for validation
- **Storage**: Dedicated database tables (plans, itinerary, etc.)
- **Use Case**: Fixed-structure content with complex business logic

### 🧱 Headless CMS (Sistema Flexible) ✅ IMPLEMENTED
Dynamic content creation system for custom content types:
- **Location**: `src/components/forms/HeadlessCMS/`
- **Components**: `ContentTypeForm.tsx`, `FieldsBuilder.tsx`, `DynamicContentForm.tsx`, `ContentEntryList.tsx`, `ContentEntryEditor.tsx`
- **API**: `/api/content/` for CRUD operations  
- **Storage**: Generic `ContentEntry` table with JSON field data
- **Use Case**: Flexible content created by users (blogs, articles, etc.)

## Core Architecture Patterns

### Configuration-Driven Design
All features controlled via `NovaConfig` - never hardcode capabilities:
```typescript
// Components receive config through NovaAdminProvider
<NovaAdminProvider config={defaultConfig}>
  {children}
</NovaAdminProvider>
```
- Feature flags: `config.features.*`
- Auth roles: `config.auth.adminRoles` 
- UI theming: `config.ui.*`

### Modern Section-Based Forms (Templates)
**CURRENT ARCHITECTURE**: Section-based layout with Collapsible components:

**Template Form Structure**:
```typescript
// Modern pattern in src/components/forms/TemplateSystem/TouristPlan/
- EditPlanForm.tsx           // Main editor with collapsible sections
- CreatePlanForm.tsx         // Creator form
- sections/
  ├── BasicInfoSection.tsx   // Info, URLs, destination
  ├── IncludesSection.tsx    // Services included/excluded
  ├── ItinerarySection.tsx   // Day-by-day itinerary
  ├── PricingSection.tsx     // Price options and currencies
  └── VideoSection.tsx       // YouTube promotional video
```

**Key Features**:
- Uses `FormProvider` context for data sharing between sections
- Auto-save via `useFormPersistence` hook with 2000ms debounce
- Sections wrapped in shadcn/ui `Collapsible` components
- Each section manages its own internal state

**Legacy Pattern** (⚠️ DEPRECATED):
- Old step-based navigation in `/PlanForm/` directory
- Uses `StepRenderer.tsx` - DO NOT USE for new development

### API Layer Organization
```
src/app/api/          # Next.js route handlers
src/services/api/     # Business logic handlers  
src/services/plans/   # Domain queries
utils/api-response.ts # Standardized responses
```
Always use `ApiResponseBuilder.success()` and `ApiResponseBuilder.error()` for consistent API responses.

### Database Patterns
- All queries go through service objects like `planQueries` in `src/services/plans/queries.ts`
- JSON fields require explicit casting: `plan.mainImage as unknown as MainImage`
- Use `formatPlanData()` and `validateRequiredFields()` before DB operations
- Prisma transactions with detailed logging (🟢/🔴 prefixes)

### UI/UX Design Standards
- **iPhone-style interface** - Clean, minimalist design with smooth animations
- Use rounded corners, subtle shadows, and glass-morphism effects
- Consistent spacing following iOS design principles
- Framer Motion for smooth transitions and micro-interactions
- **shadcn/ui components** - Primary UI component library with custom styling
- Radix UI components styled to match iPhone aesthetic

## Critical Implementation Details

### Current Form Architecture (Sections-Based)
Modern form structure moved from steps to **sections** pattern:
- `EditPlanForm.tsx` and `CreatePlanForm.tsx` use section-based layout
- Sections: `BasicInfoSection`, `IncludesSection`, `ItinerarySection`, `PricingSection`, `VideoSection`
- Each section is self-contained with Collapsible UI from shadcn/ui
- Form uses `FormProvider` context for data sharing between sections
- Auto-save implemented via `useFormPersistence` hook with 2000ms debounce

### Authentication Patterns
- `better-auth` with Prisma adapter + admin plugin
- First user automatically becomes admin (see `src/lib/auth.ts`)
- API routes secured by auth middleware
- Role checking via configurable `adminRoles` array

### Hook Composition
- `usePlans()` - CRUD operations with optimistic updates
- `useFormPersistence()` - Auto-save and localStorage management
- `usePlanForm()` - Alias generation and form utilities
- Custom hooks follow single responsibility principle

## Development Workflows

### Template System Development (Recommended for Complex Forms)
**When to use**: Fixed structure content with specific business logic

1. Create new template folder in `src/components/forms/TemplateSystem/[TemplateName]/`
2. Define Zod schema in `src/schemas/`
3. Create section components in `sections/` subdirectory
4. Build main form following the TouristPlan pattern:
```typescript
<Collapsible defaultOpen={true}>
  <CollapsibleTrigger className="flex w-full items-center justify-between...">
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-blue-600" />
      <div className="text-left">
        <h3 className="font-semibold">Section Title</h3>
        <p className="text-sm text-gray-500">Description</p>
      </div>
    </div>
    <ChevronsUpDown className="h-4 w-4 transition-transform" />
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-4">
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <YourSectionComponent />
    </div>
  </CollapsibleContent>
</Collapsible>
```
5. Use `useFormContext()` hook for form data access within sections
6. Implement auto-save with `useFormPersistence` hook
7. Add Server Actions for data persistence

### Headless CMS Development (Already Implemented)
**When to use**: Dynamic content types that users can configure

✅ **Available Components**:
- `ContentTypeForm.tsx` - Create/edit content types
- `FieldsBuilder.tsx` - Dynamic field builder with drag & drop
- `DynamicContentForm.tsx` - Universal form generator
- `ContentEntryList.tsx` - List entries with search/pagination
- `ContentEntryEditor.tsx` - Edit individual entries
- `ContentPreview.tsx` - Formatted content preview
- `FieldTypeSelector.tsx` - Visual field type picker

✅ **Usage**:
1. Navigate to admin interface for content type management
2. Create new content types with custom fields (TEXT, RICH_TEXT, NUMBER, BOOLEAN, DATE, MEDIA)
3. Content automatically stored in `ContentEntry` table with JSON data
4. Use existing API endpoints for CRUD operations
5. Dynamic validation based on field configuration

### Choosing Between Systems
| Template System | Headless CMS |
|----------------|--------------|
| ✅ Fixed structure (tourist plans) | ✅ Dynamic content (blogs, articles) |
| ✅ Complex validation rules | ✅ User-defined content types |
| ✅ Specialized UX flows | ✅ Simple CRUD operations |
| ✅ Business logic integration | ✅ Maximum flexibility |
| ❌ Hard to modify structure | ❌ Limited validation options |

### API Development  
1. Create handler in `src/services/api/[domain]/handlers.ts`
2. Add queries in `src/services/[domain]/queries.ts`
3. Use transformers in `src/services/api/[domain]/transformers.ts`
4. Create route in `src/app/api/[domain]/route.ts`
5. Include comprehensive error handling with console logging

### Key Commands
```bash
npm run dev              # Development with Turbo
npx prisma db push       # Sync schema changes
npx prisma studio        # Database browser
npx prisma generate      # Update Prisma client
```

### Debugging
- Form state logged to console in development
- API operations have detailed 🟢/🔴 logging
- Use `npx prisma studio` for database inspection
- Check localStorage for persisted form data

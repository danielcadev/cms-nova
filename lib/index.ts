// CMS Nova - Librería Principal
// Exporta los componentes y funcionalidades esenciales para uso externo

// Componente principal
export { NovaAdminProvider } from './components/NovaAdminProvider';

// Tipos principales
export type {
  NovaConfig,
  User,
  ContentType,
  Plan,
  AuthUser
} from './types';

// Configuración
export { createNovaConfig } from './config/config';

// Estilos CSS (se debe importar por separado)
// import '@nova/cms-admin/dist/styles.css'

// Nota: Para usar componentes específicos, importar directamente desde src/
// Ejemplo: import { Dashboard } from '@nova/cms-admin/src/components/admin/dashboard'

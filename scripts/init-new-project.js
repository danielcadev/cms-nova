#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Inicializando CMS Nova en nuevo proyecto...\n');

// Función para crear directorios
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Creado: ${dirPath}`);
  }
}

// Función para crear archivos
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  createDir(dir);
  fs.writeFileSync(filePath, content);
  console.log(`📄 Creado: ${filePath}`);
}

// Obtener directorio de destino
const targetDir = process.argv[2] || process.cwd();

console.log(`📍 Directorio destino: ${targetDir}\n`);

// 1. Crear .env
const envContent = `# Base de datos PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/cms_nova"

# Better Auth
BETTER_AUTH_SECRET="tu-clave-secreta-muy-larga-y-segura-de-al-menos-32-caracteres"
BETTER_AUTH_URL="http://localhost:3000"

# AWS S3 (opcional)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_BUCKET_NAME=""
`;

createFile(path.join(targetDir, '.env'), envContent);

// 2. Crear tsconfig.json
const tsconfigContent = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts", 
    "**/*.ts", 
    "**/*.tsx", 
    ".next/types/**/*.ts",
    "src/**/*"
  ],
  "exclude": ["node_modules"]
}
`;

createFile(path.join(targetDir, 'tsconfig.json'), tsconfigContent);

// 3. Crear next.config.mjs
const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};

export default nextConfig;
`;

createFile(path.join(targetDir, 'next.config.mjs'), nextConfigContent);

// 4. Crear tailwind.config.js
const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@danielcadev/cms-nova/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

createFile(path.join(targetDir, 'tailwind.config.js'), tailwindConfigContent);

// 5. Crear src/app/layout.tsx
const layoutContent = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@danielcadev/cms-nova/dist/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi CMS Admin',
  description: 'Panel de administración con CMS Nova',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`;

createFile(path.join(targetDir, 'src/app/layout.tsx'), layoutContent);

// 6. Crear src/app/globals.css
const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Importar estilos de CMS Nova */
@import '@danielcadev/cms-nova/dist/styles.css';
`;

createFile(path.join(targetDir, 'src/app/globals.css'), globalsCssContent);

// 7. Crear src/app/page.tsx
const pageContent = `export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 CMS Nova
        </h1>
        <p className="text-gray-600 mb-8">
          Tu CMS está listo para usar
        </p>
        <div className="space-x-4">
          <a 
            href="/signup" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Crear primer usuario
          </a>
          <a 
            href="/admin" 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Ir al Admin
          </a>
        </div>
      </div>
    </div>
  )
}
`;

createFile(path.join(targetDir, 'src/app/page.tsx'), pageContent);

// 8. Crear src/app/signup/page.tsx
const signupPageContent = `import { SignUp } from '@danielcadev/cms-nova/src/components/admin/auth/SignUp'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp />
    </div>
  )
}
`;

createFile(path.join(targetDir, 'src/app/signup/page.tsx'), signupPageContent);

// 9. Crear src/app/admin/layout.tsx
const adminLayoutContent = `import { AdminLayout } from '@danielcadev/cms-nova/src/components/admin/AdminLayout'

export default function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}
`;

createFile(path.join(targetDir, 'src/app/admin/layout.tsx'), adminLayoutContent);

// 10. Crear src/app/admin/page.tsx
const adminPageContent = `import { Dashboard } from '@danielcadev/cms-nova/src/components/admin/dashboard/DashboardPage/Dashboard'

export default function AdminDashboard() {
  return <Dashboard />
}
`;

createFile(path.join(targetDir, 'src/app/admin/page.tsx'), adminPageContent);

// 11. Crear src/app/admin/auth/SignIn/page.tsx
const signinPageContent = `import { SignIn } from '@danielcadev/cms-nova/src/components/admin/auth/SignIn'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn />
    </div>
  )
}
`;

createFile(path.join(targetDir, 'src/app/admin/auth/SignIn/page.tsx'), signinPageContent);

// 12. Crear src/app/admin/users/page.tsx
const usersPageContent = `import { UsersPage } from '@danielcadev/cms-nova/src/components/admin/dashboard/UsersPage'

export default function UsersPageRoute() {
  return <UsersPage />
}
`;

createFile(path.join(targetDir, 'src/app/admin/users/page.tsx'), usersPageContent);

// 13. Crear src/app/admin/content-types/page.tsx
const contentTypesPageContent = `import { ContentTypesPageContent } from '@danielcadev/cms-nova/src/components/admin/content-types/ContentTypesManager/ContentTypesPageContent'

export default function ContentTypesPage() {
  return <ContentTypesPageContent />
}
`;

createFile(path.join(targetDir, 'src/app/admin/content-types/page.tsx'), contentTypesPageContent);

// 14. Crear src/lib/auth.ts
const authContent = `import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
})
`;

createFile(path.join(targetDir, 'src/lib/auth.ts'), authContent);

// 15. Crear src/app/api/auth/[...betterauth]/route.ts
const authRouteContent = `import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

const { GET, POST } = toNextJsHandler(auth)

export { GET, POST }
`;

createFile(path.join(targetDir, 'src/app/api/auth/[...betterauth]/route.ts'), authRouteContent);

// 16. Copiar schema de Prisma
const schemaSource = path.join(__dirname, '../prisma/schema.prisma');
const schemaTarget = path.join(targetDir, 'prisma/schema.prisma');

if (fs.existsSync(schemaSource)) {
  const schemaContent = fs.readFileSync(schemaSource, 'utf8');
  createFile(schemaTarget, schemaContent);
} else {
  console.log('⚠️  No se encontró schema.prisma en el proyecto CMS Nova');
}

console.log('\n✅ Estructura completa creada!');
console.log('\n📋 Próximos pasos:');
console.log('1. npm install @danielcadev/cms-nova@beta');
console.log('2. npm install better-auth @prisma/client prisma');
console.log('3. npm install @aws-sdk/client-s3 @radix-ui/react-dialog @radix-ui/react-dropdown-menu');
console.log('4. npm install lucide-react class-variance-authority clsx tailwind-merge');
console.log('5. npm install @hookform/resolvers react-hook-form zod');
console.log('6. npx prisma db push');
console.log('7. npx prisma generate');
console.log('8. npm run dev');
console.log('\n🎯 Luego ve a: http://localhost:3000/signup');

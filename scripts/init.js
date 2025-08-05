#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(`
🚀 Iniciando setup de CMS Nova...

   _____  __  __   _____   _   _                    
  / ____||  \\/  | / ____| | \\ | |                   
 | |     | |\\/| || (___   |  \\| | _____   ____ _ 
 | |     | |  | | \\___ \\  | . \` |/ _ \\ \\ / / _\` |
 | |____ | |  | | ____) | | |\\  | (_) \\ V / (_| |
  \\_____||_|  |_||_____/  |_| \\_|\\___/ \\_/ \\__,_|
                                                  
`);

// Función para ejecutar comandos
function runCommand(command, description) {
  console.log(`\\n📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completado`);
  } catch (error) {
    console.error(`❌ Error en: ${description}`);
    process.exit(1);
  }
}

// Función para crear archivos
function createFile(filePath, content, description) {
  console.log(`\\n📝 Creando ${description}...`);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${description} creado: ${filePath}`);
}

// 1. Verificar si estamos en un proyecto Next.js
if (!fs.existsSync('package.json')) {
  console.error('❌ No se encontró package.json. Ejecuta este script en la raíz de tu proyecto Next.js');
  process.exit(1);
}

// 2. Instalar dependencias
runCommand('npm install better-auth @prisma/client', 'Instalando dependencias de CMS Nova');
runCommand('npm install -D prisma', 'Instalando Prisma CLI');

// 3. Crear archivo .env.local si no existe
const envContent = \`# CMS Nova Configuration
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_base_datos"
NOVA_AUTH_SECRET="cambia-este-secret-por-uno-de-32-caracteres-minimo"
NEXT_PUBLIC_AUTH_URL="http://localhost:3000"
\`;

if (!fs.existsSync('.env.local')) {
  createFile('.env.local', envContent, 'archivo de configuración .env.local');
  console.log('⚠️  IMPORTANTE: Configura tu DATABASE_URL en .env.local');
} else {
  console.log('\\n⚠️  .env.local ya existe, asegúrate de tener estas variables:');
  console.log('   - DATABASE_URL');
  console.log('   - NOVA_AUTH_SECRET');
  console.log('   - NEXT_PUBLIC_AUTH_URL');
}

// 4. Crear schema de Prisma
const schemaContent = \`// Prisma schema generado por CMS Nova
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// CMS Nova - Modelos base
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  role          String    @default("USER")
  accounts      Account[]
  banned        Boolean?
  banReason     String?
  banExpires    DateTime?
  sessions      Session[]

  @@map("user")
}

model Account {
  id           String    @id @default(cuid())
  userId       String
  providerId   String?
  accessToken  String?   @db.Text
  refreshToken String?   @db.Text
  expiresAt    DateTime?
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  password     String?

  accountId             String
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  createdAt             DateTime
  updatedAt             DateTime

  @@unique([userId, providerId])
  @@map("account")
}

model Session {
  id             String   @id
  expiresAt      DateTime
  token          String
  createdAt      DateTime
  updatedAt      DateTime
  ipAddress      String?
  userAgent      String?
  userId         String
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  impersonatedBy String?

  @@unique([token])
  @@map("session")
}

model Verification {
  id         String    @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime?
  updatedAt  DateTime?

  @@map("verification")
}

// Opcional: Gestión de planes/contenido
model Plan {
  id                   String   @id @default(cuid())
  mainTitle            String
  articleAlias         String   @unique
  categoryAlias        String
  promotionalText      String   @db.Text
  attractionsTitle     String
  attractionsText      String   @db.Text
  transfersTitle       String
  transfersText        String   @db.Text
  holidayTitle         String
  holidayText          String   @db.Text
  destination          String
  includes             String   @db.Text
  notIncludes          String   @db.Text
  itinerary            Json[]
  priceOptions         Json[]
  generalPolicies      String?  @db.Text
  transportOptions     Json[]
  allowGroundTransport Boolean  @default(false)
  videoUrl             String?
  mainImage            Json?
  published            Boolean  @default(false)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  @@map("plans")
}
\`;

createFile('prisma/schema.prisma', schemaContent, 'schema de Prisma');

// 5. Crear archivos del admin
const adminLayoutContent = \`import { NovaAdminProvider } from '@nova/cms-admin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración',
  description: 'Acceso restringido para administradores',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NovaAdminProvider 
      config={{
        auth: {
          secret: process.env.NOVA_AUTH_SECRET!,
          baseUrl: process.env.NEXT_PUBLIC_AUTH_URL,
          adminRoles: ['ADMIN'],
          requireEmailVerification: false
        },
        database: {
          url: process.env.DATABASE_URL!,
          provider: 'postgresql'
        },
        features: {
          users: true,
          plans: true,
          analytics: true
        },
        ui: {
          title: 'Mi Panel Admin',
          theme: 'light',
          primaryColor: '#10b981'
        }
      }}
    >
      {children}
    </NovaAdminProvider>
  );
}
\`;

const adminPageContent = \`import { AdminDashboard } from '@nova/cms-admin';

export default function AdminPage() {
  return <AdminDashboard />;
}
\`;

const loginPageContent = \`import { SignIn } from '@nova/cms-admin';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn 
        title="Acceso Administrativo"
        subtitle="Ingresa tus credenciales para continuar"
      />
    </div>
  );
}
\`;

const usersPageContent = \`import { UsersManager } from '@nova/cms-admin';

export default function UsersPage() {
  return <UsersManager />;
}
\`;

const plansPageContent = \`import { PlansManager } from '@nova/cms-admin';

export default function PlansPage() {
  return <PlansManager />;
}
\`;

const authApiContent = \`import { setupNova } from '@nova/cms-admin';

const nova = setupNova({
  auth: {
    secret: process.env.NOVA_AUTH_SECRET!,
    adminRoles: ['ADMIN']
  },
  database: {
    url: process.env.DATABASE_URL!,
    provider: 'postgresql'
  }
});

export const { GET, POST } = nova.auth.handler;
\`;

// Crear todos los archivos del admin
createFile('app/admin/layout.tsx', adminLayoutContent, 'layout del admin');
createFile('app/admin/page.tsx', adminPageContent, 'página principal del admin');
createFile('app/admin/login/page.tsx', loginPageContent, 'página de login');
createFile('app/admin/users/page.tsx', usersPageContent, 'página de usuarios');
createFile('app/admin/plans/page.tsx', plansPageContent, 'página de planes');
createFile('app/api/auth/[...all]/route.ts', authApiContent, 'API de autenticación');

// 6. Crear script para crear admin
const createAdminScript = \`const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@midominio.com';
  const password = process.argv[3] || 'admin123';
  
  console.log('🔐 Creando administrador...');
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.user.create({
      data: {
        email,
        name: 'Administrador',
        role: 'ADMIN',
        emailVerified: true,
        accounts: {
          create: {
            providerId: 'credential',
            accountId: 'admin-account',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      }
    });

    console.log('✅ Admin creado exitosamente:');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password:', password);
    console.log('\\n⚠️  IMPORTANTE: Cambia la contraseña en producción');
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  El usuario ya existe con ese email');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
\`;

createFile('scripts/create-admin.js', createAdminScript, 'script para crear admin');

// 7. Actualizar package.json con scripts útiles
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.scripts = {
  ...packageJson.scripts,
  'nova:migrate': 'prisma migrate dev',
  'nova:generate': 'prisma generate',
  'nova:studio': 'prisma studio',
  'nova:admin': 'node scripts/create-admin.js',
  'nova:setup': 'prisma migrate dev --name init && prisma generate'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('\\n✅ Scripts de CMS Nova añadidos al package.json');

// Mostrar siguiente pasos
console.log(\`
🎉 ¡Setup de CMS Nova completado!

📋 Próximos pasos:

1. 🗄️  Configura tu base de datos en .env.local
2. ⚙️  Ejecuta las migraciones:
   npm run nova:setup

3. 👤 Crea un usuario admin:
   npm run nova:admin admin@tudominio.com mipassword

4. 🚀 Inicia el servidor:
   npm run dev

5. 🔐 Accede al admin:
   http://localhost:3000/admin/login

💡 Comandos útiles:
   npm run nova:migrate  - Crear nueva migración
   npm run nova:studio   - Abrir Prisma Studio
   npm run nova:admin    - Crear nuevo admin

📖 Documentación: Ver README.md para más detalles

¡Disfruta usando CMS Nova! 🚀
\`); 
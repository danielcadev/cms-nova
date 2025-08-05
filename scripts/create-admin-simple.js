const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2] || 'admin@cms-nova.com';
  const password = process.argv[3] || 'admin123';
  
  console.log('🔐 Creando administrador...');
  
  try {
    // Verificar si ya existe un usuario con ese email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('⚠️  El usuario ya existe con ese email');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        name: 'Administrador',
        role: 'ADMIN',
        emailVerified: true,
        accounts: {
          create: {
            providerId: 'credential',
            accountId: `admin-${Date.now()}`,
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
    console.log('\n⚠️  IMPORTANTE: Cambia la contraseña en producción');
    console.log('\n🌐 Accede en: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

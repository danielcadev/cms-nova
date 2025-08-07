#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.log('❌ Por favor proporciona un nombre para el proyecto');
  console.log('💡 Uso: npx @danielcadev/create-cms-nova mi-proyecto');
  process.exit(1);
}

console.log(`\n🚀 Creando proyecto CMS Nova: ${projectName}`);
console.log('📦 Un CMS headless completo con Next.js, Prisma y Better Auth');
console.log('🎯 Clonando desde el repositorio oficial...\n');

const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.log(`❌ El directorio ${projectName} ya existe`);
  process.exit(1);
}

try {
  console.log('📥 Clonando repositorio CMS Nova...');
  execSync(`git clone https://github.com/danielcadev/cms-nova.git ${projectName}`, { stdio: 'inherit' });
  
  console.log('\n🧹 Limpiando archivos de git...');
  process.chdir(projectPath);
  
  // Eliminar .git para que sea un proyecto nuevo
  if (process.platform === 'win32') {
    execSync('rmdir /s /q .git', { stdio: 'inherit' });
  } else {
    execSync('rm -rf .git', { stdio: 'inherit' });
  }
  
  console.log('\n📦 Instalando dependencias...');
  console.log('🔧 Usando --legacy-peer-deps para compatibilidad...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  console.log('\n✅ ¡Proyecto CMS Nova creado exitosamente!');
  console.log('\n🎯 Próximos pasos:');
  console.log(`   cd ${projectName}`);
  console.log('   cp .env.example .env');
  console.log('   # Configurar DATABASE_URL en .env');
  console.log('   npx prisma db push');
  console.log('   npx prisma generate');
  console.log('   npm run dev');
  console.log('\n🌐 Luego visita: http://localhost:3000');
  console.log('📝 Documentación: https://github.com/danielcadev/cms-nova#readme');
  
} catch (error) {
  console.log('\n❌ Error durante la instalación');

  if (error.message.includes('ERESOLVE')) {
    console.log('🔧 Problema de dependencias detectado');
    console.log('💡 Intenta manualmente:');
    console.log(`   cd ${projectName}`);
    console.log('   npm install --legacy-peer-deps');
  } else if (error.message.includes('git')) {
    console.log('💡 Problema con Git:');
    console.log('   - Verifica que git esté instalado');
    console.log('   - Verifica conexión a internet');
  } else {
    console.log('💡 Verifica:');
    console.log('   - Conexión a internet');
    console.log('   - Git instalado');
    console.log('   - Permisos de escritura');
  }

  console.log('\n🔗 Instalación manual: https://github.com/danielcadev/cms-nova');
  process.exit(1);
}

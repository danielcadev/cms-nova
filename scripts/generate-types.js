import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const PRISMA_SCHEMA = path.join(__dirname, '../prisma/schema.prisma');
const OUTPUT_DIR = path.join(__dirname, '../src/types/generated');

// Asegurarse de que el directorio existe
execSync(`mkdir -p ${OUTPUT_DIR}`);

// Generar tipos de Prisma
console.log('Generando tipos de Prisma...');
execSync(`npx prisma generate --schema ${PRISMA_SCHEMA}`, { stdio: 'inherit' });

console.log('Tipos generados correctamente.'); 
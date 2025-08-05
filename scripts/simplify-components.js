const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');

function simplifyComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Si el archivo contiene referencias a framer-motion
  if (content.includes('framer-motion') || content.includes('motion.') || content.includes('variants=')) {
    console.log(`Simplificando ${filePath}...`);
    
    // Reemplazar motion.div con div normal
    let newContent = content.replace(/motion\.[a-zA-Z]+/g, 'div');
    
    // Remover props de animación
    newContent = newContent.replace(/\s+variants=\{[^}]+\}/g, '');
    newContent = newContent.replace(/\s+animate=\{[^}]+\}/g, '');
    newContent = newContent.replace(/\s+initial=\{[^}]+\}/g, '');
    newContent = newContent.replace(/\s+exit=\{[^}]+\}/g, '');
    
    // Remover importación de framer-motion
    newContent = newContent.replace(/import\s+.*from\s+['"]framer-motion['"];?\n?/g, '');
    
    fs.writeFileSync(filePath, newContent);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      simplifyComponent(filePath);
    }
  });
}

console.log('Iniciando simplificación de componentes...');
processDirectory(COMPONENTS_DIR);
console.log('Simplificación completada.'); 
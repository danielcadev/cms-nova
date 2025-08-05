# 🚀 Guía de Deployment - CMS Nova

## Deployment Rápido con Docker

### 1. Preparación
```bash
# Clonar el repositorio
git clone <tu-repo>
cd cms-nova

# Copiar variables de entorno
cp .env.example .env
```

### 2. Configurar Variables de Entorno
Edita el archivo `.env`:
```env
DATABASE_URL="postgresql://postgres:tu-password@localhost:5432/cms-nova"
BETTER_AUTH_SECRET="tu-clave-super-secreta-64-caracteres"
BETTER_AUTH_URL="https://tu-dominio.com"
```

### 3. Deployment con Docker Compose
```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f cms-nova

# Ejecutar migraciones
docker-compose exec cms-nova npx prisma migrate deploy
```

## Deployment en Vercel

### 1. Conectar Repositorio
- Conecta tu repositorio de GitHub a Vercel
- Vercel detectará automáticamente que es un proyecto Next.js

### 2. Configurar Variables de Entorno en Vercel
```
DATABASE_URL = postgresql://...
BETTER_AUTH_SECRET = tu-clave-secreta
BETTER_AUTH_URL = https://tu-app.vercel.app
```

### 3. Configurar Base de Datos
Recomendamos usar:
- **Neon** (PostgreSQL gratuito)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL con extras)

### 4. Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Deployment Manual

### 1. Servidor VPS/Dedicado
```bash
# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar y configurar
git clone <tu-repo>
cd cms-nova
npm install
cp .env.example .env

# Configurar .env con tus datos
nano .env

# Ejecutar migraciones
npx prisma migrate deploy
npx prisma generate

# Build
npm run build

# Ejecutar con PM2
npm install -g pm2
pm2 start npm --name "cms-nova" -- start
pm2 save
pm2 startup
```

## Configuración de Base de Datos

### PostgreSQL Local
```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres createdb cms-nova
sudo -u postgres createuser --interactive
```

### PostgreSQL en la Nube
- **Neon**: https://neon.tech (Gratis)
- **Supabase**: https://supabase.com (Gratis)
- **Railway**: https://railway.app
- **PlanetScale**: https://planetscale.com (MySQL)

## Primer Usuario Administrador

Una vez desplegado:
1. Ve a `https://tu-dominio.com`
2. Serás redirigido a `/signup`
3. Crea el primer usuario (será automáticamente ADMIN)
4. Accede al panel en `/admin/login`

## Monitoreo y Logs

### Con Docker
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver estado de contenedores
docker-compose ps

# Reiniciar servicios
docker-compose restart cms-nova
```

### Con PM2
```bash
# Ver logs
pm2 logs cms-nova

# Ver estado
pm2 status

# Reiniciar
pm2 restart cms-nova
```

## Backup de Base de Datos

### PostgreSQL
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Troubleshooting

### Error de Conexión a BD
- Verificar `DATABASE_URL`
- Verificar que la BD esté accesible
- Ejecutar `npx prisma db push` para sincronizar

### Error de Autenticación
- Verificar `BETTER_AUTH_SECRET`
- Verificar `BETTER_AUTH_URL`
- Limpiar cookies del navegador

### Error de Build
- Verificar versión de Node.js (18+)
- Ejecutar `npm install` nuevamente
- Verificar `npx prisma generate`

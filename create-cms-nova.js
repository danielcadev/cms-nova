#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// --- Small args parser (no deps) ---
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.replace(/^--/, '');
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true; // boolean flag
      } else {
        args[key] = next;
        i++;
      }
    } else {
      // positional
      if (!args._) args._ = [];
      args._.push(a);
    }
  }
  if (!args._) args._ = [];
  return args;
}

function ensureGitAvailable() {
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch {
    console.log('\n❌ Git no está instalado o no está en PATH.');
    console.log('🔗 Instala Git: https://git-scm.com/downloads\n');
    process.exit(1);
  }
}

function createProject(projectName) {
  console.log('\n🚀 Creating CMS Nova project...');
  console.log(`📦 Project: ${projectName}`);
  console.log('🎯 A complete headless CMS with Next.js, Prisma & Better Auth');
  console.log('⚡ Cloning from official template repository...\n');

  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.log(`❌ Directory ${projectName} already exists`);
    console.log('💡 Please choose a different name or remove the existing directory\n');
    process.exit(1);
  }

  try {
    ensureGitAvailable();

    console.log('📥 Cloning CMS Nova template...');
    execSync(`git clone https://github.com/danielcadev/cms-nova-template.git "${projectName}"`, { stdio: 'inherit' });

    console.log('\n🧹 Cleaning up git files...');
    process.chdir(projectPath);

    if (process.platform === 'win32') {
      execSync('rmdir /s /q .git', { stdio: 'inherit' });
    } else {
      execSync('rm -rf .git', { stdio: 'inherit' });
    }

    console.log('\n📦 Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

    console.log('\n✅ CMS Nova project created successfully!');
    console.log('\n🎯 Next steps:');
    console.log(`   cd ${projectName}`);
    console.log('   cp .env.example .env');
    console.log('   npx prisma db push && npx prisma generate');
    console.log('   npm run dev');
    console.log('\n🌐 Visit: http://localhost:3000');
    console.log('🎉 Happy coding!');

  } catch (error) {
    console.log('\n❌ Installation failed');
    console.log('🔗 Manual: https://github.com/danielcadev/cms-nova-template');
    process.exit(1);
  }
}

function upgradeProject(opts) {
  // opts: { mode, tag, dryRun, paths }
  const mode = opts.mode || 'paths';
  const dryRun = !!opts.dryRun;
  const tag = opts.tag || null;
  const customPaths = Array.isArray(opts.paths) ? opts.paths : null;

  console.log('\n🚀 CMS Nova upgrade');
  ensureGitAvailable();

  // 1) Must be inside a git repo
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
  } catch {
    console.log('\n❌ Este directorio no es un repositorio Git.');
    console.log('💡 Inicializa Git y haz un commit antes de actualizar:');
    console.log('   git init && git add -A && git commit -m "chore: initial snapshot"');
    process.exit(1);
  }

  // 2) Ensure clean working tree
  try {
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
      console.log('\n❌ Tu working tree tiene cambios sin commit.');
      console.log('💡 Haz commit o stash antes de correr el upgrade.');
      process.exit(1);
    }
  } catch {}

  // 3) Determine template repo (from .cms-nova.json if exists)
  let templateRepo = 'https://github.com/danielcadev/cms-nova-template.git';
  const metaPath = path.join(process.cwd(), '.cms-nova.json');
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      if (meta && meta.templateRepo) templateRepo = meta.templateRepo;
    } catch {}
  }

  // 4) Ensure remote upstream
  try {
    execSync('git remote get-url upstream', { stdio: 'ignore' });
  } catch {
    console.log(`🔗 Configurando remote upstream → ${templateRepo}`);
    execSync(`git remote add upstream ${templateRepo}`, { stdio: 'inherit' });
  }

  // 5) Fetch upstream and tags
  execSync('git fetch upstream --tags', { stdio: 'inherit' });

  // 6) Resolve target ref
  let targetRef = tag || '';
  if (!targetRef) {
    try {
      const head = execSync('git symbolic-ref -q --short refs/remotes/upstream/HEAD').toString().trim();
      targetRef = head || 'upstream/main';
    } catch {
      targetRef = 'upstream/main';
    }
  }

  // 7) Optional backup tag (no new branch/folder)
  const backupEnabled = opts.backup !== false; // default true
  let backupRef = null;
  if (!dryRun && backupEnabled) {
    const now = new Date();
    const ts = now.toISOString().replace(/[^\d]/g, '').slice(0, 14);
    backupRef = `backup-${ts}`;
    try {
      execSync(`git tag ${backupRef}`, { stdio: 'inherit' });
      console.log(`🏷️  Backup creado como tag: ${backupRef}`);
    } catch {}
  }

  // 8) Apply changes
  if (mode === 'paths') {
    const defaultPaths = [
      // Config & meta
      '.github',
      '.vscode',
      '.eslintrc.json',
      'eslint.config.mjs',
      'tsconfig.json',
      'next.config.js',
      'next.config.mjs',
      'tailwind.config.js',
      'postcss.config.js',
      '.env.example',
      'scripts',
      'package.json',
      // Admin/app code (common locations)
      'app',
      'src/app',
      'src/admin',
      'admin'
    ];
    const selectedPaths = customPaths && customPaths.length ? customPaths : defaultPaths;

    // Filter only paths that exist in targetRef
    const presentPaths = [];
    const skippedPaths = [];
    for (const p of selectedPaths) {
      try {
        execSync(`git cat-file -e ${targetRef}:${p}`, { stdio: 'ignore' }); // exists in ref
        presentPaths.push(p);
      } catch {
        skippedPaths.push(p);
      }
    }

    if (presentPaths.length === 0) {
      console.log('\nℹ️ El ref de la plantilla no contiene ninguna de las rutas solicitadas.');
      if (skippedPaths.length) console.log('   Rutas no encontradas en la plantilla:', skippedPaths.join(', '));
      console.log('   Sugerencia: especifica rutas con --paths o verifica el tag/rama con --tag');
      process.exit(1);
    }

    const quote = (s) => `"${s.replace(/"/g, '\\"')}"`;
    const presentPathsQuoted = presentPaths.map(quote);

    if (dryRun) {
      console.log('\n📝 Dry-run: mostrando diff contra plantilla (solo rutas existentes)');
      try {
        execSync(`git diff --name-status ${targetRef} -- ${presentPathsQuoted.join(' ')}`, { stdio: 'inherit' });
      } catch {}
      if (skippedPaths.length) console.log('\n⚠️ Rutas omitidas (no existen en la plantilla):', skippedPaths.join(', '));
      process.exit(0);
    }

    console.log(`\n⬇️  Trayendo archivos desde ${targetRef} ...`);
    try {
      execSync(`git checkout ${targetRef} -- ${presentPathsQuoted.join(' ')}`, { stdio: 'inherit' });
    } catch (e) {
      console.log('\n❌ Error trayendo archivos desde la plantilla.');
      console.log('   Verifica que el ref exista (rama o tag) y vuelve a intentar.');
      process.exit(1);
    }

    if (skippedPaths.length) console.log('\n⚠️ Omitidas (no existen en la plantilla):', skippedPaths.join(', '));

    try {
      execSync('git commit -m "chore(upgrade): sync template files (paths mode)"', { stdio: 'inherit' });
    } catch {
      console.log('\nℹ️ No hay cambios para commitear (ya estabas al día).');
    }

    console.log('\n✅ Upgrade completado (paths).');
    console.log('🔧 Si cambió package.json, ejecuta: npm install');
    return;
  }

  // merge mode (opcional)
  if (mode === 'merge') {
    if (dryRun) {
      console.log('\n📝 Dry-run merge: mostrando resumen de commits pendientes');
      try {
        execSync(`git log --oneline --decorate --graph ..${targetRef}`, { stdio: 'inherit' });
      } catch {}
      process.exit(0);
    }

    console.log(`\n🔀 Intentando merge desde ${targetRef} ...`);
    const allowFlag = '--allow-unrelated-histories';
    try {
      execSync(`git merge --no-commit --no-ff ${allowFlag} ${targetRef}`, { stdio: 'inherit' });
      execSync('git commit -m "chore(upgrade): merge template"', { stdio: 'inherit' });
      console.log('\n✅ Upgrade completado (merge).');
    } catch (e) {
      console.log('\n⚠️  Merge con conflictos. Resuélvelos y luego:');
      console.log('   git add -A && git commit -m "chore(upgrade): resolve conflicts"');
    }
    console.log('🔧 Si cambió package.json, ejecuta: npm install');
    return;
  }

  console.log(`\n❌ Modo desconocido: ${mode}. Usa --mode paths (default) o --mode merge.`);
  process.exit(1);
}

// --- Entry point ---
const argv = process.argv.slice(2);
const args = parseArgs(argv);

const subcmd = args._[0];

if (subcmd === 'upgrade') {
  const upgradeOpts = {
    mode: args.mode || 'paths',
    tag: args.tag || null,
    dryRun: !!args['dry-run'],
    backup: args.backup !== 'false' && args.backup !== false, // default true unless --backup false
    paths: args.paths ? String(args.paths).split(',').map(s => s.trim()).filter(Boolean) : null,
  };
  upgradeProject(upgradeOpts);
  process.exit(0);
}

// Default behavior: create project
const projectName = subcmd;
if (!projectName) {
  console.log('\n❌ Please provide a project name or use a subcommand');
  console.log('💡 Usage (create): npx create-cms-nova my-project');
  console.log('💡 Usage (upgrade): npx create-cms-nova upgrade [--tag vX.Y.Z] [--mode merge|paths] [--dry-run] [--paths \'a,b\']');
  console.log('📖 Example: npx create-cms-nova my-awesome-cms\n');
  process.exit(1);
}

// Guard: avoid creating a folder named "upgrade" by mistake
if (projectName === 'upgrade') {
  console.log('\n❌ "upgrade" no es un nombre de proyecto válido.');
  console.log('💡 Para actualizar un proyecto existente usa: npx create-cms-nova upgrade');
  console.log('   Si ves este mensaje al usar npx, actualiza a la versión 4.0.1+ o ejecuta:');
  console.log('   node "c:\\Users\\danie\\Desktop\\cms-nova\\create-cms-nova.js" upgrade');
  process.exit(1);
}

createProject(projectName);
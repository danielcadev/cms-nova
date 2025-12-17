#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// --- List of files that were removed from the template and should be cleaned up ---
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


function checkForUpdates(currentVersion) {
  try {
    // Only check if we have internet and npm (silent fail)
    const latestVersion = execSync('npm view create-cms-nova version', { stdio: 'pipe' }).toString().trim();

    if (latestVersion && latestVersion !== currentVersion) {
      const v1 = currentVersion.split('.').map(Number);
      const v2 = latestVersion.split('.').map(Number);

      let hasUpdate = false;
      for (let i = 0; i < 3; i++) {
        if (v2[i] > v1[i]) {
          hasUpdate = true;
          break;
        }
        if (v2[i] < v1[i]) break;
      }

      if (hasUpdate) {
        console.log('\n╭─────────────────────────────────────────────────────────────────╮');
        console.log('│                                                                 │');
        console.log('│  ⚠️  UPDATE AVAILABLE: ' + currentVersion + ' → ' + latestVersion + '                            │');
        console.log('│                                                                 │');
        console.log('│  To get the latest features (like Garbage Collection), run:     │');
        console.log('│  npx create-cms-nova@latest upgrade                             │');
        console.log('│                                                                 │');
        console.log('╰─────────────────────────────────────────────────────────────────╯\n');
      }
    }
  } catch (e) {
    // Ignore updates check failure
  }
}

async function upgradeProject(opts) {
  // opts: { mode, tag, dryRun, paths }
  const mode = opts.mode || 'paths';
  const dryRun = !!opts.dryRun;
  const tag = opts.tag || null;
  const customPaths = Array.isArray(opts.paths) ? opts.paths : null;

  console.log('\n🚀 CMS Nova upgrade');
  ensureGitAvailable();

  // 0) Check for CLI updates
  try {
    const pkg = require('./package.json'); // Assumes package.json is in the same dir
    checkForUpdates(pkg.version);
  } catch (e) {
    // Ignore if package.json not found or check fails
  }

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
  if (!opts.allowDirty) {
    try {
      const status = execSync('git status --porcelain').toString().trim();
      if (status) {
        console.log('\n❌ Tu working tree tiene cambios sin commit.');
        console.log('💡 Haz commit o stash antes de correr el upgrade.');
        console.log('   O usa --allow-dirty para forzar (bajo tu propio riesgo).');
        process.exit(1);
      }
    } catch { }
  }

  // 3) Detect template repo URL from package.json or similar (optional)
  let templateRepo = 'https://github.com/danielcadev/cms-nova-template.git';
  const metaPath = path.join(process.cwd(), 'cms-nova.json'); // future proofing
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    if (meta && meta.templateRepo) templateRepo = meta.templateRepo;
  } catch { }

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
    } catch { }
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
      'middleware.ts',
      'src/middleware.ts',
      // Project content (only core CMS parts)
      'prisma',
      // Source code (granular to avoid overwriting user app/public)
      'src/components/admin',
      'src/lib',
      'src/types',
      'src/utils',
      'src/hooks',
      'src/actions',
      'src/schemas',
      'src/components',
      'src/app/api',
      'src/app/admin',
      // 'public' and rest of 'src/app' are EXCLUDED by default now
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
      } catch { }
      if (skippedPaths.length) console.log('\n⚠️ Rutas omitidas (no existen en la plantilla):', skippedPaths.join(', '));
      process.exit(0);
    }

    const interactive = opts.interactive !== false; // default true

    if (!interactive) {
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

    // Modo interactivo por archivo
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise((resolve) => rl.question(q, (ans) => resolve(String(ans || '').trim().toLowerCase())));

    console.log(`\n🧭 Analizando diferencias contra ${targetRef} ...`);
    let diffRaw = '';
    try {
      diffRaw = execSync(`git diff --name-status ${targetRef} -- ${presentPathsQuoted.join(' ')}`).toString().trim();
    } catch {
      diffRaw = '';
    }

    if (!diffRaw) {
      console.log('\nℹ️ No hay diferencias en las rutas seleccionadas. Ya estás al día.');
      rl.close();
      return;
    }

    const lines = diffRaw.split('\n').filter(Boolean);
    let applyToRest = null; // 'k' | 't'
    let anyChange = false;

    for (const line of lines) {
      // Parse: e.g., "M\tpath", "D\tpath", "A\tpath" or "R100\told\tnew"
      const parts = line.split('\t');
      let status = parts[0];
      let file = parts[parts.length - 1]; // for R, this is the new name

      // Skip if outside selected paths (safety)
      if (!presentPaths.some((p) => file.startsWith(p))) continue;

      // Check if file exists in template ref
      let inTemplate = false;
      try {
        execSync(`git cat-file -e ${targetRef}:${file}`, { stdio: 'ignore' });
        inTemplate = true;
      } catch { }

      // SKIP LOCAL-ONLY FILES
      if (!inTemplate) continue;

      const header = `\n📄 ${file}  [${status}]`;

      // If user chose apply to rest previously
      if (applyToRest === 'k') {
        console.log(`${header} → mantener local (aplicar al resto)`);
        continue;
      }
      if (applyToRest === 't') {
        if (!inTemplate) {
          console.log(`${header} → no existe en la plantilla, se mantiene local`);
          continue;
        }
        try {
          execSync(`git checkout ${targetRef} -- "${file}"`, { stdio: 'inherit' });
          anyChange = true;
        } catch { }
        continue;
      }

      while (true) {
        console.log(header);
        const choices = inTemplate
          ? '[K]eep local, [T]emplate, [D]iff, [P]atch interactivo, k![keep all], t![template all]'
          : '[K]eep local, [D]iff, k![keep all]';
        const ans = await ask(`   ¿Qué querés hacer? ${choices}: `);

        if (ans === 'd') {
          try {
            execSync(`git diff ${targetRef} -- "${file}"`, { stdio: 'inherit' });
          } catch { }
          continue; // volver a preguntar
        }

        if (ans === 'p') {
          if (!inTemplate) {
            console.log('   ⚠️ No existe versión en plantilla para hacer patch.');
            continue;
          }
          try {
            // Modo interactivo de git para aplicar hunks
            execSync(`git checkout -p ${targetRef} -- "${file}"`, { stdio: 'inherit' });
            anyChange = true; // asume que pudo aplicar algo
          } catch { }
          break;
        }

        if (ans === 't' && inTemplate) {
          try {
            execSync(`git checkout ${targetRef} -- "${file}"`, { stdio: 'inherit' });
            anyChange = true;
          } catch { }
          break;
        }

        if (ans === 'k') {
          // mantener local
          break;
        }

        if (ans === 'k!') {
          applyToRest = 'k';
          break;
        }
        if (ans === 't!' && inTemplate) {
          applyToRest = 't';
          try {
            execSync(`git checkout ${targetRef} -- "${file}"`, { stdio: 'inherit' });
            anyChange = true;
          } catch { }
          break;
        }

        console.log('   Opción no válida. Intenta de nuevo.');
      }
    }

    rl.close();

    if (skippedPaths.length) console.log('\n⚠️ Omitidas (no existen en la plantilla):', skippedPaths.join(', '));

    try {
      execSync('git add -A', { stdio: 'inherit' });
      execSync('git commit -m "chore(upgrade): interactive sync from template"', { stdio: 'inherit' });
      console.log('\n✅ Upgrade completado (paths interactivo).');
    } catch {
      if (anyChange) {
        console.log('\nℹ️ Cambios realizados pero no se pudo crear el commit automáticamente.');
        console.log('   Revisá el estado y commiteá manualmente: git add -A && git commit -m "upgrade"');
      } else {
        console.log('\nℹ️ No hay cambios para commitear (ya estabas al día).');
      }
    }

    console.log('🔧 Si cambió package.json, ejecuta: npm install');

    // cleanup for deprecated files in paths mode too
    await cleanupDeprecatedFiles(interactive, targetRef);
    return;
  }

  // merge mode (opcional)
  if (mode === 'merge') {
    if (dryRun) {
      console.log('\n📝 Dry-run merge: mostrando resumen de commits pendientes');
      try {
        execSync(`git log --oneline --decorate --graph ..${targetRef}`, { stdio: 'inherit' });
      } catch { }
      process.exit(0);
    }

    console.log(`\n🔀 Intentando merge desde ${targetRef} ...`);
    const allowFlag = '--allow-unrelated-histories';

    // Setup interactive
    const interactive = opts.interactive !== false;
    let rl, ask;
    if (interactive) {
      rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      ask = (q) => new Promise((resolve) => rl.question(q, (ans) => resolve(String(ans || '').trim().toLowerCase())));
    }

    try {
      execSync(`git merge --no-commit --no-ff ${allowFlag} ${targetRef}`, { stdio: 'inherit' });
      console.log('\n✅ Merge realizado (sin commit aún).');
    } catch (e) {
      console.log('\n⚠️  Merge con conflictos.');
      if (interactive) {
        const conflicts = execSync('git diff --name-only --diff-filter=U').toString().trim().split('\n').filter(Boolean);
        if (conflicts.length > 0) {
          console.log(`\n⚔️  Hay ${conflicts.length} archivos en conflicto.`);
          for (const file of conflicts) {
            console.log(`\n📄 Conflicto en: ${file}`);
            while (true) {
              const ans = await ask('   ¿Qué deseas hacer? [L]ocal (ours), [R]emoto (theirs), [M]anual, [S]altar: ');
              if (ans === 'l') {
                execSync(`git checkout --ours "${file}"`, { stdio: 'ignore' });
                execSync(`git add "${file}"`, { stdio: 'ignore' });
                console.log('   ✅ Conservado local.');
                break;
              } else if (ans === 'r') {
                execSync(`git checkout --theirs "${file}"`, { stdio: 'ignore' });
                execSync(`git add "${file}"`, { stdio: 'ignore' });
                console.log('   ✅ Aceptado remoto.');
                break;
              } else if (ans === 'm') {
                console.log('   ℹ️  Abre el archivo, resuelve y guarda. No hagas commit.');
                await ask('   Presiona Enter cuando hayas resuelto el conflicto...');
                execSync(`git add "${file}"`, { stdio: 'ignore' });
                break;
              } else if (ans === 's') {
                console.log('   ⏩ Saltado.');
                break;
              }
            }
          }
        }
      } else {
        console.log('   Resuélvelos manualmente y luego haz commit.');
        process.exit(1);
      }
    }

    // Optional review of staged changes
    if (interactive) {
      const staged = execSync('git diff --cached --name-only').toString().trim().split('\n').filter(Boolean);
      if (staged.length > 0) {
        console.log(`\n📝 Hay ${staged.length} archivos listos para commit (staged).`);
        const doReview = await ask('   ¿Quieres revisar/decidir sobre estos archivos? [s/N]: ');
        if (doReview === 's' || doReview === 'y') {
          for (const file of staged) {
            console.log(`\n📄 Modificado: ${file}`);
            const ans = await ask('   ¿Acción? [K]eep change (mantener), [R]evert to local (descartar cambio), [S]kip: ');
            if (ans === 'r') {
              try {
                execSync(`git restore --staged "${file}"`, { stdio: 'ignore' });
                execSync(`git checkout HEAD -- "${file}"`, { stdio: 'ignore' }); // revert to HEAD
                console.log('   ↩️  Restaurado a versión local.');
              } catch {
                console.log('   ❌ Error al restaurar.');
              }
            } else if (ans === 'k') {
              console.log('   ✅ Mantenido.');
            } else {
              console.log('   ⏩ Saltado.');
            }
          }
        }
      }
      rl.close();
    }

    try {
      execSync('git commit -m "chore(upgrade): merge template"', { stdio: 'inherit' });
      console.log('\n✅ Upgrade completado (merge).');
    } catch {
      console.log('\nℹ️ No se pudo hacer commit automático (quizás no hay cambios o quedan conflictos).');
      console.log('   Verifica el estado con: git status');
    }

    console.log('🔧 Si cambió package.json, ejecuta: npm install');

    // 9) Run cleanup for deprecated files
    await cleanupDeprecatedFiles(interactive, targetRef);
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
    tag: args.tag,
    mode: args.mode,
    dryRun: args['dry-run'],
    paths: args.paths,
    interactive: args.interactive,
    allowDirty: !!args['allow-dirty'],
  };
  (async () => {
    await upgradeProject(upgradeOpts);
    process.exit(0);
  })();
} else {
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
}

// Helper to cleanup files that are no longer in the template (Dynamic Detection)
async function cleanupDeprecatedFiles(interactive, targetRef = 'upstream/main') {
  console.log('\n🧹 Buscando archivos obsoletos (basado en git diff)...');

  // 1. Detect current version from package.json
  let localVersion = '0.0.0';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    if (pkg.version) localVersion = pkg.version;
  } catch {
    console.log('   Warning: No se pudo leer package.json para determinar la versión base.');
    return;
  }

  // 2. Try to find a git tag that matches this version
  // Common tag formats: v1.0.0 or 1.0.0
  const possibleTags = [`v${localVersion}`, localVersion];
  let baseRef = null;

  for (const t of possibleTags) {
    try {
      execSync(`git rev-parse --verify ${t}`, { stdio: 'ignore' });
      // If local tag exists, use it. But better check upstream tags?
      // The upgrade process fetched upstream tags.
      // Let's assume tags are available locally after fetch.
      baseRef = t;
      break;
    } catch {
      // try remote ref directly if not fetched as local tag?
      try {
        execSync(`git rev-parse --verify upstream/${t}`, { stdio: 'ignore' });
        // If it exists but failed local verify, maybe it's remote only?
        // But 'git fetch upstream --tags' should have fetched it.
        // Let's rely on standard refs.
      } catch { }
    }
  }

  // Fallback: search in remote tags listing if needed (optional)
  if (!baseRef) {
    try {
      // Check if tag exists in 'git tag' output
      const tags = execSync('git tag').toString().split('\n');
      if (tags.includes(`v${localVersion}`)) baseRef = `v${localVersion}`;
      else if (tags.includes(localVersion)) baseRef = localVersion;
    } catch { }
  }

  if (!baseRef) {
    console.log(`   ℹ️ No se encontró un tag git para la versión actual (${localVersion}).`);
    console.log('   Skipping automatic cleanup detection (no base reference).');
    return;
  }

  console.log(`   Versión base detectada para comparación: ${baseRef}`);

  // 3. Compute diff between [baseRef] and [targetRef]
  // We only care about Deleted files (D)
  let diffOut = '';
  try {
    // --diff-filter=D selects only deleted files
    // --name-only to just get paths
    diffOut = execSync(`git diff --name-only --diff-filter=D ${baseRef} ${targetRef}`).toString().trim();
  } catch (e) {
    console.log('   Error calculando diferencias de git. Skipping cleanup.');
    return;
  }

  if (!diffOut) {
    console.log('✨ No se detectaron archivos eliminados entre versiones.');
    return;
  }

  // 4. Filter list: check if they still exist locally
  const candidateFiles = diffOut.split('\n').filter(Boolean).map(f => f.trim());

  // We should also filter out files that the user might have intentionally kept?
  // But strictly speaking, if it was in the template and removed from template, it's garbage.

  const foundFiles = candidateFiles.filter(file => fs.existsSync(path.join(process.cwd(), file)));

  if (foundFiles.length === 0) {
    console.log('✨ Se detectaron cambios de estructura, pero tu proyecto ya está limpio.');
    return;
  }

  console.log(`⚠️  Se encontraron ${foundFiles.length} archivos que fueron ELIMINADOS en la nueva versión:`);
  foundFiles.forEach(f => console.log(`   - ${f}`));

  if (!interactive) {
    console.log('   (Modo no interactivo: saltando limpieza. Usa flags interactivos)');
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((resolve) => rl.question(q, (ans) => resolve(String(ans || '').trim().toLowerCase())));

  const ans = await ask('\n¿Quieres eliminar estos archivos automáticamente? [Y]es/[N]o: ');

  if (ans === 'y' || ans === 'yes') {
    let deletedCount = 0;
    for (const file of foundFiles) {
      try {
        fs.unlinkSync(path.join(process.cwd(), file));
        deletedCount++;
      } catch (e) {
        console.log(`   ❌ Error borrando ${file}: ${e.message}`);
      }
    }
    console.log(`\n✅ Se eliminaron ${deletedCount} archivos obsoletos.`);

    // Cleaning up empty directories
    console.log('\n🧹 Limpiando directorios vacíos...');
    let cleanedDirs = 0;

    // We get a unique list of parent directories from the deleted files
    const dirsToCheck = [...new Set(foundFiles.map(f => path.dirname(path.join(process.cwd(), f))))];
    // Sort them longest first (deepest first) to effectively remove nested empty dirs
    dirsToCheck.sort((a, b) => b.length - a.length);

    for (const d of dirsToCheck) {
      removeEmptyDirs(d);
    }

    function removeEmptyDirs(dir) {
      if (!fs.existsSync(dir)) return;
      try {
        const files = fs.readdirSync(dir);
        if (files.length === 0) {
          fs.rmdirSync(dir);
          cleanedDirs++;
          // Recursively check parent
          removeEmptyDirs(path.dirname(dir));
        }
      } catch (e) {
        // Ignore permission errors etc
      }
    }
  } else {
    console.log('\n⏩ Limpieza saltada.');
  }

  rl.close();
}

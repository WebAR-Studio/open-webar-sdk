import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const MODE_TO_TEMPLATE = {
  image: 'image-tracking',
  face: 'face-tracking',
  qr: 'qr-tracking',
  webxr: 'webxr',
  'ar-360': 'ar-360',
};

const MODE_CHOICES = [
  {
    title: 'Image tracking',
    value: 'image',
    description: 'Track printed images and place AR content',
  },
  {
    title: 'Face tracking',
    value: 'face',
    description: 'Face filters and virtual try-ons',
  },
  {
    title: 'QR tracking',
    value: 'qr',
    description: 'Detect QR codes and anchor AR',
  },
  {
    title: 'WebXR',
    value: 'webxr',
    description: 'Surface-based AR with WebXR',
  },
  {
    title: 'AR 360',
    value: 'ar-360',
    description: 'Immersive 360 experiences',
  },
];

const SHORT_MODE_FLAGS = {
  '--image': 'image',
  '--face': 'face',
  '--qr': 'qr',
  '--webxr': 'webxr',
  '--ar360': 'ar-360',
};

const MODE_ALIASES = {
  image: 'image',
  'image-tracking': 'image',
  face: 'face',
  'face-tracking': 'face',
  qr: 'qr',
  qrcode: 'qr',
  'qr-tracking': 'qr',
  'qrcode-tracking': 'qr',
  webxr: 'webxr',
  'webxr-tracking': 'webxr',
  ar360: 'ar-360',
  'ar-360': 'ar-360',
  'ar-360-tracking': 'ar-360',
};

const TEST_API_KEY = '52f80541de1715ba47f43522d648d0800c6e514d8b5e91b9b6e13ef9e1348cb8';
const DEFAULT_ENV_CONTENT = `# - Can be used for development and commercial projects.
# - Test key limit: up to 15000 views per month per domain.
VITE_API_KEY=${TEST_API_KEY}
`;

function printHelp() {
  console.log(`
Usage:
  npx create-webar-app <project-name> [options]

Mode selection:
  --mode <name>
  --template <name>
  --type <name>

Short mode flags:
  --image
  --face
  --qr
  --webxr
  --ar360

Other options:
  --pm <npm|pnpm|yarn>
  --install
  --no-install
  --yes
  --help
`);
}

function normalizeMode(input) {
  if (!input) return null;
  const key = String(input).trim().toLowerCase().replace(/_/g, '-');
  return MODE_ALIASES[key] ?? null;
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith('pnpm/')) return 'pnpm';
  if (userAgent.startsWith('yarn/')) return 'yarn';
  return 'npm';
}

function sanitizePackageName(name) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'webar-app'
  );
}

function relativeDisplayPath(targetDir) {
  const rel = path.relative(process.cwd(), targetDir);
  if (!rel || rel === '.') return path.basename(targetDir);
  return rel;
}

function resolveTemplateRoot() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(currentDir, '../../templates'),
    path.resolve(currentDir, 'templates'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('Template directory not found. Please reinstall create-webar-app.');
}

function installDependencies(pm, targetDir) {
  const result = spawnSync(pm, ['install'], {
    cwd: targetDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (typeof result.status === 'number' && result.status !== 0) {
    throw new Error(`${pm} install failed with exit code ${result.status}.`);
  }

  if (result.error) {
    throw new Error(`Failed to run ${pm} install: ${result.error.message}`);
  }
}

function getCommandHint(pm, command) {
  return command === 'install' ? `${pm} install` : `${pm} run ${command}`;
}

function parseArgs(argv) {
  const args = [...argv];
  const positional = [];

  const parsed = {
    projectName: null,
    modeInput: null,
    shortModes: [],
    pm: null,
    install: false,
    yes: false,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    const readFlagValue = (flagName) => {
      const value = args[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`Missing value for ${flagName}.`);
      }
      i += 1;
      return value;
    };

    if (!arg.startsWith('-')) {
      positional.push(arg);
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (arg === '--yes' || arg === '-y') {
      parsed.yes = true;
      continue;
    }

    if (arg === '--install') {
      parsed.install = true;
      continue;
    }

    if (arg === '--no-install') {
      parsed.install = false;
      continue;
    }

    if (arg.startsWith('--pm=')) {
      parsed.pm = arg.split('=')[1] || null;
      continue;
    }

    if (arg === '--pm') {
      parsed.pm = readFlagValue('--pm');
      continue;
    }

    if (arg.startsWith('--mode=')) {
      parsed.modeInput = arg.split('=')[1] || null;
      continue;
    }

    if (arg.startsWith('--template=')) {
      parsed.modeInput = arg.split('=')[1] || null;
      continue;
    }

    if (arg.startsWith('--type=')) {
      parsed.modeInput = arg.split('=')[1] || null;
      continue;
    }

    if (arg === '--mode' || arg === '--template' || arg === '--type') {
      parsed.modeInput = readFlagValue(arg);
      continue;
    }

    if (SHORT_MODE_FLAGS[arg]) {
      parsed.shortModes.push(SHORT_MODE_FLAGS[arg]);
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (positional.length > 1) {
    throw new Error(`Unexpected extra argument: ${positional.slice(1).join(' ')}`);
  }

  parsed.projectName = positional[0] || null;
  return parsed;
}

async function resolveInputs(parsedArgs) {
  let projectName = parsedArgs.projectName;
  let mode = null;

  if (parsedArgs.shortModes.length > 1) {
    throw new Error('Only one short mode flag can be provided at a time.');
  }

  if (parsedArgs.shortModes.length === 1) {
    mode = parsedArgs.shortModes[0];
  } else if (parsedArgs.modeInput) {
    mode = normalizeMode(parsedArgs.modeInput);

    if (!mode) {
      throw new Error(
        `Invalid mode: "${parsedArgs.modeInput}". Use image, face, qr, webxr, ar-360, or ar360.`,
      );
    }
  }

  if (!projectName) {
    if (parsedArgs.yes) {
      projectName = 'my-webar-app';
    } else {
      const response = await prompts(
        {
          type: 'text',
          name: 'projectName',
          message: 'Project directory name:',
          initial: 'my-webar-app',
          validate: (value) => (value.trim().length > 0 ? true : 'Project name is required'),
        },
        {
          onCancel: () => {
            throw new Error('Operation cancelled.');
          },
        },
      );

      projectName = response.projectName?.trim() || null;
    }
  }

  if (!mode) {
    if (parsedArgs.yes) {
      mode = 'image';
    } else {
      const response = await prompts(
        {
          type: 'select',
          name: 'mode',
          message: 'Select a tracking mode:',
          choices: MODE_CHOICES,
          initial: 0,
        },
        {
          onCancel: () => {
            throw new Error('Operation cancelled.');
          },
        },
      );

      mode = response.mode;
    }
  }

  if (!projectName) {
    throw new Error('Project name is required.');
  }

  if (!mode || !MODE_TO_TEMPLATE[mode]) {
    throw new Error('A valid mode is required.');
  }

  return {
    projectName,
    mode,
  };
}

function updateGeneratedPackageJson(targetDir, mode) {
  const packagePath = path.join(targetDir, 'package.json');

  if (!existsSync(packagePath)) {
    throw new Error(`Generated template is missing package.json at ${packagePath}`);
  }

  const packageData = JSON.parse(readFileSync(packagePath, 'utf8'));
  const baseName = path.basename(targetDir);

  packageData.name = sanitizePackageName(baseName);
  packageData.version = '0.1.0';
  packageData.description = `Open WebAR starter for ${mode} mode.`;

  writeFileSync(packagePath, `${JSON.stringify(packageData, null, 2)}\n`, 'utf8');

  const envPath = path.join(targetDir, '.env');
  const envExamplePath = path.join(targetDir, '.env.example');
  if (!existsSync(envExamplePath)) {
    writeFileSync(envExamplePath, DEFAULT_ENV_CONTENT, 'utf8');
  }

  if (!existsSync(envPath)) {
    if (existsSync(envExamplePath)) {
      cpSync(envExamplePath, envPath);
    } else {
      writeFileSync(envPath, DEFAULT_ENV_CONTENT, 'utf8');
    }
  }

  const envContent = readFileSync(envPath, 'utf8');
  if (!/^\s*VITE_API_KEY\s*=\s*.+\s*$/m.test(envContent)) {
    const separator = envContent.endsWith('\n') ? '' : '\n';
    writeFileSync(
      envPath,
      `${envContent}${separator}# Added by create-webar-app fallback\nVITE_API_KEY=${TEST_API_KEY}\n`,
      'utf8',
    );
  }
}

function validatePackageManager(pmInput) {
  const pm = (pmInput || detectPackageManager()).toLowerCase();
  if (!['npm', 'pnpm', 'yarn'].includes(pm)) {
    throw new Error(`Invalid package manager: "${pmInput}". Use npm, pnpm, or yarn.`);
  }
  return pm;
}

function createProject({ projectName, mode, pm, install }) {
  const targetDir = path.resolve(process.cwd(), projectName);
  if (existsSync(targetDir)) {
    throw new Error(`Target directory already exists: ${targetDir}`);
  }

  const templateRoot = resolveTemplateRoot();
  const templateName = MODE_TO_TEMPLATE[mode];
  const templateDir = path.join(templateRoot, templateName);

  if (!existsSync(templateDir)) {
    throw new Error(`Template not found for mode "${mode}": ${templateDir}`);
  }

  cpSync(templateDir, targetDir, { recursive: true, force: false, errorOnExist: true });
  updateGeneratedPackageJson(targetDir, mode);

  if (install) {
    installDependencies(pm, targetDir);
  }

  const displayDir = relativeDisplayPath(targetDir);
  const installHint = getCommandHint(pm, 'install');
  const devHint = getCommandHint(pm, 'dev');

  console.log('\nNext steps:');
  console.log(`  cd ${displayDir}`);
  console.log(`  ${installHint}`);
  console.log(`  ${devHint}`);
}

export async function run(argv = process.argv.slice(2)) {
  try {
    const parsed = parseArgs(argv);

    if (parsed.help) {
      printHelp();
      return 0;
    }

    const { projectName, mode } = await resolveInputs(parsed);
    const pm = validatePackageManager(parsed.pm);

    createProject({
      projectName,
      mode,
      pm,
      install: parsed.install,
    });

    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    return 1;
  }
}

const isDirectExecution =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectExecution) {
  run().then((code) => {
    process.exit(code);
  });
}

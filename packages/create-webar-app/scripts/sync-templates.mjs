import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptsDir, '..');
const repoTemplatesDir = path.resolve(packageDir, '../../templates');
const packageTemplatesDir = path.resolve(packageDir, 'templates');

if (!existsSync(repoTemplatesDir)) {
  throw new Error(`Cannot find templates directory: ${repoTemplatesDir}`);
}

rmSync(packageTemplatesDir, { recursive: true, force: true });
cpSync(repoTemplatesDir, packageTemplatesDir, { recursive: true });

console.log(`Synced templates from ${repoTemplatesDir} to ${packageTemplatesDir}`);

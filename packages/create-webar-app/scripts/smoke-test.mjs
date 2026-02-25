import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptsDir, '..');
const cliEntry = path.join(packageDir, 'index.js');

const tempRoot = mkdtempSync(path.join(os.tmpdir(), 'create-webar-app-smoke-'));

try {
  const result = spawnSync(
    process.execPath,
    [cliEntry, 'demo', '--image', '--yes', '--pm', 'npm', '--no-install'],
    {
      cwd: tempRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );

  if (result.status !== 0) {
    throw new Error(
      [
        `CLI exited with code ${result.status}.`,
        result.stdout?.trim() ? `stdout:\n${result.stdout.trim()}` : '',
        result.stderr?.trim() ? `stderr:\n${result.stderr.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n\n'),
    );
  }

  const generatedPackageJson = path.join(tempRoot, 'demo', 'package.json');
  if (!existsSync(generatedPackageJson)) {
    throw new Error(`Smoke test failed: ${generatedPackageJson} was not created.`);
  }

  console.log(`Smoke test passed: created ${generatedPackageJson}`);
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

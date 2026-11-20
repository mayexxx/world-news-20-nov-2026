import { mkdir, copyFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = dirname(fileURLToPath(import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR || '/output';
await mkdir(output, { recursive: true });
await copyFile(join(repository, 'entry.png'), join(output, 'entry.png'));
const sourceStat = await stat(join(repository, 'entry.png'));
const outputStat = await stat(join(output, 'entry.png'));
if (outputStat.size === 0 || outputStat.size !== sourceStat.size) {
  throw new Error('Copied entry.png is empty or does not match the source size');
}

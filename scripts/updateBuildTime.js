import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildTime = new Date().toISOString();
const configPath = join(__dirname, '../src/config/buildTime.ts');

const content = `export const BUILD_TIME = '${buildTime}';\n`;
writeFileSync(configPath, content, 'utf-8');

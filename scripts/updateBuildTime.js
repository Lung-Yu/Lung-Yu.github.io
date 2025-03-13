const fs = require('fs');
const path = require('path');

const buildTime = new Date().toISOString().replace(/[-:]/g, '_').split('.')[0];
const content = `export const BUILD_TIME = '${buildTime}';`;

fs.writeFileSync(
  path.join(__dirname, '../src/config/constants.ts'),
  content
);

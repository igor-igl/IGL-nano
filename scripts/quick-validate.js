const fs = require('fs');

const REQUIRED = [
  'runtime/browser/thread-manager.ts',
  'runtime/browser/worker/worker.js'
];

let valid = true;
REQUIRED.forEach(file => {
  if (!fs.existsSync(`/workspaces/IGL-nano/${file}`)) {
    console.error(`Missing: ${file}`);
    valid = false;
  }
});

if (valid) {
  console.log('✅ Basic structure is valid');
  process.exit(0);
} else {
  process.exit(1);
}
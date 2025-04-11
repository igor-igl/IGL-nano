const fs = require('fs');
const path = require('path');

const REPO_ROOT = '/workspaces/IGL-nano';
const REQUIRED_PATHS = [
  'runtime/browser/thread-manager.ts',
  'runtime/browser/worker/worker.js',
  'benchmarks/threading/web-worker/stress-test.ts',
  'libs/sync/atomic.ts'
];

function validateStructure() {
  let isValid = true;
  
  REQUIRED_PATHS.forEach(relPath => {
    const absPath = path.join(REPO_ROOT, relPath);
    if (!fs.existsSync(absPath)) {
      console.error(`❌ Отсутствует: ${relPath}`);
      isValid = false;
    }
  });

  if (isValid) {
    console.log('✅ Структура соответствует спецификации');
    return true;
  } else {
    console.error('🚨 Критические файлы отсутствуют');
    process.exit(1);
  }
}

validateStructure();
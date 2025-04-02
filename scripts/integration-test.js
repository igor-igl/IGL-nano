const { ThreadManager } = require('../runtime/browser/thread-manager');
const { performance } = require('perf_hooks');

async function runTest() {
  const manager = new ThreadManager(4); // 4 потока
  const testData = new Float32Array(1024).fill(1.0);

  // Тест производительности
  const start = performance.now();
  await Promise.all(
    Array(1000).fill(0).map(() => manager.processTask(testData))
  );
  const duration = performance.now() - start;

  // Проверка
  if (duration > 500) { // 500ms - максимально допустимое время
    console.error(`❌ Слишком медленная обработка: ${duration.toFixed(2)}ms`);
    process.exit(1);
  } else {
    console.log(`✅ Интеграционный тест пройден за ${duration.toFixed(2)}ms`);
  }
}

runTest();

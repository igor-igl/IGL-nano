const { Worker } = require('worker_threads');
const assert = require('assert');
const { setTimeout } = require('timers/promises');

async function runTests() {
  // Тест 1: Проверка базовой функциональности
  try {
    const basicTestPassed = await new Promise((resolve) => {
      const worker = new Worker('./runtime/browser/worker/worker.js', {
        workerData: {
          memoryBuffer: new SharedArrayBuffer(1024),
          threadId: 0
        }
      });

      worker.on('message', (result) => {
        try {
          assert.deepStrictEqual(
            result,
            {
              status: 'processed',
              threadId: 0,
              input: { test: true },
              output: new Float32Array()
            }
          );
          resolve(true);
        } catch (err) {
          console.error('❌ Базовый тест не пройден:', err);
          resolve(false);
        }
      });

      worker.postMessage({ test: true });
    });

    if (!basicTestPassed) return false;

    // Даем время для очистки
    await setTimeout(100);

    // Тест 2: Проверка обработки данных
    const dataTestPassed = await new Promise((resolve) => {
      const worker = new Worker('./runtime/browser/worker/worker.js', {
        workerData: {
          memoryBuffer: new SharedArrayBuffer(1024),
          threadId: 0
        }
      });

      worker.on('message', (result) => {
        try {
          assert.deepStrictEqual(
            Array.from(result.output),
            [2, 4, 6]
          );
          resolve(true);
        } catch (err) {
          console.error('❌ Тест обработки данных не пройден:', err);
          resolve(false);
        }
      });

      worker.postMessage({ data: [1, 2, 3] });
    });

    return dataTestPassed;

  } catch (err) {
    console.error('❌ Неожиданная ошибка:', err);
    return false;
  }
}

runTests().then((success) => {
  if (success) {
    console.log('✅ Все тесты многопоточности успешно пройдены');
    process.exit(0);
  } else {
    process.exit(1);
  }
});
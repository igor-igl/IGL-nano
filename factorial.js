const fs = require('fs');
const { instantiate } = require('@assemblyscript/loader');

// Конфигурация теста
const ITERATIONS = 100000;
const TEST_VALUE = 10;

async function runBenchmark() {
  try {
    // 1. Загрузка WASM модуля
    const wasm = await instantiate(fs.readFileSync('./dist/math.wasm'));
    
    // 2. Прогрев
    wasm.exports.factorial(5);
    
    // 3. Замер времени
    const startTime = Date.now();
    
    // 4. Основной цикл тестирования
    for (let i = 0; i < ITERATIONS; i++) {
      wasm.exports.factorial(TEST_VALUE);
    }
    
    const duration = Date.now() - startTime;
    
    // 5. Вывод результатов
    console.log('Benchmark Results:');
    console.log('Iterations:', ITERATIONS);
    console.log('Test Value:', TEST_VALUE);
    console.log('Total Duration (ms):', duration);
    console.log('Operations per second:', Math.floor(ITERATIONS / (duration / 1000)).toLocaleString());
    
  } catch (error) {
    console.error('Benchmark failed:', error.message);
    process.exit(1);
  }
}

// Запуск бенчмарка
runBenchmark();
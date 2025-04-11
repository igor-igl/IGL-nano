const { performance } = require('perf_hooks');
const fs = require('fs');
const { scalarComplex } = require('./scalar');

async function runBenchmark() {
  try {
    // 1. Инициализация памяти (1 страница = 64KB)
    const memory = new WebAssembly.Memory({ initial: 1 });
    
    // 2. Загрузка WASM
    const wasm = await WebAssembly.instantiate(
      fs.readFileSync('./build/benchmarks/simd.test.wasm'),
      { 
        env: { 
          abort: () => {},
          memory: memory // Явно передаем память
        }
      }
    );

    // 3. Параметры теста
    const ITERATIONS = 100_000;
    const WARMUP = 10;

    // 4. Прогрев
    for (let i = 0; i < WARMUP; i++) {
      wasm.instance.exports.simdComplex();
      scalarComplex();
    }

    // 5. Тест SIMD
    const simdStart = performance.now();
    let simdResult;
    for (let i = 0; i < ITERATIONS; i++) {
      simdResult = wasm.instance.exports.simdComplex();
    }
    const simdTime = performance.now() - simdStart;

    // 6. Тест скалярной версии
    const scalarStart = performance.now();
    let scalarResult;
    for (let i = 0; i < ITERATIONS; i++) {
      scalarResult = scalarComplex();
    }
    const scalarTime = performance.now() - scalarStart;

    // 7. Вывод
    console.log(`
Результаты (${ITERATIONS.toLocaleString()} итераций):
---------------------------------
SIMD результат: ${simdResult}
Scalar результат: ${scalarResult}
---------------------------------
SIMD время:    ${simdTime.toFixed(2)}ms
Scalar время:  ${scalarTime.toFixed(2)}ms
Ускорение:     ${(scalarTime/simdTime).toFixed(2)}x
`);

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

runBenchmark();
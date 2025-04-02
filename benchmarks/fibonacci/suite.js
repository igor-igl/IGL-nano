const { performance } = require('perf_hooks');
const fs = require('fs');
const { scalarFib, scalarFibIter } = require('./scalar');

// Константы для теста
const N = 200;
const ITERATIONS = 1000000;
const WARMUP_ITERATIONS = 1000;

async function runBenchmark() {
  try {
    // Загрузка WASM
    const wasm = await WebAssembly.instantiate(
      fs.readFileSync('./build/benchmarks/fibonacci.simd.wasm'),
      { env: { abort: () => {} } }
    );

    console.log("=== Рекурсивные версии ===");
    await testImplementation("Scalar", () => scalarFib(N));
    await testImplementation("SIMD", () => wasm.instance.exports.simdFib(N));

    console.log("\n=== Итеративные версии ===");
    await testImplementation("Scalar Iter", () => scalarFibIter(N));
    await testImplementation("SIMD Iter", () => wasm.instance.exports.simdFibIter(N));

  } catch (error) {
    console.error('Ошибка выполнения:', error);
  }
}

async function testImplementation(name, fn) {
  // Прогрев
  for (let i = 0; i < WARMUP_ITERATIONS; i++) {
    await fn();
  }

  // Основные замеры
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    await fn();
  }
  const duration = performance.now() - start;

  console.log(`${name}: ${duration.toFixed(2)}ms (${ITERATIONS} итераций)`);
}

runBenchmark();
// tests/math.test.js
const path = require('path');
const fs = require('fs');
const { instantiate } = require('@assemblyscript/loader');

let wasm;

// Инициализация перед всеми тестами
beforeAll(async () => {
  try {
    const wasmPath = path.join(__dirname, '..', 'build', 'math.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);
    wasm = await instantiate(wasmBuffer, {
      env: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        abort: (msg) => console.error('WASM abort:', msg)
      }
    });
  } catch (err) {
    console.error('WASM instantiation failed:', err);
    throw err;
  }
});

describe('Math Module', () => {
  test('should load WASM module', () => {
    expect(wasm).toBeDefined();
    expect(wasm.exports).toBeDefined();
  });

  describe('Factorial', () => {
    test('scalar factorial(5) = 120', () => {
      expect(wasm.exports.factorial(5)).toBe(120);
    });
  });

  describe('Array Operations', () => {
    test('should process array of values', () => {
      // 1. Выделяем память
      const arraySize = 4;
      const arrayPtr = wasm.exports.allocateInt32Array(arraySize);
      expect(arrayPtr).not.toBe(0);

      // 2. Заполняем входные данные
      const memory = new Int32Array(wasm.exports.memory.buffer);
      const inputValues = [5, 3, 1, 10];
      memory.set(inputValues, arrayPtr / 4);

      // 3. Вызываем функцию
      wasm.exports.simdFactorial(arrayPtr, arraySize);

      // 4. Проверяем результаты
      const results = memory.slice(arrayPtr / 4, arrayPtr / 4 + arraySize);
      expect(results).toEqual(new Int32Array([120, 6, 1, 3628800]));

      // 5. Освобождаем память
      wasm.exports.freeInt32Array(arrayPtr);
    });
  });
  // tests/math.test.js
test('SIMD performance', () => {
  const ptr = wasm.exports.allocateInt32Array(4);
  const mem = new Int32Array(wasm.exports.memory.buffer);
  mem.set([5, 3, 1, 10], ptr / 4);

  console.time('SIMD');
  wasm.exports.simdFactorial(ptr, 4);
  console.timeEnd('SIMD'); // Должно быть быстрее скалярной версии!

  expect(mem.slice(ptr / 4, ptr / 4 + 4)).toEqual([120, 6, 1, 3628800]);
});
});
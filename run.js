// run.js
const fs = require('fs');

(async () => {
  const wasm = await WebAssembly.instantiate(
    fs.readFileSync('./build/test.wasm'),
    {
      env: {
        abort: () => {},
        // Пустые импорты
        memory: new WebAssembly.Memory({ initial: 1 }),
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
      }
    }
  );

  // Вариант 1: Прямой вызов
  console.log("Результат:", wasm.instance.exports.simdTest());

  // Вариант 2: Через глобальную переменную
  wasm.instance.exports.simdTestWithMemory();
  console.log("Через глобал:", global.__simd_result);
})();
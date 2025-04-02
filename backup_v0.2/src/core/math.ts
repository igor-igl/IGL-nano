// src/core/math.ts
export function simdFactorial(ptr: i32, len: i32): void {
    // 1. Проверка выравнивания (SIMD требует 16 байт)
    if (ptr % 16 !== 0) throw new Error("Unaligned memory access");
  
    // 2. Загрузка 4 чисел int32
    const vec = v128.load(ptr);
  
    // 3. Пример операции: умножение на 2 (замените на свою логику)
    const result = i32x4.mul(vec, i32x4.splat(2));
  
    // 4. Сохранение результата
    v128.store(ptr, result);
  }
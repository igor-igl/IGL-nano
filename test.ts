// test.ts
export function simdTest(): i32 {
    // Создаем SIMD-вектор из 4 значений 42
    const vec = i32x4.splat(42);
    // Возвращаем первое значение (индекс 0)
    return i32x4.extract_lane(vec, 0);
  }
// Убираем запись в память для теста
export function simdComplex(): i32 {
    const a = i32x4(1, 2, 3, 4);
    const b = i32x4(5, 6, 7, 8);
    const c = i32x4(9, 10, 11, 12);
    
    const sum1 = i32x4.add(a, b);
    const sum2 = i32x4.mul(sum1, c);
    return i32x4.extract_lane(sum2, 0); // Просто возвращаем результат
  }
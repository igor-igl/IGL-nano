// benchmarks/fibonacci/simd.ts
export function simdFib(n: i32): i32 {
    if (n <= 1) return n;
  
    // Векторизация вычисления F(n-1) и F(n-2)
    const vec = i32x4.splat(n);
    const offsets = i32x4(-1, -2, 0, 0);
    const params = i32x4.add(vec, offsets);
  
    const fib1 = simdFib(i32x4.extract_lane(params, 0));
    const fib2 = simdFib(i32x4.extract_lane(params, 1));
  
    return fib1 + fib2;
  }
  
  // Итеративная SIMD-версия (более эффективная)
  export function simdFibIter(n: i32): i32 {
    let a = i32x4.splat(0);
    let b = i32x4.splat(1);
  
    for (let i = 0; i < n; i++) {
      const temp = a;
      a = b;
      b = i32x4.add(temp, b);
    }
  
    return i32x4.extract_lane(a, 0);
  }
  
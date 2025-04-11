// src/core/simd_test.ts
export function simdTest(): i32 {
  const vec = i32x4.splat(42);
  return i32x4.extract_lane(vec, 0);
}

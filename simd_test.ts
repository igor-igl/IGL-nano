// Гарантированно изолированная версия
@global @unsafe
export function abort(): void {
  unreachable();
}

export function simdTest(): i32 {
  const a = i32x4.splat(1);
  const b = i32x4.splat(2);
  return i32x4.extract_lane(i32x4.add(a, b), 0);
}
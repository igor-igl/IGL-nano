export function simdTest(ptr: i32): void {
  const vec = v128.load(ptr);
  v128.store(ptr, vec);
}

// src/core/math.ts
export function factorial(n: i32): i32 {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

export function simdFactorial(ptr: i32, len: i32): void {
    for (let i = 0; i < len; i++) {
        const value = load<i32>(ptr + i * sizeof<i32>());
        const result = factorial(value);
        store<i32>(ptr + i * sizeof<i32>(), result);
    }
}

export function allocateInt32Array(size: i32): i32 {
    const ptr = __alloc(size * sizeof<i32>()) as i32;
    return ptr;
}

export function freeInt32Array(ptr: i32): void {
    __free(ptr as usize);
}

export const INT32ARRAY_ID = idof<Int32Array>();
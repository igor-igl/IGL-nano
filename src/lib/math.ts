export function factorial(n: i32): i32 {
    return n <= 1 ? 1 : n * factorial(n - 1);
  }
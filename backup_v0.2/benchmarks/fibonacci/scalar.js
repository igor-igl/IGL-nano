// benchmarks/fibonacci/scalar.js
function scalarFib(n) {
  if (n <= 1) return n;
  return scalarFib(n - 1) + scalarFib(n - 2);
}

function scalarFibIter(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}

module.exports = { scalarFib, scalarFibIter };
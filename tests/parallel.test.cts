// tests/parallel.test.cts
const { parallelFactorial } = require('../src/workers/pool');

describe('Многопоточный факториал', () => {
  it('должен вычислять факториал', async () => {
    const result = await parallelFactorial(5);
    expect(result).toBe(120);
  });
});

import workerpool from 'workerpool';

const pool = workerpool.pool();

// Явно укажите тип возвращаемого значения
export const parallelFactorial = (n: number): Promise<number> => {
  return pool.exec('factorial', [n]) as unknown as Promise<number>;
};

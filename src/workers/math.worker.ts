import { expose } from 'comlink';
import { factorial } from '../core/math';

const workerApi = {
  async factorial(n: number): Promise<number> {
    return factorial(n); // WASM-вызов
  }
};

expose(workerApi);
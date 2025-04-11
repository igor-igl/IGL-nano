import { Worker } from 'worker_threads';
import { SharedMemory } from './worker/shared-memory';

export class ThreadManager {
  private workers: Worker[] = [];
  private memory: SharedMemory;

  constructor(public concurrency = 4) {
    this.memory = new SharedMemory(1024 * 1024 * 64); // 64MB
    this.initWorkers();
  }

  private initWorkers() {
    for (let i = 0; i < this.concurrency; i++) {
      const worker = new Worker(__dirname + '/worker/worker.js', {
        workerData: {
          memoryBuffer: this.memory.buffer,
          threadId: i
        }
      });
      this.workers.push(worker);
    }
  }
}
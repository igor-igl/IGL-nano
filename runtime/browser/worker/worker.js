const { parentPort, workerData } = require('worker_threads');
const { Memory } = require('../shared-memory');

class WorkerThread {
  constructor() {
    this.memory = new Memory(workerData.memoryBuffer);
    this.registerHandlers();
  }

  registerHandlers() {
    parentPort.on('message', (task) => {
      const result = this.processTask(task);
      parentPort.postMessage(result);
    });
  }

  processTask(task) {
    try {
      return {
        status: 'processed',
        threadId: workerData.threadId,
        input: task,
        output: task.data ? 
          this.memory.process(task.data) : 
          new Float32Array()
      };
    } catch (err) {
      return {
        status: 'error',
        error: err.message
      };
    }
  }
}

new WorkerThread();
export class AtomicLock {
    private lock: Int32Array;
  
    constructor(sharedBuffer: SharedArrayBuffer) {
      this.lock = new Int32Array(sharedBuffer, 0, 1);
    }
  
    acquire(): boolean {
      return Atomics.compareExchange(this.lock, 0, 0, 1) === 0;
    }
  
    release(): void {
      Atomics.store(this.lock, 0, 0);
    }
  }
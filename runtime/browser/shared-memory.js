class Memory {
  constructor(buffer) {
    this.buffer = buffer;
    this.view = new Float32Array(buffer);
  }

  process(data) {
    if (!Array.isArray(data) && !ArrayBuffer.isView(data)) {
      return new Float32Array();
    }
    return new Float32Array(data.map(x => x * 2)); // Тестовая обработка
  }
}

module.exports = { Memory };
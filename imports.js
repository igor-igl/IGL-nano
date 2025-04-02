// imports.js
const imports = {
    env: {
      abort: () => { throw new Error('abort called') },
      memory: new WebAssembly.Memory({ initial: 1 })
    }
  };
  
  WebAssembly.instantiateStreaming(fetch('./build/test.wasm'), imports)
    .then(wasm => {
      console.log('SIMD test result:', wasm.instance.exports.simdTest());
    });
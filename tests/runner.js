const fs = require('fs');
const compiled = new WebAssembly.Module(fs.readFileSync('./dist/core.wasm'));
const imports = {};
const instance = new WebAssembly.Instance(compiled, imports);

console.log('1 + 2 =', instance.exports.add(1, 2));
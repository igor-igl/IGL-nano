const { instantiate } = require('@assemblyscript/loader');

global.loadWASM = async (name) => {
  const wasm = await instantiate(fs.readFileSync(`${global.WASM_PATH}${name}.wasm`));
  return wasm.exports;
};
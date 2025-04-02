const fs = require('fs');
const path = require('path');

const FORBIDDEN_DEPENDENCIES = {
  'runtime/browser': ['runtime/wasi'], // Web Workers не должны зависеть от WASI
  'libs/memory': ['runtime/browser']  // Модули памяти должны быть изолированы
};

function checkDependencies() {
  let errors = 0;

  Object.entries(FORBIDDEN_DEPENDENCIES).forEach(([

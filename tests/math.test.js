const createModule = require('./build/math.js');
createModule().then(m => console.log('2! =', m._factorial(2)));
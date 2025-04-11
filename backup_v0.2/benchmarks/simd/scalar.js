module.exports = {
  scalarComplex: () => {
    let sum = 0;
    for (let i = 1; i <= 4; i++) {
      sum += (i + (i+4)) * (i+8) + 42;
    }
    return sum;
  }
};
#include <emscripten.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
int factorial(int n) {
    printf("Calculating factorial(%d)\n", n);
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

EMSCRIPTEN_KEEPALIVE
int* allocateInt32Array(int size) {
    return (int*)malloc(size * sizeof(int));
}

EMSCRIPTEN_KEEPALIVE
void freeInt32Array(int* ptr) {
    free(ptr);
}

EMSCRIPTEN_KEEPALIVE
void simdFactorial(int* array, int size) {
    for (int i = 0; i < size; i++) {
        array[i] = factorial(array[i]);
    }
}

int main() { return 0; }

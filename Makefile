.PHONY: build test clean

build:
	mkdir -p dist
	npx asc src/core/main.ts -O3 -o dist/core.wasm
	npx asc src/lib/math.ts -O3 -o dist/math.wasm

test:
	@echo "\n=== Running core tests ==="
	@node tests/runner.js
	@echo "\n=== Running math tests ==="
	@node tests/math.test.js
	@echo "\nAll tests passed!"

clean:
	rm -rf dist/
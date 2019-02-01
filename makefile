export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

install: 
	@clear
	@echo "refreshing dependencies"
	@npm install

clean:
	@rm -rf dist

dev: 
	@clear clean install
	@echo "starting gap dev server..."
	webpack-dev-server --mode=development --config scripts/webpack/gap.js

build:
	@clear
	webpack --mode production --config webpack.config.js

typecheck:
	@clear tsc

test:
	@clear
	@npm test --verbose
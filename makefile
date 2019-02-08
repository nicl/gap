export PATH := node_modules/.bin:$(PATH)
export SHELL := /usr/bin/env bash

help:
	@echo "Run 'make install' to install gap, or use tab completion to see other commands."

clear:
	@clear

install: clear
	@npm install

clean: clear
	@rm -rf dist

dev: clear install
	webpack-dev-server --mode=development --config webpack.config.js

build: clear install
	webpack --mode production --config webpack.config.js

typecheck: clear
	tsc

test: clear
	@npm test
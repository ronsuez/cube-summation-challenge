
test:
	@./node_modules/.bin/mocha -R spec -b --recursive --timeout 10000

.PHONY: test

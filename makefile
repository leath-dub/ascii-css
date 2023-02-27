.SUFFIXES:
.POSIX:


scss = $(shell find scss -maxdepth 1 -name "*.scss")
files = $(shell find scss -name "*.scss")
css = $(patsubst scss/%.scss, css/%.css, $(scss))

all: sass

css/%.css: scss/%.scss
	sass $< $@

sass: $(css)

watch:
	echo $(files) | tr ' ' '\n' | entr make clean all

clean:
	rm $(css)

.PHONY: all sass watch

NAME := feed-discovery

build:
	zip -9 -r -FS $(NAME).xpi * \
	  --exclude '*.xpi' \
	  --exclude 'Makefile' \
	  --exclude 'README.md'
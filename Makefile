NAME := feed-discovery

build:
	mkdir -p dist

	zip -9 -r -FS dist/$(NAME).zip * \
	  --exclude '.gitignore' \
	  --exclude 'dist/*' \
	  --exclude 'Makefile' \
	  --exclude 'README.md'

	rsync dist/$(NAME).zip dist/$(NAME).chrome.crx
	rsync dist/$(NAME).zip dist/$(NAME).firefox.xpi
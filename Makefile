
help:
	@echo "Available commands:"
	@echo "    help     ... this help"
	@echo "    dev      ... start dev server (localhost:5173)"
	@echo "    build    ... build client"

dev:
	@echo "Starting dev server..."
	@npm run dev

build:
	@echo "Building client..."
	@npm run build

.PHONY: build serve deploy

PYTHON := python3
PORT := 8000
SRC_DIR := src
DIST_DIR := dist
ENV_FILE := .env

build:
	@echo "Building distributable files..."
	@test -d $(SRC_DIR) || (echo "Error: $(SRC_DIR) folder not found." && exit 1)
	@mkdir -p $(DIST_DIR)
	@cp $(SRC_DIR)/index.html $(DIST_DIR)/
	@cp $(SRC_DIR)/donations.html $(DIST_DIR)/
	@cp $(SRC_DIR)/config.js $(DIST_DIR)/
	@cp $(SRC_DIR)/app.js $(DIST_DIR)/
	@cp $(SRC_DIR)/donations-app.js $(DIST_DIR)/
	@cp $(SRC_DIR)/styles.css $(DIST_DIR)/
	@if [ -f $(SRC_DIR)/logo.png ]; then cp $(SRC_DIR)/logo.png $(DIST_DIR)/; fi
	@if [ -f $(SRC_DIR)/logo.jpg ]; then cp $(SRC_DIR)/logo.jpg $(DIST_DIR)/; fi
	@if [ -f $(SRC_DIR)/logo.svg ]; then cp $(SRC_DIR)/logo.svg $(DIST_DIR)/; fi
	@if [ -f $(SRC_DIR)/qrcode.min.js ]; then cp $(SRC_DIR)/qrcode.min.js $(DIST_DIR)/; fi
	@echo "✓ Build complete. Files are in $(DIST_DIR)/"

serve:
	@test -d $(DIST_DIR) || (echo "Error: $(DIST_DIR) folder not found. Run 'make build' first." && exit 1)
	@echo "Starting server from $(DIST_DIR) on http://localhost:$(PORT)"
	@echo "Press Ctrl+C to stop"
	@cd $(DIST_DIR) && $(PYTHON) -m http.server $(PORT)

deploy:
	@test -d $(DIST_DIR) || (echo "Error: $(DIST_DIR) folder not found. Run 'make build' first." && exit 1)
	@test -f $(ENV_FILE) || (echo "Error: $(ENV_FILE) file not found. Copy $(ENV_FILE).example to $(ENV_FILE) and configure it." && exit 1)
	@echo "Deploying to remote server..."
	@export $$(grep -v '^#' $(ENV_FILE) | xargs) && \
		scp -r $$([ -n "$$DEPLOY_SSH_PORT" ] && echo "-P $$DEPLOY_SSH_PORT") $(DIST_DIR)/* $${DEPLOY_USER}@$${DEPLOY_HOST}:$${DEPLOY_PATH}/
	@echo "✓ Deployment complete"

.PHONY: serve hooks check-fsot

PORT ?= 8000

serve:
	@echo "Serving demo at http://localhost:$(PORT)/"
	@python -m http.server $(PORT)

hooks:
	@bash scripts/install-hooks.sh

check-fsot:
	@echo "Checking hardcoded financial numbers outside FSOT block..."
	@grep -nE '\$$0\.(25|50|75)|10-25x|\$$116K|\$$290K|\$$12,500' index.html | grep -v "FSOT" || echo "OK: no drift detected"

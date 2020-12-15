
default: build-react-frontends deploy-react-frontends build-backends deploy-backends build-react-static
deploy: deploy-react-frontends deploy-backends

.PHONY: build-react-frontends
build-react-frontends:
	# Results will be in /build/<each frontend>
	cd frontend/tryst && make
	cd frontend/backoffice && make

.PHONY: build-static-frontends
build-static-frontends:
	# Results will be in /build/<each frontend>-prod
	cd frontend/tryst && make build-prod
	cd frontend/backoffice && make build-prod
	cd frontend/boundary-object && make build-prod

.PHONY: build-backends
build-backends:
	cd backend/loopback && make

.PHONY: deploy-react-frontends
deploy-react-frontends:
	rsync -a --delete /build/storefront/ /deploy/dev/storefront
	rsync -a --delete /build/backoffice/ /deploy/dev/backoffice

.PHONY: deploy-backends
deploy-backends:
	rsync -a --delete /build/loopback/ /deploy/dev/loopback

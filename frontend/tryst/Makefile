
default: build-react

############################################
# INSTALL PACKAGES

.PHONY: installdeps checkstalepackages
installdeps: checkstalepackages package-lock.json.previousrun

checkstalepackages:
	# If older than one day, delete it
	test "`find package-lock.json.previousrun -mtime +1`" && rm package-lock.json.previousrun || echo -n ""

package-lock.json.previousrun: package-lock.json
	npm install
	cp package-lock.json package-lock.json.previousrun

############################################
# BUILDING

.PHONY: build-prod
build-prod: installdeps
	rm -rf build || true
	npm run build
	cp -r build docker/
	rsync -a --delete build/ /build/storefront-prod
	echo "Storefront static build completed at $(date)" >> /tmp/devbuild.log

.PHONY: docker-push
docker-push: #build-prod
	docker build --pull -t aiditto/portal docker
	docker tag aiditto/portal registry.aiditto.net/aiditto/portal
	docker push registry.aiditto.net/aiditto/portal

.PHONY: build-react
build-react: installdeps
	rm -rf build || true
	rsync -a --delete . /build/storefront
	echo "Storefront react build completed at $(date)" >> /tmp/devbuild.log


default: build-dynamic

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
	npm run prestart
	rsync -a --delete . /build/loopback-prod
	echo "Storefront loopback-prod build completed at $(date)" >> /tmp/devbuild.log

.PHONY: build-dynamic
build-dynamic: installdeps
	npm run prestart
	rsync -a --delete . /build/loopback
	echo "Storefront loopback build completed at $(date)" >> /tmp/devbuild.log

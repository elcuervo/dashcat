dist:
	echo "Building OSX app..."
	macgap build osx
	echo "Moving to /pkg"
	mv osx.app pkg/DashCat.app

clean:
	rm -rf pkg/*

.PHONY: dist

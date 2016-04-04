[![Build Status](https://travis-ci.org/nus-mtp/ar-design-tool.svg?branch=master)](https://travis-ci.org/nus-mtp/ar-design-tool)
[![codecov.io](https://codecov.io/github/nus-mtp/ar-design-tool/coverage.svg?branch=master)](https://codecov.io/github/nus-mtp/ar-design-tool?branch=master)

##Ar Design Tool

	A tool for you to build augmented reality apps.

##Installation instructions

	Step 1: Install chocolatey for windows via command prompt (administrator)
	> open command prompt (run as admin)
	>  @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

	Step 2: Install nodejs *yes to everything
	> choco install nodejs

	Step 3: Install nodemon
	> npm install -g nodemon

	Step 4: Install Gulp
	> npm install -g gulp
	
	Step 5: Install Bower
	> npm install -g bower

	Step 6 (optional): Install node-gyp (requires Python 2.7, not 3.x):
	> npm install -g node-gyp

	Step 7: Install dependencies 
	> npm install 
	> bower install

##Folder Structure

	|-----	api		 			(Contains consolidated documentation) 
	|-----	app		 			(Files for the webapp) 
	|-----	backend_server_demo	(Backend team's folders)
	|-----	bower_components	(Dependencies installed by bower)
	|-----	.gitignore			
	|-----	.travis.yml			(travis ci yml file)
	|-----	bower.json			
	|-----	coverage-final.json
	L-----	README.MD 			

##Running Server
	
	To run the server:
	> npm start 

	if server crashes:
	> npm install

##Folder Structure

	|-----	AR Design 		(Files for the webapp) <---- CI for this folder
	|-----	Backend Server	(Backend team's folders)
	L-----	Frontend 		(Frontend team's folder)

##Run SASS watch 
	To run SASS watch
	> gulp

##Testing Guide (Javascript Test)
	To run all test:
	> npm test
	
	To run front end test only
	> gulp open-frontend-coverage
	
	To run back end test only
	> gulp open-backend-coverage
	
	To check Javascript and SASS lint
	> gulp lint
	
	Guidelines:
		- Make sure code is inside the coverage
		- Make sure coverage is above 90%
		- Linter has no warnings

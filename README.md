##Ar Design Tool
	A tool for you to build augmented reality apps

##Installation instructions
	Step 1: Install chocolatey for windows via command prompt (administrator)
	> open command prompt (run as admin)
	>  @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

	Step 2: Install nodejs *yes to everything
	> choco install nodejs

	Step 3: Install bower
	> npm install -g bower

	Step 4: Install nodemon
	> npm install -g nodemon

	Step 5: Install documentJS
	> npm install -g documentjs

	Step 6: Install Gulp 
	> npm install -g gulp 

	Step 7: Install bower dependencies 
	> cd into project dir
	> bower install 

	Step 8: Install node dependencies 
	> npm install 

	Step 9: Create gulpfile at root folder of project
	> https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

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

Where all the backend goes

Step 1: Install chocolatey for windows via command prompt (administrator)
> open command prompt (run as admin)
>  @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

Step 2: Install nodejs *yes to everything
> choco install nodejs

Step 3: Install express *need to global it
> npm install -g express-generator

Step 4: Install nodemon
> npm install -g nodemon

Step 5: Install MongoDB *ensure python 2.7 is installed
( if python 2.7 is not installed) 
	> choco install python2
> choco install mongodb

Step 6: Install Gulp or Grunt
> npm install -g gulp or npm install -g grunt-cli

Step 7: Install node-gyp:
> npm install -g node-gyp

	//===========
	creating project via express
	express helps create the scaffolding (template of your project directories)
	server is kept in bin/www (default app name is www)

		******* creating a new project
	express <<project name>>
	******* creating a new project
	===========//

Step 8: Install node dependencies 
> cd into project dir
> npm install 

(gulp/ grunt, node-sass-middleware, mongoose, kerberos)

Step 9: Create gulpfile at root folder of project
> https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

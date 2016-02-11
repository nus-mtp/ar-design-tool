@page VUMIX
##Ar Design Tool

	A tool for you to build augmented reality apps

##Running Server

	To run the server:
	> nodemon start 
	or
	> nodemon ardesign

	if server crashes:
	> npm install
	> nodemon start or nodemon ardesign

##Folder Structure

	|-----	bower_components	(Dependencies installed by bower)
	|-----	node_modules		(Dependencies installed by npm) 
	|-----	public		 		(Static files to be served to frontend) 
	|-----	server				(Modules and configs used by server)
	|-----	test							
	|-----	ardesign.js			(app file)
	|-----	bower.json
	|-----	documentjs.json
	|-----	gulpfile.js
	|-----	package.json		
	L-----	README.MD 			

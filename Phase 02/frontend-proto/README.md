#Front end demo for Babylon, Minko and Three

##Description
This simulates a simple server serving up web pages. Currently, it only serves static pages from three html files. Each html files will serve a WebGL Demo from different frameworks

##Folder Structure
The following is the folder structure

- root
  - web
    - _shared - shared html files
    - babylon - where babylon demo goes (all babylon-related html, css and js go here)
    - minko - where minko demo goes (all minko-related html, css and js go here)
    - three - where three demo goes (all three-related html, css and js go here)
  - node_modules - folder where all the dependecies go
  - package.json - project description and dependency module
  - index.js - server file
  - config.js - server configuration file

##Installation

1. Install node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
2. Check installation by typing **node --version** and **npm -version** (check both npm and node)
3. Open terminal in root folder and type **npm install**
4. Start server by typing **npm start** (preferable) or **node index.js**

chaicode
-------------
##### (chai -kode), *n.*  

An HTML, CSS & JavaScript prototyping tool that works *live* across devices.
   
Chaicode lets you try out ideas quickly and live across devices. NO MOAR REFRESHES!  
You can simultaneously test your layout on a desktop, phone and tablet. YAY!  
It is currently in its alpha stage and a lot of features are in the pipeline including *collaborative coding* and a lot more!

Installation
--------------
- Install [Node.js](http://nodejs.org/ "Node.js installation link")
- Install [mongoDB](http://www.mongodb.org/downloads "mongoDB installation link") for your OS
- Setup your mongoDB server
	- Choose port and ip for the mongoDB server
	- Enable database authentication if required
    - Connect via mongo command line client and create a database for chaicode
    - If database auth is enabled then setup a user for the chaicode database
    - Put these details in config/config.json (default port is *27017* and server is *localhost*)
    - Database options in config/config.json refers to [MongoClient options object](http://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html "MongoClient options object").
- Put the port you want to run chaicode on in config/config.json (defaults to *3000*)
- Perform ```npm install``` inside the chaicode folder
- Navigate to the chaicode directory via command line and start the app by entering ```npm start```

Features
--------------
- Live HTML, CSS and Javascript updates across devices
- jQuery support is built-in
- Ability to export your work
- Forking abilities
- RUN ON YOUR OWN SYSTEM! (No more internet required to mess with ideas)

Upcoming Features
--------------
- ##### Support for multiple Javascript libraries
- ##### Ability to add resources via URIs
- ##### Collaborative coding support
- ##### User interface redesign (HELP!)
- Inline previews of things like colors, resources like images etc.
- ##### Code highlighting and prettyfying
- JSLint support

Things in bold are what I am working on currently.   

*PS:* I could really use help with the UI design.
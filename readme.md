chaicode
-------------
##### (chai -code), *n.*  

An HTML, CSS & JavaScript prototyping tool that shows code updates *live* across devices.

Chaicode lets you try out ideas quickly and live across devices [ *no moar refreshes* ].    
You can simultaneously test your layout on a desktop, phone and tablet [ *yay!* ].  
It is currently in its alpha stage and a lot of features are in the pipeline including *collaborative coding*.   
You can currently demo it [here](http://chaicode-3lads.rhcloud.com/ "chaicode demo link").   
__Note:__ The *live* feature takes a little bit of time to load up on openshift, fyi.

PS: chaicode is partially built using chaicode [ *we must go deeper!* ].

Installation
--------------
- Install [Node.js](http://nodejs.org/ "Node.js installation link")
- Install [mongoDB](http://www.mongodb.org/downloads "mongoDB installation link") for your OS
- Start the mongoDB server
- Navigate to the ```chaicode``` directory via command line   
	- Perform ```npm install```
	- start the app by entering ```npm start``` and hitting ```return```

For controlling some advanced features, take a look at ```config.json``` under ```chaicode/config```.

Features
--------------
- Live HTML, CSS and Javascript updates across devices
- Auto complete for HTML, CSS and Javascript
- Zen mode (hit F11 when in any region)
- CSSLint and JS Lint (using JSHint) added
- Code tidy up added
- jQuery support is built-in
- Ability to export your work as a single html file
- Ability to fork code into your own version of it
- Landing page for all present chais on the server [ *Delete is still down. Will be fixing it soon.* ]
- __Run on your own system!__ [ *No more internet required to mess with ideas.* ]

Upcoming Features
--------------
- __Support for multiple Javascript libraries__
- __Ability to add resources via URIs__
- __Collaborative coding support__
- __User interface redesign (HELP!)__
- Inline previews of things like colors, resources like images etc.
- ~~__Code highlighting and prettyfying__~~ __DONE!__
- ~~JSLint support~~ __DONE!__
- Support for SASS, CoffeeScript, Jade and other popular engines
- Timeline of different chai recipes or versions of your code
- __Ability to delete a particular chai__
- User login support
- __Landing page for all present chais on the server based on user__
- Add chai embed functionality to let the user share his/her code

Things in bold are what I am working on currently.   

*PS:* I could really use help with the UI design.
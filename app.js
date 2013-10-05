/**
 * chaiCode application server
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  chaiCodeUtil = require('./util/util'),
  socketIO = require('socket.io'),
  MongoClient = require('mongodb').MongoClient,
  DBServer = require('mongodb').Server,
  routes = require('./routes/routes'),
  config = require('./config/config.json'),
  socketioServer = require('./util/socketioServer'),
  db = null;


var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || config.APP.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('ohlookitsspidermonkeyman'));
  app.use(express.session({
    secret: 'ohmanitwasjustamonkeyinasuperspideymansuit'
  }));
  //app.use(express.csrf());

  /*Setting up public directory support*/
  app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
  app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));

  app.use(app.router);

  /*To enable ejs support even for html files*/
  app.engine('html', require('ejs').renderFile);
});

app.configure('development', function() {
  /*Custom error handler*/
  app.use(function(err, req, res, next) {
    var errorStack = err.stack.split(/\bat\b/),
        errorHtml = "<ul>";

    for (var i = 0; i < errorStack.length; i++)
      errorHtml += "<li>at " + errorStack[i] + "</li>";

    errorHtml += "</ul>";

    res.statusCode = 500;
    res.render('errors/500.ejs', {
      error: err.message,
      errorStack: errorHtml
    });
    console.log(chaiCodeUtil.colors.red + "Error:");
    console.log(chaiCodeUtil.colors.reset + err.stack + chaiCodeUtil.colors.reset);
  });
});

app.configure('production', function() {
  app.use(function(err, req, res, next) {
    res.statusCode = 500;
    res.render('errors/500.ejs', {
      error: "Internal server error",
      errorStack: ""
    });
    console.log(chaiCodeUtil.colors.red + "Error:");
    console.log(chaiCodeUtil.colors.reset + err.stack + chaiCodeUtil.colors.reset);
  });
});


this.dbClient = new MongoClient(new DBServer(config.DB.HOST, config.DB.PORT, config.DB.OPTIONS));

this.dbClient.open(function(err, client) {
  /*if error while opening connection to database throw error*/
  if (err || client === null) {
    throw (err ? err : new Error("Could not open connection to database"));
  }

  /*switch to chaiCode database*/
  db = client.db(config.DB.NAME);

  console.log(chaiCodeUtil.colors.green + "Database auth is " + (config.DB.AUTH_ENABLED ? "enabled" + chaiCodeUtil.colors.reset : chaiCodeUtil.colors.red + "disabled" + chaiCodeUtil.colors.reset));

  /*Authenticate nodejs instance for using config.DB.NAME db if config.DB.AUTH_ENABLED == true*/
  if (config.DB.AUTH_ENABLED) {
    db.authenticate(config.DB.UNAME, config.DB.PASS, function(err, result) {
      if (err || result === null) {
        throw (err ? err : new Error("Authentication to database failed"));
      }
      if (result) {
        console.log(chaiCodeUtil.colors.green + "User authenticated to " + chaiCodeUtil.colors.yellow + config.DB.NAME + chaiCodeUtil.colors.green + " database" + chaiCodeUtil.colors.reset);
      }
    });
  }


  /*Setup routes and bind them to app*/
  routes(app, db);

  /*Create express server*/
  var server = http.createServer(app);

  //console.log(socketIO.Manager.toString());

  /*Start socket.io server and bind to express server so that they listen on same port for requests*/
  var io = socketIO.listen(server);

  /*Setting logging to 'warn'*/
  /*https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO*/
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socketioServer(socket);
  });

  /*Start app http server once db connection open*/
  server.listen(app.get('port'), function() {
    console.log(chaiCodeUtil.colors.green + "Express server listening on port " + chaiCodeUtil.colors.yellow + app.get('port') + chaiCodeUtil.colors.reset);
  });
});
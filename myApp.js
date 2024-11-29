const express = require('express');
const app = express();
const helmet = require('helmet');
// //to hide information (hide powered by Express in header) 
// app.use(helmet.hidePoweredBy());
// //not allow other user to show this browser in iframe
// app.use(helmet.frameguard({action:'deny'}))
// //check user input if contain anything that can control browser (like '<>');
// app.use(helmet.xssFilter());
// //not allow to change content-type in form input
// app.use(helmet.noSniff())
// //not allow to download the html of current page
// app.use(helmet.ieNoOpen())
// // force the client to make connection over https and will not support connections over http.
// app.use(helmet.hsts({maxAge:90*24*60*60,force:true}));
// //disable prefect the DNS of the link
// app.use(helmet.dnsPrefetchControl());
// //
// app.use(helmet.noCache())

// // defaultSrc to ["'self'"] (the list of allowed sources must be in an array), in order to trust only your website address by default
// // the scriptSrc directive so that you only allow scripts to be downloaded from your website ('self'), and from the domain 'trusted-cdn.com'
// app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }} )) 

// helmet() will automatically include all the middleware introduced above, except noCache(), and contentSecurityPolicy()
app.use(helmet({
  frameguard:{
    action:'deny',
  },
  contentSecurityPolicy:{
    directives:{
      defaultSrc:["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  },
  dnsPrefetchControl:false,
}))































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

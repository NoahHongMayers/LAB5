/**
 * @file     app.js
 * @author   Noah Hong Mayers | 202430525@edu.clg.qc.ca
 * @version  1.0
 * @date     September 22 2026
 * @brief    Skeleton for a Node.js application using Express framework
 */

//=====================[ Imports ]==========================

const PORT = 3000;                                  // Define the port number for the server
var express = require('express');                   // Import the Express framework
var app = express();                                // Create an instance of the Express application
app.set('view engine', 'ejs')                       // Set the view engine to EJS for rendering templates
app.set('views', './views');                        // Set the directory for view templates
app.use(express.static('./public'));                // Serve static files from the 'public' directory
app.use(express.json());                            // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false }));   // Middleware to parse incoming URL-encoded requests

//=====================[ Routes ]==========================
app.use(require('./routes/index'));                 // Use the routes defined in the 'index' module
app.use('/contacts', require('./routes/contacts')); // Use the routes defined in the 'contacts' module for '/contacts' path

//=====================[ Server Initialization ]==========================

// 404 error handler
app.use(function (req, res, next) {
    res.status(404)
    res.render("pages/404.ejs");
});
// Start the server
let server = app.listen(PORT, function(){
    console.log('Server launched on port ' + PORT);
});

//Errors
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app};

//=====================[ End of File ]==========================
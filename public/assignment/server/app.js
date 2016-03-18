/**
 * Created by Sanil on 3/16/2016.
 */
// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app,userModel);
    var formService = require("./services/form.service.server.js")(app,formModel,userModel);
    var fieldService= require("./services/field.service.server.js")(app,formModel,userModel);
}
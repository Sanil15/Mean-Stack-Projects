/**
 * Created by Sanil on 3/16/2016.
 */
// pass db and mongoose reference to server side application module
module.exports = function(app, db) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db);
    var formModel   = require("./models/form.model.server.js")(db,app);

    var userService  = require("./services/user.service.server.js") (app,userModel);
    var formService = require("./services/form.service.server.js")(app,formModel,userModel);

}
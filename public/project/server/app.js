/**
 * Created by Sanil on 3/16/2016.
 */
// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var carPoolModel   = require("./models/carpool.model.server.js")(db, mongoose);
    var  messageModel = require("./models/message.model.server.js")(db,mongoose);
    var ratingModel = require("./models/rating.model.server.js")(db,mongoose);

    var userService  = require("./services/user.service.server.js") (app,userModel);
    var carPoolService = require("./services/carpool.service.server.js")(app,carPoolModel,userModel);
    var messageService = require("./services/message.service.server.js")(app,messageModel,userModel);
    var ratingService = require("./services/rating.service.server.js")(app,ratingModel,userModel);
}
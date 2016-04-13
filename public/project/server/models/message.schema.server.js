/**
 * Created by Sanil on 4/10/2016.
 */

var mongoose=require("mongoose");

module.exports = function (){

    var MessageSchema = mongoose.Schema({
        fromUser: String,
        toUser: String,
        created: {type: Date, default: Date.now},
        message: String,
        visibleToUser: {type: Boolean, default: true},
        visibleFromUser: {type: Boolean, default: true}
    },{collection: 'message'});
    return MessageSchema;
}
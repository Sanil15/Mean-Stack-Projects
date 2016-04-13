/**
 * Created by Sanil on 4/10/2016.
 */

var mongoose=require("mongoose");

module.exports = function (){

    var RatingSchema = mongoose.Schema({
        fromUser: String,
        toUser: String,
        rating: Number,
        review: String,
    },{collection: 'rating'});
    return RatingSchema;
}
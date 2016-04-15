/**
 * Created by Sanil on 4/10/2016.
 */

var mongoose=require("mongoose");

module.exports = function (){

    var RatingSchema = mongoose.Schema({
        fromUser: String,
        toUser: String,
        rating: {type: Number, default: 0},
        review: String,
        created: {type: Date, default: Date.now},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    },{collection: 'rating'});
    return RatingSchema;
}
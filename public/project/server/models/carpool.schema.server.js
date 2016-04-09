/**
 * Created by Sanil on 4/7/2016.
 */
var mongoose=require("mongoose");

module.exports = function (){

    var CarPoolSchema = mongoose.Schema({
        userId: String,
        source: String,
        destination: String,
        date: Date,
        time: String,
        carInfo: String,
        basePrice: Number,
        noOfSeats: Number,
        comments: String
    },{collection: 'carpool'});

    return CarPoolSchema;
}
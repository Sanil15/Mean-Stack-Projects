/**
 * Created by Sanil on 3/23/2016.
 */
module.exports = function(app, ratingModel, userModel) {

    app.get("/api/project/rating/:ratingId", getRatingById);

    app.get("/api/project/rating", getAllRating);

    app.delete("/api/project/rating/:ratingId", deleteRatingById);

    app.post("/api/project/rating", createRatingByUser);

    app.put("/api/project/rating/:ratingId", updateRatingById);

    function getRatingById(req,res){
        var ratingId=req.params.ratingId;

        ratingModel.findReviewById(ratingId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllRating(req,res){

        var forUser=req.query.userName;

        if(forUser!=null){
            getRatingForUser(req,res);
        }

        else {
            ratingModel.findAllReviews()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
    }

    function getRatingForUser(req,res){

        var userName=req.query.userName;
        console.log("Yes"+userName);
        ratingModel.findAllReviewsForUser(userName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteRatingById(req,res){

        var ratingId=req.params.ratingId;

        ratingModel.deleteReviewById(ratingId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createRatingByUser(req,res){

        var rating=req.body;
        console.log(rating);
        ratingModel.createReview(rating)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateRatingById(req,res){

        var ratingId=req.params.ratingId;
        var rating=req.body;
        ratingModel.updateReviewById(ratingId,rating)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
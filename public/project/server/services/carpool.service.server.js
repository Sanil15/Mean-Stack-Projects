/**
 * Created by Sanil on 3/23/2016.
 */
module.exports = function(app, carPoolModel, userModel){

    app.get("/api/project/user/:userId/carpool",getCarPoolByUserId);

    app.get("/api/carpool/search/:attr",getCarPoolBySourceDestination)
    app.get("/api/project/carpool", getCarPoolByAttributes);
    app.get("/api/project/carpool/:carPoolId",getCarPoolById);
    app.get("/api/project/search/:location",getRecommendations);
    app.delete("/api/project/carpool/:carPoolId", deleteCarPoolById);

    app.post("/api/project/user/:userId/carPool",createCarPoolByUser);

    app.put("/api/project/carpool/:carPoolId", updateCarPoolById);

    function getCarPoolBySourceDestination(req,res){
        var attr=req.params.attr;
        carPoolModel.findCarPoolBySourceDestination(attr,attr)
            .then(
                function (doc) {

                    var array=[]

                    for(var i=0;i<doc.length;i++){

                        var a = {
                            "location": doc[i].source
                        }
                        array.push(a);
                        var b = {
                            "location": doc[i].destination
                        }
                        array.push(b);
                    }

                    var uniqueArray = array.filter(function(item, pos, self) {
                        return self.indexOf(item) == pos;
                    })

                    res.json(uniqueArray);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCarPoolById(req,res){
        var carPoolId=req.params.carPoolId;

        carPoolModel.findCarPoolById(carPoolId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCarPoolByUserId(req,res){
        var userId=req.params.userId;

        carPoolModel.findAllCarPoolByUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getRecommendations(req,res){

        var location=req.params.location;
        carPoolModel.findCarPoolByCity(location)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getCarPoolByAttributes(req,res){

        var city=req.query.city;
        var destination=req.query.source;
        var source = req.query.destination;

        if(city!=null){
            carPoolModel.findCarPoolByCity(city)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }

        else if(source!=null && destination!=null){
            carPoolModel.findCarPoolBySourceDestination(source,destination)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }

        else{
            carPoolModel.findAllCarPool()
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

    function deleteCarPoolById(req,res){

        var carPoolId=req.params.carPoolId;

        carPoolModel.deleteCarPoolById(carPoolId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createCarPoolByUser(req,res){
       var userId=req.params.userId;
       var carPool=req.body;

       carPoolModel.createCarPoolByUser(userId,carPool)
           .then(
               function (doc) {
                   res.json(doc);
               },
               function (err) {
                   res.status(400).send(err);
               }
           );
    }

    function updateCarPoolById(req,res){
        var carPoolId=req.params.carPoolId;
        var carPool=req.body;

        carPoolModel.updateCarPoolById(carPoolId,carPool)
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

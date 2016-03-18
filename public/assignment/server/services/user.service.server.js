/**
 * Created by Sanil on 3/17/2016.
 */
module.exports = function(app, userModel){
    app.post("/api/assignment/user", createUser);

    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);

    //app.get("/api/assignment/user?username=username", getUserByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);

    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function findUserByCredentials(req, res) {
        var credentials=req.body;

        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res){

        console.log("HI");
        if(req.query.username==null && req.query.password==null) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }

        else if(req.query.username!=null && req.query.password==null){
            getUserByUsername(req,res);
        }
        else if(req.query.username!=null && req.query.password!=null){
            findUserByCredentials(req,res);
        }


    }

    function getUserById(req,res){
        var userId = req.params.id;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByUsername(req,res){
        var userName = req.params.username;
        userModel.findUserByUsername(userName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req,res){
        var user = req.body;

        userModel.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function updateUserById(req,res){
        var userId=req.params.id;
        var user=req.body;

        userModel.updateUserById(userId,user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req,res){
        var userId=req.params.id;

        userModel.deleteUserById(userId)
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
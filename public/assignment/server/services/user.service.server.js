/**
 * Created by Sanil on 3/17/2016.
 */
module.exports = function(app, userModel){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/logout",logout)

    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);

    //app.get("/api/assignment/user?username=username", getUserByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);

    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function findUserByCredentials(req, res) {

        var username=req.query.username;
        var password=req.query.password;


        var credentials={
            "username": username,
            "password": password
        };

        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedIn(req, res) {
        console.log(req.session.currentUser);
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function getAllUsers(req, res){

        //console.log("HI");

        var username=req.query.username;
        var password=req.query.password;

        //console.log(username);
        //console.log(password);

        if(username==null && password==null) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    //console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }

        else if(username!=null && password==null){
            getUserByUsername(req,res);
        }
        else if(username!=null && password!=null){
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
        var userName = req.query.username;
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
        var emails=user.emails.split(",");
        user.emails=emails;
        userModel.createUser(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function updateUserById(req,res){
        var user=req.body;
        var userId=req.params.id;
        var emails=user.emails;

        if(user.emails.indexOf(",")>-1)
        emails=user.emails.split(",");

        user.emails=emails;

        userModel.updateUser(userId,user)
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
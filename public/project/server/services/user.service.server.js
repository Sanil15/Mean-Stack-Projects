/**
 * Created by Sanil on 3/17/2016.
 */
module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);

    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);

    app.put("/api/project/user/:id", updateUserById);
    app.delete("/api/project/user/:id", deleteUserById);


    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;


        var credentials = {
            "username": username,
            "password": password
        };

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

    function getAllUsers(req, res) {

        //console.log("HI");

        var username = req.query.username;
        var password = req.query.password;

        //console.log(username);
        //console.log(password);

        if (username == null && password == null) {
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

        else if (username != null && password == null) {
            getUserByUsername(req, res);
        }
        else if (username != null && password != null) {
            findUserByCredentials(req, res);
        }

    }

    function getUserById(req, res) {
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

    function getUserByUsername(req, res) {
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

    function createUser(req, res) {
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


    function updateUserById(req, res) {
        var user = req.body;
        var userId = req.params.id;
        console.log(user);
        console.log(userId);
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
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
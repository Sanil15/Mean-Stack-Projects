/**
 * Created by Sanil on 3/17/2016.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel) {

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var auth = authorized;
    app.post("/api/project/login",passport.authenticate('local'),login)
    app.post("/api/project/user", createUser);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedIn);

    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", auth , getUserById);
    app.put("/api/project/user/:id", auth, updateUserById);

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    var admin = isAdmin;
    app.delete("/api/project/user/:id",admin, deleteUserById);
    app.post("/api/project/admin/:id",admin, makeAdmin)

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        // lookup developer by username only. cant compare password since it's encrypted


        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            //console.log(req);
            next();
        }
    };

    function isAdmin(req,res,next){

        if (req.isAuthenticated() && (req.user.roles.indexOf("admin") >= 0)){
            next();
        } else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : 0);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function uploadImage(req, res) {

        var userId=req.user._id;

        var myFile        = req.file;

        var destination   = myFile.destination;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;

        var imgUrl= "../public/uploads/"+filename;

        userModel
            .uploadImageById(userId, imgUrl)
            .then(
                function(response) {
                    res.redirect("/project/client/#/editprofile");
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        //console.log("Hi"+username+" Pass "+password);

        var credentials = {
            "username": username,
            "password": password
        };

        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    //console.log("USER");
                    req.session.user=doc;
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
                        //console.log(doc);
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
        console.log("hi")
        var user = req.body;
        user.roles=["general"];
        console.log(user.username);
        userModel
            .findUserByUsername(user.username)
            .then(
                function(result){
                    if(result){
                        res.json(null);
                    }else{
                        user.password=bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                }, function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function makeAdmin(req, res) {
        var userId = req.params.id;
        //console.log(user);
        //console.log(userId);
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    doc.roles.push("admin");
                    return userModel.updateUserByAdmin(doc._id,doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            ).then(
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
        //console.log(user);
        //console.log(userId);
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
/**
 * Created by Sanil on 3/17/2016.
 */

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var auth = authorized;
    app.post("/api/assignment/login",passport.authenticate('local'),login)
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/loggedin", loggedIn);
    app.post("/api/assignment/logout",logout)

    app.get("/api/assignment/user", auth, getAllUsers);
    app.get("/api/assignment/user/:id", auth , getUserById);
    app.put("/api/assignment/user/:id", auth, updateUserById);


    // Admin priveleges
    var admin =isAdmin;
    app.post("/api/assignment/admin/user" ,createUser);
    app.get("/api/assignment/admin/user" ,getAllUsers);
    app.get("/api/assignment/admin/user/:userId" ,getUserById);
    app.delete("/api/assignment/admin/user/:userId" ,deleteUserById);
    app.put("/api/assignment/admin/user/:userId",updateUserById);

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
        if (!req.isAuthenticated()
            //&&
            //(req.user.roles.indexOf("admin") > 0)
        ) {
            res.send(403);
        } else {
            next();
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
        res.send(req.isAuthenticated() ? req.user : '0');
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

    function createUser(req,res){
        var user = req.body;

        if(user.roles && user.roles.length > 1) {
            user.roles = user.roles.split(",");
        } else {
            user.roles = ["student"];
        }

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

        var userId;
        if(req.params.id)
        userId = req.params.id;
        else
        userId=req.params.userId;

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
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function register(req,res){
        var user = req.body;
        var emails=user.emails.split(",");
        user.emails=emails;
        user.roles=['student'];
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


    function updateUserById(req,res){

        console.log("HI HERE WE ARE RELOAD");

        var userId;

        userId=req.params.userId;

        var user=req.body;
        var emails=user.emails;
        var roles=user.roles;

        if(user.emails.indexOf(",")>-1)
        emails=user.emails.split(",");

        if(user.roles.indexOf(",")>-1)
        roles=user.roles.split(",");

        user.emails=emails;
        user.roles=roles;

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
        var userId;
        if(req.params.id)
            userId = req.params.id;
        else
            userId=req.params.userId;

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
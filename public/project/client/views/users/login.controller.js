/**
 * Created by Sanil on 3/1/2016.
 */
(function (){

    'use strict';

    angular.module("CarPoolApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService, $location){

        var vm=this;

        vm.login=login;
        //
        //$(document).ready(function(){
        //    $(document).mousemove(function(e){
        //        TweenLite.to($('.login_body'),
        //            .5,
        //            { css:
        //            {
        //                backgroundPosition: ""+ parseInt(event.pageX/8) + "px "+parseInt(event.pageY/'12')+"px, "+parseInt(event.pageX/'15')+"px "+parseInt(event.pageY/'15')+"px, "+parseInt(event.pageX/'30')+"px "+parseInt(event.pageY/'30')+"px"
        //            }
        //            });
        //    });
        //});


        function init() {


        }

        init();

        // function for checking login of a controller
        function login(user){

            //console.log(username,password);
            UserService.findUserByCredentials(user.email,user.password)
                .then(function (response){
                        if(response.data !=null) {
                            console.log(response.data);
                            UserService.setCurrentUser(response.data);
                            $location.url("/showprofile/"+response.data._id);
                        }},
                    function(err){
                        vm.error = "Invalid Login Credentials!!!";
                    });

        }

    }
})();
/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("RegisterController",RegisterController)

        function RegisterController( UserService, $location, $scope){

            var vm = this;

            vm.register = register;
            vm.findUserName = findUserName;

            function init() {

// nice form step wizard
                vm.x =1;
                vm.user={};
                vm.show2=false;
                vm.show3=false;
                vm.available = 0;

                // nice form step wizard
                $(document).ready(function () {

                    var navListItems = $('div.setup-panel div a'),
                        allWells = $('.setup-content'),
                        allNextBtn = $('.nextBtn');

                    allWells.hide();

                    navListItems.click(function (e) {
                        e.preventDefault();
                        var $target = $($(this).attr('href')),
                            $item = $(this);

                        if (!$item.hasClass('disabled')) {
                            navListItems.removeClass('btn-primary').addClass('btn-default');
                            $item.addClass('btn-primary');
                            allWells.hide();
                            $target.show();
                            $target.find('input:eq(0)').focus();
                        }
                    });


                    allNextBtn.click(function(){
                        var curStep = $(this).closest(".setup-content"),
                            curStepBtn = curStep.attr("id"),
                            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                            curInputs = curStep.find("input[type='text'],input[type='email'],select[id='industry']"),
                            isValid = true;

                        $(".form-group").removeClass("has-error");
                        for(var i=0; i<curInputs.length; i++){
                            if (!curInputs[i].validity.valid){
                                isValid = false;
                                $(curInputs[i]).closest(".form-group").addClass("has-error");
                            }
                        }

                        if (isValid)
                            nextStepWizard.removeAttr('disabled').trigger('click');
                    });

                    $('div.setup-panel div a.btn-primary').trigger('click');

                    $('#txtPhone').blur(function(e) {
                        if (validatePhone('txtPhone')) {
                            $('#spnPhoneStatus').html('Valid');
                            $('#spnPhoneStatus').css('color', 'green');
                        }
                        else {
                            $('#spnPhoneStatus').html('Invalid');
                            $('#spnPhoneStatus').css('color', 'red');
                        }
                    });

                    function validatePhone(txtPhone) {
                        var a = document.getElementById(txtPhone).value;
                        var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
                        if (filter.test(a)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }

                });





                $("input[type=password]").keyup(function(){
                    var ucase = new RegExp("[A-Z]+");
                    var lcase = new RegExp("[a-z]+");
                    var num = new RegExp("[0-9]+");

                    if($("#password1").val().length >= 8){
                        $("#8char").removeClass("glyphicon-remove");
                        $("#8char").addClass("glyphicon-ok");
                        $("#8char").css("color","#00A41E");
                    }else{
                        $("#8char").removeClass("glyphicon-ok");
                        $("#8char").addClass("glyphicon-remove");
                        $("#8char").css("color","#FF0004");
                    }

                    if(ucase.test($("#password1").val())){
                        $("#ucase").removeClass("glyphicon-remove");
                        $("#ucase").addClass("glyphicon-ok");
                        $("#ucase").css("color","#00A41E");
                    }else{
                        $("#ucase").removeClass("glyphicon-ok");
                        $("#ucase").addClass("glyphicon-remove");
                        $("#ucase").css("color","#FF0004");
                    }

                    if(lcase.test($("#password1").val())){
                        $("#lcase").removeClass("glyphicon-remove");
                        $("#lcase").addClass("glyphicon-ok");
                        $("#lcase").css("color","#00A41E");
                    }else{
                        $("#lcase").removeClass("glyphicon-ok");
                        $("#lcase").addClass("glyphicon-remove");
                        $("#lcase").css("color","#FF0004");
                    }

                    if(num.test($("#password1").val())){
                        $("#num").removeClass("glyphicon-remove");
                        $("#num").addClass("glyphicon-ok");
                        $("#num").css("color","#00A41E");
                    }else{
                        $("#num").removeClass("glyphicon-ok");
                        $("#num").addClass("glyphicon-remove");
                        $("#num").css("color","#FF0004");
                    }

                    if($("#password1").val() == $("#password2").val()){
                        $("#pwmatch").removeClass("glyphicon-remove");
                        $("#pwmatch").addClass("glyphicon-ok");
                        $("#pwmatch").css("color","#00A41E");
                    }else{
                        $("#pwmatch").removeClass("glyphicon-ok");
                        $("#pwmatch").addClass("glyphicon-remove");
                        $("#pwmatch").css("color","#FF0004");
                    }
                });


            }

            init();

            function findUserName(username){
                UserService.findAllUsers()
                    .then(function(response){
                        if(response != null){
                            vm.available = 2;
                            vm.checkUserName = null;
                        }
                        else {
                            vm.available = 1;
                            vm.user.username = username;
                        }
                    })
            }

            // function to register a current user
            function register(user,confirmPassword){
                console.log("HI");
                console.log(user);
                console.log(confirmPassword)
                if(user.password==confirmPassword && user.password!=null && confirmPassword!=null){
                    console.log("HI");
                    UserService.createUser(user)
                        .then(function (response){
                               if(response.data==null){
                                   vm.error="Username Already Exists!";
                               }else{
                                   UserService.setCurrentUser(response.data);
                                   var a=response.data;
                                   $location.path("/home");
                               }}
                        , function(err){
                               vm.error= err;
                            });
                }
            }

        }

})();
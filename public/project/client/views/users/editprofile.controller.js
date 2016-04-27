/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("EditProfileController",EditProfileController)

    function EditProfileController(UserService, $location){

        var vm = this;

        vm.update = update;

        function init() {
            vm.x=1;

            var user;
            UserService.getCurrentUser()
                .then(function(response) {
                    user=response.data;
                    vm.selectedUserId=user._id;
                    vm.user = {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        country : user.country,
                        state : user.state,
                        address : user.address,
                        city : user.city,
                        contact : user.contact,
                        dob : new Date(user.dob),
                        zipCode : user.zipCode

                }})

            //$(document).ready(function() {
            //    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
            //        var $form = $(this).closest('form'),
            //            $group = $(this).closest('.input-group'),
            //            $addon = $group.find('.input-group-addon'),
            //            $icon = $addon.find('span'),
            //            state = false;
            //
            //        if (!$group.data('validate')) {
            //            state = $(this).val() ? true : false;
            //        }else if ($group.data('validate') == "email") {
            //            state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
            //        }else if($group.data('validate') == 'phone') {
            //            state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
            //        }else if ($group.data('validate') == "length") {
            //            state = $(this).val().length >= $group.data('length') ? true : false;
            //        }else if ($group.data('validate') == "number") {
            //            state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
            //        }
            //
            //        if (!state) {
            //            $addon.removeClass('success');
            //            $addon.addClass('danger');
            //            $icon.attr('class', 'glyphicon glyphicon-remove');
            //        }else{
            //            $addon.removeClass('danger');
            //            $addon.addClass('success');
            //            $icon.attr('class', 'glyphicon glyphicon-ok');
            //        }
            //
            //        if ($form.find('.input-group-addon.danger').length == 0) {
            //            $form.find('[type="submit"]').prop('disabled', false);
            //            vm.x=0;
            //        }else{
            //            $form.find('[type="submit"]').prop('disabled', true);
            //            vm.x=1;
            //        }
            //    });
            //
            //    $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
            //
            //
            //});

        }

        init();


        // function to update a user
        function update(user) {

            UserService.updateUser(vm.selectedUserId, user)
                .then(function (response) {
                    return UserService.findUserById(vm.selectedUserId);
                })
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.path("/showprofile/"+response.data._id);
                    }
                });
        }
    }
})();
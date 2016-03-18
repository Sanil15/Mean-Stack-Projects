/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController(FormService, UserService,$location){


        var vm = this;

        vm.addForm=addForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;
        vm.updateForm=updateForm;
        vm.fields=fields;

        vm.userForms=[];
        function init() {
            vm.selectedIndex=-1;
            var userId=UserService.getCurrentUser()._id;
            FormService
                .findAllFormsForUser(userId)
                .then(function(response){
                        console.log(response);
                        vm.userForms=response.data;
                    }
                );
        }

        init();


        //function to add forms
        function addForm(form){
            if(form.title!=null){
                FormService.createFormForUser(UserService.getCurrentUser()._id,form)
                    .then(function(response){
                     init();
                     vm.form.title=null;
                    });
            }
        }


        // function that deletes a form
        function deleteForm(index){
            FormService.deleteFormById(vm.userForms[index]._id)
                .then(function(response){
                    init();
                });
        }

        // function to select a form
        function selectForm(index){
            vm.form={};
            vm.form.title=vm.userForms[index].title;
            vm.selectedIndex=index;
        }

        // function to update Form Name of the selected function
        function updateForm(newForm){
            if(vm.form.title!=null && vm.selectedIndex!=-1){
                var form=vm.userForms[vm.selectedIndex];
                //console.log("Update Form"+form);
                FormService.updateFormById(form._id,newForm)
                    .then(function(response){
                        init();
                        vm.form.title=null;
                    });
            }
        }

        function fields(formId){
            FormService.setCurrentFormId(formId);
            $location.path("/fields");
        }

    }
})();
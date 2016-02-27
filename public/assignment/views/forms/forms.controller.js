/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope,FormService, UserService){

        $scope.addForm=addForm;
        $scope.deleteForm=deleteForm;
        $scope.selectForm=selectForm;
        $scope.updateForm=updateForm;
        $scope.selectedIndex=-1;

        FormService.findAllFormsForUser(UserService.getCurrentUser()._id, renderUserForms);

        // call back function to render User Forms
        function renderUserForms(userForms) {
            $scope.userForms=userForms;
        }

        //function to add forms
        function addForm(formName){
            if(formName!=null) {
                var newForm = {
                    "_id": null,
                    "title": formName,
                    "userId": null
                }
                FormService.createFormForUser(UserService.getCurrentUser()._id, newForm, renderAddForm);
            }
        }

        // function is a callback for adding a form
        function renderAddForm(form){
            $scope.userForms.push(form);
            $scope.formName=null;
        }

        // function that deletes a form
        function deleteForm(index){
            FormService.deleteFormById($scope.userForms[index]._id,renderDelete);
        }

        // function deletes the form clicked on
        function renderDelete(forms){
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderUserForms);
        }

        // function to select a form
        function selectForm(index){
            $scope.formName=$scope.userForms[index].title;
            $scope.selectedIndex=index;
        }

        // function to update Form Name of the selected function
        function updateForm(formName){
           if(formName !=null && $scope.selectedIndex!=-1){
                var form=$scope.userForms[$scope.selectedIndex];
                var newForm ={
                    "_id" : form._id,
                    "title" : formName,
                    "userId": form.userId
                }
                FormService.updateFormById(newForm._id,newForm,renderUpdate);
            }
        }

        // call back function for updated form
        function renderUpdate(form){
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderUserForms);
            $scope.formName=null;
            $scope.selectedIndex=-1;
        }
    }
})();
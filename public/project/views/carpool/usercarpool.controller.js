/**
 * Created by Sanil on 3/1/2016.
 */
/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("UserCarPoolController",UserCarPoolController)

    function UserCarPoolController($scope,CarPoolService, UserService){

        $scope.deleteCarPool=deleteCarPool;
        $scope.updateCarPool=updateCarPool;
        $scope.selectedIndex=-1;

        CarPoolService.findAllCarPoolByUser(UserService.getCurrentUser,renderUserCarPools)

        // call back function to render User CarPool
        function renderUserCarPools(pools) {
            $scope.carPools=pools;
        }

        // function that deletes a Carpool
        function deleteCarPool(index){
            UserService.deleteCarPool
        }

        // function deletes the form clicked on
        function renderDelete(forms){
            FormService.findAllFormsForUser(UserService.getCurrentUser()._id,renderUserForms);
        }


        // function to update Form Name of the selected function
        function updateCarPool(formName){
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
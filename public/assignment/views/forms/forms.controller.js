/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope,FormService){

        $scope.addForm=addForm;
        $scope.deleteForm=deleteForm;
        $scope.selectForm=selectForm;
        $scope.updateForm=updateForm;

        var selectedIndex;

        FormService.findAllFormsForUser($rootScope._id, renderUserForms);

        function renderUserForms(userForms) {
            $scope.userForms=userForms;
        }

        function addForm(formName){

            if(formName!=null) {
                var newForm = {
                    "_id": null,
                    "title": formName,
                    "userId": null
                }
                FormService.createFormForUser($rootScope._id, newForm, renderAddForm);
            }
        }

        function renderAddForm(form){
            $scope.userForms.push(form);
            $scope.formName=null;
        }

        function deleteForm(index){

            FormService.deleteFormById($scope.userForms[index]._id,renderDelete);
        }

        function renderDelete(forms){

            FormService.findAllFormsForUser($rootScope._id,renderUserForms);
        }

        function selectForm(index){
            $scope.formName=$scope.userForms[index].title;
            selectedIndex=index;
        }

        function updateForm(formName){
           if(formName !=null){
                var form=$scope.userForms[selectedIndex];
                var newForm ={
                    "_id" : form._id,
                    "title" : formName,
                    "userId": form.userId
                }
                FormService.updateFormById(newForm._id,newForm,renderUpdate);
            }
        }

        function renderUpdate(form){
            FormService.findAllFormsForUser($rootScope._id,renderUserForms);
            $scope.formName=null;
            selectedIndex=null;
        }

    }
})();
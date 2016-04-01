/**
 * Created by Sanil on 3/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService)

    function FieldService($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            sortField: sortField
        }

        return api;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field) {
            console.log("/api/assignment/form/"+formId+"/field/"+fieldId);
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);
        }

        function sortField(formId, startIndex, endIndex) {
            return $http.put("/api/assignment/form/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }
    }

})();
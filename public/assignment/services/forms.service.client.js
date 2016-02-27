/**
 * Created by Sanil on 2/20/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService)

    function FormService(){

       var currentForms = [
           {"_id": "000", "title": "Contacts", "userId": 123},
           {"_id": "010", "title": "ToDo",     "userId": 123},
           {"_id": "020", "title": "CDs",      "userId": 234}
       ];

       var api = {
           createFormForUser: createFormForUser,
           findAllFormsForUser: findAllFormsForUser,
           deleteFormById: deleteFormById,
           updateFormById: updateFormById
       };

       return api;

        // function to create forms for a user
        function createFormForUser(userId, form, callback){
         form._id=(new Date).getTime();
         form.userId=userId;
         currentForms.push(form);
         callback(form);
        }


        // functions finds forms of all users
        function findAllFormsForUser(userId, callback){
            var userForms=[];
            for(var i=0;i<currentForms.length;i++){
                if(currentForms[i].userId == userId){
                    userForms.push(currentForms[i]);
                }
            }
            callback(userForms);
        }

        // function to delete form by id
        function deleteFormById(formId,callback){
            for(var i=0;i<currentForms.length;i++) {
                if(currentForms[i]._id == formId)
                {
                   currentForms.splice(i,1);
                }
            }
            callback(currentForms);
        }

        // function updates the form by its id
        function updateFormById(formId,newForm,callBack){
            for(var i=0;i<currentForms.length;i++) {
                if(currentForms[i]._id == formId) {
                    currentForms[i].title=newForm.title;
                    //currentForms[i].userId=newForm.userId;
                    break;
                }
            }
            callBack(currentForms[i]);
        }

    }

})();
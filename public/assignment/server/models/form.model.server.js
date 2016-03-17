/**
 * Created by Sanil on 3/16/2016.
 */
var mock= require("./user.mock.json");

// load the promise library
var q = require("q");

module.exports = function(){

    var api = {
        findFormByTitle:findFormByTitle,
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    }

    return api;

    // function finds form by title

    function findFormByTitle(title){
        for(var u in mock){
            if(mock[u].title==title)
            return mock[u];
        }
        return null;
    }

    //
    function findFormById(id){
        for(var u in mock){
            if(mock[u]._id==id)
                return mock[u];
        }
        return null;
    }


    // function to create forms for a user
    function createFormForUser(form, userId){
        form._id=(new Date).getTime();
        form.userId=userId;
        mock.push(form);
        return mock;
    }


    // functions finds forms of all users
    function findAllFormsForUser(userId){
        var userForms=[];
        for(var i=0;i<mock.length;i++){
            if(mock[i].userId == userId){
                mock.push(mock[i]);
            }
        }
        return userForms;
    }

    // function to delete form by id
    function deleteFormById(formId){
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == formId)
            {
                mock.splice(i,1);
                return mock;
            }
        }
        return mock;
    }

    // function updates the form by its id
    function updateFormById(formId,newForm){
        for(var i=0;i<mock.length;i++) {
            if(mock[i]._id == formId) {
                mock[i].title=newForm.title;
                //currentForms[i].userId=newForm.userId;
                return mock;
            }
        }
        return mock;
    }



}
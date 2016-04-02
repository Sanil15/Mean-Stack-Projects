/**
 * Created by Sanil on 4/1/2016.
 */
/**
 * Created by Sanil on 3/16/2016.
 */
var mongoose=require('mongoose');
// load the promise library
var q = require("q");

module.exports = function(db, Form){

    var api = {

        findAllFieldsForForm:findAllFieldsForForm,
        findFieldByIdForForm:findFieldByIdForForm,
        deleteFieldByIdForForm: deleteFieldByIdForForm,
        createFieldForForm: createFieldForForm,
        updateFieldByIdForForm: updateFieldByIdForForm,
        sortField: sortField
    }

    return api;


    function findAllFieldsForForm(formId){
        return Form.findById(formId).select("fields");
    }

    function findFieldByIdForForm(formId,fieldId){
        return Form.findById(formId)
            .then(function(form){
                return form.fields.id(fieldId);
            });
    }

    function deleteFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form = null;

        Form.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];

                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.splice(i,1);
                        break;
                    }
                }

                Form.update(
                    {_id : formId},

                    {$set: {
                        "fields": form.fields
                    }},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(form);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }


    function createFieldForForm(formId,field){
        var deferred = q.defer();

        Form.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                form.fields.push(field);

                Form.update(
                    { _id : formId},
                    { $set: {
                        "fields": form.fields
                    }
                    }, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
            }
        });

        return deferred.promise;
    }

    function updateFieldByIdForForm(formId,fieldId,field){
        var deferred = q.defer();
        var form = null;

        Form.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = field;
                        break;
                    }
                }

                Form.update(
                    {_id : formId},

                    {$set: {
                        "fields": form.fields
                    }},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(results);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();

        Form.findById(formId, function(err,doc){
           if(err){
               deferred.reject(err);
           }
            else{
               var form=doc;
               form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

               Form.update(
                   {_id: formId},
                   {$set:{
                       "fields":form.fields
                   }},function (err,doc){
                   if(err){
                       deferred.reject(error);
                   }
                   else {
                       deferred.resolve(doc);
                   }
               }
               );
           }
        });
        return deferred.promise;

    }
}
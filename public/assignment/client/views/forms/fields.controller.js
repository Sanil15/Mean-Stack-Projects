/**
 * Created by Sanil on 2/18/2016.
 */
/**
 * Created by Sanil on 3/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService,FormService,UserService) {

        var vm = this;

        function init() {
        FieldService.getFieldsForForm(FormService.getCurrentFormId())
            .then(function (response){
               vm.fields=response.data;
            });
        }
        init();


    }
})();
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

    function FieldController($routeParams,FieldService,FormService,UserService,$scope) {

        var vm = this;
        vm.addField = addField;
        vm.removeField = removeField;
        vm.clone = clone;
        vm.selectField = selectField;
        vm.editField = editField;
        vm.sortField = sortField;


        function init() {
            FieldService.getFieldsForForm($routeParams.formId)
                .then(function (response){
                    console.log("FIelds"+response.data.fields);
                    vm.fields=response.data.fields;
                    $scope.fields=vm.fields;
                });

            FormService.findFormById($routeParams.formId)
                .then(function(response){
                    vm.form = response.data;
                })
        }
        init();

        function addField(fieldType){

            var newField;

            switch(fieldType) {
                case "TEXT":
                    newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    newField = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    newField =
                    {"label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]}

                    break;
                case "CHECKBOXES":
                    newField =
                    {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]}


                    break;
                case "RADIOS":
                    newField =
                    {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]}
                    break;
            }

            FieldService.createFieldForForm($routeParams.formId,newField)
                .then(function (response){
                    init();
                });
        }

        function removeField(fieldId){
            FieldService.deleteFieldFromForm($routeParams.formId,fieldId)
                .then(function (response){
                    init();
                });
        }

        function clone(field){
            delete field._id;
            FieldService.createFieldForForm($routeParams.formId,field)
                .then(function (response){
                    init();
                });
        }

        function selectField(field){

            vm.updatedField = field;

            vm.label = field.label;

            if(field.options){
                var val="";
                for(var i in field.options){
                    val = val + field.options[i].label;
                    val+=":"
                    val = val + field.options[i].value;
                    val+="\n";
                }
                vm.options = val;
            }

            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function editField(){
            if(vm.updatedField.options){
                var options = vm.options.split("\n");
                var opt = [];

                for (var i in options){
                    var pair = options[i].split(":");
                    var obj = {
                        "label" :pair[0] ,
                        "value" :pair[1]
                    };

                    if(obj.label != "")
                        opt.push(obj);
                }

                vm.updatedField.options = opt;
            }

            if(vm.updatedField.placeholder){
                vm.updatedField.placeholder  = vm.placeholder
            }

            vm.updatedField.label = vm.label;

            FieldService
                .updateField($routeParams.formId,vm.updatedField._id,vm.updatedField)
                .then(
                    function(doc){
                        init();
                    }
                );
        }

        function sortField(start, end) {
            console.log([start, end]);
            FieldService
                .sortField($routeParams.formId, start, end)
                .then(
                    function (response) {
                        vm.fields = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

    }
})();
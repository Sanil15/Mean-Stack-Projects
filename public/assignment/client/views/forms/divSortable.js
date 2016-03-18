/**
 * Created by Sanil on 3/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp", [])
        .directive("divSortable", divSortable);

    function divSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();

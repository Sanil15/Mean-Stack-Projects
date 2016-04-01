/**
 * Created by Sanil on 4/1/2016.
 */
(function(){
        angular
            .module("jgaDirectives", [])
            .directive("jgaSortable", jgaSortable);

            function jgaSortable() {
                    function link(scope, element, attrs) {
                            var start = null;
                            var end   = null;
                            $(element)
                                .sortable({
                                        axis: "y",
                                        sort: function(event, ui) {
                                            ui.helper.find("a").hide();
                                            start = ui.item.index();
                                        },
                                    stop: function(event, ui) {
                                            ui.item.find("a").show();
                                            end = ui.item.index();
                                            if(start >= end) {
                                                start--;
                                            }
                                            scope.model.sortField(start, end);
                                        }
                                });
                        }
                    return {
                            link: link
                    };
                }
})();
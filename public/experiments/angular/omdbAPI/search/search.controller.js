/**
 * Created by Sanil on 2/19/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("SearchController",searchController)

    function searchController($scope , $http){
        $scope.search = search;
        $scope.title = "Star Wars";
        function search(title)
        {
            console.log(title);
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(function (response) {
                    //console.log(response);
                    $scope.data=response;
                })
        }
    }
})();
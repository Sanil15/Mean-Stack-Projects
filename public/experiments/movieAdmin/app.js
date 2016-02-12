/**
 * Created by Sanil on 2/12/2016.
 */

(function()
{
    angular
        .module("MovieAdminApp",[])
        .controller("MovieController",MovieController);

    function MovieController($scope){
    console.log("Hello From Movie Controller");
    //$scope.hello="Hello from Controller"
        $scope.movies=[
        {id: 123, title: "Starwars", director: "James"},
        {id: 343, title: "Harry Potter", director: "James A"},
        {id: 243, title: "Deadpool", director: "James B"}
    ];

        //event handler declarations
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie= updateMovie;


        // event handler implementations
        function addMovie(movie){
        //console.log("Movie title "+movie.title)
           var newMovie={
               id: movie.id,
               title: movie.title,
               director: movie.director
           };
           $scope.movies.push(newMovie);
           $scope.movie={}
       }


       function deleteMovie(movie){
           console.log("Index: "+index);
           //$scope.movies.splice(index,1); Delete by index
           var index=$scope.movies.indexOf(movie);
           $scope.movies.splice(index,1);
       }


        var selectedMovieIndex=null;
       function selectMovie(movie){
        console.log(movie);
           selectedMovieIndex=$scope.movies.indexOf(movie);
           $scope.movie={
               id: movie.id,
               title: movie.title,
               director: movie.director
           };
       }

        function updateMovie(movie)
        {
            $scope.movies[selectedMovieIndex]={
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }


    }
})();
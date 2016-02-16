/**
 * Created by Sanil on 2/15/2016.
 */

(function(){

    $(init);

    var $movieTitleTxt;
    var $searchBtn;
    var $plot;
    var $actors;
    var $title;
    var $director;
    var $poster;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";
    var $searchResults;

    function init()
    {

        $movieTitleTxt= $("#movieTitleTxt");
        $searchBtn = $("#searchBtn");

        $searchBtn.click(searchMovie);
        $searchResults= $("#searchResults tbody");

        $plot = $("#plot");
        $actors = $("#actors");
        $director = $("#director");
        $poster = $("#poster");
        $title = $("#title");
    }

    function searchMovie()
    {
        var title = $movieTitleTxt.val();
        var url=SEARCH_URL.replace("TITLE",title);
        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response)
    {
        //console.log(response);

        var totalResults=response.totalResults;
        var movies=response.Search;

        $searchResults.empty();
        for(var m=0;m<movies.length;m++)
        {
            var movie=movies[m];
            //console.log(movie);
            var posterUrl=movie.Poster;
            var title=movie.Title;
            var year=movie.Year;
            var imdb=movie.imdbID;

            var $tr= $("<tr>")
                .attr("id",imdb)
                .click(fetchMovieDetails);

            var $img= $("<img>")
                .attr("src",posterUrl)
                .addClass("posterThumb");


            var $td = $("<td>")
                .append($img)
                .appendTo($tr);

            $td = $("<td>")
                .append(title)
                .appendTo($tr);

            $td = $("<td>")
                .append(year)
                .appendTo($tr);

            $td = $("<td>")
                .append(imdb)
                .appendTo($tr);

            $searchResults.append($tr);
        }
    }

    function fetchMovieDetails(event)
    {
        var $tr = $(event.currentTarget);

        var imdbID=$tr.attr("id");
        console.log(imdbID);
        var url= DETAILS_URL.replace("IMDBID",imdbID);

        $.ajax({
        url: url,
        success: renderMovieDetails
    });
    }

    function renderMovieDetails(response){

        var actors=response.Actors;
        var title=response.Title;
        var director=response.Director;
        var plot=response.Plot;
        var poster=response.Poster;

        $title.html(title);
        $actors.html(actors);
        $director.html(director);
        $plot.html(plot);
        $poster.attr("src",poster);
    }

})();
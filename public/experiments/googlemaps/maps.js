/**
 * Created by Sanil on 3/5/2016.
 */
(function () {

    var map;

    function init() {
        map = new google.maps.Map(document.getElementById('sample'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }
    window.onload=init();
})()

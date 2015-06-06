$(document).ready(function () {

    //animation on buttons
        $(".button").mousedown(function() {
            $(this).css({
                "background-color": "rgba(5, 5, 60, .75)",
                "box-shadow": "2px 2px 2px #333 inset",
                "border": "1px inset #FFF",
                "color": "#BBB"
            });
        }).mouseup(function() {
            $(this).css({
                "background-color": "rgba(10, 10, 100, .75)",
                "border": "1px outset #BBB",
                "box-shadow": "2px 2px 2px #333",
                "color": "#FFF"
            });
        });

});


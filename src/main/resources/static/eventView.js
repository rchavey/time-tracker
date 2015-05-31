$(document).ready(function(){
 var totalSeconds=0;
    //animation of time adding buttons
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

    //functionality of adding time:
    //convert to seconds
    //repopulate display boxes and global clock
    }).click(function(){
        // Get input from the appropriate field based on which button was hit
        var buttonID = $(this).attr("id");
        var newTime = Number($(this).siblings(".inputBox").val()) + Number($(this).siblings(".displayBox").html());
        $(this).siblings(".displayBox").html(newTime);
        console.log(newTime);

        //get current values of all display fields
        var days = Number($("#dayDisplay").html());
        var hours = Number($("#hourDisplay").html());
        var turns = Number($("#turnDisplay").html());
        var rounds = Number($("#roundDisplay").html());
        var segments = Number($("#segmentDisplay").html());
        console.log("days:"+days+" hours:"+hours+" turns:"+turns+" rounds:"+rounds+" segments:"+segments);

        //convert all display fields into seconds
        days = days*86400;
        hours = hours*3600;
        var minutes = (turns*600) + (rounds*60);
        var seconds = segments * 6;

        //get new total of seconds for the event
        totalSeconds = days + hours + minutes + seconds;

        //convert total seconds back into display boxes
        var workingSeconds;
        days = Math.floor(totalSeconds/86400);
        workingSeconds = totalSeconds%86400;
        hours = Math.floor(workingSeconds/3600);
        workingSeconds = workingSeconds%3600;
        minutes = Math.floor(workingSeconds/60);
        workingSeconds =workingSeconds%60;
        seconds = workingSeconds;

        //Display Current Time elapsed with animation
        var totalDays = $("#totalDays");
        var totalHours = $("#totalHours");
        var totalMinutes = $("#totalMinutes");
        var totalSeconds = $("#totalSeconds");

        if (totalDays.html() != (days.toString() + "d ")) {
            totalDays.fadeOut(300, function() {
                totalDays.html(days + "d ");
                totalDays.fadeIn(600);
            });
        };

        console.log(hours.toString() + "h ");
        console.log(totalHours.html());
        if (totalHours.html() != (hours.toString() + "h ")) {
            console.log("hours");
            totalHours.fadeOut(300, function(){
                totalHours.html(hours + "h ");
                totalHours.fadeIn(600);
            });
        };

        if (totalMinutes.html() != (minutes.toString() + "m ")) {
            totalMinutes.fadeOut(300, function() {
                totalMinutes.html(minutes + "m ");
                totalMinutes.fadeIn(600);
            });
        };

        if (totalSeconds.html() != (seconds.toString() + "s")) {
            totalSeconds.fadeOut(300, function() {
                totalSeconds.html(seconds + "s");
                totalSeconds.fadeIn(600);
            });
        };

        //optional display of time elapsed without animation
        /*var timeElapsed = days + "d " + hours + "h " + minutes +"m " + seconds + "s ";
         console.log(timeElapsed);
         $("#clock").html(timeElapsed);*/

         //Repopulate Display fields, converting time units as needed
        $("#dayDisplay").html(days);
        $("#hourDisplay").html(hours);
        turns = Math.floor(minutes/10);
        rounds =Math.floor(minutes%10);
        $("#turnDisplay").html(turns);
        $("#roundDisplay").html(rounds);
        $("#segmentDisplay").html(seconds/6);

    });

});
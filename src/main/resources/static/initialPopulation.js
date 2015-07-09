$(document).ready(function() {
    //get total seconds of all events in the Database
    $.ajax({
        url: "total-event-seconds"
    }).done(function( data ) {
        var initialSeconds = data.totalEventSeconds;

        //convert seconds to time and populate globalclock and time of day
        var initialTimeArray = secondsToTime (initialSeconds);
        populateGlobalClock (initialTimeArray);

        //make sure starting time of day hours are not great than 23 - doesn't exist on a 24hr format clock
        initialTimeArray["hours"] = (initialTimeArray["hours"] + Number($("#hours24").html())) % 24;
        populateTimeOfDay (initialTimeArray);
    });


});

function secondsToTime (totalSeconds) {
    //convert total seconds back into larger time units
    var workingSeconds = totalSeconds;

    var days = Math.floor(totalSeconds/86400);
    workingSeconds = totalSeconds%86400;

    var hours = Math.floor(workingSeconds/3600);
    workingSeconds = workingSeconds%3600;

    var minutes = Math.floor(workingSeconds/60);
    workingSeconds =workingSeconds%60;

    var seconds = workingSeconds;

    //convert into an array to pass back

    var timeArray = [];
    timeArray ["days"] = days;
    timeArray ["hours"] = hours;
    timeArray ["minutes"] = minutes;
    timeArray ["seconds"] = seconds;

    return timeArray;

}

function populateGlobalClock (timeArray) {

    //find elements of globalClock
    var totalDays = $("#totalDays");
    var totalHours = $("#totalHours");
    var totalMinutes = $("#totalMinutes");
    var totalSeconds = $("#totalSeconds");

    if (totalDays.html() != (timeArray["days"].toString() + "d ")) {
        totalDays.fadeOut(300, function() {
            totalDays.html(timeArray["days"] + "d ");
            totalDays.fadeIn(600);
        });
    };

    if (totalHours.html() != (timeArray["hours"].toString() + "h ")) {
        console.log("hours");
        totalHours.fadeOut(300, function(){
            totalHours.html(timeArray["hours"] + "h ");
            totalHours.fadeIn(600);
        });
    };

    if (totalMinutes.html() != (timeArray["minutes"].toString() + "m ")) {
        totalMinutes.fadeOut(300, function() {
            totalMinutes.html(timeArray["minutes"] + "m ");
            totalMinutes.fadeIn(600);
        });
    };

    if (totalSeconds.html() != (timeArray["seconds"].toString() + "s")) {
        totalSeconds.fadeOut(300, function() {
            totalSeconds.html(timeArray["seconds"] + "s");
            totalSeconds.fadeIn(600);
        });
    };

}

function populateTimeOfDay (timeArray) {
    $hours = $("#hours24");
    $minutes = $("#minutes24");
    $seconds = $("#seconds24");

    if ($hours.html() != timeArray["hours"].toString() && $hours.html() != ("0" + timeArray["hours"].toString())) {
        $hours.fadeOut (300, function() {
            if (timeArray["hours"] < 10) {
                $hours.html("0" + timeArray["hours"]);
            }
            else {
                $hours.html(timeArray["hours"]);
            }
            $hours.fadeIn(600);
        });
    }

    if ($minutes.html() != timeArray["minutes"].toString() && $minutes.html() != ("0" + timeArray["minutes"].toString())) {
        $minutes.fadeOut (300, function() {
            if (timeArray["minutes"] < 10) {
                $minutes.html("0" + timeArray["minutes"]);
            }
            else {
                $minutes.html(timeArray["minutes"]);
            }
            $minutes.fadeIn(600);
        });
    }

    if ($seconds.html() != timeArray["seconds"].toString() && $seconds.html() != ("0" + timeArray["seconds"].toString())) {
        $seconds.fadeOut (300, function() {
            if (timeArray["seconds"] < 10) {
                $seconds.html("0" + timeArray["seconds"]);
            }
            else {
                $seconds.html(timeArray["seconds"]);
            }
            $seconds.fadeIn(600);
        });
    }
}





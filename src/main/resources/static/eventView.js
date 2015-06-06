$(document).ready(function(){

    // functionality of adding time:
    $(".timeButton").click(function () {

        //add input value to displayed value: for the button clicked
        var newTime = Number($(this).siblings(".inputBox").val()) + Number($(this).siblings(".displayBox").html());
        $(this).siblings(".displayBox").html(newTime);

        //convert time to seconds
        var totalSeconds = timeToSeconds();
        //populateDisplay(totalSeconds);

        //convert seconds to time
        var timeArray = secondsToTime(totalSeconds);

        //repopulate all fields
        populateDisplayBoxes(timeArray);
        populateGlobalClock(timeArray);
        populateTimeOfDay(timeArray);
    });

    $("#saveButton").click(function () {
        var saved = (timeToSeconds());
        console.log(saved);
    });

});


function timeToSeconds (){

    //Get current value of each display box
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

    console.log("totalSeconds" + totalSeconds);

    return totalSeconds;


}
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

function populateDisplayBoxes (timeArray) {

    // repopulate display boxes
    $("#dayDisplay").html(timeArray["days"]);

    $("#hourDisplay").html(timeArray["hours"]);

    turns = Math.floor(timeArray["minutes"]/10);
    $("#turnDisplay").html(turns);

    rounds =Math.floor(timeArray["minutes"]%10);
    $("#roundDisplay").html(rounds);

    $("#segmentDisplay").html(timeArray["seconds"]/6);
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

    if (Number($hours.html()) != timeArray["hours"]) {
        $hours.fadeOut (300, function() {
            if (Number($hours.html()) > 24){
                $hours.html(timeArray["hours"] - 24);
            }
            else {
                $hours.html(timeArray["hours"]);
            }
            $hours.fadeIn(600);
        });
    }

    if (Number($minutes.html()) != timeArray["minutes"]) {
        $minutes.fadeOut (300, function() {
            $minutes.html(timeArray["minutes"]);
            $minutes.fadeIn(600);
        });
    }

    if (Number($seconds.html()) != timeArray["seconds"]) {
        $seconds.fadeOut (300, function() {
            $seconds.html(timeArray["seconds"]);
            $seconds.fadeIn(600);
        });
    }
}



$(document).ready(function(){

    // functionality of adding time:
    $(".timeButton").click(function () {

        //add input value to displayed value: for the button clicked
        var newTime = Number($(this).siblings(".inputBox").val()) + Number($(this).siblings(".displayBox").html());
        $(this).siblings(".displayBox").html(newTime);

        //convert time to seconds
        var totalSeconds = timeToSeconds();
        populateDisplay(totalSeconds);
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

function populateDisplay (totalSeconds) {

    //convert total seconds back into larger time units
    var workingSeconds = totalSeconds;

    var days = Math.floor(totalSeconds/86400);
    workingSeconds = totalSeconds%86400;

    var hours = Math.floor(workingSeconds/3600);
    workingSeconds = workingSeconds%3600;

    var minutes = Math.floor(workingSeconds/60);
    workingSeconds =workingSeconds%60;

    var seconds = workingSeconds;
    // repopulate display boxes
    $("#dayDisplay").html(days);
    $("#hourDisplay").html(hours);
    turns = Math.floor(minutes/10);
    rounds =Math.floor(minutes%10);
    $("#turnDisplay").html(turns);
    $("#roundDisplay").html(rounds);
    $("#segmentDisplay").html(seconds/6);


    //update global clock with animation
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
}


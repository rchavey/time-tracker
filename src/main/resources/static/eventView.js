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




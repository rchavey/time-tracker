$(document).ready(function(){

    // functionality of adding time:
    $(".timeButton").click(function () {

        //get values of new time added
        var newTime = Number($(this).siblings(".inputBox").val())

        //convert newTime into seconds
        //to be used for updating the clock

        var newSeconds;

        switch ($(this).siblings(".inputBox").attr("id")) {
            case "segmentInput":
                newSeconds = newTime * 6;
                break;
            case "roundInput":
                newSeconds = newTime * 60;
                break;
            case "turnInput":
                newSeconds = newTime * 600;
                break;
            case "hourInput":
                newSeconds = newTime * 3600;
                break;
            case "dayInput":
                newSeconds = newTime * 86400;
                break;

        }


        //add new time to sibling display box
        var target = $(this).siblings(".displayBox").children(".elapsedEncounterTime");
        newTime = newTime + Number(target.val());
        target.val(newTime);
        target.trigger("input");    //tell angular to update the model

        //Get current value of each display box
        var days = Number($("#dayDisplay .elapsedEncounterTime").val());
        var hours = Number($("#hourDisplay .elapsedEncounterTime").val());
        var turns = Number($("#turnDisplay .elapsedEncounterTime").val());
        var rounds = Number($("#roundDisplay .elapsedEncounterTime").val());
        var segments = Number($("#segmentDisplay .elapsedEncounterTime").val());


        //convert time of event into seconds
        var eventSeconds = timeToSeconds(days, hours, turns, rounds, segments);

        //convert seconds to time array
        //used to deal will overflow issues
        var eventTimeArray = secondsToTime(eventSeconds);

        //repopulate all display boxes
        populateDisplayBoxes(eventTimeArray);

        //Get total seconds from the global clock
        days = Number($("#totalDays").html());
        hours = Number($("#totalHours").html());
        turns = 0;
        rounds = Number($("#totalMinutes").html());
        segments = Number($("#totalSeconds").html()) / 6;

        //convert time of clock into seconds
        var existingSeconds = timeToSeconds(days, hours, turns, rounds, segments);

        //add existing Seconds to newSeconds;

        var campaignSeconds = existingSeconds + newSeconds;


        //convert seconds to time array
        var campaignTimeArray = secondsToTime(campaignSeconds);

        // repopulate global clock and time of day
        populateGlobalClock(campaignTimeArray);

        //get total seconds of 24 hr clock
        days = 0;
        hours = Number($("#hours24").html());
        turns = 0;
        rounds = Number($("#minutes24").html());
        segments = Number($("#seconds24").html()) / 6;

        //convert 24 hr clock into seconds
        var clock24Seconds = timeToSeconds (days, hours, turns, rounds, segments);

        //add existing seconds

        clock24Seconds = clock24Seconds + newSeconds;
        //convert into time array

        var clock24TimeArray = secondsToTime(clock24Seconds);

        //repopulate 24hr clock
        populateTimeOfDay(clock24TimeArray);
    });

});


function timeToSeconds (days, hours, turns, rounds, segments){



    //convert all display fields into seconds
    days = days*86400;
    hours = hours*3600;
    var minutes = (turns*600) + (rounds*60);
    var seconds = segments * 6;

    //get new total of seconds for the event
    totalSeconds = days + hours + minutes + seconds;


    return totalSeconds;


}

function populateDisplayBoxes (timeArray) {

    // repopulate display boxes
    $("#dayDisplay .elapsedEncounterTime").val(timeArray["days"]);

    $("#hourDisplay .elapsedEncounterTime").val(timeArray["hours"]);

    turns = Math.floor(timeArray["minutes"]/10);
    $("#turnDisplay .elapsedEncounterTime").val(turns);

    rounds =Math.floor(timeArray["minutes"]%10);
    $("#roundDisplay .elapsedEncounterTime").val(rounds);

    $("#segmentDisplay .elapsedEncounterTime").val(timeArray["seconds"]/6);
}




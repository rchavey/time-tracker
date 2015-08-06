$(document).ready(function() {

    //fill classArea displays when inputs change
    $("input, select").change(function() {
            //find values needed for all classes and input fields
            var $classArea = $(this).parents(".classArea");
            var type = $(this).attr("class");
            var level = Number($classArea.find(".levelInput").val());

            if (level < 0) {
                alert("Character Level Must be Greater than 0")
            } else {
                //
                //get values that are variable based on class
                //
                var values = setValues($classArea, level);

                var levelIndex = values["levelIndex"];
                var saveTable = values["saveTable"];
                var hitTable = values ["hitTable"];

                //
                //get values that are variable based on input field
                //get results and fill in display fields
                //

                if (type == "acInput" || type == "levelInput") {

                    var ac = Number($classArea.find(".acInput").val());

                    if (ac > 10 || ac < -10) {
                        alert("Enemy Ac must be between 10 and -10");
                    } else {
                        var hitIndex = ac + 10;

                        var hitResult = getResult (hitTable, levelIndex, hitIndex);
                        $classArea.find(".acDisplay").children(".resultNeeded").html(hitResult);

                    }

                }

                if (type == "saveSelect" || type == "levelInput") {
                    var saveIndex = $classArea.find(".saveSelect").children("option:selected").html();

                    var saveResult = getResult (saveTable, saveIndex, levelIndex);
                    $classArea.find(".saveDisplay").children(".resultNeeded").html(saveResult);

                }

                if (type == "turnSelect" || (type == "levelInput" && $classArea.attr("id") == "cleric")) {

                    //first Index: based on option selected
                    var turnIndex = $("#turnSelect").children("option:selected").html();

                    //second Index: based on level of cleric
                    var turnLevelIndex;

                    if (level < 9) {
                        turnLevelIndex = level - 1;
                    } else if (level > 8 && level < 14) {
                        turnLevelIndex = 8;
                    } else {
                        turnLevelIndex = 9;
                    }

                    var turnResult = getResult(turnUndeadTable, turnIndex, turnLevelIndex);
                    $("#turnDeadDisplay").children(".resultNeeded").html(turnResult);
                }



            }

    });

    //fill table body when value in itemSave changes
    $("#itemSave").children("select").change(function () {

        var selected = $(this).children("option:selected").html();
        var options = itemSaveTable[selected];

        var $cells = $("#itemSaveTb td:nth-child(even)");

        for(i = 0; i < options.length; i++) {
            $($cells[i]).html(options[i])
        }


    });



});

function setValues ($classArea, level) {

    var values = [];

    //change options based on which class is being selected
    //levelIndex, saveTable, hitTable
    //if in cleric calling turnUndead
    switch ($classArea.attr("id")) {
        case "cleric":

            //set levelIndex - to be used as secondIndex toHit and toSave
            if (level < 19) {
                values["levelIndex"] = Math.floor((level - 1)/3);
            } else {
                values["levelIndex"] = 6;
            }

            //get tables to use for future function calls
            values["saveTable"] = clericSaveTable;
            values["hitTable"] = clericTable

            break;

        case "mage":

            if (level < 21) {
                values["levelIndex"] = Math.floor((level - 1)/5);
            } else {
                values["levelIndex"] = 4;
            }

            //get tables to use for future function calls
            values["saveTable"] = mageSaveTable;
            values["hitTable"] = mageTable

            break;

        case "fighter":

            if (level == 0) {
                values["levelIndex"] = 0;
            } else if (level < 17) {
                values["levelIndex"] = Math.ceil(level/2);
            } else {
                values["levelIndex"] = 9;
            }

            //get tables to use for future function calls
            values["saveTable"] = fighterSaveTable;
            values["hitTable"] = fighterTable

            break;

        case "thief":
            if (level < 21) {
                values["levelIndex"] = Math.floor((level - 1)/4);
            } else {
                values["levelIndex"] = 5;
            }

            //get tables to use for future function calls
            values["saveTable"] = thiefSaveTable;
            values["hitTable"] = thiefTable

            break;
    }

    return values;


}

function getResult (tableName, firstIndex, secondIndex) {
    var result = tableName[firstIndex][secondIndex];
    return result;


}
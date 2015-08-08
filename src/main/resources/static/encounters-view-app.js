(function() {

    var app = angular.module('encounters', []);

    app.controller('EncounterViewController', ['$http', '$timeout', function($http, $timeout) {
        var self = this;

        this.encounters = [];

        $http.get('/time-tracker/controller/encounters').success(function(data){
            self.encounters = data;
        });

        this.selectedEncounter = {};
        this.encounterDetail = {};
        this.elapsedTime = {};

        this.viewEncounter = function() {

            $http.get('/time-tracker/controller/encounter/'+self.selectedEncounter.id).success(function(data){
                self.encounterDetail = data;

                var seconds = self.encounterDetail.elapsedSeconds;

                var time = secondsToTime(seconds);
                self.elapsedTime.rounds = time.minutes%10;
                self.elapsedTime.turns = Math.floor(time.minutes / 10);
                self.elapsedTime.segments = Math.floor(time.seconds / 6);
                self.elapsedTime.days = time.days;
                self.elapsedTime.hours = time.hours;
                console.log(self.elapsedTime);

                $timeout(function() {
                    var monsterTypes = $(".monster-type-container");

                    //cycle though each monster type
                    for (i=0; i < monsterTypes.length; i++) {
                        //get HD, HD modifier, and display table
                        var $monsterType = monsterTypes[i];

                        var monsterHD = Number($($monsterType).find(".monsterHD").html());
                        var monsterHDMod = Number($($monsterType).find(".monsterHDMod").html());
                        var monsterTb = $($monsterType).find("#monsterToHitTb");

                        var toHitIndex;

                        //use HD to get index in monster table
                        if (monsterHD == 1) {
                            if (monsterHDMod < -1) {
                                   toHitIndex = 0;
                            } else if (monsterHDMod == -1) {
                                toHitIndex = 1;
                            } else if (monsterHDMod == 0) {
                                toHitIndex = 2;
                            } else {
                                toHitIndex = 3;
                            }

                        } else if (monsterHD >= 16) {
                            toHitIndex = 11;
                        } else {
                            toHitIndex = Math.floor(monsterHD / 2) + 3;
                        }


                        //used HD index to fill table.
                        var resultsNeeded = monsterTable[toHitIndex];


                        var resultsDisplay = $(monsterTb).find("tr:nth-child(2)").children("td");

                        for (j=0; j < resultsDisplay.length; j++) {
                            var k = j + 1;
                            $(resultsDisplay[k]).html(resultsNeeded[j]);


                        }

                        //add click listener to h4's to display or hide related info
                        $($monsterType).find(".popUpLink").click(function() {
                            $(this).siblings("section").toggleClass("hidden");
                        });

                    }
                });

            });
        };

        this.saveEncounter = function () {

            self.encounterDetail.elapsedSeconds =
                self.elapsedTime.segments * 6
                + self.elapsedTime.rounds * 60
                + self.elapsedTime.turns * 10 * 60
                + self.elapsedTime.hours * 60 * 60
                + self.elapsedTime.days * 24 * 60 * 60;

            $http.post('/time-tracker/controller/encounter/' + self.selectedEncounter.id, self.encounterDetail).success(function (data) {
                alert('encounter post: ' + data);
            });
        };

    }]);

})();
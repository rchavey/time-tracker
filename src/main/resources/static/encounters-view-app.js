(function() {

    var app = angular.module('encounters', []);

    app.controller('EncounterViewController', ['$http', function($http) {
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
            });
        };

        this.saveEncounter = function () {

            //TODO reduce self.elapsedTime back into total seconds and update self.encounterDetail

            $http.post('/time-tracker/controller/encounter/' + self.selectedEncounter.id, self.encounterDetail).success(function (data) {
                alert('encounter post: ' + data);
            });
        }

    }]);

})();
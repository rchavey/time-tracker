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

        this.viewEncounter = function() {

            $http.get('/time-tracker/controller/encounter/'+self.selectedEncounter.id).success(function(data){
                self.encounterDetail = data;

            });
        }

    }]);

})();
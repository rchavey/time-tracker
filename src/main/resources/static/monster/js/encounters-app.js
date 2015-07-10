(function() {

    var app = angular.module('encounters', []);

    app.controller('EncounterController', ['$http', function($http) {
        var self = this;

        this.encounters = [];

        $http.get('/time-tracker/controller/encounters').success(function(data){
            self.encounters = data;
        });

        this.totalXp = 0;

        this.calculateXp = function() {

            self.totalXp = 0;
            for (var i=0; i < self.encounters.length; i++) {
                var encounter = self.encounters[i];
                if (encounter.selected) {
                    $http.get('/controller/encounter/'+encounter.id+'/xp').success(function(data) {
                        self.totalXp += data;
                    });
                }
            }
        }

    }]);

})();
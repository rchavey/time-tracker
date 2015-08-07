(function() {

    var app = angular.module('experience', []);

    app.controller('MonsterTypeController', ['$http', function($http) {
        var monsterTypeController = this;
        this.monsterTypes = [];
        $http.get('/time-tracker/controller/monsters').success(function(data){
            monsterTypeController.monsterTypes = data;
        });

        this.selectedType = 0;
        this.monsterCount = 1;

        this.createInstances = function() {

        }

    }]);

})();
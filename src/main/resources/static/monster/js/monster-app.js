(function () {

    var app = angular.module('monster', []);

    app.controller('MonsterController', ['$http', function ($http) {

        var self = this;

        this.monster = {};

        this.submitMonster = function () {

            $http.post('/time-tracker/controller/monster', self.monster)
                .success(function (data) {
                    alert("success! probably");
                });
        };

    }]);

})();
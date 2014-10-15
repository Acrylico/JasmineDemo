myApp.controller('myController', function ($scope, $http) {
    $scope.person = null;

    $scope.initPerson = function (name, age, gender) {
        var person = {
            name: name,
            age: age,
            gender: gender
        };
        $scope.person = person;
    };

    /*
     Note that this call will not work as the api is non-existent.
     This is purely an example to test.
     */
    $scope.makeCall = function (person) {
        $http({method: 'POST', url: '/api/person', data: person}).
            success(function (data, status, headers, config) {
                console.log("Success! :D");
            }).
            error(function (data, status, headers, config) {
                console.log("Failure! :(");
            });
    };
});
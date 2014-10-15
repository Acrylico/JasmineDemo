myApp.controller('myController', function ($scope, $http) {
	$scope.person = {
		name: "",
		age: 0,
		gender: ""
	};
	
	$scope.initPerson = function (name, age, gender) {
		$scope.person.name = name;
		$scope.person.age = age;
		$scope.person.gender = gender;
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
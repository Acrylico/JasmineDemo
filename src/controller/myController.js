myApp.controller('myController', function ($scope) {
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
});
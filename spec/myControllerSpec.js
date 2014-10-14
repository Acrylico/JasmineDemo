describe("myController Tests", function () {
	var scope, controller;

	beforeEach(module("myApp")); // Creates the module "myApp"

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new(); // Creating a new scope for our controller
		controller = $controller; // The service that instantiates controllers
		// Creates a "myController" controller object
		controller("myController", {$scope: scope}); 
	}));

	afterEach(function () { });
	
	it("should have a person object", function () {
        expect(scope.person).toBeDefined();
        expect(scope.person).toEqual({
            name: "",
            age: 0,
            gender: ""
		});
    });
	
	it("should initialize the person object when initPerson() is called", function () {
        var name = "Guy Gardener", age = 30, gender = "male";
		
		scope.initPerson(name, age, gender);

        expect(scope.person).toEqual({
            name: name,
            age: age,
            gender: gender
		});
    });
});	
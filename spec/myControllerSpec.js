describe("myController Tests", function () {
	var scope, controller, httpBackend, http;

	beforeEach(module("myApp")); // Creates the module "myApp"

	beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
		scope = $rootScope.$new(); // Creating a new scope for our controller
		controller = $controller; // The service that instantiates controllers
        httpBackend = $httpBackend;
        http = $http;
		controller("myController", {$scope: scope, $http: http}); // Creates a "myController" controller object
        spyOn(window, 'alert');
	}));

	afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
        window.alert.calls.reset();
    });
	
	it("should have a person object", function () {
        // arrange

        // act

        // assert
        expect(scope.person).toBeDefined();
    });
	
	it("should initialize the person object when initPerson() is called", function () {
        // arrange
        var name = "Guy Gardener", age = 30, gender = "male";

        // act
		scope.initPerson(name, age, gender);

        // assert
        expect(scope.person).toEqual({
            name: name,
            age: age,
            gender: gender
		});
    });

    it("should log success when a makeCall receives a 200", function () {
        // arrange
        var person = {
            name: "Guy Gardener",
            age: 30,
            gender: "male"
        };

        httpBackend.expectPOST("/api/person").respond(200, {result: "success"});
        spyOn(console, 'log').and.callFake(function(str){
            expect(str).toBe("Success! :D");
        });

        // act
        scope.makeCall(person);

        // assert
        httpBackend.flush();
        expect(console.log.calls.count()).toEqual(1);
    });

    it("should log an error when a makeCall does not receive a 200", function () {
        // arrange
        var person = {
            name: "Guy Gardener",
            age: 30,
            gender: "male"
        };

        httpBackend.expectPOST("/api/person").respond(500, {result: "error"});
        spyOn(console, 'log').and.callFake(function(str){
            expect(str).toBe("Failure! :(");
        });

        // act
        scope.makeCall(person);

        // assert
        httpBackend.flush();
        expect(console.log.calls.count()).toEqual(1);
    });
});	
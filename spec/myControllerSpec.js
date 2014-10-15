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

    it("should log success when a makeCall receives a 200", function () {
        httpBackend.expectPOST("/api/person").respond(200, {result: "success"});
        spyOn(console, 'log').and.callFake(function(str){
            expect(str).toBe("Success! :D");
        });
        scope.person.name = "Guy Gardener";
        scope.person.age = 30;
        scope.person.gender = "male";
        scope.makeCall(scope.person);
        httpBackend.flush();
        expect(console.log.calls.count()).toEqual(1);
    });

    it("should log an error when a makeCall does not receive a 200", function () {
        httpBackend.expectPOST("/api/person").respond(500, {result: "error"});
        spyOn(console, 'log').and.callFake(function(str){
            expect(str).toBe("Failure! :(");
        });
        scope.person.name = "Guy Gardener";
        scope.person.age = 30;
        scope.person.gender = "male";
        scope.makeCall(scope.person);
        httpBackend.flush();
        expect(console.log.calls.count()).toEqual(1);
    });
});	
myApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {

    //$locationProvider.html5Mode(true); //et av tre steg for å få fine url
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'http://www.tesla.com/**'
      ]);

    $routeProvider
      .when('/', {
            templateUrl: 'views/hjem.html',
            controller: 'HjemController'
        })
        .otherwise({
            redirectTo: '/'
        }
    );




}]);

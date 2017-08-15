myApp.run(['$cookies','$rootScope', 'envService', 'TeslaService', function($cookies, $rootScope, envService, TeslaService) {
   $rootScope.hostname = "http://localhost:3333/search?";
   $rootScope.imageHostname = "https://static-assets.tesla.com/configurator/compositor?";
}]);

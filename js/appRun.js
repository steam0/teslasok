myApp.run(['$cookies','$rootScope', 'envService', 'TeslaService', function($cookies, $rootScope, envService, TeslaService) {
   $rootScope.hostname = "https://teslasok-backend.herokuapp.com/search?";
   $rootScope.imageHostname = "https://static-assets.tesla.com/configurator/compositor?";
}]);

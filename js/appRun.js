myApp.run(['$cookies','$rootScope', 'envService', 'TeslaService', function($cookies, $rootScope, envService, TeslaService) {
   $rootScope.hostname = "http://www.tesla.com/sites/all/modules/custom/tesla_cpo_marketing_tool/api.php?";
}]);

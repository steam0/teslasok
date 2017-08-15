myApp.controller('HjemController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', '$log','$sce', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, $log, $sce) {
    $rootScope.hello = "Heisann";

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl($rootScope.hostname);
      }

    TeslaService.getSingleCar("123");
    /*.then(function (response) { 
      console.log(response);
    });*/
}]);

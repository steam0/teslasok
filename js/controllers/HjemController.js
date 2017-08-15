myApp.controller('HjemController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', '$log','$sce', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, $log, $sce) {
    $scope.hello = "Søk etter din Tesla";
    $scope.rawCar = [];
    $scope.cars = [];
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl($rootScope.hostname);
      }

    $scope.params = {
      "models": ["MODEL_S", "MODEL_X", "all"],
      "exteriors": ["all", "black", "white", "brown", "blue", "grey", "silver", "red"],
      "batteries": ["all", "60", "70", "75", "85", "90", "100"],
      "titleStatus": ["new", "used"]
    };

    $scope.search = {
      "exteriors": "all",
      "model": "",
      "battery": "all",
      "priceRange": "0%2C1500000",
      "city": null,
      "state": null,
      "country": "NO",
      "sort": "featured%7Casc",
      "titleStatus": "new",
    };

    $scope.update = function () {
      TeslaService.search($scope.search).then(function (response) { 
        $scope.cars = response.data;
        $scope.cars.forEach(function (car) {
          car.imageUrl = TeslaService.getImageUrl(car);
        });
        console.log($scope.cars);
      });
    }

    $scope.filter = function (key, filterParam) {

    }

    $scope.update();
}]);

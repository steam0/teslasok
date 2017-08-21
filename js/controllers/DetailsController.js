myApp.controller('DetailsController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', '$log','$sce', '$filter', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, $log, $sce, $filter) {
    $scope.optionCodes = {};
    $scope.car = {}
    $scope.search = $location.search();
    $scope.search.titleStatus = $scope.search.titleStatus.toLowerCase();
    $scope.search.country = "NO";

    $http.get('json/options.json').then(function(response) {
      $scope.optionCodes = response.data.tesla.configSetPrices.options;
      console.log($scope.optionCodes);
    });

    TeslaService.search($scope.search).then(function (response) { 
      $scope.car = response.data[0];

      // Get image url
      $scope.car.imageUrl = TeslaService.getImageUrl($scope.car);

    });

    $scope.getOptionCodeDescription = function (code) {
      var optionCode = $scope.optionCodes[code];

      if (optionCode !== undefined) {
        return optionCode.name;
      } else {
        return "";
      }

    };


}]);

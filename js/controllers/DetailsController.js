myApp.controller('DetailsController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', 'SearchParamService', '$log','$sce', '$filter', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, SearchParamService, $log, $sce, $filter) {
    $scope.optionCodes = {};
    $scope.car = {}
    $scope.search = $location.search();
    $scope.search.titleStatus = $scope.search.titleStatus.toLowerCase();
    $scope.search.country = "NO";
    $scope.imageUrls = [];
    $scope.params = SearchParamService.getParams();

    $http.get('json/options.json').then(function(response) {
      $scope.optionCodes = response.data.tesla.configSetPrices.options;
      console.log($scope.optionCodes);
    });

    function generateImageUrls() {
      var urls = [];

      for (type in $scope.params.images) {
        urls.push(TeslaService.getImageUrl($scope.car, 1200, $scope.params.images[type]))
      }

      return urls;
    }

    TeslaService.search($scope.search).then(function (response) { 
      $scope.car = response.data[0];

      // Get image url
      $scope.car.imageUrl = TeslaService.getImageUrl($scope.car, 900, "STUD_SIDE");

      // Get all images
      $scope.imageUrls = generateImageUrls();

      $scope.car.teslaUrl = "https://www.tesla.com/no_NO/"+$scope.car.TitleStatus.toLowerCase()+"/"+$scope.car.Vin
      console.log($scope.car);
    });

    $scope.getOptionCodeDescription = function (code) {
      var optionCode = $scope.optionCodes[code];

      if (optionCode !== undefined) {
        return optionCode.name;
      } else {
        return "";
      }

    };

    $scope.setFreeSupercharging = function (car) {
      $scope.super
    };

    $scope.getKey = function (object, value) {
      for (var key in object) {
        if (object[key] === value) {
          return key;
        }
      }
    };

}]);

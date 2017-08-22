myApp.controller('DetailsController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', 'SearchParamService', 'OptionCodeService', '$log','$sce', '$filter', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, SearchParamService, OptionCodeService, $log, $sce, $filter) {
    $scope.optionCodes = {};
    $scope.car = {}
    $scope.search = $location.search();
    $scope.search.titleStatus = $scope.search.titleStatus.toLowerCase();
    $scope.search.country = "NO";
    $scope.sortType = 'Description';
    $scope.imageUrls = [];
    $scope.params = SearchParamService.getParams();
    OptionCodeService.getOptionCodes().then(function (response) {
        $scope.options = response.tesla;
    });

    $http.get('json/options_EN.json').then(function(response) {
      $scope.optionCodes = response.data.tesla.configSetPrices.options;
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

      if ($scope.car.TitleStatus == 'NEW') {
        $scope.car.ReferralDiscount = 8000;
      }

      // Get all images
      $scope.imageUrls = generateImageUrls();

      $scope.car.teslaUrl = "https://www.tesla.com/no_NO/"+$scope.car.TitleStatus.toLowerCase()+"/"+$scope.car.Vin
    });

    $scope.getColor = function (optionCodes) {
      var colors = OptionCodeService.getColors($scope.options);
      return OptionCodeService.getColorFromOptionCodeList(colors, optionCodes);
    };

    $scope.getInterior = function (optionCodes) {
      var interiors = OptionCodeService.getInteriors($scope.options);
      return OptionCodeService.getInteriorFromOptionCodeList(interiors, optionCodes);
    };

    $scope.getBattery = function (optionCodes) {
      var batteries = OptionCodeService.getBatteries($scope.options);
    };

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
      return SearchParamService.getKey(object, value);
    };

}]);

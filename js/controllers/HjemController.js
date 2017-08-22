myApp.controller('HjemController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', 'SearchParamService', 'OptionCodeService', '$log','$sce', '$filter', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, SearchParamService, OptionCodeService, $log, $sce, $filter) {
    $scope.hello = "Søk etter din Tesla";
    $scope.rawCar = [];
    $scope.cars = [];
    $scope.sortType = 'Vin';
    $scope.sortReverse  = false;  // set the default sort order
    $scope.filterParam   = '';
    $scope.listType = false;

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl($rootScope.hostname);
      }

    $scope.optionCodes = {};

    $scope.params = SearchParamService.getParams();

    $scope.filter = {
      "roofOptions": 0,
      "autopilot": null,
      "premiumPackage": null,
      "freeSupercharging": null,
      "audioPackage": null,
      "year": null,
      "dualMotor": 0
    }

    $scope.search = {
      "exteriors": "all",
      "model": "all",
      "battery": "all",
      "priceRange": "0%2C1500000",
      "city": null,
      "state": null,
      "country": "NO",
      "titleStatus": "new"
    };

    $scope.update = function () {
      TeslaService.search($scope.search).then(function (response) { 
        $scope.cars = response.data;

        // Get image urls
        $scope.cars.forEach(function (car) {
          car.imageUrl = TeslaService.getImageUrl(car);

          // Get car color
          OptionCodeService.getOptionCodes().then(function (response) {
              $scope.options = response.tesla;
              var colors = OptionCodeService.getColors($scope.options);
              car.Color = OptionCodeService.getColorFromOptionCodeList(colors, car.OptionCodeList);
              if (car.TitleStatus == 'NEW') {
                car.ReferralDiscount = 8000;
              }
          });
        });

        // Filter by Free Supercharging
        if ($scope.filter.freeSupercharging) {
          $scope.cars = $filter('optioncode')($scope.cars, $scope.filter.freeSupercharging);
        }

        // Filter by panoramic roof
        if ($scope.filter.roofOptions) {
          if ($scope.filter.roofOptions == 1) {
              $scope.cars = $filter('filter')($scope.cars, {isPanoramic: false});
              $scope.cars = $filter('filter')($scope.cars, {isFixedGlassRoof: false});
          } else if ($scope.filter.roofOptions == 2) {
              $scope.cars = $filter('filter')($scope.cars, {isFixedGlassRoof: true});
          } else if ($scope.filter.roofOptions == 3) {
              $scope.cars = $filter('filter')($scope.cars, {isPanoramic: true});
          }
        }

        // Filter by premium package
        if ($scope.filter.premiumPackage) {
          $scope.cars = $filter('filter')($scope.cars, {isPremium: $scope.filter.premiumPackage});
        }

        // Filter by audioPackage
        //console.log($scope.search.audioPackage);
        if ($scope.filter.audioPackage) {
            $scope.cars = $filter('optioncode')($scope.cars, $scope.filter.audioPackage);
        }

        // Filter by autopilot
        if ($scope.filter.autopilot) {
            $scope.cars = $filter('filter')($scope.cars, {AutoPilot: $scope.filter.autopilot});
        }

        // Filter by winter package
        if ($scope.filter.winterPackage) {
          $scope.cars = $filter('optioncode')($scope.cars, $scope.filter.winterPackage);
        }

        // Filter by optioncodes
        if ($scope.filter.optioncodes) {
          var codes = $scope.filter.optioncodes.split(",");
          codes.forEach(function (code) {
              code = code.trim();
              $scope.cars = $filter('optioncode')($scope.cars, code);
          });
        }

        // Filter by year
        if ($scope.filter.year) {
          $scope.cars = $filter('filter')($scope.cars, {Year: $scope.filter.year});
        }

        // Filter by dual motor
        if ($scope.filter.dualMotor) {
          if ($scope.filter.dualMotor == 1) {
              $scope.cars = $filter('badge')($scope.cars, false);
          } else if ($scope.filter.dualMotor == 2) {
              $scope.cars = $filter('badge')($scope.cars, true);
          }
        }

        // Result
        console.log($scope.cars);
      });
    };

    $scope.initTable = function () {
      TeslaService.search($scope.search).then(function (response) { 
        $scope.cars = response.data;

        $scope.cars.forEach(function (car) {
          car.imageUrl = TeslaService.getImageUrl(car);
          OptionCodeService.getOptionCodes().then(function (response) {
              $scope.options = response.tesla;
              var colors = OptionCodeService.getColors($scope.options);
              car.Color = OptionCodeService.getColorFromOptionCodeList(colors, car.OptionCodeList);
              if (car.TitleStatus == 'NEW') {
                car.ReferralDiscount = 8000;
              }
          });
        });
      });
    };

    $scope.showDetails = function (car) {
      $location.path('/details').search({"vin": car.Vin, "titleStatus": car.TitleStatus});
    };

    $scope.getKey = function (object, value) {
      return SearchParamService.getKey(object, value);
    };

    $scope.initTable();
}]);

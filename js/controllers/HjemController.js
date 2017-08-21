myApp.controller('HjemController', ['$cookies', '$window', '$scope', '$rootScope', '$http', '$timeout', '$location', 'TeslaService', '$log','$sce', '$filter', function ($cookies, $window, $scope, $rootScope, $http, $timeout, $location, TeslaService, $log, $sce, $filter) {
    $scope.hello = "Søk etter din Tesla";
    $scope.rawCar = [];
    $scope.cars = [];
    $scope.sortType = 'Vin';
    $scope.sortReverse  = false;  // set the default sort order
    $scope.filterParam   = '';
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl($rootScope.hostname);
      }

    $scope.optionCodes = {};

    $http.get('json/options.json').then(function(response) {
      $scope.optionCodes = response.data.tesla.configSetPrices.options;
    });

    $scope.params = {
      "country": {
        "Norway": "NO"
      },
      "titleStatus": {
          "New": "new",
          "Used": "used",
          "All": null
      },
      "models": {
          "Model S": "MODEL_S",
          "Model X": "MODEL_X",
          "All": "all"
      },
      "exteriors": {
        "Black": "black",
        "White": "white",
        "Brown": "brown",
        "Blue": "blue",
        "Gray": "gray",
        "Silver": "silver",
        "Red": "red",
        "All": "all"
      },
      "batteries": {
        "60 kWh": "60",
        "70 kWh": "70",
        "75 kWh": "75",
        "85 kWh": "85",
        "90 kWh": "90",
        "100 kWh": "100",
        "All": "all"
      },
      "year": {
          "2012": 2012,
          "2013": 2013,
          "2014": 2014,
          "2015": 2015,
          "2016": 2016,
          "2017": 2017,
          "All": null
      },
      "audioPackage": {
        "Standard sound": "AU00",
        "Premium sound": "AU01",
        "Both": null
      },
      "premiumPackage": {
        "No premium": false,
        "With premium": true,
        "Both": null
      },
      "freeSupercharging": {
        "Unlimited supercharging": "SC01",
        "Paid supercharging": "SC04",
        "All": null
      },
      "roofOptions": {
        "Metal roof": 1,
        "Fixed glass roof": 2,
        "Panoramic roof": 3,
        "All": 0
      },
      "autopilot": {
        "HW2 (No Autopilot)": "APF0",
        "Enhanced Auto Pilot": "APF1",
        "Full Self Driving": "APF2",
        "All": null
      },
      "winterPackage": {
        "Winter package": "CW02",
        "No winter package": "CW00",
        "All": null
      },
      "dualMotor": {
        "2WD": 1,
        "AWD": 2,
        "Both": 0
      }
    };

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
      "titleStatus": null
    };

    $scope.update = function () {
      TeslaService.search($scope.search).then(function (response) { 
        $scope.cars = response.data;

        // Get image urls
        $scope.cars.forEach(function (car) {
          car.imageUrl = TeslaService.getImageUrl(car);
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
              $scope.cars = $filter('badge')($scope.cars, true);
          } else if ($scope.filter.dualMotor == 2) {
              $scope.cars = $filter('badge')($scope.cars, false);
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
        });
      });
    };

    $scope.showDetails = function (car) {
      $location.path('/details').search({"vin": car.Vin, "titleStatus": car.TitleStatus});
    };


    $scope.initTable();
}]);

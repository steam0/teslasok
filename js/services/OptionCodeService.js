myApp.factory('OptionCodeService', ['$cookies', '$q', '$rootScope', '$http', '$log', '$window', '$sce', '$httpParamSerializer', function ($cookies, $q, $rootScope, $http, $log, $window, $sce, $httpParamSerializer) {
  return {
    getOptionCodes: function () {
      var deferred = $q.defer();

      $http.get('json/options_EN.json').then(function(response) {
        deferred.resolve(response.data);
      }, function (error) {
          $log.error("Errormelding fra OptionCodeService: " + error.data.message);
          $log.error(error);
          deferred.reject(error);
      });

      return deferred.promise;
    },

    getOptionGroupForCode: function (optionCodeGroups, optionCodeGroup, optionCode) {
      var selectedOptionGroupAndCode = {};
      optionCodeGroup.forEach(function (group) {
        group.group_details.options.forEach(function (option) {
            if (option.code === optionCode) {
              selectedOptionGroupAndCode.name = group.name;
              selectedOptionGroupAndCode.code = optionCode;
            }
        });
      });

      return selectedOptionGroupAndCode;
    },

    getColors: function (options) {
      var colors = {};

      if (options !== undefined) {
        options.optionGroup.forEach(function (optionGroup) {
          if (optionGroup.name === "COL_PRICE_LEVEL") {
            optionGroup.group_details.options.forEach(function (option) {
              for (var color in options.configSetPrices.options[option.code].value_list){
                colors[color] = options.configSetPrices.options[option.code].value_list[color];
              }
            });
          }
        });
      }

      return colors;
    },

    getColorFromOptionCodeList: function (colors, optionCodes) {
      var colorName = "";

      if (optionCodes !== undefined) {
        optionCodes.forEach(function (optionCode) {
          if (optionCode in colors) {
            colorName = colors[optionCode].name;
          }
        });
      }

      return colorName;
    },

    getBatteries: function (options) {
      var batteries = {};

      if (options !== undefined) {
        options.optionGroup.forEach(function (optionGroup) {
          if (optionGroup.name === "BATTERY") {
            optionGroup.group_details.options.forEach(function (option) {
              for (var key in options.configSetPrices.options) {
                if (key === option.code) {
                    batteries[key] = options.configSetPrices.options[key];
                }
              };
            });
          }
        });
      }
      console.log(batteries);
      return batteries;
    },

    getInteriors: function (options) {
      var interiors = {};

      if (options !== undefined) {
        options.optionGroup.forEach(function (optionGroup) {
          if (optionGroup.name === "SEAT_PACKAGE" || optionGroup.name === "INTERIOR_BUNDLE") {
            optionGroup.group_details.options.forEach(function (option) {
              for (var key in options.configSetPrices.options) {
                if (key === option.code) {
                    interiors[key] = options.configSetPrices.options[key];
                }
              };
            });
          }
        });
      }
      console.log(interiors);
      return interiors;
    },

    getInteriorFromOptionCodeList: function (interiors, optionCodes) {
      var interior = "";
      if (optionCodes !== undefined) {
        console.log(optionCodes);
        optionCodes.forEach(function (optionCode) {
          if (optionCode in interiors) {
            console.log(optionCode);
            interior = interiors[optionCode];
          }
        });
      }

      console.log(interior);
      return interior;
    }
  }
}]);

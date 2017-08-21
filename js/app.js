var myApp =
angular.module('myApp', ['ngRoute', 'environment', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies'])
.filter('optioncode', function() {
    return function(cars, optionCode) {
      var filteredCars = [];
      cars.forEach(function (car) {
          car.OptionCodeList.forEach(function (option) {
            if (option === optionCode) {
              console.log(option + "?" + optionCode);
              filteredCars.push(car);
            }
          });
      });

      return filteredCars;
    };
})
.filter('badge', function() {
    return function(cars, dual) {
      var filteredCars = [];
      cars.forEach(function (car) {
        if ((car.Badge.indexOf('D') > -1) == dual) {
          filteredCars.push(car);
        }
      });

      return filteredCars;
    };
});

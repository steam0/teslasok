// NOT IN USE, see app.js

myApp.filter('optioncode', function() {
    return function(cars, optionCode) {
      var filteredCars = [];
      cars.forEach(function (car) {
          car.OptionCodeList.forEach(function (option) {
            if (option === optionCode) {
              filteredCars.push(car);
              break;
            }
          });
      });

      return filteredCars;
    };
});

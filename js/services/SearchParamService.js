myApp.factory('SearchParamService', ['$cookies', '$q', '$rootScope', '$http', '$log', '$window', '$sce', '$httpParamSerializer', function ($cookies, $q, $rootScope, $http, $log, $window, $sce, $httpParamSerializer) {
  return {
    getParams: function () {
      return {
        "country": {
          "Norway": "NO"
        },
        "titleStatus": {
            "New": "new",
            "Used": "used",
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
        },
        "images": ["STUD_3QTR", "STUD_SEAT_ALTA", "STUD_REAR", "STUD_ABOV", "STUD_SEAT_3QTR", "STUD_SIDE"]
      };
    }
  }
}]);

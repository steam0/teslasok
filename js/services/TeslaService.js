myApp.factory('TeslaService', ['$cookies', '$q', '$rootScope', '$http', '$log', '$window', '$sce', function ($cookies, $q, $rootScope, $http, $log, $window, $sce) {
  return {
    getSingleCar: function (vin) {
      var deferred = $q.defer();
      $log.info("Test");
      var requestUrl = $rootScope.hostname + "exteriors=all&model=&battery=all&priceRange=0%2C1500000&city=null&state=null&country=NO&sort=featured%7Casc&titleStatus=new&vin=5YJSA7E48HF202950&callback=JSON_CALLBACK";

      $http.jsonp(requestUrl).success(function(data){
              console.log(data.found);
          });
      /*$http.jsonp(requestUrl, {params: {cb: 'JSON_CALLBACK'}, headers: { 'Accept': 'text/html' }}).then(function (response) {
          deferred.resolve(response);
      }, function (error) {
          $log.error(error);
          deferred.reject(error);
      });

      return deferred.promise;*/
    }
  }
}]);

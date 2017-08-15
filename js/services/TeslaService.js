myApp.factory('TeslaService', ['$cookies', '$q', '$rootScope', '$http', '$log', '$window', '$sce', '$httpParamSerializer', function ($cookies, $q, $rootScope, $http, $log, $window, $sce, $httpParamSerializer) {
  return {
    search: function (params) {
      var deferred = $q.defer();
      var cleanParams = {};
      Object.keys(params).forEach(function (param) {
        if (params[param]) {
          cleanParams[param] = params[param];
        }
      });
      var queryString = $httpParamSerializer(cleanParams);
      var requestUrl = $rootScope.hostname +  queryString;
      $log.info(requestUrl);

      $http.get(requestUrl).then(function (response) {
          deferred.resolve(response);
      }, function (error) {
          $log.error(error);
          deferred.reject(error);
      });

      return deferred.promise;
    },

    getImageUrl: function (car) {
      var queryString = "model=" + car.ModelVariant + "&view=STUD_3QTR&size=900&bkba_opt=2&file_type=jpg&options="+car.OptionCodeList.join(",");
      return $rootScope.imageHostname + queryString;
    }
  }
}]);

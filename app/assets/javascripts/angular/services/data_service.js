angular.module('Friso.services')
  .service('DataService',['$http', '$q', function($http, $q) {

    this.connect_users = function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'https://api.hotspotsystem.com/v2.0/locations/2/transactions/social?limit=1000',
        headers: { 'sn-apikey': 'fba8b1a0e91be89664295eaf358cacb0' },
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.data_api = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://gpdigital.twilightparadox.com/api/v0/frisoDash.php',
        data: data
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }
}]);

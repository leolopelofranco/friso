angular.module('Friso.services')
  .service('DataService',['$http', '$q', function($http, $q) {

    this.send = function(data) {
      console.log(data)
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/send_sms',
        data: data
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.send_sms = function(data) {
      console.log(data)
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/send_sms_1',
        data: data
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

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

    this.get_exchanges = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: '/coin',
        data: data
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

    this.data_unilab = function() {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'https://api.aircast.ph/wiflexGetUserInfo',
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.nograles = function(data) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'http://ec2-13-250-103-104.ap-southeast-1.compute.amazonaws.com/digital.com/public/dashboard/pagesearch/PageID/' + data.pageIDs + '/KeyWord/'+ data.keywords + '/StartDate/'+ data.startDate +'/EndDate/'+ data.endDate,
      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.nograles_post = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://laraveltestproject.herokuapp.com/api/pagebulkallwithtoken',
        headers: {
        'Content-Type': 'application/json'},
        data: data

      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }


    this.sentiment_analysis = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://laraveltestproject.herokuapp.com/api/pagesweep',
        headers: {
        'Content-Type': 'application/json'},
        data: data

      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.sentiment_post_analysis = function(data) {
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://laraveltestproject.herokuapp.com/api/post_list_stat',
        headers: {
        'Content-Type': 'application/json'},
        data: data

      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }

    this.post_analysis = function(data) {
      console.log(data)
      var d = $q.defer();
      $http({
        method: 'POST',
        url: 'http://laraveltestproject.herokuapp.com/api/postwithtoken',
        headers: {
        'Content-Type': 'application/json'},
        data: data

      }).then(function(data){
        d.resolve(data);
      });

      return d.promise;
    }
}]);

angular.module('Friso.controllers')
  .controller('UnilabController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {

      DataService.data_unilab()
        .then(function(d){
          console.log(d)
          $scope.users = d.data
        });

}]);

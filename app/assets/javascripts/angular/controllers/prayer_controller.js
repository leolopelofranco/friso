angular.module('Friso.controllers')
  .controller('PrayerController',
  ['$scope', '$state', 'DemoService', 'DataService', 'ngDialog', 'PageService',
    function($scope, $state, DemoService, DataService, ngDialog, PageService) {

      $scope.secure = function(){


        d = {
          email:$scope.name,
          password: $scope.mobile
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
          number:$scope.name,
          message: $scope.mobile
        }

        console.log(d)


        DataService.send_sms(d)
          .then(function(d){
            console.log(d)
            $state.go('success')

          })
      }


}]);

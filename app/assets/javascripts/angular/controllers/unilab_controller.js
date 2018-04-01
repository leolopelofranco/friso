angular.module('Friso.controllers')
  .controller('UnilabController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {

      DataService.data_unilab()
        .then(function(d){

          _.each(d.data, function(el, i,l) {

            if(!el.Responses) {
              el.Responses = ''
            }

            start = moment(el.SubmitStart)
            end = moment(el.SubmitEnd)
            var diff = moment.duration(moment(end).diff(moment(start)));
            el.difference = diff.asSeconds()
          });

          $scope.users = d.data
        });

        $scope.exportTable = function(event){
          var table = angular.element("#table_export");

          table.tableExport({type:'csv',escape:'false'});
        }
}]);

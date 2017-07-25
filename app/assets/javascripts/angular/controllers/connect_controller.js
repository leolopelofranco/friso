angular.module('Friso.controllers')
  .controller('ConnectController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {

      DataService.connect_users()
        .then(function(d){
          _.each(d.data.items, function(x) {
            x.date = moment(x.action_date_gmt).format('llll')
            if(x.social_gender == 1) {
              x.gender = 'Male'
            }
            else {
              x.gender = 'Female'
            }
            if(x.user_agent.indexOf('iPhone') !== -1) {
              x.device = 'iOS'
            }
            else if (x.user_agent.indexOf('Android') !== -1) {
              x.device = 'Android'
            }
            else {
              x.device = 'Others'
            }

            x.link = 'www.facebook.com/' + x.social_id
            wrt = x.user_name

            wrt = wrt.substr(wrt.length - 6);
            wrt_digit = wrt.match(/\d+$/)[0];
            if(wrt_digit) {
              doctors = DemoService.docs()
              _.each(doctors, function(doc) {
                if(doc.wds == wrt_digit) {
                  x.router = doc.name
                }
              })
            }
            else {
              router = 'Marc_Collao'
            }

          })

          $scope.users = d.data.items.reverse()
          console.log($scope.users)
        });







}]);

angular.module('Friso.controllers')
  .controller('ConnectController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {

      $scope.filter_keys = [
        {
          name: "All",
          key: "all"
        },
        {
          name: "Active Routers",
          key: "router"
        }, {
          name: "Unique People",
          key: "customer"
        }, {
          name: "Remove",
          key: "remove"
        }
      ]

      $scope.filters = function(filter) {
        if(filter == 'all') {
          $scope.users = users_original
        }
        else if (filter == 'remove') {
          users = []
          console.log($scope.users)
          names = ['Leo Lope Lofranco', 'Ferer Atlus', 'Randy Beros', 'Qweasd Namanan', 'Jessmond Diesta Nazarrea', 'Margie Marquez Pena', 'Patsy Bot']
          _.each($scope.users, function(x) {
            if(!_.includes(names,x.customer)) {
              users.push(x)
            }
          })

          $scope.users = users

        }
        else {
          $scope.users = _.uniqBy($scope.users_original, filter);
        }
      }

      DataService.connect_users()
        .then(function(d){

          _.each(d.data.items, function(x) {
            x.date = moment(x.action_date_gmt).format('lll')
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

            wrt_digit = wrt.match(/\d+$/)

            if(wrt_digit) {
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
            }

          })
          users_original = d.data.items.reverse()

          $scope.users = d.data.items.reverse()

          $scope.users_original = d.data.items

          var distances = {};
          _.each($scope.users_original,function(i,e) {
             distances[i.router] = (distances[i.router] || 0) + 1;
          });

          $scope.unique_routers_count = []
          _.each(_.keys(distances), function(i) {
            c = {}
            c["name"] = i
            c["sum"] = distances[i]
            $scope.unique_routers_count.push(c)
          })
          console.log(distances)
          console.log($scope.unique_routers_count)
        });




        $scope.exportTable = function(event){
          var table = angular.element("#table_export");
          console.log(table);
          table.tableExport({type:'csv',escape:'false'});
        }


}]);

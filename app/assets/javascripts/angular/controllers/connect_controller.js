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

          names = ['Leo Lope Lofranco', 'Ferer Atlus', 'Randy Beros', 'Qweasd Namanan', 'Jessmond Diesta Nazarrea', 'Margie Marquez Pena', 'Patsy Bot', 'Eboy Watson', 'Bryan Conde', 'April Torrento Dondoy', 'Elin Ellarina']
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

          $scope.unique_routers = _.uniqBy($scope.users_original, 'router');


          users_by_dates = []
          _.each(date_range, function(x) {
            x = moment(x).format('MM-DD')
            users_by_day = []
            _.each($scope.users_original, function(i) {
              if(moment(i.date).format('MM-DD') == x) {
                users_by_day.push(i)
              }
            })

            var distances = {};
            _.each(users_by_day,function(i,e) {
               distances[i.router] = (distances[i.router] || 0) + 1;
            });

            unique_routers_count_by_dates = []
            _.each(_.keys(distances), function(i) {
              c = {}
              c["name"] = i
              c["sum"] = distances[i]
              unique_routers_count_by_dates.push(c)
            })

            d = {}
            d["date"] = x
            d["users"] = users_by_day
            d["users_by_dates"] = unique_routers_count_by_dates

            users_by_dates.push(d)
          })

          console.log(users_by_dates)
          unique_routers_count_by_user_date = []
          _.each($scope.unique_routers, function(i) {
            dates = []
            _.each(date_range, function(x) {
              x = moment(x).format('MM-DD')
              users_by_day = []
              _.each($scope.users_original, function(y) {
                if(i.router == y.router) {
                  if(moment(y.date).format('MM-DD') == x) {
                    users_by_day.push(y)
                  }
                }
              });
              g = {}
              g["date"] = x
              g["users"] = users_by_day
              dates.push(g)
            });
            d = {}
            d["site"] = i.router
            d["dates"] = dates
            unique_routers_count_by_user_date.push(d)
          })
          console.log(unique_routers_count_by_user_date)

          $scope.unique_routers_count_by_user_date = unique_routers_count_by_user_date
        });



        function getDates(startDate, stopDate) {
          var dateArray = [];
          var currentDate = moment(startDate);
          var stopDate = moment(stopDate);
          while (currentDate <= stopDate) {
              dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
              currentDate = moment(currentDate).add(1, 'days');
          }
          return dateArray;
        }

        startData = 'November 11 2017'
        endData = 'November 18 2017'

        date_range = getDates(startData, endData)
        $scope.date_range = date_range


        $scope.exportTable = function(event){
          var table = angular.element("#table_export");

          table.tableExport({type:'csv',escape:'false'});
        }


}]);

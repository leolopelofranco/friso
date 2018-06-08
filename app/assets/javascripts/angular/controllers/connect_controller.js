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

      $scope.dateOptions = {
        locale : {
            format : 'DD/MM/YYYY'
        },
        eventHandlers : {
            'apply.daterangepicker' : function() {

                        date_range = getDates($scope.datePicker.date.startDate, $scope.datePicker.date.endDate)
                        $scope.unique_routers_count_by_user_date = unique_routers_by_dates_fxn(date_range)
                        date_range_formatted = []
                        _.each(date_range, function(i) {
                          date_range_formatted.push(moment(i).format('MM-DD'))
                        })
                        $scope.date_range_formatted = date_range_formatted
            }
        }
    };
      $scope.datePicker = {}
      $scope.datePicker.date = {
        startDate: moment().subtract(7, "days"),
        endDate: moment()
      };

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


      $scope.topic = {}
      $scope.topic.keywords = 'awesome'
      $scope.topic.pageIDs = 'cloudfone'
      $scope.topic.startDate =1522540800
      $scope.topic.endDate =1527233566

      DataService.nograles($scope.topic)
        .then(function(d){
          console.log(d)
          $scope.nograles_data = d.data.data
        })

      $scope.search = function(data) {
        console.log(data)
        keys = data.keywords.split(',')
        pages = data.pageIDs.split(',')

        d = {
          KeyWord: keys,
          PageID: pages,
          StartDate: data.startDate,
          EndDate: data.endDate
        }
        console.log(d)
        DataService.nograles_post(d)
          .then(function(d){
            console.log(d)
            $scope.nograles_data = d.data.data
          })
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
          users = []

          names = ['Leo Lope Lofranco', 'Ferer Atlus', 'Randy Beros', 'Qweasd Namanan', 'Jessmond Diesta Nazarrea', 'Margie Marquez Pena', 'Patsy Bot', 'Eboy Watson', 'Bryan Conde', 'April Torrento Dondoy', 'Elin Ellarina']
          _.each(d.data.items.reverse(), function(x) {
            if(!_.includes(names,x.customer)) {
              users.push(x)
            }
          })

          $scope.users = users
          users_original = users

          $scope.users_original = users_original

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

          date_range = getDates($scope.datePicker.date.startDate, $scope.datePicker.date.endDate)
          $scope.unique_routers_count_by_user_date = unique_routers_by_dates_fxn(date_range)
          date_range_formatted = []
          _.each(date_range, function(i) {
            date_range_formatted.push(moment(i).format('MM-DD'))
          })
          $scope.date_range_formatted = date_range_formatted
        });

        unique_routers_by_dates_fxn = function(date_range) {
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
        return unique_routers_count_by_user_date
      }

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


      $scope.exportTable = function(event){
        var table = angular.element("#table_export");

        table.tableExport({type:'csv',escape:'false'});
      }


}]);

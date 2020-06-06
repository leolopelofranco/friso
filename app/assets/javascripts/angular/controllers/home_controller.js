angular.module('Friso.controllers')
  .controller('HomeController',
  ['$scope', '$state', 'DemoService', 'DataService', 'ngDialog', 'PageService',
    function($scope, $state, DemoService, DataService, ngDialog, PageService) {

      $scope.options_1 = DemoService.chart_options()
      $scope.data = DemoService.demo_data()

      $scope.discrete_label = DemoService.total_engagements_options()

      $scope.pages = PageService.friso_pages()

      $scope.secure = function(){


        d = {
          email:$scope.email,
          password: $scope.password
        }

        console.log(d)

        DataService.send(d)
          .then(function(d){
            console.log(d)
          })
      }

      $scope.settings = function() {
        ngDialog.openConfirm({
          templateUrl: 'shared/settings.html',
            className: 'ngdialog-theme-default',
            width: '750px',
            controller: 'ModalController',
            scope: $scope,

        }).then(function (location) {
          index = _.findIndex($scope.selected_locations, function(item) { return item.id == location.id })
          location["areas"] = location["selected_areas"]
          $scope.selected_locations[index] = location

        }, function (value) {
            //Do something
        });
      }

      init_total_engagements = {
        action: "total_engagement",
        page_id: 1779444312279885,
        startDate: 1490976000,
        endDate:1496246400
      }
      DataService.data_api(init_total_engagements)
        .then(function(d){
          $scope.total_engagement_data = [d.data]
      });

      init_total_unique = {
        action: "unique_users",
        page_id: 1779444312279885,
        startDate: 1490976000,
        endDate:1496246400
      }

      DataService.data_api(init_total_unique)
        .then(function(d){
          $scope.total_unique_data = [d.data]
      });

      init_top_advocates = {
        action: "top_engagement",
        page_id: 1779444312279885,
        time_id: 42
      }

      DataService.data_api(init_top_advocates)
        .then(function(d){
          $scope.advocates= d.data.users
      });

      init_top_influencer = {
        action: "top_influencer",
        page_id: 1779444312279885,
        time_id: 42
      }

      DataService.data_api(init_top_influencer)
        .then(function(d){
          $scope.influencers= d.data.users
      });

      init_top_posts = {
        action: "top_posts",
        page_id: 1779444312279885,
        time_id: 42
      }

      DataService.data_api(init_top_posts)
        .then(function(d){

          $scope.posts= d.data.posts
      });

      $scope.page_engagements = function(page, action) {


        init_total_engagements.page_id = page.page_id
        init_total_engagements.action = action
        init_total_engagements.time_id = 42
        console.log(init_total_engagements)

        DataService.data_api(init_total_engagements)
          .then(function(d){
            console.log(d)
            if(d.data.action == '3-Month Total Engagement Graph') {
              $scope.total_engagement_data = [d.data]
            }
            else if(d.data.action == "Top 10 posts") {
              $scope.posts= d.data.posts
            }
            else if(d.data.action == "Top 10 Influencers") {
              $scope.influencers= d.data.users
            }
            else if(d.data.action == "Top 10 Advocates") {
              $scope.advocates= d.data.users
            }
            else {
              $scope.total_unique_data = [d.data]
            }
        });

      }





}]);

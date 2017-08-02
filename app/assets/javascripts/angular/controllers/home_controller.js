angular.module('Friso.controllers')
  .controller('HomeController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {

      $scope.options_1 = DemoService.chart_options()
      $scope.data = DemoService.demo_data()

      $scope.discrete_label = DemoService.total_engagements_options()



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
          console.log(d)
          $scope.advocates= d.data.users
      });

      init_top_influencer = {
        action: "top_influencer",
        page_id: 1779444312279885,
        time_id: 42
      }

      DataService.data_api(init_top_influencer)
        .then(function(d){
          console.log(d)
          $scope.influencers= d.data.users
      });

      init_top_posts = {
        action: "top_posts",
        page_id: 1779444312279885,
        time_id: 42
      }

      DataService.data_api(init_top_posts)
        .then(function(d){
          console.log(d)
          $scope.posts= d.data.posts
      });

      




}]);

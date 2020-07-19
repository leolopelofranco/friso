angular.module('Friso.controllers')
  .controller('BidlyController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {
      d = {
        email:'hello',
      }
      $scope.common_coins = ["BTC", "ETH", "XRP", "USDT", "BCH", "LTC", "EOS"]
      DataService.get_exchanges(d)
        .then(function(d){
          data = JSON.parse(d.data.data)
          coins = []
          common_coins = ["BTC", "ETH", "XRP", "USDT", "BCH", "LTC", "EOS"]
          _.each(common_coins, function(x) {
              coin = _.filter(data, function(o) { return o.asset_id === x; });
              coin[0]["sell"] = coin[0]["price_usd"] - 100
              coin[0]["buy"] = coin[0]["price_usd"] + 100
              coins.push(coin[0])
          })
          $scope.coins = coins


          conversion_rate = _.filter($scope.coins, function(o) { return o.asset_id === $scope.selected_coin; });
          if($scope.toggleValue) {
            conversion_rate = conversion_rate[0]["buy"]
            $scope.equivalent_amount =conversion_rate * $scope.amount
          }
          else {
            conversion_rate = conversion_rate[0]["sell"]
            $scope.equivalent_amount =conversion_rate * $scope.amount
          }
        })

      $scope.amount = 1000


      $scope.changed = function() {
        console.log($scope.toggleValue)
        conversion_rate = _.filter($scope.coins, function(o) { return o.asset_id === $scope.selected_coin; });
        if($scope.toggleValue) {
          conversion_rate = conversion_rate[0]["buy"]
          $scope.equivalent_amount =conversion_rate * $scope.amount
        }
        else {
          conversion_rate = conversion_rate[0]["sell"]
          $scope.equivalent_amount =conversion_rate * $scope.amount
        }
      }


}]);

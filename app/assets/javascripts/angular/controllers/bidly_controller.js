angular.module('Friso.controllers')
  .controller('BidlyController',
  ['$scope', '$state', 'DemoService', 'DataService',
    function($scope, $state, DemoService, DataService) {
      d = {
        email:'hello',
      }


      $scope.common_coins = ['BTC', 'ETH', 'XRP']

      // DataService.exchange_rate(d)
      //   .then(function(x){
      //     x = JSON.parse(x.data.data)
      //     console.log(x.rates.PHP)
      //     console.log(x.rates.USD)
      //     exchange_rate = x.rates.PHP/x.rates.USD
      //       DataService.get_exchanges(d)
      //         .then(function(d){
      //
      //
      //
      //           data = JSON.parse(d.data.data)
      //           coins = []
      //           common_coins = ["BTC", "ETH", "BCH"]
      //           _.each(common_coins, function(x) {
      //               coin = _.filter(data, function(o) { return o.asset_id === x; });
      //
      //               if(x === 'BTC'){
      //               coin[0]["buy"] = coin[0]["price_usd"]*exchange_rate + 19000
      //               }
      //
      //               else if (x==='ETH') {
      //                 coin[0]["buy"] = coin[0]["price_usd"]*exchange_rate + 40
      //               }
      //               else if (x==='BCH') {
      //                 coin[0]["buy"] = coin[0]["price_usd"]*exchange_rate + 20
      //               }
      //               coins.push(coin[0])
      //           })
      //           $scope.coins = coins
      //
      //
      //           conversion_rate = _.filter($scope.coins, function(o) { return o.asset_id === $scope.selected_coin; });
      //           if($scope.toggleValue) {
      //             conversion_rate = conversion_rate[0]["buy"]
      //             $scope.equivalent_amount =conversion_rate * $scope.amount
      //           }
      //           else {
      //             conversion_rate = conversion_rate[0]["sell"]
      //             $scope.equivalent_amount =conversion_rate * $scope.amount
      //           }
      //         })
      // })

      $scope.amount = 1000

      DataService.coinsph(d)
        .then(function(d){
           _.each(d.data.data, function(x) {
             x.data = JSON.parse(x.data)

             if(x.data.market.product === "BTC") {
              x.data.market.ask= parseFloat(x.data.market.ask)
              x.data.market.bid= parseFloat(x.data.market.bid)
             }
           })
           $scope.coins = d.data


          conversion_rate = _.filter($scope.coins.data, function(o) { return o.code=== $scope.selected_coin; });
          console.log(conversion_rate)
          if($scope.toggleValue) {
            conversion_rate = conversion_rate[0]["data"]["market"]["ask"]
            $scope.equivalent_amount =conversion_rate * $scope.amount
          }
          else {
            conversion_rate = conversion_rate[0]["data"]["market"]["bid"]
            $scope.equivalent_amount =conversion_rate * $scope.amount
          }
        })


      $scope.changed = function() {
        conversion_rate = _.filter($scope.coins.data, function(o) { return o.code=== $scope.selected_coin; });
        console.log(conversion_rate)
        if($scope.toggleValue) {
          conversion_rate = conversion_rate[0]["data"]["market"]["ask"]
          $scope.equivalent_amount =conversion_rate * $scope.amount
        }
        else {
          conversion_rate = conversion_rate[0]["data"]["market"]["bid"]
          $scope.equivalent_amount =conversion_rate * $scope.amount
        }
      }


}]);

angular.module('Friso.services')
  .service('PageService',['$http', '$q', function($http, $q) {
    this.friso_pages = function() {
      return  [
          {
            "name": "Friso",
            "page_id": 81789923849,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Goldilocks Campaigns",
          },
          {
            "name": "Red Ribbon",
            "page_id": 135469913163264,
            "time_id": 44,
            "sub_group": 2,
            "month": "June",
            "title": "Red Ribbon Campaigns",
          },
          {
            "name": "Kuya J",
            "page_id": 365678000259531,
            "time_id": 44,
            "sub_group": 2,
            "month": "June",
            "title": "Kuya J Campaigns",
          },
          {
            "name": "Kenny Rogers",
            "page_id": 136339672775,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Kenny Rodgers Campaigns",
          },
          {
            "name": "Pizza Hut",
            "page_id": 139195626174,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Pizza Hut Campaigns",
          },
          {
            "name": "Shakeys",
            "page_id": 148370235185103,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Shakeys Campaigns",
          },
          {
            "name": "Yellow Cab",
            "page_id": 226322167379462,
            "time_id": 44,
            "sub_group": 2,
            "month": "June",
            "title": "Yellow Cab Campaigns",
          },
          {
            "name": "Max Restaurant",
            "page_id": 42321613070,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Max Campaigns",
          },
          {
            "name": "Bonchon",
            "page_id": 116690228389144,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Bonchon Campaigns",
          },
          {
            "name": "GreenwichPizza",
            "page_id": 114259391924668,
            "time_id": 44,
            "month": "June",
            "title": "Greenwich Campaigns"
          },
          {
            "name": "Chowking",
            "page_id": 155127674511376,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Chowking Campaigns"
          },
          {
            "name": "Burger King",
            "page_id": 107720949105,
            "time_id": 44,
            "sub_group": 2,
            "month": "June",
            "title": "Burger king Campaigns"
          },
          {
            "name": "Wendys",
            "page_id": 302389279839128,
            "time_id": 44,
            "month": "June",
            "sub_group": 2,
            "title": "Wendys Campaigns"
          }
        ]
    }


}]);

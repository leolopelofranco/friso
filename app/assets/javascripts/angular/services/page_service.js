angular.module('Friso.services')
  .service('PageService',['$http', '$q', function($http, $q) {
    this.friso_pages = function() {
      return  [
          {
            "name": "Friso",
            "page_id": 1779444312279885,
            "time_id": 44,
            "month": "June",
            "sub_group": 63,
          },
          {
            "name": "Promil Gold 4",
            "page_id": 153070048136904,
            "time_id": 44,
            "sub_group": 63,
            "month": "June",
          },
          {
            "name": "Nankido Optipro",
            "page_id": 322060507837549,
            "time_id": 44,
            "sub_group": 63,
            "month": "June",
          },
          {
            "name": "Enfagrow",
            "page_id": 241832309266728,
            "time_id": 44,
            "month": "June",
            "sub_group": 63,
          },
          {
            "name": "Nestokid",
            "page_id": 488636411314898,
            "time_id": 44,
            "month": "June",
            "sub_group": 63,
          },
          {
            "name": "Nido Protectus",
            "page_id": 166555516729028,
            "time_id": 44,
            "month": "June",
            "sub_group": 63,
          }
        ]
    }


}]);

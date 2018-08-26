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


      $scope.sentiment = {}

      $scope.sentiment.Token = "EAADZBXIds1zwBADjMTCIwthGP7jEGguv3whJSI3TucMMBVFFkI7BC0ZBQKVH44F2oMuQtZB15NRdJxKBqbxTjii3SUhVjh7HXHJpR69NaOrnsvCkAzJ82ERdPMrs3uALWEjH9OkjESKzQdqZBx63OhaFzagZB4DUTCOEMShLouQZDZD"
      $scope.sentiment.StartDate = 1530403200
      $scope.sentiment.EndDate = 1532995200
      $scope.sentiment.PageID = 'cloudfone'
      $scope.sentiment.PosWord = "good job,role model,mabait,brilliant,good example,excellent,mabuti,hardworking,nagmamalasakit,satisfied,totoo,many accomplishments,magaling,mabuhay,industrious,masipag,bait,bilib ako sayo,we are proud of you,tunay na pagbabago,galing,kudos,less corruption,may malasakit,great work,heart of gold,idol,galing naman,salamat,dedicated,one of a kind,noble,commendable,people person,walang kapaguran ,credible,matulungin,may malasakit,makabayan,the best,highly comendable,has the heart for the masses,thank you for the support,hanga ako,dapat tularan,you have done well,number 1,ginagampanan ang trabaho,masipag,gusto kita,hindi napipikon,thinking of whats good,best senator,workaholic,may hangarin para sa edukasyon,has potential to be president,keep up the good work,i like your attitude,righteous,i look up to you,lifesaver,simple,totoo,silent hardworking senator,respectable ,concerned,sana magtagumpay ka,following the legacy ,supportive,may hangarin makatulong,hindi dagdag pahirap,awesome,tunay na daan sa kapayapaan ,pursigido,walang nagawa,great deeds done,outstanding,maraming napatunayan,may pakainabang,magkaisa"
      $scope.sentiment.NegWord = 'pasikat,bobo,plastic,dummy,hypocrite,kapal,pakitang tao,bias,fake,publicity stunt,envious,epal,no changes,use your head,disgusting,walang na implement,walang nagawa,traydor,treacherous,dont trust you,project grabber,no credibility,sayang ,lost your name,utang pa namin sayo,manloloko,sayang ang support,magnanakaw,sira ulo,disappointing,sad,purveyors of fake news,watchdogs,bulag,malicious,greedy,underdog,papogi,please take action,ganda lang,huwag iboto,puro salita,puro daldal,sweetheart deals for preferred friends,position grabber,feeling mananalo,ambisyosa,inggitera,ganid,mamamatay tao,daming haters,lakas makapuna,stupid,hudas,demonyo,kapal ng mukha,gago,abnormal,do not like ,dangerous,bogok,kawatan,kontabida,kunwari perpekto,corrupt,waste of time,papansin,epal'
      $scope.sentiment.KeyWord = 'cloudfone'

      positive_words = $scope.sentiment.PosWord.split(',')
      negative_words = $scope.sentiment.NegWord.split(',')
      keywords = $scope.sentiment.KeyWord.split(',')
      PageIDs = $scope.sentiment.PageID.split(',')

      sen = {
        KeyWord: keywords,
        PageID: PageIDs,
        StartDate: $scope.sentiment.StartDate,
        EndDate: $scope.sentiment.EndDate,
        NegWord: negative_words,
        PosWord: positive_words,
        Token: $scope.sentiment.Token
      }

      $scope.counter = 0

      $scope.sentiment_analysis = function(data) {

        console.log(data)

        keys = data.KeyWord.split(',')
        positive_words = data.PosWord.split(',')
        negative_words = data.NegWord.split(',')
        page_ids = data.PageID.split(',')

        d = {
          KeyWord: keys,
          PageID: page_ids,
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          NegWord: negative_words,
          PosWord: positive_words,
          Token: $scope.sentiment.Token
        }

        console.log(d)

        DataService.sentiment_analysis(d)
          .then(function(d){
            $scope.sentiment_data = d.data.PagesResult
            console.log($scope.sentiment_data)
            $scope.counter = $scope.counter + 1
          })
      }


      $scope.topic = {}
      $scope.topic.KeyWord = ' '
      $scope.topic.CommentFilter = 'nograles,bam,tolentino,roque,poe,angara,villar,ejercito,cayetano,bong,uson,manicad,aguilar,binay,duterte,pimentel,tulfo,dela Rosa,estrada,andanar,lapid,imee'
      $scope.topic.PageID = 'abscbnNEWS'
      // $scope.topic.StartDate = 1531958400
      // $scope.topic.EndDate = 1532516381
      $scope.topic.StartDate = 1530403200
      $scope.topic.EndDate = 1532995200
      $scope.topic.Token = "EAADZBXIds1zwBADjMTCIwthGP7jEGguv3whJSI3TucMMBVFFkI7BC0ZBQKVH44F2oMuQtZB15NRdJxKBqbxTjii3SUhVjh7HXHJpR69NaOrnsvCkAzJ82ERdPMrs3uALWEjH9OkjESKzQdqZBx63OhaFzagZB4DUTCOEMShLouQZDZD"


      keys = $scope.topic.KeyWord.split(',')
      pages = $scope.topic.PageID.split(',')
      comments = $scope.topic.CommentFilter.split(',')

      d = {
        KeyWord: keys,
        PageID: pages,
        StartDate: $scope.topic.StartDate,
        EndDate: $scope.topic.EndDate,
        CommentFilter: comments,
        Token: $scope.topic.Token
      }

      DataService.nograles_post(d)
        .then(function(d){
          $scope.nograles_data = d.data.data
        })

      $scope.post = {}
      $scope.post.PostID = '142802334452_10157025865999453'
      $scope.post.KeyWord = 'nograles,bam,tolentino,roque,poe,angara,villar,ejercito,cayetano,bong,uson,manicad,aguilar,binay,duterte,pimentel,tulfo,dela Rosa,estrada,andanar,lapid,imee'
      comment_keys = $scope.post.KeyWord.split(',')

      post = {
        PostID: $scope.post.PostID,
        CommentFilter: comment_keys,
        Token: $scope.topic.Token
      }


      DataService.post_analysis(post)
        .then(function(x){

          $scope.post_data = x.data
          console.log($scope.post_data)
        })

      $scope.search = function(data) {
        console.log(data)
        keys = data.KeyWord.split(',')
        pages = data.PageID.split(',')
        comments = data.CommentFilter.split(',')

        d = {
          KeyWord: keys,
          PageID: pages,
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          CommentFilter: comments,
          Token: $scope.topic.Token
        }
        DataService.nograles_post(d)
          .then(function(d){
            console.log(d)
            $scope.nograles_data = d.data.data
          })
      }

      $scope.search_link = function(data) {
        comment_keys = $scope.post.KeyWord.split(',')

        post = {
          PostID: $scope.post.PostID,
          CommentFilter: comment_keys,
          Token: $scope.topic.Token
        }



        DataService.post_analysis(post)
          .then(function(x){

            $scope.post_data = x.data
            console.log($scope.post_data)
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

      $scope.exportTable1 = function(event){
        var table = angular.element("#table_export1");

        table.tableExport({type:'csv',escape:'false'});
      }

      $scope.exportTable2 = function(event){
        var table = angular.element("#table_export2");

        table.tableExport({type:'csv',escape:'false'});
      }


}]);

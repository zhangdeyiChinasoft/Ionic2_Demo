/**
 * Created by newton on 16/10/31.
 */
angular.module('starter')
    .controller('transnewCtrl',function($scope,$stateParams,$timeout,$log,$resource,$ionicSlideBoxDelegate,ENV,MotoNews,MotoPrices){
      
      var tabid=$stateParams.tabpage;
       console.log(tabid);
      // if(tabid==2)
      // {
      //   $scope.showProduct = 2;
      // }

      $scope.productShow=tabid;

      $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          MotoNews.fetchMotoNews();

          MotoPrices.fetchMotoPrices();

          $scope.showSY = true;
          $scope.showNM = true;
          $scope.showSX = true;
          $scope.showSHX = true;



        }, 100);
      });

      MotoPrices.queryTop3ByLoc("SY");MotoPrices.queryTop3ByLoc("NM");
      MotoPrices.queryTop3ByLoc("SX");MotoPrices.queryTop3ByLoc("SHX");

      $scope.$on('starter.motonewsUpdated', function() {
        // $timeout(function() {
        $scope.motonews = MotoNews.getMotoNews();
        $scope.showloading=false
        $scope.$broadcast('scroll.refreshComplete');
        setTimeout(function(){
            $scope.$broadcast('scroll.infiniteScrollComplete')
        }, 1000 );
        $ionicSlideBoxDelegate.update(); 
      });

      $scope.$on('starter.motopricesUpdated', function() {
        // $timeout(function() {
        $scope.motoprices = MotoPrices.getMotoPrices();
        // $scope.$broadcast('scroll.refreshComplete');
        // }, 100);
      });

      $scope.$on('starter.motopricesSYUpdated', function() {
        $scope.motopricesSY = MotoPrices.getTop3ByLoc("SY");
      });
      $scope.$on('starter.motopricesNMUpdated', function() {
        $scope.motopricesNM = MotoPrices.getTop3ByLoc("NM");
      });
      $scope.$on('starter.motopricesSXUpdated', function() {
        $scope.motopricesSX = MotoPrices.getTop3ByLoc("SX");
      });
      $scope.$on('starter.motopricesSHXUpdated', function() {
        $scope.motopricesSHX = MotoPrices.getTop3ByLoc("SHX");
      });

      

    $scope.showProduct = function(id) {
        //return partner.show;
        $scope.productShow = id;
    };

    $scope.toggleqyhq = function(type) {
      if(type == "SY"){
            $scope.showSY = ! $scope.showSY;
      }else if(type == "NM"){
            $scope.showNM = ! $scope.showNM;
      }else if(type == "SX"){
            $scope.showSX = ! $scope.showSX;
      }else if(type == "SHX"){
            $scope.showSHX = ! $scope.showSHX;
      }
      
    };

    
    

    $scope.isqyhqShown = function (type) {
      if(type == "SY"){
            return $scope.showSY;
      }else if(type == "NM"){
            return $scope.showNM;
      }else if(type == "SX"){
            return $scope.showSX;
      }else if(type == "SHX"){
            return $scope.showSHX;
      }
    };

        //刷新数据
    $scope.doRefresh = function() {
        // qyhqEntity.queryQYHQSByLoc(type);
        MotoNews.fetchMotoNews();
        // $scope.$broadcast('scroll.refreshComplete');
        
    };

    $scope.loadMore = function() {
      MotoNews.increaseNewMotoprices();

        
    };

    //判断是否可以加载更多数据
    $scope.moreDataCanBeLoaded = function() {
        //console.log(PortalsFactory.hasNextPage());
        //console.log(123123);
        return MotoNews.hasNextPage();


    };
    


})

// http://www.xinmeiqiyun.com/api/news/qyhq?qyhqCode=QYHQShanxi&page=1&limit=10


.factory('MotoPrices', function($resource, $rootScope, ENV) {
    var APIUrl = ENV.api + '/news/qyhq?qyhqCode=QYHQShanxi&page=1&limit=10',
      
      motoprices = {},
      motopricesSY = {},
      motopricesNM = {},
      motopricesSX = {},
      motopricesSHX = {},
      currentTab = "all";



    var resource = $resource(APIUrl, {}, { 
      query: {
        method: 'get',
        params: {
        },
        timeout: 20000
      },
      getSY:{
          method: 'get',
          url: ENV.api + '/news/qyhq?qyhqCode=QYHQThreeWest&page=1&limit=3'
      },
      getNM:{
          method: 'get',
          url: ENV.api + '/news/qyhq?qyhqCode=QYHQNeimenggu&page=1&limit=3'
      },
      getSX:{
          method: 'get',
          url: ENV.api + '/news/qyhq?qyhqCode=QYHQShanxi&page=1&limit=3'
      },
      getSHX:{
          method: 'get',
          url: ENV.api + '/news/qyhq?qyhqCode=QYHQShaanxi&page=1&limit=3'
      }
    });


    return {
      fetchMotoPrices: function() {
        
        resource.query({}, function(r) {
          if (r.data.length <20) {
            
          }
          motoprices = r.data;
          // console.log(motoprices);
          
          $rootScope.$broadcast('starter.motopricesUpdated', motoprices);
          

        });

      },
      getMotoPrices: function() {
        return motoprices;
      },
      getTop3ByLoc: function(type) {
          if(type == "SY"){
            return motopricesSY;
          }else if(type == "NM"){
            return motopricesNM;
          }else if(type == "SX"){
            return motopricesSX;
          }else if( type == "SHX")
          {
            return motopricesSHX;
          }
      },
      queryTop3ByLoc:function(type) {
          if(type == "SY"){
            return resource.getSY(null,null,function(res) {
                motopricesSY = res.data;
                $rootScope.$broadcast('starter.motopricesSYUpdated', motopricesSY);
            });
          }else if(type == "NM"){
            return resource.getNM(null,null,function(res) {
                motopricesNM = res.data;
                $rootScope.$broadcast('starter.motopricesNMUpdated', motopricesNM);
            });
          }else if(type == "SX"){
            return resource.getSX(null,null,function(res) {
                motopricesSX = res.data;
                $rootScope.$broadcast('starter.motopricesSXUpdated', motopricesSX);
            });
          }else if( type == "SHX")
          {
            return resource.getSHX(null,null,function(res) {
                motopricesSHX = res.data;
                $rootScope.$broadcast('starter.motopricesSHXUpdated', motopricesSHX);
            });
          }
      }

    };


  })

.factory('MotoNews', function($resource, $rootScope, ENV) {
    var APIUrl = ENV.api + '/news/text',
      
      motonews = {},
      currentTab = "all";



    var resource = $resource(APIUrl, {}, { 
      query: {
        method: 'get',
        params:{
            category:'A008',
            page:'@page',
            limit:'20'
        },
        timeout: 20000
      }
    });


    return {
      fetchMotoNews: function() {
        var hasNextPage = true;   //是否有下一页
        resource.query({}, function(res) {
          if (res.data.length < 20) {
              hasNextPage = false;
          }
          motonews = {
            'nextPage': 2,
            'hasNextPage': hasNextPage,
            'data': res.data
          };
          
          $rootScope.$broadcast('starter.motonewsUpdated', motonews);
          

        });

      },
      getMotoNews: function() {
        return motonews;
      },
      increaseNewMotoprices: function(type) {
          var nextPage = motonews.nextPage;
          var hasNextPage = motonews.hasNextPage;
          var motonewsData = motonews.data;
          
          
          resource.query({
              page: nextPage

              }, function(res) {
              // console.log(r);
              nextPage++;
              // console.log(res);
              if (res.data.length < 20   ) {
                  hasNextPage = false;
                   console.log("come in res.data null");
              }
              motonewsData = motonewsData.concat(res.data);
              motonews = {
                  'nextPage': nextPage,
                  'hasNextPage': hasNextPage,
                  'data': motonewsData
              };

              $rootScope.$broadcast('starter.motonewsUpdated');

         });

          


      },
      hasNextPage: function() {
          //console.log(motoprices);
          if (motonews === undefined || motonews.hasNextPage == undefined) { 
              return false;
          }
           // console.log(motonews);
          return motonews.hasNextPage;
      }

    };


  })




.factory('Weathers', function($resource, $rootScope, ENV) {
    var APIUrl = ENV.api + '/weather/all',
      
      weathers = {},
      currentTab = "all";



    var resource = $resource(APIUrl, {}, {
      query1: {
        method: 'get',
        params: {
        },
        timeout: 20000
      }
    });


    return {
      fetchWeathers: function() {
        
        resource.query({}, function(r) {
          // console.log(r);
          //alert(123);
          //console.log(r);
          if (r.length > 0) {
            
          }
          weathers = r;
          // console.log(weathers);
          
          $rootScope.$broadcast('starter.weatherUpdated', weathers);
          

        });

      },
      getCurrentWeathers: function() {
        return weathers;
      }

    };


  })




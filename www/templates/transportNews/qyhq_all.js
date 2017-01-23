/**
 * Created by newton on 16/10/31.
 */
angular.module('starter')
    .controller('qyhqallCtrl',function($scope,$timeout,$log,$resource,$ionicScrollDelegate,ENV,$stateParams,qyhqEntity){

      $scope.showloading=true;
      $scope.type = "";

      $scope.$on('$ionicView.afterEnter', function() {
            var type =  $stateParams.type;
            $scope.type  = type;
            if(type == "SY"){
                  $scope.location = "三亚";
                  qyhqEntity.queryQYHQSByLoc("SY");
            }else if(type == "NM"){
                  $scope.location = "内蒙";
                  qyhqEntity.queryQYHQSByLoc("NM");
            }else if(type == "SX"){
                  $scope.location = "山西";
                  qyhqEntity.queryQYHQSByLoc("SX");
            }else if(type == "SHX"){
                  $scope.location = "陕西";
                  qyhqEntity.queryQYHQSByLoc("SHX");
            }


      });


      $scope.$on('starter.qyhqsSYUpdated', function() {
        $scope.motoprices = qyhqEntity.getMotoPrices();
        $scope.showloading=false
        $scope.$broadcast('scroll.refreshComplete');
        console.log("qyhqsSYUpdated");
      });
      $scope.$on('starter.qyhqsNMUpdated', function() {
        $scope.motoprices = qyhqEntity.getMotoPrices();
        $scope.showloading=false
        $scope.$broadcast('scroll.refreshComplete');
      });
      $scope.$on('starter.qyhqsSXUpdated', function() {
        $scope.motoprices = qyhqEntity.getMotoPrices();
        $scope.showloading=false
        $scope.$broadcast('scroll.refreshComplete');
      });
      $scope.$on('starter.qyhqsSHXUpdated', function() {
        $scope.motoprices = qyhqEntity.getMotoPrices();
        $scope.showloading=false
        $scope.$broadcast('scroll.refreshComplete');
      });


      //刷新数据
      $scope.doRefresh = function() {
          // qyhqEntity.queryQYHQSByLoc(type);
          qyhqEntity.queryQYHQSByLoc($scope.type);
          console.log(type);
      };

      $scope.loadMore = function() {
        setTimeout(function() {
          qyhqEntity.increaseNewMotoprices($scope.type);
          $scope.$broadcast('scroll.infiniteScrollComplete');

        }, 2000);

          
      };

      //判断是否可以加载更多数据
      $scope.moreDataCanBeLoaded = function() {
          //console.log(PortalsFactory.hasNextPage());
          return qyhqEntity.hasNextPage($scope.type);
      };


})



// http://www.xinmeiqiyun.com/api/news/qyhq?qyhqCode=QYHQShanxi&page=1&limit=10


.factory('qyhqEntity', function($resource, $rootScope, ENV) {
    var APIUrl = ENV.api + '/news/qyhq?qyhqCode=QYHQShanxi&page=1&limit=3',
      
      motoprices = {},
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
          url: ENV.api + '/news/qyhq',
          params:{
            qyhqCode:'QYHQThreeWest',
            page:'@page',
            limit:'20'
          }
      },
      getNM:{
          method: 'get',
          url: ENV.api + '/news/qyhq',
          params:{
            qyhqCode:'QYHQNeimenggu',
            page:'@page',
            limit:'20'
          }
      },
      getSX:{
          method: 'get',
          url: ENV.api + '/news/qyhq',
          params:{
            qyhqCode:'QYHQShanxi',
            page:'@page',
            limit:'20'
          }
      },
      getSHX:{
          method: 'get',
          url: ENV.api + '/news/qyhq',
          params:{
            qyhqCode:'QYHQShaanxi',
            page:'@page',
            limit:'20'
          }

      }
    });


    return {
      getMotoPrices: function() {
        return motoprices;
      },
      queryQYHQSByLoc:function(type) {
          var hasNextPage = true;   //是否有下一页

          if(type == "SY"){
            return resource.getSY(null,null,function(res) {
                if (res.data.length < 20) {
                    hasNextPage = false;
                }
                motoprices = {
                  'nextPage': 2,
                  'hasNextPage': hasNextPage,
                  'data': res.data
                };
                
                $rootScope.$broadcast('starter.qyhqsSYUpdated', motoprices);
                
            });
          }else if(type == "NM"){
            return resource.getNM(null,null,function(res) {
                if (res.data.length < 20) {
                    hasNextPage = false;
                }
                motoprices = {
                  'nextPage': 2,
                  'hasNextPage': hasNextPage,
                  'data': res.data
                };
                $rootScope.$broadcast('starter.qyhqsNMUpdated', motoprices);
            });
          }else if(type == "SX"){
            return resource.getSX(null,null,function(res) {
                if (res.data.length < 20) {
                    hasNextPage = false;
                }
                motoprices = {
                  'nextPage': 2,
                  'hasNextPage': hasNextPage,
                  'data': res.data
                };
                $rootScope.$broadcast('starter.qyhqsSXUpdated', motoprices);
            });
          }else if( type == "SHX")
          {
            return resource.getSHX(null,null,function(res) {
                if (res.data.length < 20) {
                    hasNextPage = false;
                }
                motoprices = {
                  'nextPage': 2,
                  'hasNextPage': hasNextPage,
                  'data': res.data
                };
                $rootScope.$broadcast('starter.qyhqsSHXUpdated', motoprices);
            });
          }
      },
      increaseNewMotoprices: function(type) {
          var nextPage = motoprices.nextPage;
          var hasNextPage = motoprices.hasNextPage;
          var motopricesData = motoprices.data;
          
          if(type == 'SY'){
              resource.getSY({
                  page: nextPage

                  }, function(res) {
                  // console.log(r);
                  nextPage++;
                  if (res.data.length < 20) {
                      hasNextPage = false;
                  }
                  motopricesData = motopricesData.concat(res.data);
                  motoprices = {
                      'nextPage': nextPage,
                      'hasNextPage': hasNextPage,
                      'data': motopricesData
                  };

                  $rootScope.$broadcast('starter.qyhqsSYUpdated');

             });

          }else if(type == 'NM'){
              resource.getNM({
                  page: nextPage

                  }, function(res) {
                  // console.log(r);
                  nextPage++;
                  if (res.data.length < 20) {
                      hasNextPage = false;
                  }
                  motopricesData = motopricesData.concat(res.data);
                  motoprices = {
                      'nextPage': nextPage,
                      'hasNextPage': hasNextPage,
                      'data': motopricesData
                  };

                  $rootScope.$broadcast('starter.qyhqsNMUpdated');

             });
          }else if(type == 'SX'){
              resource.getSX({
                  page: nextPage

                  }, function(res) {
                  // console.log(r);
                  nextPage++;
                  if (res.data.length < 20) {
                      hasNextPage = false;
                  }
                  motopricesData = motopricesData.concat(res.data);
                  motoprices = {
                      'nextPage': nextPage,
                      'hasNextPage': hasNextPage,
                      'data': motopricesData
                  };

                  $rootScope.$broadcast('starter.qyhqsSXUpdated');

             });
          }else if(type == 'SHX'){
              resource.getSHX({
                  page: nextPage

                  }, function(res) {
                  // console.log(r);
                  nextPage++;
                  if (res.data.length < 20) {
                      hasNextPage = false;
                  }
                  motopricesData = motopricesData.concat(res.data);
                  motoprices = {
                      'nextPage': nextPage,
                      'hasNextPage': hasNextPage,
                      'data': motopricesData
                  };

                  $rootScope.$broadcast('starter.qyhqsSHXUpdated');

             });
          }


      },
      hasNextPage: function(type) {
          //console.log(motoprices);
          if (motoprices === undefined) {
              return false;
          }
          // console.log(motoprices.hasNextPage);
          return motoprices.hasNextPage;
      }

    };


})



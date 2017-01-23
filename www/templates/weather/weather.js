/**
 * Created by newton on 16/10/31.
 */
angular.module('starter')
    .controller('WeatherCtrl',function($scope,$stateParams,$timeout,$log,$resource,$ionicSlideBoxDelegate,ENV,Weathers){



      $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          // MotoNews.fetchWeathers();

          // MotoPrices.fetchMotoPrices();
          Weathers.fetchWeathers();

          $scope.showSX_DT = true;
          $scope.showSX_SZ = true;
          $scope.showSX_QT = true;
          $scope.showSHX_YL = true;
          $scope.showSHX_QT = true;
          $scope.showNM_ERDS = true;
          $scope.showNM_QT = true;
          $scope.showHB_QT = true;




        }, 100);
      });

    

      $scope.$on('starter.weatherUpdated', function() {
        
        $scope.weathersSX = Weathers.getWeathersSX();
        $scope.weathersSHX = Weathers.getWeathersSHX();
        $scope.weathersNM = Weathers.getWeathersNM();
        $scope.weathersHB = Weathers.getWeathersHB();

        $scope.showloading=false
        // $scope.$broadcast('scroll.refreshComplete');
        // setTimeout(function(){
        //     $scope.$broadcast('scroll.infiniteScrollComplete')
        // }, 1000 );
        // $ionicSlideBoxDelegate.update(); 
      });

    //   $scope.$on('starter.motopricesUpdated', function() {
    //     // $timeout(function() {
    //     $scope.motoprices = MotoPrices.getMotoPrices();
    //     // $scope.$broadcast('scroll.refreshComplete');
    //     // }, 100);
    //   });

    //   $scope.$on('starter.motopricesSYUpdated', function() {
    //     $scope.motopricesSY = MotoPrices.getTop3ByLoc("SY");
    //   });
    //   $scope.$on('starter.motopricesNMUpdated', function() {
    //     $scope.motopricesNM = MotoPrices.getTop3ByLoc("NM");
    //   });
    //   $scope.$on('starter.motopricesSXUpdated', function() {
    //     $scope.motopricesSX = MotoPrices.getTop3ByLoc("SX");
    //   });
    //   $scope.$on('starter.motopricesSHXUpdated', function() {
    //     $scope.motopricesSHX = MotoPrices.getTop3ByLoc("SHX");
    //   });

      

    $scope.showProduct = function(id) {
        //return partner.show;
        $scope.productShow = id;
    };

    $scope.toggleqyhq = function(type) {
      if(type == "SX_DT"){
            $scope.showSX_DT = ! $scope.showSX_DT;
      }else if(type == "SX_SZ"){
            $scope.showSX_SZ = ! $scope.showSX_SZ;
      }else if(type == "SX_QT"){
            $scope.showSX_QT = ! $scope.showSX_QT;
      }else if(type == "SHX_YL"){
            $scope.showSHX_YL = ! $scope.showSHX_YL;
      }else if(type == "SHX_QT"){
            $scope.showSHX_QT = ! $scope.showSHX_QT;
      }else if(type == "NM_ERDS"){
            $scope.showNM_ERDS = ! $scope.showNM_ERDS;
      }else if(type == "NM_QT"){
            $scope.showNM_QT = ! $scope.showNM_QT;
      }else if(type == "HB_QT"){
            $scope.showHB_QT = ! $scope.showHB_QT;
      }
      
    };

    
    

    $scope.isqyhqShown = function (type) {
      if(type == "SX_DT"){
            return $scope.showSX_DT;
      }else if(type == "SX_SZ"){
            return  $scope.showSX_SZ;
      }else if(type == "SX_QT"){
            return  $scope.showSX_QT;
      }else if(type == "SHX_YL"){
            return  $scope.showSHX_YL;
      }else if(type == "SHX_QT"){
            return  $scope.showSHX_QT;
      }else if(type == "NM_ERDS"){
            return $scope.showNM_ERDS;
      }else if(type == "NM_QT"){
            return $scope.showNM_QT;
      }else if(type == "HB_QT"){
            return $scope.showHB_QT;
      }
    };


    $scope.getweatherIcon = function (type) {

      
// console.log(type);

      if(type == "多云"){
            return "tq-cloudy";
      }else if(type == "阴"){
            return "tq-cloudy";
      }else if(type == "晴天"){
            return "tq-sunny";
      }else if(type == "小雨"){
            return "tq-light-rain";
      }else if(type == "中雨"){
            return "tq-moderate-rain";
      }else if(type == "大雨"){
            return "tq-heavy-rain";
      }else if(type == "暴雨"){
            return "tq-torrential-rain";
      }else if(type == "阵雨"){
            return "tq-shower";
      }else if(type == "雷阵雨"){
            return "tq-thunder-shower";
      }else if(type == "雷电"){
            return "tq-lightning";
      }else if(type == "冰雹"){
            return "tq-hail";
      }else if(type == "轻雾"){
            return "tq-light-fog";
      }else if(type == "雾"){
            return "tq-fog";
      }else if(type == "浓雾"){
            return "tq-severe-fog";
      }else if(type == "霾"){
            return "tq-haze";
      }else if(type == "雨夹雪"){
            return "tq-sleet";
      }else if(type == "小雪"){
            return "tq-light-snow";
      }else if(type == "中雪"){
            return "tq-moderate-snow";
      }else if(type == "大雪"){
            return "tq-heavy-snow";
      }else if(type == "暴雪"){
            return "tq-torrential-snow";
      }else if(type == "冻雨"){
            return "tq-freezing-rain";
      }else if(type == "冻霜"){
            return "tq-frost ";
      }else if(type == "台风"){
            return "tq-tropical-cyclone";
      }else if(type == "浮沉"){
            return "tq-floating-dust";
      }else if(type == "扬沙"){
            return "tq-dust-blowing";
      }else if(type == "沙尘暴"){
            return "tq-sandstorm";
      }else if(type == "阵雪"){
            return "tq-snow-shower";
      }else{
        return "";
      }


    };


    $scope.getAirQuality = function (air) {
      if(air == "空气优"){
            return "kq-green";
      }else if(air == "空气良"){
            return "kq-green";
      }else if(air == "重度污染"){
            return "kq-red";
      }else if(air == "中度污染"){
            return "kq-red";
      }else if(air == "轻度污染"){
            return "kq-red";
      }
    }

    $scope.weatherFilterSX = function (weathers) {
        return weathers.CityOrder > 2;
    };

    $scope.weatherFilterSHX = function (weathers) {
        return weathers.CityOrder > 1;
    };

    // $scope.loadMore = function() {
    //   MotoNews.increaseNewMotoprices();

        
    // };

    // //判断是否可以加载更多数据
    // $scope.moreDataCanBeLoaded = function() {
    //     //console.log(PortalsFactory.hasNextPage());
    //     //console.log(123123);
    //     return MotoNews.hasNextPage();


    // };
    


})


.factory('Weathers', function($resource, $rootScope, ENV) {





    var APIUrl = ENV.api + '/weather/all',
      
      weathers = {},
      weathersSX = [],//山西
      weathersSHX = [],//陕西
      weathersNM = [],//内蒙
      weathersHB = [];//河北



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
      getWeathersSX: function() {
        weathers.forEach(function (element) {
            if(element.ProvinceName == "山西省")
            {
                weathersSX.push(element);  
                // console.log(element)
            }
        }, this);


        // var rest = groupByLoc(weathersSX);


// console.log(rest);




        return weathersSX;
         // console.log(weathersSX);
      },
      getWeathersSHX: function() {
        weathers.forEach(function (element) {
            if(element.ProvinceName == "陕西省")
            {
                weathersSHX.push(element);  
            }
        }, this);
        return weathersSHX;
      },
      getWeathersNM: function() {
        weathers.forEach(function (element) {
            if(element.ProvinceName == "内蒙古自治区")
            {
                weathersNM.push(element);  
            }
        }, this);
        return weathersNM;
      },
      getWeathersHB: function() {
        weathers.forEach(function (element) {
            if(element.ProvinceName == "河北省")
            {
                weathersHB.push(element);  
            }
        }, this);
        return weathersHB;
      }

    };


  })



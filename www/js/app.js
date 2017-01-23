// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngResource', 'starter.config', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


  //设置设备样式
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  //center:标题居中，left:标题居左，right:标题居右
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  //设置返回按钮属性
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  //设置设备控件
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text("");

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    // 爱车养护
    .state('tab.truckarticlelist', {
      url: '/truckarticlelist',
      views: {
        'tab-home': {
          templateUrl: 'templates/truckarticle/truckarticle-list.html',
          controller: 'truckarticleCtrl'
        }
      }
    })
    .state('tab.truckarticledetail', {
      url: '/truckarticledetail',
      views: {
        'tab-home': {
          templateUrl: 'templates/truckarticle/truckarticle-detail.html',
          controller: 'truckarticleCtrl'
        }
      },
      params: { //跳转设置参数 
        truckArticleId: null
      }
    })
    .state('tab.roadstatelist', {
      url: '/roadstatelist',
      views: {
        'tab-home': {
          templateUrl: 'templates/roadstate/roadstate-list.html',
          controller: 'roadstateCtrl'
        }
      }
    })
    .state('tab.roadstatedetail', {
      url: '/roadstatedetail',
      views: {
        'tab-home': {
          templateUrl: 'templates/roadstate/roadstate-detail.html',
          controller: 'roadstateCtrl'
        }
      },
      params: { //跳转设置参数 
        roadStateId: null
      }
    })
    // 汽运资讯
    .state('tab.transportnews', {
      url: '/transportNews/:tabpage',
      views: {
        'tab-home': {
          templateUrl: 'templates/transportNews/transportnews.html',
          controller: 'transnewCtrl'
        }
      }
    })
    .state('tab.qyhq_all', {
      url: '/transportNews/qyhq_all/:type',
      views: {
        'tab-home': {
          templateUrl: 'templates/transportNews/qyhq_all.html',
          controller: 'qyhqallCtrl'
        }
      }
    })
    .state('tab.zkxw_content', {
      url: '/transportNews/zkxw_content/:aid',
      views: {
        'tab-home': {
          templateUrl: 'templates/transportNews/zkxw_content.html',
          controller: 'zkxwContentCtrl'
        }
      }
    })
    // 客户服务
    .state('tab.cusSer', {
      url: '/cusSer',
      views: {
        'tab-cusSer': {
          templateUrl: 'templates/tab-cusSer.html',
          controller: 'CusSerCtrl'
        }
      }
    })
    // 我的
    .state('tab.noLoginInfo', {
      url: '/noLoginInfo',
      views: {
        'tab-user': {
          templateUrl: 'templates/user/user-info-no-login.html',
          controller: 'NoLoginInfoCtrl'
        }
      }
    })
    .state('tab.loginInfo', {
      url: '/loginInfo',
      views: {
        'tab-user': {
          templateUrl: 'templates/user/user-info-login.html',
          controller: 'LoginInfoCtrl'
        }
      }
    })
    // 主页
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    // 天气
    .state('tab.weather', {
      url: '/weather',
      views: {
        'tab-home': {
          templateUrl: 'templates/weather/weather.html',
          controller: 'WeatherCtrl'
        }
      }
    })
    // 煤炭货源
    .state('tab.huos', {
      url: '/huos',
      views: {
        'tab-home': {
          templateUrl: 'templates/huo/huo-list.html',
          controller: 'HuoCtrl'
        }
      }
    })
    .state('tab.huo-detail', {
      url: '/huoDetail',
      views: {
        'tab-home': {
          templateUrl: 'templates/huo/huo-detail.html',
          controller: 'HuoCtrl'
        }
      },
      params: { //跳转设置参数 
        huoId: null
      }
    })
    // 车源信息
    .state('tab.ches', {
      url: '/ches',
      views: {
        'tab-home': {
          templateUrl: 'templates/che/che-list.html',
          controller: 'CheCtrl'
        }
      }
    })
    .state('tab.che-detail', {
      url: '/cheDetail',
      views: {
        'tab-home': {
          templateUrl: 'templates/che/che-detail.html',
          controller: 'CheCtrl'
        }
      },

      params: { //跳转设置参数 
        cheId: null
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

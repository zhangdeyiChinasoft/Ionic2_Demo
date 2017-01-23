angular.module('starter')

  .controller('HuoCtrl', function ($scope, $ionicScrollDelegate, $timeout, $log, $resource, ENV, $state, $http, $filter, $stateParams, $window, $ionicHistory) {
    var currentPage = 1;
    var flagFirstEnter = true;
    var CuttentHuoId = null;
    $scope.moreLoading = false;
    $scope.loadedDetail = false;
    $scope.loadAddress = "";
    $scope.downloadAddress = "";
    $scope.huos = [];
    $scope.huoDetail = {};
    $scope.isShowSearch = false;
    $scope.hasNextPage = true;
    $scope.showloading = true;
    var searchLoadAddress = "";
    var searchDownloadAddress = "";
    $scope.message = "";
    $scope.getHuoList = function (loadAddress, downloadAddress) {
      $scope.moreLoading = true;
      var url = ENV.api + '/huo/list?page=' + currentPage + "&loadAddress=" + loadAddress + "&downloadAddress=" + downloadAddress;
      $http.get(url).success(function (data, status, headers, config) {
        data.data.forEach(function (e) {
          e.ValidStartDate = $filter('date')(e.ValidStartDate, 'yyyy-MM-dd');
          e.ValidEndDate = $filter('date')(e.ValidEndDate, 'yyyy-MM-dd');
        })
        if (currentPage == 1) {
          $scope.huos = data.data;
        } else {
          $scope.huos = $scope.huos.concat(data.data);
        }
        $scope.moreLoading = false;
        if (data.total <= currentPage * 15) {
          $scope.hasNextPage = false;
        }
        if (data.total == 0) {
          $scope.message = "没有找到相关数据";
        } else {
          $scope.message = "已加载全部数据";
        }
        $scope.showloading = false;
        $scope.$broadcast('scroll.refreshComplete');
        setTimeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete')
        }, 100);

      }).error(function (data, status, headers, config) {
        $scope.moreLoading = false;
      });
    }

    function getHuoDetail() {
      var url = ENV.api + "/huo/get/" + CuttentHuoId;
      $http.get(url).success(function (data, status, headers, config) {
        $scope.loadedDetail = true;
        data.ValidStartDate = $filter('date')(data.ValidStartDate, 'yyyy-MM-dd');
        data.ValidEndDate = $filter('date')(data.ValidEndDate, 'yyyy-MM-dd');
        data.HuoPrice = data.HuoPrice == "" ? "" : "¥" + data.HuoPrice;
        data.LoadPrice = data.LoadPrice == "" ? "" : "¥" + data.LoadPrice;
        $scope.huoDetail = data;
      }).error(function (data, status, headers, config) {
        $ionicHistory.goBack();
      });
    }

    $scope.$on('$ionicView.afterEnter', function () {
      searchLoadAddress = "";
      searchDownloadAddress = "";
      $scope.loadedDetail = false;
      if ($state.current.name == "tab.huos" && flagFirstEnter) {
        currentPage = 1;
        $scope.getHuoList("", "");
        flagFirstEnter = false;
      }
      if ($state.current.name == "tab.huo-detail") {
        if ($stateParams.huoId == null) {
          huoId = $window.localStorage.getItem("huoId");
          if (CuttentHuoId == null) {
            $ionicHistory.goBack();
          }
        }
        else {
          $window.localStorage.setItem("huoId", $stateParams.huoId);
          CuttentHuoId = $stateParams.huoId;
        }
        getHuoDetail();
      }
    });

    $scope.search = function (loadAddress, downloadAddress) {
      $scope.huos = [];
      searchLoadAddress = loadAddress;
      searchDownloadAddress = downloadAddress;
      $scope.hasNextPage = true;
      currentPage = 1;
      $scope.getHuoList(loadAddress, downloadAddress);
      $scope.isShowSearch = false;
      $ionicScrollDelegate.scrollTop();
    }

    $scope.loadMore = function () {
      currentPage++;
      $scope.getHuoList(searchLoadAddress, searchDownloadAddress);
    }

    $scope.togglePartner = function (partner) {
      if ($scope.isPartnerShown(partner)) {

      } else {
        $scope.shownPartner = partner;
      }
      $state.go('tab.huo-detail', { huoId: partner.Id });

    };

    $scope.isPartnerShown = function (partner) {
      //return partner.show;
      return $scope.shownPartner = partner;
    };

    $scope.closeSearch = function () {
      $scope.isShowSearch = false;
    };

    $scope.openSearch = function () {
      $scope.isShowSearch = true;
    };

    //刷新数据
    $scope.doRefresh = function (loadAddress, downloadAddress) {
      searchLoadAddress = "";
      searchDownloadAddress = "";
      $scope.hasNextPage = true;
      currentPage = 1;
      $scope.getHuoList(loadAddress, downloadAddress);
    };

    //判断是否可以加载更多数据
    $scope.moreDataCanBeLoaded = function () {
      return $scope.hasNextPage;
    };

  })
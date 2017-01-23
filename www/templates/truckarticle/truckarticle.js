angular.module('starter')
    .controller('truckarticleCtrl', function($scope, $timeout, $log, $state, $stateParams, $window, $resource, ENV, $http, $ionicHistory) {
        var currentPage = 1;
        var flagFirstEnter = true;
        var currentTruckArticleId = null;
        $scope.flagNoDate = false;
        $scope.moreLoading = false;
        $scope.loadedDetail = false;
        $scope.data = [];
        $scope.truckArticleDetail = {};

        function getTruckArtileList() {
            $scope.moreLoading = true;
            var url = ENV.api + '/truckarticles?page=' + currentPage + "&limit=6";
            $http.get(url).success(function(data, status, headers, config) {
                if ($scope.data.length == 0) {
                    $scope.data = data.data;
                } else {
                    data.data.forEach(function(element) {
                        $scope.data.push(element);
                        // $scope.data.splice(0, 0, element);
                    }, this);

                }
                $scope.moreLoading = false;
                // console.log("success");
                if (data.data.length == 0) {
                    $scope.flagNoDate = true;
                    // console.log("flagNoDate: " + $scope.flagNoDate);
                }
            }).error(function(data, status, headers, config) {
                //$scope.data = [];       
                $scope.moreLoading = false;
                // console.log("failure");
            });
        }

        function getTruckArtileDetail() {
            var url = ENV.api + "/news/text/" + currentTruckArticleId;
            $http.get(url).success(function(data, status, headers, config) {
                $scope.loadedDetail = true;
                var reg = new RegExp("/XMW/upload/", "gi");
                // alert(s.replace(reg,"爱")); 
                data.HtmlContent = data.HtmlContent.replace(reg, "http://www.xinmeiqiyun.com/XMW/upload/");
                $scope.truckArticleDetail = data;
            }).error(function(data, status, headers, config) {
                $ionicHistory.goBack();
            });
        }
        $scope.DateFormate = function(date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + +"-" + (date.getDate() + 1);
        }
        $scope.$on('$ionicView.afterEnter', function() {
            $scope.loadedDetail = false;
            if ($state.current.name == "tab.truckarticlelist" && flagFirstEnter) {
                getTruckArtileList();
                flagFirstEnter = false;
            }
            if ($state.current.name == "tab.truckarticledetail") {
                // console.log($stateParams.truckArticleId);
                if ($stateParams.truckArticleId == null) {
                    currentTruckArticleId = $window.localStorage.getItem("truckArticleId");
                    if (currentTruckArticleId == null) {
                        $ionicHistory.goBack();
                    }
                } else {
                    $window.localStorage.setItem("truckArticleId", $stateParams.truckArticleId);
                    currentTruckArticleId = $stateParams.truckArticleId;
                }
                getTruckArtileDetail();
            }
        });
        $scope.togglePartner = function(partner) {
            //partner.show = !partner.show;
            if ($scope.isPartnerShown(partner)) {
                // $scope.shownPartner = null;
            } else {
                $scope.shownPartner = partner;
            }
            $state.go('tab.truckarticledetail', { truckArticleId: partner.Id });

        };

        $scope.isPartnerShown = function(partner) {
            //return partner.show;
            return $scope.shownPartner === partner;
        };
        $scope.loadMore = function() {
            if (!$scope.flagNoDate) {
                $timeout(function() {
                    if (!$scope.moreLoading) {
                        currentPage++;
                        getTruckArtileList();
                    }
                }, 100);
            }
            // $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $scope.refresh = function() {
            if (!$scope.flagNoDate) {
                $timeout(function() {
                    if (!$scope.moreLoading) {
                        getTruckArtileList();
                    }
                }, 100);
            }
            $scope.$broadcast('scroll.refreshComplete');
            // $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
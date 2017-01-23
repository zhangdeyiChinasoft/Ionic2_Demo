angular.module('starter')
    .controller('roadstateCtrl', function ($scope, $timeout, $log, $state, $stateParams, $window, $resource, ENV, $http, $ionicHistory) {
        var currentPage = 1;
        var flagFirstEnter = true;
        var currentRoadStateId = null;
        $scope.flagNoDate = false;
        $scope.moreLoading = false;
        $scope.loadedDetail = false;
        $scope.data = [];
        $scope.roadStateDetail = {};
        $scope.petrolsColl = true;
        $scope.checkPointColl = true;
        $scope.tollBoothColl = true;
        $scope.servicesColl = true;

        function getRoadStateList() {
            $scope.moreLoading = true;
            var url = ENV.api + '/roadstate/list?page=' + currentPage + "&limit=6";
            $http.get(url).success(function (data, status, headers, config) {
                if ($scope.data.length == 0) {
                    $scope.data = data.data;
                } else {
                    data.data.forEach(function (element) {
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
            }).error(function (data, status, headers, config) {
                //$scope.data = [];       
                $scope.moreLoading = false;
                // console.log("failure");
            });
        }

        function getRoadStateDetail() {
            var url = ENV.api + "/roadstate/get/" + currentRoadStateId;
            $http.get(url).success(function (data, status, headers, config) {
                $scope.roadStateDetail = data;
            }).error(function (data, status, headers, config) {
                $ionicHistory.goBack();
            });
        }
        $scope.DateFormate = function (date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + +"-" + (date.getDate() + 1);
        }
        $scope.$on('$ionicView.afterEnter', function () {
            $scope.loadedDetail = false;
            if ($state.current.name == "tab.roadstatelist" && flagFirstEnter) {
                getRoadStateList();
                flagFirstEnter = false;
            }
            if ($state.current.name == "tab.roadstatedetail") {
                // console.log($stateParams.truckArticleId);
                $scope.petrolsColl = true;
                $scope.checkPointColl = true;
                $scope.tollBoothColl = true;
                $scope.servicesColl = true;
                if ($stateParams.roadStateId == null) {
                    currentRoadStateId = $window.localStorage.getItem("roadstateId");
                    if (currentRoadStateId == null) {
                        $ionicHistory.goBack();
                    }
                } else {
                    $window.localStorage.setItem("roadstateId", $stateParams.roadStateId);
                    currentRoadStateId = $stateParams.roadStateId;
                }
                getRoadStateDetail();
            }
        });
        $scope.CollPetrolPane = function () {
            $scope.petrolsColl = !$scope.petrolsColl;
        };
        $scope.CollCheckPointPane = function () {
            $scope.checkPointColl = !$scope.checkPointColl;
        };
        $scope.CollToolBoothPane = function () {
            $scope.tollBoothColl = !$scope.tollBoothColl;
        };
        $scope.CollServicePane = function () {
            $scope.servicesColl = !$scope.servicesColl;
        };
        $scope.togglePartner = function (partner) {
            //partner.show = !partner.show;
            if ($scope.isPartnerShown(partner)) {
                // $scope.shownPartner = null;
            } else {
                $scope.shownPartner = partner;
            }
            $state.go('tab.roadstatedetail', { roadStateId: partner.Id });

        };

        $scope.isPartnerShown = function (partner) {
            //return partner.show;
            return $scope.shownPartner === partner;
        };
        $scope.loadMore = function () {
            if (!$scope.flagNoDate) {
                $timeout(function () {
                    if (!$scope.moreLoading) {
                        currentPage++;
                        getRoadStateList();
                    }
                }, 100);
            }
            // $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $scope.refresh = function () {
            if (!$scope.flagNoDate) {
                $timeout(function () {
                    if (!$scope.moreLoading) {
                        getRoadStateList();
                    }
                }, 100);
            }
            $scope.$broadcast('scroll.refreshComplete');
            // $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
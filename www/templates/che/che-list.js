angular.module('starter')

    .controller('CheCtrl', function ($scope, $timeout, $log, $resource, ENV, $state, $http, $stateParams, $window, $ionicHistory, $ionicScrollDelegate, $filter,$ionicModal) {
        var currentPage = 1;
        var flagFirstEnter = true;
        var CuttentCheId = null;
        $scope.moreLoading = false;
        $scope.loadedDetail = false;
        $scope.cheType = "";
        $scope.baseAddress = "";
        $scope.oftenLine = "";
        $scope.ches = [];
        $scope.cheDetail = {};
        $scope.isShowSearch = false;
        $scope.hasNextPage = true;
        $scope.showloading = true;
        var searchCheType = "";
        var searchBaseAddress = "";
        var searchOftenLine = "";
        $scope.message = "";
        $scope.IsAuthed = true;
        $scope.register = "register";
        $scope.getCheList = function (cheType, baseAddress, oftenLine) {
            $scope.moreLoading = true;
            var url = ENV.api + '/che/list?page=' + currentPage + "&cheType=" + cheType + "&baseAddress=" + baseAddress + "&oftenLine=" + oftenLine;

            window.$http = $http
            $http.get(url
                // , {
                //     headers: {
                //         'Authorization': 'em1cgX+x/s4wLF86ITiyNYquK2hbIKqezKkPqd7n3skFJZKIm+p8ARlXS/elPEWWcWi067u4WHNuselEQGl/TlcaWWRqF+pQWThd7vY5f5c32TLBaeIKLlLwZJ68MvYrq7XnUcqxKdzK6TeH48N30FF0/l138yAs6RPjolPa+rYhxz72ez5H4lc4wDoIxzYp5OTs2WK9A82/KY0s5GswPo/VvBVXZO/uIfA7TPxoHIzcyYKqlrnyb/OgpQR4gh8r29SQeFgqsfNolTavaKlmCLRaFw+N/WN7lUNMZAVXmf0='
                //     }
                // }
            ).success(function (data, status, headers, config) {
                if (currentPage == 1) {
                    $scope.ches = data.data;
                } else {
                    $scope.ches = $scope.ches.concat(data.data);
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

        function getCheDetail() {
            var url = ENV.api + "/che/get/" + CuttentCheId;
            $http.get(url).success(function (data, status, headers, config) {
                $scope.loadedDetail = true;
                data.LastTime = new Date(data.LastTime).getFullYear() + "-" + (new Date(data.LastTime).getMonth() + 1) + "-" + new Date(data.LastTime).getDate();
                $scope.IsAuthed = data.IsAuthed;
                $scope.cheDetail = data;
            }).error(function (data, status, headers, config) {
                $ionicHistory.goBack();
            });
        }

        $scope.$on('$ionicView.afterEnter', function () {
            searchCheType = "";
            searchBaseAddress = "";
            searchOftenLine = "";
            $scope.loadedDetail = false;
            if ($state.current.name == "tab.ches" && flagFirstEnter) {
                currentPage = 1;
                $scope.getCheList("", "", "");
                flagFirstEnter = false;
            }
            if ($state.current.name == "tab.che-detail") {
                if ($stateParams.cheId == null) {
                    cheId = $window.localStorage.getItem("cheId");
                    if (CuttentCheId == null) {
                        $ionicHistory.goBack();
                    }
                }
                else {
                    $window.localStorage.setItem("cheId", $stateParams.cheId);
                    CuttentCheId = $stateParams.cheId;
                }
                getCheDetail();
            }
        });

        $scope.search = function (cheType, baseAddress, oftenLine) {
            $scope.ches = [];
            searchCheType = cheType;
            searchBaseAddress = baseAddress;
            searchOftenLine = oftenLine;
            $scope.hasNextPage = true;
            currentPage = 1;
            $scope.getCheList(cheType, baseAddress, oftenLine);
            $scope.isShowSearch = false;
            $ionicScrollDelegate.scrollTop();
        }

        $scope.loadMore = function () {
            currentPage++;
            $scope.getCheList(searchCheType, searchBaseAddress, searchOftenLine);
        }

        $scope.togglePartner = function (partner) {
            if ($scope.isPartnerShown(partner)) {

            } else {
                $scope.shownPartner = partner;
            }
            $state.go('tab.che-detail', { cheId: partner.Id });

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
        $scope.doRefresh = function (cheType, baseAddress, oftenLine) {
            searchCheType = "";
            searchBaseAddress = "";
            searchOftenLine = "";
            $scope.hasNextPage = true;
            currentPage = 1;
            $scope.getCheList(cheType, baseAddress, oftenLine);
        };

        //判断是否可以加载更多数据
        $scope.moreDataCanBeLoaded = function () {
            return $scope.hasNextPage;
        };

        $scope.modals = new Object();
        $scope.modalArray = new Array();
        $ionicModal.fromTemplateUrl('templates/user/user-login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modal.name = 'login';
            $scope.loginModal = modal;
            $scope.modals[modal.name] = modal;
            $scope.modalArray.push(modal);
        });
        $ionicModal.fromTemplateUrl('templates/user/user-register.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modal.name = 'register';
            $scope.registerModal = modal;
            $scope.modals[modal.name] = modal;
            $scope.modalArray.push(modal);

        });

        $scope.openModal = function(modalName) {
            for (m in $scope.modalArray) {
                if (modalName != $scope.modalArray[m].name) {
                    $scope.modalArray[m].hide();
                }
            }
            $scope.modals[modalName].show();
            $($scope.modals[modalName].el).find(".modal-wrapper").attr("style", "height : 100%");
        };
        $scope.closeModal = function(modalName) {
            $scope.modals[modalName].hide();
        };
    })
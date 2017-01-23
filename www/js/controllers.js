angular.module('starter.controllers', [])

.controller('CusSerCtrl', function($scope) {})

.controller('HomeCtrl', function($scope, $state, Hotnews) {

  $('#toutiao').vTicker({
    showItems: 1, //显示内容的条数。
    height: 20, //滚动内容的高度。
  });

  Hotnews.fetchMotoNewsTop5();

  $scope.$on('starter.motonewsTop5Updated', function() {
    $scope.hotnewstop5 = Hotnews.getMotoNewsTop5();
    console.log($scope.hotnewstop5);
  });

  $scope.gotoNews = function(id) {
    $state.go('tab.zkxw_content', { aid: id });
  }

  $scope.gonewslist = function() {
    $state.go('tab.transportnews', { tabpage: 2 });
  }

  $scope.gotoMedicalTolls = function() {
    alert("test12");
    $state.go("medicalTools", {});
  }
});

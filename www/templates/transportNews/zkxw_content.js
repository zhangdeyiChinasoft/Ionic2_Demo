angular.module('starter')
.controller('zkxwContentCtrl', function($scope,$stateParams,$timeout,$log,$resource,ENV,ZkxwContent){

        var aid=$stateParams.aid;
        
        ZkxwContent.getById(aid).$promise.then(function(r) {
          // var topic = Topic.getById(id);
          //console.log(r);
          $scope.finished = true;
          var reg= new RegExp("/XMW/upload/image","g"); 
          r.HtmlContent = r.HtmlContent.replace(reg,"http://www.xinmeiqiyun.com/XMW/upload/image")
          $scope.topic = r;
          console.log(r)





          // console.log(r.data);

        });
        // alert(aid);
        // $scope.$on('starter.ZkxwContentUpdated', function() {
        //     // $timeout(function() {
        //     $scope.contentData = NewsContentFactory.getPortal();
        //     $scope.showloading=false
        //     //   $scope.$broadcast('scroll.refreshComplete');
        //     // }, 100);
        // });


//         var device_id=Storage.get('device_id');
//         $scope.c_size_key=Storage.get('c_size');
//         //页面刚加载的时候判断字体
//         $scope.$on('$ionicView.beforeEnter', function() {
//             if(!$scope.c_size_key) {
//                 $scope.c_size='14';
//                 $scope.c_size_key='D';
//             }
//             if($scope.c_size_key=='A'){
//                 $scope.c_size='24';

//             }else if($scope.c_size_key=='B'){

//                 $scope.c_size='20';
//             }
//             else if($scope.c_size_key=='C'){

//                 $scope.c_size='16';
//             }else if($scope.c_size_key=='D'){

//                 $scope.c_size='14';
//             }

//         });



//         $scope.showloading=true;

//         var aid=$stateParams.aid;
//         NewsContentFactory.get(device_id,aid);
        // $scope.$on('starter.ZkxwContentUpdated', function() {
        //     // $timeout(function() {
        //     $scope.contentData = NewsContentFactory.getPortal();
        //     $scope.showloading=false
        //     //   $scope.$broadcast('scroll.refreshComplete');
        //     // }, 100);
        // });

//         $scope.newsContentCollect = function(article_id) {
//             // articleCollectionAdd
//             console.log(article_id);

//             if($scope.contentData['is_collect']==1){
//                 $scope.contentData['is_collect']=0;
//                 var s_title='取消收藏成功';
//             }else{
//                 $scope.contentData['is_collect']=1;
//                 var s_title='收藏成功';
//             }

//             $ionicLoading.show({
//                 noBackdrop: true,
//                 template: s_title,
//                 duration: 1500
//             });

//             NewsContentFactory.articleCollectionAdd(device_id,article_id);


//         };
//         $scope.newsContentShare = function() {
//             var title= $scope.contentData.title;
//             var content = $scope.contentData.title;
//             var url =ENV.siteUrl+ "index.php?m=Article&a=index&id="+$scope.contentData.id;
//             var imageurl = ENV.imgUrl+'icon.png';

//             window.plugins.Baidushare.bdshare(
//                 title,content,url,imageurl,function(success) {
//                     if(success == 1){
//                         // alert("分享成功！"); //做业务处理
//                     }else if(success == 2){
//                         // alert("未分享成功！");//做业务处理
//                     }else{
//                         //		alert("encode success: " + success);
//                     }
//                 }, function(fail) {
//                     // alert("encoding failed: " + fail);
//                 }
//             );

//         };



//         //设置字体
//         $scope.font_size = [
//             { text: "特大字号", value: "A" },
//             { text: "大字号", value: "B" },
//             { text: "中字号", value: "C" },
//             { text: "小字号", value: "D"}
//         ];  //初始化字号
//         if(!$scope.c_size_key) {
//             $scope.c_size_key='D';
//         }
//         $scope.d={
//             size:$scope.c_size_key
//         };
//         $scope.newsContentFontSize= function() {
//             // 调用$ionicPopup弹出定制弹出框
//             $ionicPopup.show({
//                 templateUrl: "templates/news/font-size.html",
//                 title: "正文字体",
//                 scope: $scope,
//                 buttons: [
//                     { text: "取消" },
//                     {
//                         text: "<b>确定</b>",
//                         type: "button-positive",
//                         onTap: function(e) {
//                             if($scope.d.size=='A'){
//                                 $scope.c_size='24';

//                             }else if($scope.d.size=='B'){

//                                 $scope.c_size='20';
//                             }
//                             else if($scope.d.size=='C'){

//                                 $scope.c_size='16';
//                             }else if($scope.d.size=='D'){

//                                 $scope.c_size='14';
//                             }else{

//                                 $scope.c_size='14';
//                             }
//                             Storage.set('c_size',$scope.d.size);
//                         }
//                     }
//                 ]

//             })
//         };






//         //点击左侧的按钮出现分享




//         //左右滑动

//         $scope.onSwipeLeft= function() {
// //435
//             $scope.showloading=true;
//             if($scope.contentData['next_id']!=''){

//                 NewsContentFactory.get(device_id,$scope.contentData['next_id']);
//             }else{

//                 $scope.showloading=false;
//             }


//         };

//         $scope.onSwipeRight= function() {

// //432
// //            $scope.showloading=true;
// //            if($scope.contentData['pre_id']!=''){
// //
// //                NewsContentFactory.get(device_id,$scope.contentData['pre_id']);
// //            }else{
// //
// //                $scope.showloading=false;
// //            }

//             $ionicNavBarDelegate.back();

//         };




})



.factory('ZkxwContent', function($resource, $rootScope,$q,ENV) {



    var APIUrl = ENV.api + '/news/text/:aid',

    // 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
    topic = '';
    // console.log(APIUrl);

    

    var resource = $resource(APIUrl, {aid: '@aid'}, {
        query: {
            method: 'get',
            params: {
            },
            timeout: 20000
        },
    });
    return {
        getById: function(id) {
            // console.log("id:" + id + "   topic:" + topic);
            if (topic !== undefined && topic.id === id) {
              var topicDefer = $q.defer();
              topicDefer.resolve({
                data: topic
              });

              return {
                $promise: topicDefer.promise
              };
            }
            return this.get(id);
        },
        get: function(aid) {
            return resource.query({
              aid: aid
            }, function(res) {
              console.log(res);
              topic = res;
            });

        }



    };
})

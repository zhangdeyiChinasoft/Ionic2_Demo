angular.module('starter.services', [])

.factory('Hotnews', function($resource, $rootScope, ENV) {
  var APIUrl = ENV.api + '/news/text/hot?categories=[\'A008\']&top=5',

    motonewsTop5 = {};
  console.log(APIUrl);


  var resource = $resource(APIUrl, {}, {
    query: {
      method: 'get',
      params: {},
      timeout: 20000
    },
    getTop5: {
      method: 'get',
      url: APIUrl,
      isArray: true
    }
  });


  return {
    fetchMotoNewsTop5: function() {
      return resource.getTop5({}, function(res) {
        console.log("come in");
        motonewsTop5 = res
        console.log(res.length);



        $rootScope.$broadcast('starter.motonewsTop5Updated', motonewsTop5);
      });
    },
    getMotoNewsTop5: function() {
      return motonewsTop5;
      console.log(motonewsTop5);
    }


  };



});

var loginUser = {
    userInfo: null,
    isLogin: false,
    // 登录方法
    Login: function(http, url) {
        var msg = "";
        loginUser.isLogin = false;
        if (loginUser && loginUser.userInfo && loginUser.userInfo.Code && loginUser.userInfo.Password) {
            http({
                method: 'POST',
                url: url,
                params: {
                    'Code': loginUser.userInfo.Code,
                    'Password': loginUser.userInfo.Password
                }

            }).success(function(data, status, headers, config) {
                if (status == 200) {
                    // 结构对照
                    userInfo = data.user;
                    loginUser.isLogin = true;
                } else {
                    msg = data.message;
                }
            }).error(function(data, status, headers, config) {
                msg = data.message;
            });
        }
        return msg;
    },
    // 验证是否登录
    CheackUserLogin: function(http, url) {
        loginUser.Login(http, url);
        return loginUser.isLogin;
    },
    // 用户登录
    UserLogin: function(code, passW) {
        loginUser.userInfo = loginUser.Construct();
        loginUser.userInfo.Code = code;
        loginUser.userInfo.Password = passW;
        return loginUser.Login(http, url);
    },
    // 用户修改密码
    ChangePas: function(passW) {
        var newUserInfo = loginUser.Copy();
        newUserInfo.Password = passW;
        var msg = loginUser.CheckValid(newUserInfo);
        if (msg == "OK") {
            // 修改密码
        }
        return msg;
    },
    // 用户注册
    Register: function(userInfo) {
        var msg = loginUser.CheckValid(userInfo);
        if (msg == "OK") {
            // 注册账号
        }
        return msg;
    },
    // 检查用户信息是否合规
    CheckValid: function(userInfo) {
        // 检查用户信息是否合法
        return msg;
    },
    // 用户信息对象构造器
    Construct: function() {
        return { Code: null, UserEmail: null, Mobile: null, Password: null, VerificationCode: null, Role: null };
    },
    // 用户对象复制
    Copy: function() {
        return {
            Code: loginUser.userInfo.Code,
            UserEmail: loginUser.userInfo.userEmail,
            Mobile: loginUser.userInfo.Mobile,
            Password: loginUser.userInfo.Password,
            VerificationCode: loginUser.userInfo.VerificationCode,
            Role: loginUser.userInfo.Role
        };
    }
};

angular.module('starter')
    .controller('LoginCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go('carousel');
        }
    })
    .controller('ChangePasCtrl', function($scope, $stateParams, Chats) {})
    .controller('UserCtrl', function($scope) {})
    .controller('RegisterCtrl', function($scope) {})
    .controller('NoLoginInfoCtrl', function($scope, $ionicModal) {
        $scope.passWs = $("input[type='Password']");
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
        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function(modalName) {
            $scope.modals[modalName].remove();
        });
        $scope.openEye = function(str) {
            var prent = $("." + str).attr("type", "text").parent()
            prent.find(".ion-eye-disabled").show();
            prent.find(".ion-eye").hide();
        }
        $scope.closeEye = function(str) {
            var prent = $("." + str).attr("type", "password").parent()
            prent.find(".ion-eye-disabled").hide();
            prent.find(".ion-eye").show();
        }
    })
    .controller('LoginInfoCtrl', function($scope) {})
    .controller('CheackLogin', function($scope, ENV, $http) {
        var url = ENV.api + "/user/login/";
        if (loginUser.CheackUserLogin($http, url)) {
            $scope.userInfoUrl = "#/tab/loginInfo";
        } else {
            $scope.userInfoUrl = "#/tab/noLoginInfo";
        }
    });
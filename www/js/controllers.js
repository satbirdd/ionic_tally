angular.module('starter.controllers', [])

.controller('ExpensesCtrl', function($scope, $http, $state, BACKEND_HOST, AuthService) {
  $scope.user = {};

  AuthService.loadCredential();

  if (!AuthService.isAuthenticated()) {
    $state.go('tab.account');
    return;
  }

  $scope.searchCategory = function () {
    var pinyin = $scope.user.pinyin;
    var request_url = BACKEND_HOST + 'categories.json?pinyin=' + pinyin;

    $http.get(request_url)
        .success(function (data, status, header, config) {
          $scope.categories = data;
        })
        .error(function (data, status, header, config) {
        })
  }
})

.controller('IncomesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http, AuthService, BACKEND_HOST) {
  $scope.user = {};

  $scope.sign_in = function () {
    var user = $scope.user;
    var email = user.email;
    var password = user.password;
    var sign_in_url = BACKEND_HOST + 'users/sign_in.json?&user[email]=' + email +
        '&user[password]=' + password;

    if (!email || !password) return;

    $http.post(sign_in_url)
      .success(function (data, status, header, config) {
        AuthService.storeToken(data.token, data.email);
      })
      .error(function (data, status, header, config) {
      })
  }
});

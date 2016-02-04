angular.module('starter.controllers')

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
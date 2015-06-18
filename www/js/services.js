angular.module('starter.services', [])

  .service('AuthService', ['$q', '$http', function($q, $http){
    var isAuthenticated = false;
    var LOCAL_TOKEN_KEY = 'authToken';
    var LOCAL_EMAIL_KEY = 'authemail';

    this.loadCredential = function () {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      var email = window.localStorage.getItem(LOCAL_EMAIL_KEY);

      if (token && email) {
        this.createCredential(token, email);
      }
    }

    this.storeToken = function (token, email) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      window.localStorage.setItem(LOCAL_EMAIL_KEY, email);
      this.createCredential(token, email);
    }

    this.createCredential = function (token, email) {
      isAuthenticated = true;
      $http.defaults.headers.common.Authorization = 'Token token="' + token + '", email="' + email + '"';
    }

    this.destroyCredential = function () {
      isAuthenticated = false;
      $http.defaults.headers.common['Authorization'] = '';
    }

    this.isAuthenticated = function () {
      return isAuthenticated;
    }
  }])
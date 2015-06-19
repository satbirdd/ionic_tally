// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('AUTH_EVENTS', {
  unAuthenticated: 'unAuthenticated',
  unAuthorized: 'unAunthorized'
})

.constant('BACKEND_HOST', "http://192.168.0.155:3000/")

.run(function($ionicPlatform, $http) {
  // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Each tab has its own nav history stack:

  .state('expenses', {
    url: '/expenses',
    templateUrl: 'templates/expenses.html',
    controller: 'ExpensesCtrl'
  })

  .state('expenses.payable', {
    url: '/payable',
    templateUrl: 'templates/expenses-payable.html',
    controller: 'ExpensesPayableCtrl'
  })

  .state('expenses.new', {
    url: '/:payableType/:payableId/new',
    templateUrl: 'templates/expenses-new.html',
    controller: 'ExpensesNewCtrl'
  })

  .state('incomes', {
    url: '/incomes',
    templateUrl: 'templates/incomes.html',
    controller: 'IncomesCtrl'
  })

  .state('incomes.payable', {
    url: '/payable',
    templateUrl: 'templates/incomes-payable.html',
    controller: 'IncomesPayableCtrl'
  })

  .state('incomes.new', {
    url: '/:payableType/:payableId/new',
    templateUrl: 'templates/incomes-new.html',
    controller: 'IncomesNewCtrl'
  })

  // .state('account', {
  //   url: '/account',
  //   views: {
  //     'account': {
  //       templateUrl: 'templates/account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/expenses/payable');

});

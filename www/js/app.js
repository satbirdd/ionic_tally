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

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.expenses', {
    url: '/expenses'
  })

  .state('tab.expenses.category', {
    url: '/category',
    views: {
      'tab-expenses-category': {
        templateUrl: 'templates/tab-expenses-category.html',
        controller: 'ExpensesCategoryCtl'
      }
    }
  })

  .state('tab.expenses.new', {
    url: '/new',
    views: {
      'tab-expenses-new': {
        tamplateUrl: 'templates/tab-expenses-new.html',
        controller: 'ExpensesNewCtrl'
      }
    }
  })

  .state('tab.incomes', {
      url: '/incomes',
      views: {
        'tab-incomes': {
          templateUrl: 'templates/tab-incomes.html',
          controller: 'IncomesCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/expenses');

});

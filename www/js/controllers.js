angular.module('starter.controllers', [])

.controller('appController', function($scope, $ionicSideMenuDelegate, AuthService) {
  $scope.menu = [
    {
      name: '收支一览',
      url: 'summary'
    },
    {
      name: '记支出',
      url: 'expenses.payable'
    },
    {
      name: '记收入',
      url: 'incomes.payable'
    },
    {
      name: '转账',
      url: 'expenses.payable'
    },
    {
      name: '花销明细',
      url: 'expenses.payable'
    },
    {
      name: '收入明细',
      url: 'expenses.payable'
    },
    {
      name: '收入分类管理',
      url: 'expenses.payable'
    },
    {
      name: '支出分类管理',
      url: 'expenses.payable'
    },
    {
      name: '收支账户管理',
      url: 'expenses.payable'
    }
  ]

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('SummaryCtrl', function ($scope, $http, $state, BACKEND_HOST, AuthService) {
  AuthService.loadCredential();

  if (!AuthService.isAuthenticated()) {
    $state.go('account');
    return;
  }

  $http.get(BACKEND_HOST + 'api/v1/summary.json')
      .success(function (data, status, header, config) {
        $scope.summary = data;
      })
      .error(function(data, status, header, config) {
        debugger;
      })
})


.controller('ExpensesCtrl', function ($scope, $http, $state, BACKEND_HOST, AuthService) {
  AuthService.loadCredential();

  if (!AuthService.isAuthenticated()) {
    $state.go('account');
    return;
  }
})

.controller('ExpensesPayableCtrl', function ($scope, $http, BACKEND_HOST) {
  $http.get(BACKEND_HOST + 'accounts.json?only_payable=true')
      .success(function (data, status, header, config) {
        $scope.payables = data;
      })
      .error(function (data, status, header, config) {
        debugger;
      })
})

.controller('ExpensesNewCtrl', function($scope, $http, $state, $stateParams, BACKEND_HOST) {
  var payableType = $stateParams.payableType;
  var payableId = $stateParams.payableId;

  $scope.expense = {validated: false};
  $scope.steps = ["category", "price"];
  $scope.step = $scope.steps[0];

  $scope.searchCategory = function () {
    var pinyin = $scope.expense.pinyin;
    var request_url = BACKEND_HOST + 'categories.json?pinyin=' + pinyin;

    $http.get(request_url)
        .success(function (data, status, header, config) {
          $scope.categories = data;
        })
        .error(function (data, status, header, config) {
        })
  }

  $scope.checkValidate = function () {
    if ($scope.expense.price > 0) {
      $scope.expense.validated = true;
    } else {
      $scope.expense.validated = false;
    }
  }

  $scope.choseCategory = function (categoryId) {
    var category = $scope.categories.filter(function (item) {
      return item.id == categoryId;
    })[0];
    var categoryName = category.name;

    $scope.expense.categoryName = category.name;
    $scope.expense.categoryId = category.id;

    $scope.expense.pinyin = categoryName;
    $scope.step = "price";
    $scope.categories = [];
  }

  $scope.saveExpense = function () {
    if (!$scope.expense.validated) return;

    var expense = $scope.expense;
    var expenseData = {
      money: expense.price,
      category_id: expense.categoryId,
      payable_type: payableType,
      payable_id: payableId,
      date: new Date()
    }

    $http.post(BACKEND_HOST + 'expenses.json', {expense: expenseData})
      .success(function (data, status, header, config) {
      })
      .error(function (data, status, header, config) {
      })
  }
})

.controller('IncomesCtrl', function($scope) {
})

.controller('IncomesPayableCtrl', function($scope, $http, BACKEND_HOST) {
  $http.get(BACKEND_HOST + 'accounts.json?only_payable=true')
      .success(function (data, status, header, config) {
        $scope.payables = data;
      })
      .error(function (data, status, header, config) {
        debugger;
      })
})

.controller('IncomesNewCtrl', function($scope, $http, $state, $stateParams, BACKEND_HOST) {
  var payableType = $stateParams.payableType;
  var payableId = $stateParams.payableId;

  $scope.income = {validated: false};
  $scope.steps = ["category", "price"];
  $scope.step = $scope.steps[0];

  $scope.searchCategory = function () {
    var pinyin = $scope.income.pinyin;
    var request_url = BACKEND_HOST + 'income_categories.json?pinyin=' + pinyin;

    $http.get(request_url)
        .success(function (data, status, header, config) {
          $scope.categories = data;
        })
        .error(function (data, status, header, config) {
        })
  }

  $scope.checkValidate = function () {
    if ($scope.income.price > 0) {
      $scope.income.validated = true;
    } else {
      $scope.income.validated = false;
    }
  }

  $scope.choseCategory = function (categoryId) {
    var category = $scope.categories.filter(function (item) {
      return item.id == categoryId;
    })[0];
    var categoryName = category.name;

    $scope.income.categoryName = category.name;
    $scope.income.categoryId = category.id;

    $scope.income.pinyin = categoryName;
    $scope.step = "price";
    $scope.categories = [];
  }

  $scope.saveIncome = function () {
    if (!$scope.income.validated) return;

    var income = $scope.income;
    var incomeData = {
      money: income.price,
      income_category_id: income.categoryId,
      payable_type: payableType,
      payable_id: payableId,
      date: new Date()
    }

    $http.post(BACKEND_HOST + 'incomes.json', {income: incomeData})
      .success(function (data, status, header, config) {
      })
      .error(function (data, status, header, config) {
      })
  }
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

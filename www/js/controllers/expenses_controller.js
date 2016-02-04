angular.module('starter.controllers')
    .controller('ExpensesCtrl', ExpenseController);

function ExpenseController($scope, $http, $state, BACKEND_HOST, AuthService) {
    $scope.expense = {validated: false};
    $scope.steps = ["payable", "category", "price"];
    $scope.step = $scope.steps[0];

    AuthService.loadCredential();

    if (!AuthService.isAuthenticated()) {
        $state.go('tab.account');
        return;
    }

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

    $scope.isValidate = function () {
        return $scope.expense.price > 0
               && $scope.expense.categoryId
               && $scope.expense.payableId
               && $scope.expense.payableType;
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

    $scope.chosePayable = function (payableId) {
        var payable = $scope.payables.filter(function (item) {
            return item.id == payableId;
        })[0];
        var payableName = payable.name;

        $scope.expense.payableName = payable.name;
        $scope.expense.payableId = payable.id;
        $scope.expense.payableType = payable.class_name;

        $scope.step = "category";
    }

    $scope.saveExpense = function () {
        if (!$scope.expense.validated) return;

        var expense = $scope.expense;
        var expenseData = {
            payable_type: expense.payableType,
            payable_id: expense.payableId,
            money: expense.price,
            category_id: expense.categoryId,
            date: new Date()
        }

        $http.post(BACKEND_HOST + 'expenses.json', {expense: expenseData})
            .success(function (data, status, header, config) {
            })
            .error(function (data, status, header, config) {
            })
    }

    $scope.loadPayables = function () {
        $http.get(BACKEND_HOST + 'payables.json')
            .success(function (data, status, header, config) {
                // todo
                $scope.payables = data;
            })
            .error(function (data, status, header, config) {
                // todo
            })
    }
    $scope.loadPayables();
}
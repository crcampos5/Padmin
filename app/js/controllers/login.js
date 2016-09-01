app.controller('LoginCtrl', function($scope, ajax_servi, $location, $window, $rootScope, $http, CONFIG) {

    $rootScope.user = $window.sessionStorage.getItem('username');

    $scope.login = function(datauser) {

        $scope.submitted = true;
        $scope.error = {};
        var url = CONFIG.API+"user/login";
        $http.post(url, datauser).success(
                function(data) {
                    $window.sessionStorage.setItem('username', data.username);
                    $window.sessionStorage.setItem('access_token', data.access_token);
                    $window.sessionStorage.setItem('role', data.role);
                    $rootScope.loggedInUser = true;
                    $rootScope.username = $window.sessionStorage.getItem('username');
                    $location.path('/compras').replace();
                }).error(
                function(data) {
                    $rootScope.alerts.push({type: 'danger', msg: data.message});
                    angular.forEach(data, function(error) {

                        $scope.error[error.field] = error.message;
                    });
                }
        );
    };


});



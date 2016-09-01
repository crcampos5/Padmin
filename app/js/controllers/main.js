app.controller('MainCtrl', function($scope, authService, ajax_servi, $location, $window, $rootScope, $http, CONFIG) {

    $rootScope.loggedInUser = Boolean($window.sessionStorage.getItem('access_token'));
    $rootScope.username = $window.sessionStorage.getItem('username');
    $rootScope.alerts = [];


    $scope.loggedIn = function() {
        return Boolean($window.sessionStorage.getItem('access_token'));

    };
    $scope.access = function(roles) {
        var hasAccess = false;
        for (var i in roles) {
            if (authService.userHasRole(roles[i])) {
                hasAccess = true;
                break;
            }
        }
        return hasAccess;
    };
    $scope.toggle = function() {
        if ($(window).width() <= 768)
            $("#wrapper").toggleClass("toggled");
    }

    $scope.logout = function() {
        $scope.submitted = true;

        var us = {username: $window.sessionStorage.getItem('username')};
        var url = CONFIG.API + "user/logout";
        $http.post(url, us).success(
                function(data) {
                    $window.sessionStorage.clear();
                    $rootScope.loggedInUser = false;
                    $rootScope.user = null;
                    $location.path('/login').replace();

                }).error(
                function(data) {
                    $rootScope.alerts.push({type: 'danger', msg: data.message});
                }
        );
    };

    $scope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };

    $scope.openbar = function() {
       // e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    };


});




app.factory('authInterceptor', function($q, $window, $location, $rootScope) {
    return {
        request: function(config) {
            if ($window.sessionStorage.getItem('access_token')) {
                //HttpBearerAuth
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.getItem('access_token');
            }
            return config;
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $window.sessionStorage.clear();
                $rootScope.loggedInUser = false;
                $rootScope.user = null;
                $location.path('/login').replace();
            }
            /*else {
                // console.log(rejection);
                $rootScope.alerts.push({type: 'danger', msg: rejection.status + ': Ha ocurrido un error '});
            }*/
            /*if (rejection.status === 401)*/
                return $q.reject(rejection);
        }
    };
});



'use strict';

/**
 * @ngdoc overview
 * @name padminApp
 * @description
 * # padminApp
 *
 * Main module of the application.
 */
var app = angular.module('padminApp', ['ngRoute', 'chart.js', 'ui.bootstrap']);

app.constant('CONFIG', {
    //"http://localhost/restpadmin/web/"
    //"http://www.pistoriapanaderia.com/restpadmin/web/"
    API: "http://localhost/restpadmin/web/",
});

app.constant('ROLES', {
    INVITADO: {
        ROL: 0,
        PATH: "/"
    },
    USER: {
        ROL: 10,
        PATH: "/compras"
    },
    ADMIN: {
        ROL: 20,
        PATH: "/operacion"
    },
    SUPERADMIN: {
        ROL: 30,
        PATH: "/user"
    }
});

app.config(function($routeProvider, $httpProvider, CONFIG, ROLES) {
    $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                //controller: 'MainCtrl'
                data: {
                    authorized: [ROLES.INVITADO.ROL, ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/operacion', {
                templateUrl: 'views/operacion.html',
                controller: 'OperacionCtrl',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/ventas', {
                templateUrl: 'views/ventas.html',
                controller: 'VentasCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/compras', {
                templateUrl: 'views/compra.html',
                controller: 'CompraCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/proveedores', {
                templateUrl: 'views/proveedor.html',
                controller: 'ProveedorCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
             .when('/estadisticas', {
                templateUrl: 'views/estadisticas.html',
                controller: 'EstadisticaCtrl',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/produccion', {
                templateUrl: 'views/produccion.html',
                controller: 'ProduccionCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/empleado', {
                templateUrl: 'views/empleados.html',
                controller: 'EmpleadoCtrl',
                data: {
                    authorized: [ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                //controller: 'EmpleadoCtrl'
                data: {
                    authorized: [ROLES.INVITADO.ROL]
                }
            })
            .when('/usuarios', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl',
                data: {
                    authorized: [ROLES.SUPERADMIN.ROL]
                }
            })
            .when('/autherror', {
                templateUrl: 'views/autherror.html',
                data: {
                    authorized: [ROLES.INVITADO.ROL, ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            })
            .otherwise({
                redirectTo: '/',
                data: {
                    authorized: [ROLES.INVITADO.ROL, ROLES.USER.ROL, ROLES.ADMIN.ROL, ROLES.SUPERADMIN.ROL]
                }
            });
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $window, CONFIG, ROLES, authService) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        //$rootScope.loggedInUser == null
        if (!Boolean($window.sessionStorage.getItem('access_token'))) {
            // no logged user, redirect to /login
            if (next.templateUrl === "views/login.html" || $location.path() === "/") {

            } else {
                $location.path("/login");
            }
        }

        /* if (!authService.isUrlAccessibleForUser(next.originalPath))
         $location.path('/authError');*/

        if (!authService.isAccessible(next.data.authorized))
            $location.path('/autherror');
    });
});
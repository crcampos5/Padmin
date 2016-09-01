app.factory('authService', function($window, $http, CONFIG, ROLES) {

    var userRole = ROLES; // obtained from backend
    var ROL_USUARIO = ROLES.INVITADO.ROL;
    var userRoleRouteMap = {
        'ROLE_ADMIN': ['/dashboard', '/about-us', '/authError'],
        'ROLE_USER': ['/usersettings', '/usersettings/personal', '/authError']
    };

    return {
        userHasRole: function(role) {
            if (Boolean($window.sessionStorage.getItem('role'))) {
                ROL_USUARIO = $window.sessionStorage.getItem('role');
            } else
                ROL_USUARIO = ROLES.INVITADO.ROL;
              
            if (role == ROL_USUARIO)
                return true;
            else
                return false;
        },
        isUrlAccessibleForUser: function(route) {
            for (var i = 0; i < userRole.length; i++) {
                var role = userRole[i];
                var validUrlsForRole = userRoleRouteMap[role];
                if (validUrlsForRole) {
                    for (var j = 0; j < validUrlsForRole.length; j++) {
                        if (validUrlsForRole[j] == route)
                            return true;
                    }
                }
            }
            return false;
        },
        isAccessible: function(roles) {

            if (Boolean($window.sessionStorage.getItem('role'))) {
                ROL_USUARIO = $window.sessionStorage.getItem('role');
            } else
                ROL_USUARIO = ROLES.INVITADO.ROL;


            if (roles) {
                for (var i in roles)
                    if (roles[i] == ROL_USUARIO)
                        return true;
            } else
                return false;

        }
    };
});



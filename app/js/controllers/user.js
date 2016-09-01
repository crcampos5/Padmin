app.controller('UserCtrl', function($scope, $http, ajax_servi) {
    $scope.usuarios = null;
    $scope.ban_editar = false;
    $scope.user_edi = null;
    $scope.del_user = null;

    var call_listuser = function(data) {
        $scope.usuarios = data;
    }
    ajax_servi.userList(call_listuser);
    
     $scope.addUser = function(user) {
        var p = angular.copy(user);
        p.created = stringFechaSql(new Date());
        var call = function(data) {
            $scope.usuarios.push(data);
            delete user.username;
            delete user.password;
            delete user.email;
            delete user.role;
        }
        ajax_servi.userCreate(p, call);
        // $scope.proveedores.push(p);
    }
     $scope.updateUser = function(user_edi) {
        var call = function(data) {
            for (var i in $scope.usuarios) {
                if ($scope.usuarios[i].id == user_edi.id)
                    $scope.usuarios[i] = user_edi;
            }
            $scope.ban_editar = false;
        }
        ajax_servi.userUpdate(user_edi.id, user_edi, call);

    }
    $scope.deleteUser = function(id) {
        var call = function(data) {
            for (var i in $scope.usuarios) {
                if ($scope.usuarios[i].id == id) {
                    $scope.usuarios.splice(i, 1);
                }
            }
             //$scope.array_operaciones = pagination2($scope.operaciones, 10, 1);
        }
        ajax_servi.userDelete(id, call);
    }

     $scope.eliminarUsuario= function(p) {
        $scope.del_user = p;
    }
     $scope.editarUsuario = function(user) {
        $scope.user_edi = angular.copy(user);
        $scope.ban_editar = true;
    }
     $scope.cancelarUpdate = function() {
        $scope.user_edi = null;
        $scope.ban_editar = false;
    }
});



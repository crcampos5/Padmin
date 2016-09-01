app.controller('ProveedorCtrl', function($scope, $http, ajax_servi, proveedor) {

    $scope.proveedores = null;
    $scope.ban_editar = false;
    $scope.ban_success = false;
    $scope.prove_edi = null;
    $scope.page = 1;
    $scope.del_pro = null;
    $scope.dataproveedor = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    }
    $scope.alert = {
        class: '',
        mensaje: '',
        show: false
    }

    var callsuccess = function(data, status, headers, config) {
        $scope.proveedores = data;
        $scope.dataproveedor.data = data;
        setHeaders($scope.dataproveedor,headers);
    }
    var callerror = function(data, status, headers, config) {

    }

    proveedor.list(callsuccess, callerror);

    $scope.addProveedor = function(prove) {
        var p = angular.copy(prove);
        $scope.alert.show = false;
        $("#alert").removeAttr('style');
        var callsuccess = function(data) {
            animationAlert('success', 'Guardado con exito!');
            var callsuccess = function(data, status, headers, config) {
                $scope.proveedores = data;
                $scope.dataproveedor.data = data;
                setHeaders($scope.dataproveedor,headers);
                $scope.page = 1;
            }
            var callerror = function(data, status, headers, config) {
            }
            proveedor.list(callsuccess, callerror);
            delete prove.nombre;
            delete prove.telefono;
            delete prove.categoria;
        }
        var callerro = function(data, status, headers, config) {
            var men = data.message || 'Ha ocurrido un error';
            animationAlert('error', men);
        }
        proveedor.create(p, callsuccess, callerro);
    };
    $scope.editarProveedor = function(prove) {
        $scope.alert.show = false;
        $("#alert").removeAttr('style');
        $scope.prove_edi = angular.copy(prove);
        $scope.ban_editar = true;
    }
    $scope.updateProveedor = function(prove_edi) {
        $scope.alert.show = false;
        $("#alert").removeAttr('style');
        var callsuccess = function(data) {
            animationAlert('success', 'Actualizado con exito!');
            var callsuccess = function(data, status, headers, config) {
                $scope.proveedores = data;
                $scope.dataproveedor.data = data;
                setHeaders($scope.dataproveedor,headers);
                $scope.page = 1;
            }
            var callerror = function(data, status, headers, config) {
            }
            proveedor.list(callsuccess, callerror);
            $scope.prove_edi = null;
            $scope.ban_editar = false;
        }
        var callerro = function(data, status, headers, config) {
            var men = data.message || 'Ha ocurrido un error';
            animationAlert('error', men);
        }
        proveedor.update(prove_edi.id, prove_edi, callsuccess, callerro);
    }

    $scope.cancelarUpdate = function() {
        $scope.prove_edi = null;
        $scope.ban_editar = false;
    }
    $scope.eliminarProveedor = function(p) {
         $scope.alert.show = false;
        $("#alert").removeAttr('style');
        $scope.del_pro = p;
    }

    $scope.deleteProveedor = function(id) {
        $scope.alert.show = false;
        $("#alert").removeAttr('style');
        var callsuccess = function(data) {
            animationAlert('success', 'Eliminado con exito!');
            var callsuccess = function(data, status, headers, config) {
                $scope.proveedores = data;
                $scope.dataproveedor.data = data;
                setHeaders($scope.dataproveedor,headers);
                $scope.page = 1;
            }
            var callerror = function(data, status, headers, config) {
            }
            proveedor.list(callsuccess, callerror);
        }
        var callerro = function(data, status, headers, config) {
            var men = data.message || 'Ha ocurrido un error';
            animationAlert('error', men);
        }
        proveedor.delete(id, callsuccess, callerro);
    }

    $scope.next = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.proveedores = data;
            $scope.dataproveedor.data = data;
            setHeaders($scope.dataproveedor,headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page += 1;
        proveedor.list(callsuccess, callerror, $scope.page);
    }
    $scope.previous = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.proveedores = data;
            $scope.dataproveedor.data = data;
            setHeaders($scope.dataproveedor,headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page -= 1;
        proveedor.list(callsuccess, callerror, $scope.page);
    }
    var animationAlert = function(clase, mensaje) {
        $scope.alert.class = clase;
        if (clase === 'error')
            $scope.alert.mensaje = mensaje || 'Ha ocurrido un error';
        if (clase === 'success')
            $scope.alert.mensaje = mensaje || 'Peticion exitosa!';
        $scope.alert.show = true;
        setTimeout(function() {
            $("#alert").fadeOut(1500);
        }, 3000);
    }

   

});

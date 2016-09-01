
/**
 * @ngdoc function
 * @name padminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the padminApp
 */

app.controller('VentasCtrl', function($scope, venta, compra, vale, operacion) {

    $scope.dt = new Date();
    $scope.page = 1;
    var init_dia = function() {
        $scope.venta_dia = {
            id: null,
            fecha: $scope.dt,
            total_gastos: 0,
            base: 600000,
            efectivo_recogido: 0,
            efectivo_restante: 0,
            venta: 0,
            gastos_personal: 0
        };
    };
    init_dia();
    $scope.dataprovider = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    };

    $scope.ban_editar_base = false;
    $scope.ban_efec_reco = false;
    $scope.isDisabled = false;

    var initCompra = function() {
        var f = stringFechaSql($scope.dt, true);
        var successCallback = function(data, status, headers, config) {
            $scope.venta_dia.total_gastos = sumTotalCompras(formatDate(data));
            $scope.actualizarVenta();
        }
        var errorCallback = function(data, status, headers, config) {
            console.log('Errrorrr')
        }
        compra.byDate(f, successCallback, errorCallback);
    }
    initCompra();
    var initVale = function() {
        var f = stringFechaSql($scope.dt, true);
        var successCallback = function(data, status, headers, config) {
            $scope.venta_dia.gastos_personal = sumTotalCompras(data);
            $scope.actualizarVenta();
        }
        var errorCallback = function(data, status, headers, config) {
            console.log('Errrorrr')
        }
        vale.byDate(f, successCallback, errorCallback);
    }
    initVale();
    var initVenta = function() {
        var successCallbackVenta = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDateVentas(data);
            setHeaders($scope.dataprovider, headers);
            existeVenta($scope.dt);
        }
        venta.list(successCallbackVenta);
    }
    initVenta();

    $scope.editarBase = function() {
        $scope.ban_editar_base = true;
    }
    $scope.cancelarUpdateBase = function() {
        $scope.ban_editar_base = false;
    }
    $scope.updateBase = function() {
        $scope.ban_editar_base = false;
        $scope.actualizarVenta();
    }
    $scope.editarEfecReco = function() {
        $scope.ban_efec_reco = true;
    }
    $scope.cancelarUpdateEfec = function() {
        $scope.ban_efec_reco = false;
    }
    $scope.updateEfecReco = function() {
        $scope.ban_efec_reco = false
        $scope.actualizarVenta();
    }

    $scope.actualizarVentas = function() {
        var f = stringFechaSql($scope.dt, true);

        var successCallback = function(data, status, headers, config) {
            if (data.length != 0) {
                $scope.isDisabled = true;
                var v = formatDateVentas(data)[0];
                $scope.venta_dia = {
                    id: v.id,
                    fecha: v.fecha,
                    total_gastos: v.total_gastos,
                    base: v.base,
                    efectivo_recogido: v.efectivo_recogido,
                    efectivo_restante: v.efectivo_restante,
                    venta: v.venta,
                    gastos_personal: v.venta - v.total_gastos - v.efectivo_restante,
                }
            } else {
                 $scope.isDisabled = false;
                var f = $scope.dt.toJSON().substring(0, 8) + $scope.dt.getDate();
                var g = new Date().toJSON().substring(0, 8) + new Date().getDate();
                if (f == g) {
                    init_dia();
                    initCompra();
                    initVale();
                    console.log("aqui1");
                } else {
                    init_dia();
                    initCompra();
                    initVale();
                    console.log("aqui2");
                }

            }
        }
        var errorCallback = function(data, status, headers, config) {
            console.log('Errrorrr')
        }
        venta.byDate(f, successCallback, errorCallback);

        /* if ($scope.dt.getDate() != new Date().getDate() || $scope.dt.getMonth() != new Date().getMonth())
         $scope.isDisabled = true;
         else
         $scope.isDisabled = false;*/
    }

    $scope.createVenta = function() {
        var ope = {};
        ope.fecha = stringFechaSql($scope.dt);
        if ($scope.venta_dia.efectivo_restante >= 0) {
            ope.operacion = "Efectivo recogido " + $scope.dt.toDateString();
            ope.ingreso = $scope.venta_dia.efectivo_restante;
        } else {
            ope.operacion = "Complete para base " + $scope.dt.toDateString();
            ope.egreso = -$scope.venta_dia.efectivo_restante;
        }
        $scope.venta_dia.fecha = stringFechaSql($scope.dt);
        $("#alert").removeAttr('style');
        var successCallback = function(data, status, headers, config) {
            $scope.isDisabled = true;
            $scope.alert = {class: 'success', show: true, mensaje: 'El dia se ha cerrado'};
            setTimeout(function() {
                $("#alert").fadeOut(1500);
            }, 3000);
            initVenta();
        }
        var errorCallback = function(data, status, headers, config) {
            if (status == 500) {
                $scope.isDisabled = true;
                console.log('este dato ya existe');
            }
        }
        var val = {
            venta: $scope.venta_dia,
            operacion: ope
        }
        venta.create(val, successCallback, errorCallback);
    }
    $scope.deleteVenta = function(v) {
        $("#alert").removeAttr('style');

        var successCallback = function(data, status, headers, config) {
            existeVenta($scope.dt);
            $scope.alert = {class: 'success', show: true, mensaje: 'Venta eliminada'};
            setTimeout(function() {
                $("#alert").fadeOut(1500);
            }, 3000);
            initVenta();
            var succes = function(data, status, headers, config) {
                console.log("Se ha eliminado operacion");
            }
            var error = function(data, status, headers, config) {
                console.log("error al eliminar operacion");
            }
            operacion.delete(v.operacion_id, succes, error);
        }
        var errorCallback = function(data, status, headers, config) {
            if (status == 500) {
                $scope.isDisabled = true;
                console.log('este dato ya existe');
            }
        }
        venta.delete(v.id, successCallback, errorCallback);
    }

    $scope.actualizarVenta = function() {
        $scope.venta_dia.efectivo_restante = $scope.venta_dia.efectivo_recogido - $scope.venta_dia.base;
        $scope.venta_dia.venta = $scope.venta_dia.total_gastos + $scope.venta_dia.gastos_personal + $scope.venta_dia.efectivo_restante;
    }

    $scope.next = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDateVentas(data);
            setHeaders($scope.dataprovider, headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page += 1;
        venta.list(callsuccess, callerror, $scope.page);
    }
    $scope.previous = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDateVentas(data);
            setHeaders($scope.dataproider, headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page -= 1;
        venta.list(callsuccess, callerror, $scope.page);
    }

//fechas
    $scope.today = function() {
        $scope.dt = new Date();
    };
    //$scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date(92, 4, 12);
        $scope.maxDate = $scope.maxDate ? null : new Date(new Date().getFullYear() + 1, 4, 12);
    };
    $scope.toggleMin();
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    //endfechas
    var existeVenta = function(fecha) {
        var f = stringFechaSql($scope.dt, true);
        var successCallback = function(data, status, headers, config) {
            if (data.length == 0)
                $scope.isDisabled = false;
            else
                $scope.isDisabled = true;
        }
        var errorCallback = function(data, status, headers, config) {
            console.log('Errrorrr')
        }
        venta.byDate(f, successCallback, errorCallback);
    }
});


app.controller('OperacionCtrl', function($scope, operacion) {

    $scope.dataprovider = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    }
    $scope.page = 1;
    $scope.ban_editar = false;
    $scope.ope_edi = null;
    $scope.searchText = "";
    $scope.saldo = 0;
    $scope.del_ope = null;

    var init = function() {
        var successCallback = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDate(data);
            setHeaders($scope.dataprovider, headers);
            saldoActual();
        }
        operacion.list(successCallback, null, 1);
    }
    init();

    $scope.addOperacion = function(ope) {
        var p = angular.copy(ope);
        p.fecha = stringFechaSql(new Date());
        $("#alert").removeAttr('style');
        var call = function(data) {
            $scope.alert = {class: 'success', show: true, mensaje: 'Operacion agregada'};
            setTimeout(function() {
                $("#alert").fadeOut(1500);
            }, 3000);
            init();
        }
        operacion.create(p, call);
        delete ope.operacion;
        delete ope.ingreso;
        delete ope.egreso;
    };
    $scope.editarOperacion = function(ope) {
        $scope.ope_edi = angular.copy(ope);
        $scope.ban_editar = true;
    }
    $scope.updateOperacion = function(ope_edi) {
        $("#alert").removeAttr('style');
        var call = function(data) {
            $scope.alert = {class: 'success', show: true, mensaje: 'Operacion actualizada'};
            setTimeout(function() {
                $("#alert").fadeOut(1500);
            }, 3000);
            init();
            $scope.ban_editar = false;
        }
        operacion.update(ope_edi.id, ope_edi, call);

    }
    $scope.cancelarUpdate = function() {
        $scope.ope_edi = null;
        $scope.ban_editar = false;
    }
    $scope.eliminarOperacion = function(p) {
        $scope.del_ope = p;
    }
    $scope.deleteOperacion = function(id) {
        $("#alert").removeAttr('style');
        var call = function(data) {
            $scope.alert = {class: 'success', show: true, mensaje: 'Operacion eliminada'};
            setTimeout(function() {
                $("#alert").fadeOut(1500);
            }, 3000);
            init();
        }
        operacion.delete(id, call);
    }
    $scope.next = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDate(data);
            setHeaders($scope.dataprovider, headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page += 1;
        if ($scope.searchText == '')
            operacion.list(callsuccess, callerror, $scope.page);
        else
            operacion.search($scope.searchText, callsuccess, $scope.page);
    }
    $scope.previous = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.dataprovider.data = formatDate(data);
            setHeaders($scope.dataprovider, headers);
        }
        var callerror = function(data, status, headers, config) {

        }
        $scope.page -= 1;
        if ($scope.searchText == "")
            operacion.list(callsuccess, callerror, $scope.page);
        else
            operacion.search($scope.searchText, callsuccess, $scope.page);
    }
    $scope.filterTable = function(atribute) {
        var call = function(data) {
            $scope.dataprovider.data = formatDate(data);
        }
        $scope.page = 1;
        operacion.search($scope.searchText, call);
    }

    var saldoActual = function() {
        var call = function(data) {
            $scope.saldo = parseInt(data);
        }
        operacion.saldo(call);
    }

});
var pagination2 = function(array, count, pag) {
    var start = count * pag - count;
    var end = count * pag;
    return array.slice(start, end);
}
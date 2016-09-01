
/**
 * @ngdoc function
 * @name padminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the padminApp
 */

app.controller('CompraCtrl', function($scope, ajax_servi, proveedor, compra) {


    $scope.dt = new Date();
    $scope.total = 0;
    $scope.compraslist = null;
    $scope.proveedores = null;
    $scope.isCollapsed = true;
    $scope.isDisabled = false;
    $scope.alerts = [];
    $scope.provers = [];
    $scope.alert = {
        class: '',
        mensaje: '', //bdn107259
        show: false
    }

    var init = function() {
        var f = stringFechaSql($scope.dt, true);
        var successCallback = function(data, status, headers, config) {
            $scope.compraslist = formatDate(data);
            sumTotal();
        }
        var errorCallback = function(data, status, headers, config) {
            console.log('Errrorrr')
        }
        compra.byDate(f, successCallback, errorCallback);
    }
    init();

    var call_listprove = function(data) {
        $scope.proveedores = data;
    }
    proveedor.list(call_listprove, null, 1, 1000);

    $scope.asignarProveedor = function(id) {
        for (var i in $scope.proveedores) {
            if ($scope.proveedores[i].id == id)
                return $scope.proveedores[i].nombre

        }
    }


    $scope.addCompra = function(cost) {
        var c = angular.copy(cost);
        if (c) {
            if (isProveedor(c.name, $scope.provers)) {
                $scope.alert.show = false;
                $("#alert").removeAttr('style');
                var id = getIdProve(c.name, $scope.provers)
                delete c.name;
                c.proveedor_id = id;
                c.fecha = stringFechaSql(new Date());
                var successCallback = function(data, status, headers, config) {
                    animationAlert('success', 'Guardado con exito!');
                    $scope.compraslist.push(formatFecha(data));
                    sumTotal();
                }
                var errorCallback = function(data, status, headers, config) {
                    if (status == 422)
                        animationAlert('error', data[0].message);
                }
                compra.create(c, successCallback, errorCallback);
                delete cost.name;
                delete cost.valor;
            } else {
                $scope.addAlert("danger", "El Proveedor no existe");
            }
        } else
            $scope.addAlert("danger", "Los campos no pueden ser vacios");

    };

    $scope.deleteCompra = function(costo) {
        if (isEqualsDate(costo.fecha, new Date())) {
            var id = costo.id;
            var call = function() {
                for (var i in $scope.compraslist)
                    if ($scope.compraslist[i].id == id)
                        $scope.compraslist.splice(i, 1); 
                sumTotal();
            }
            compra.delete(id, call);
           
        } else {
            $scope.addAlert("danger", "No se puede eliminar este registro");
        }
    };

    $scope.actualizarCompras = function() {
        init();
        sumTotal();
        if ($scope.dt.getDate() != new Date().getDate() || $scope.dt.getMonth() != new Date().getMonth())
            $scope.isDisabled = true;
        else
            $scope.isDisabled = false;

    }

    $scope.searchProveedor = function(val) {
        var callsuccess = function(response) {
            $scope.provers = response.data;
            return response.data;
        }
        return  proveedor.search(val, callsuccess);
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
    //alerts
    $scope.addAlert = function(tipo, men) {
        $scope.alerts.push({type: tipo, msg: men});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    //functions of help 
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
    var sumTotal = function() {
        $scope.total = 0;
        for (var i in $scope.compraslist) {
            $scope.total += parseInt($scope.compraslist[i].valor);
        }
    };

});


var stringFechaSql = function(fecha, incompleto) {
    var c = incompleto || false;
    var d = fecha;
    var anio = d.getFullYear();
    var mes = d.getMonth() + 1;
    if (mes < 10)
        mes = '0' + mes;
    var dia = d.getDate();
    if (dia < 10)
        dia = '0' + dia;
    if (!c)
        return anio + "-" + mes + "-" + dia + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    else
        return anio + "-" + mes + "-" + dia;
}



var formatFecha = function(obj) {

    var t = obj.fecha.split(/[- :]/);
    var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    obj.fecha = d;

    return obj;
};


var getIdProve = function(name, proveedores) {
    for (var i in proveedores) {
        if (proveedores[i].nombre == name)
            return proveedores[i].id;
    }
    return null;
};
var isProveedor = function(name, proveedores) {
    for (var i in proveedores) {
        if (proveedores[i].nombre == name)
            return true;
    }
    return false;
};
var isEqualsDate = function(dt1, dt2) {
    if (dt1.getFullYear() == dt2.getFullYear()
            && dt1.getMonth() == dt2.getMonth()
            && dt1.getDate() == dt2.getDate()) {
        return true;
    } else
        return false;
}
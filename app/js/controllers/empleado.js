app.controller('EmpleadoCtrl', function($scope, $http, ajax_servi, empleado, vale) {

    $scope.list_empleados = [];
    $scope.dataempleado = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    };
    $scope.ban_add_em = true;
    $scope.ban_edit_em = true;
    $scope.ban_ver_em = true;
    $scope.alerts = [];
    $scope.empleado = null;
    $scope.del_em = null;
    $scope.emp = null;
    $scope.page_em = 1;


    $scope.vales = [];
    $scope.datavale = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    };
    $scope.list_vales = [];
    $scope.array_vales = [];
    $scope.ban_form_vales = true;
    $scope.ban_editar_vales = false;
    $scope.s_id = null;
    $scope.page_vale = 1;
    $scope.vale = {};
    $scope.b = {};
    $scope.total_vales = 0;

    var init_empleados = function() {
        var successCallback = function(data, status, headers, config) {
            $scope.dataempleado.data = data;
            setHeaders($scope.dataempleado, headers);
             $scope.page_em = 1;
        };
        empleado.list(successCallback);
    };
    init_empleados();
    var init_em = function() {
        var successCallback = function(data, status, headers, config) {
            $scope.list_empleados = data;
        };
        empleado.list(successCallback, null, null, 50);
    };
    init_em();

    var addEmpleado = function(em) {
        var e = angular.copy(em);
        if (e.sub_transporte == true)
            e.sub_transporte = 1;
        else if (e.sub_transporte == false)
            e.sub_transporte = 0;
        $("#successadd").removeAttr('style');
        var call = function(data) {
            init_empleados();
            $scope.success_add = {class: 'success', show: true, mensaje: 'El empleado se ha guardado con exito'};
            setTimeout(function() {
                $("#successadd").fadeOut(1500);
            }, 3000);
            $scope.ban_add_em = !$scope.ban_add_em;
            reset(em);
        };
        empleado.create(e, call);
    };

    $scope.eliminarEmpleado = function(em) {
        $scope.del_em = em;
    };
    $scope.deleteEmpleado = function(id) {
        $("#successadd").removeAttr('style');
        var call = function(data) {
            init_empleados();
            $scope.success_add = {class: 'success', show: true, mensaje: 'El empleado se ha eliminado con exito'};
            setTimeout(function() {
                $("#successadd").fadeOut(1500);
            }, 3000);
        };
        empleado.delete(id, call);
    };
    $scope.updateEmpleado = function(em) {
        if (em) {
            var e = angular.copy(em);
            if (e.sub_transporte == true)
                e.sub_transporte = 1;
            else if (e.sub_transporte == false)
                e.sub_transporte = 0;
            $("#successadd").removeAttr('style');
            var call = function(data) {
                init_empleados();
                $scope.success_add = {class: 'success', show: true, mensaje: 'El empleado se ha actualizado con exito'};
                setTimeout(function() {
                    $("#successadd").fadeOut(1500);
                }, 3000);
                $scope.ban_edit_em = !$scope.ban_edit_em;
                reset(em);
            };
            empleado.update(em.id, e, call);
        }
    };
    $scope.verEmpleado = function(em) {
        $scope.ban_ver_em = !$scope.ban_ver_em;
        $scope.empleado = em;
    };
    $scope.editarEmpleado = function(em) {
        $scope.ban_edit_em = !$scope.ban_edit_em;
        em.num_identificacion = parseInt(em.num_identificacion);
        $scope.emp = em;

    };
    $scope.cancelarUpdEmpleado = function(em) {
        $scope.ban_edit_em = !$scope.ban_edit_em;
        $scope.emp = null;
    };
    $scope.validateEmpleado = function(em) {
        if (em) {
            var e = angular.copy(em);
            var call = function(data) {
                $scope.validate = {};
                if (data.num_identificacion)
                    $scope.validate.nit = {class: 'error', show: true, mensaje: data.num_identificacion[0]};
                if (data.nombre)
                    $scope.validate.nombre = {class: 'error', show: true, mensaje: data.nombre[0]};
                if (data.apellido)
                    $scope.validate.apellido = {class: 'error', show: true, mensaje: data.apellido[0]};
                if (data.direccion)
                    $scope.validate.direccion = {class: 'error', show: true, mensaje: data.direccion[0]};
                if (data.telefono)
                    $scope.validate.telefono = {class: 'error', show: true, mensaje: data.telefono[0]};
                if (data.salario)
                    $scope.validate.salario = {class: 'error', show: true, mensaje: data.salario[0]};
                if (data == 'true') {
                    addEmpleado(em);
                }
            }
            empleado.validate(e, call);
        } else
            $scope.addAlert("danger", "El formulario esta vacio")
    };
    $scope.open_add = function() {
        $scope.ban_add_em = !$scope.ban_add_em;
    };
    var reset = function(e) {
        delete e.num_identificacion;
        delete e.nombre;
        delete e.apellido;
        delete e.edad;
        delete e.fecha_nacimineto;
        delete e.direccion;
        delete e.telefono;
        delete e.cargo;
        delete e.salario;
        delete e.sub_transporte;
        delete e.fecha_ingreso;
        delete e.fecha_retiro;
        delete e.estado;
    };
    //vales---------------------------------------------------------------------
    var init_vale = function() {
        var successCallback = function(data, status, headers, config) {
            $scope.datavale.data = formatDate(data);
            setHeaders($scope.datavale, headers);
             $scope.page_vale = 1;
        };
        vale.list(successCallback);
    };
    init_vale();
    $scope.guardarVale = function(val) {
        $scope.ban_form_vales = true;
        var v = angular.copy(val);
        if (v) {
            if (v.valor) {
                v.fecha = stringFechaSql(new Date());
                if (!v.concepto)
                    v.concepto = "";
                $("#alert-vale").removeAttr('style');
                var call = function(data) {
                    $scope.vale = null;
                    $scope.alert_vale = {class: 'success', show: true, mensaje: 'El vale se ha guardado con exito'};
                    setTimeout(function() {
                        $("#alert-vale").fadeOut(1500);
                    }, 3000);
                    init_vale();
                    delete val.empleado_id;
                    delete val.concepto;
                    delete val.valor;
                }
                vale.create(v, call);
            }
        }
    }
    $scope.editarVale = function(v) {
        $scope.ban_form_vales = false;
        $scope.ban_editar_vales = true;
        v.valor = parseInt(v.valor);
        $scope.vale = v;
    }
    $scope.eliminarVale = function(em) {
        $scope.del_vale = em;
    }
    $scope.deleteVale = function(id) {
        $("#alert-vale").removeAttr('style');
        var call = function(data) {
            $scope.vale = null;
            $scope.alert_vale = {class: 'success', show: true, mensaje: 'El vale se ha eliminado con exito'};
            setTimeout(function() {
                $("#alert-vale").fadeOut(1500);
            }, 3000);
            init_vale();
        }
        vale.delete(id, call);
    }
    $scope.updateVale = function(v) {
        $("#alert-vale").removeAttr('style');
        var call = function(data) {
            $scope.vale = null;
            $scope.alert_vale = {class: 'success', show: true, mensaje: 'El vale se ha actualizado con exito'};
            setTimeout(function() {
                $("#alert-vale").fadeOut(1500);
            }, 3000);
            init_vale();
            $scope.ban_editar_vales = !$scope.ban_editar_vales;
            $scope.ban_form_vales = true;
            delete v.empleado_id;
            delete v.concepto;
            delete v.valor;
        }
        vale.update(v.id, v, call);
    }
    $scope.cancelarVale = function() {
        $scope.ban_editar_vales = !$scope.ban_editar_vales;
        $scope.ban_form_vales = true;
        $scope.vale = null;
    }
    $scope.agregarVale = function() {
        //$scope.ban_editar_vales = !$scope.ban_editar_vales;
        $scope.ban_form_vales = !$scope.ban_form_vales;
    }
    $scope.asignarEmpleado = function(id) {
        for (var i in $scope.list_empleados) {
            if ($scope.list_empleados[i].id == id)
                return $scope.list_empleados[i].nombre + " " + $scope.list_empleados[i].apellido;
        }
    }
    $scope.searchVales = function() {
        var s = {};
        var successCallback = function(data, status, headers, config) {
            $scope.datavale.data = formatDate(data);
            setHeaders($scope.datavale, headers);
            $scope.total_vales = total_vale();
        }
        if ($scope.b.fecha_start && $scope.b.fecha_end) {
            s.f_start = stringFechaSql($scope.b.fecha_start, true);
            s.f_end = stringFechaSql($scope.b.fecha_end, true);
        }
        s.id = $scope.b.id;
        vale.search(s, successCallback);
    }
    $scope.next_vale = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.datavale.data = formatDate(data);
            setHeaders($scope.datavale, headers);
        }
        $scope.page_vale += 1;
        vale.list(callsuccess, null, $scope.page_vale);
    }
    $scope.previous_vale = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.datavale.data = formatDate(data);
            setHeaders($scope.datavale, headers);
        };
        $scope.page_vale -= 1;
        vale.list(callsuccess, null, $scope.page_vale);
    };
      $scope.next_em = function() {
        var callsuccess = function(data, status, headers, config) {
            $scope.dataempleado.data = data;
            setHeaders($scope.dataempleado, headers);
        };
        $scope.page_em += 1;
        empleado.list(callsuccess, null, $scope.page_em);
    };
    $scope.previous_em = function() {
        var callsuccess = function(data, status, headers, config) {
              $scope.dataempleado.data = data;
            setHeaders($scope.dataempleado, headers);
        };
        $scope.page_em -= 1;
        empleado.list(callsuccess, null, $scope.page_em);
    };
    $scope.reset = function() {
        delete $scope.b.fecha_start;
        delete $scope.b.fecha_end;
        delete $scope.b.id;
        $scope.total_vales = 0;
        init_vale();
    };
     $scope.imprimir = function() {
         var ficha = document.getElementById("imprimeme");
	  var ventimp = window.open(' ', 'popimpr');
	  ventimp.document.write( ficha.innerHTML );
	  ventimp.document.close();
	  ventimp.print( );
	  ventimp.close();
    };
    //-------------------------------------------

    //alerts
    $scope.addAlert = function(tipo, men) {
        $scope.alerts.push({type: tipo, msg: men});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    //fechas-------------------------------------------
    //fechas
    $scope.today = function() {
        //$scope.dt = new Date();
        $scope.fecha_start = new Date();
        $scope.fecha_end = new Date();
    };
    $scope.today();

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
    $scope.open2 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    //endfechas

    var total_vale = function() {
        var t = 0;
        angular.forEach($scope.datavale.data, function(item) {
            t += parseInt(item.valor);
        });
        return t;
    };
});
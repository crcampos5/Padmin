app.controller('NominaCtrl', function($scope, nomina, empleado, vale, operacion) {

    $scope.list_empleados = [];
    $scope.list_vales = [];
    $scope.empleado = {};
    $scope.resumen = {};
    $scope.list_nomina = [];
    $scope.nomina = [];
    $scope.array_nomina = [];
    $scope.pags = 1;
    $scope.mes = "Mayo";
    $scope.quincena = "1";
    $scope.alerts = [];
    $scope.c_pag = 10;

    $scope.b_subtrans = true;
    $scope.b_salud = true;
    $scope.b_pension = true;

    $scope.ban_edi_deduc = false;
    $scope.ban_cal = true;

    $scope.config = {
        calcular_sobre: "Minimo",
        dias_liquidados: 15
    };
    $scope.datos_basicos = {
        anio: 2015,
        salario_minimo: 644350,
        subsidio_transporte: 74000,
        salud: {
            empleado: 0.04,
            empresa: 0.085
        },
        pension: {
            empleado: 0.04,
            empresa: 0.12
        },
        arp: 0.00348,
        prima: 0.0833,
        cesantias: 0.0833,
        int_cesantias: 0.01,
        vacaciones: 0.0417
    };

    var call_listempleados = function(data) {
        $scope.list_empleados = data;
        $scope.empleado.em = $scope.list_empleados[0];
        $scope.empleado = calcular_pago($scope.empleado);
    };
    empleado.list(call_listempleados, null, 1, 50);

    var init_nomina = function() {
        var call = function(data) {
            $scope.list_nomina = data;
            calcular_resumen();
        };
        nomina.listByQuincena(call, null, $scope.mes, $scope.quincena);
    };
    init_nomina();

    $scope.selecteEmpleado = function(em) {
        $scope.empleado.em = em;
        $scope.empleado = calcular_pago($scope.empleado);
    };
    $scope.agregarNomina = function() {
        var isRepeat = false;
        angular.forEach($scope.list_nomina, function(item) {
            if (item != null) {
                if (item.mes == $scope.mes &&
                        item.quincena == $scope.quincena &&
                        item.empleado_id == $scope.empleado.em.id) {
                    isRepeat = true;
                }
            }
        });
        if (!isRepeat) {
            $scope.empleado.dias_liquidados = $scope.config.dias_liquidados;
            var em = crearNomina($scope.empleado);
            $("#alert-nomina").removeAttr('style');
            var call = function(data) {
                $scope.alert_nomina = {class: 'success', show: true, mensaje: 'Agregado a la nomina'};
                setTimeout(function() {
                    $("#alert-nomina").fadeOut(1500);
                }, 3000);
                init_nomina();
            };
            nomina.create(em, call);
        } else {
            $scope.addAlert("danger", "Este empleado ya esta dentro de la nomina para esta quincena");
        }
    };
    $scope.updateShowNomina = function() {
        init_nomina();
    };

    $scope.pagarEmpleado = function(p) {
        console.log(p);
        p.fecha_pago = stringFechaSql(new Date());
        $("#alert-nomina").removeAttr('style');
        var call = function(data) {
            var em = null;
            angular.forEach($scope.list_empleados, function(item) {
                if (item != null)
                    if (item.id == data.empleado_id)
                        em = item;
            });
            var ope = {};
            ope.fecha = stringFechaSql(new Date());
            ope.operacion = "Pago sueldo " + em.nombre + " " +
                    em.apellido + ", " + data.mes + ", Quincena : " + data.quincena;
            ope.egreso = data.neto_pagado;
            var callope = function() {
                $scope.alert_nomina = {class: 'success', show: true, mensaje: 'Empleado pagado'};
                setTimeout(function() {
                    $("#alert-nomina").fadeOut(1500);
                }, 3000);
            }
            operacion.create(ope, callope);
            init_nomina();
        };
        nomina.update(p.id, p, call);

    };
    $scope.updateVales = function() {
        var s = {};
        var successCallback = function(data, status, headers, config) {
            $scope.empleado.total_vales = 0;
            if (data.length != 0)
                for (var i in data)
                    $scope.empleado.total_vales += parseInt(data[i].valor);
            $scope.empleado = calcular_pago($scope.empleado);
        };
        if ($scope.fecha_inicio && $scope.fecha_fin) {
            s.f_start = stringFechaSql($scope.fecha_inicio, true);
            s.f_end = stringFechaSql($scope.fecha_fin, true);
        }
        s.id = $scope.empleado.em.id;
        vale.search(s, successCallback);
    };

    $scope.editarDeduc = function() {
        $scope.ban_edi_deduc = !$scope.ban_edi_deduc;
    };
    $scope.updateDeduc = function() {
        $scope.empleado = calcular_pago($scope.empleado);
        $scope.ban_edi_deduc = !$scope.ban_edi_deduc;
    };
    $scope.deleteNomina = function(id) {
        $("#alert-nomina").removeAttr('style');
        var call = function(data) {
            $scope.alert_nomina = {class: 'success', show: true, mensaje: 'Empleado eliminado de la nomina'};
            setTimeout(function() {
                    $("#alert-nomina").fadeOut(1500);
                }, 3000);
            init_nomina();
        };
        nomina.delete(id, call);
    };
    $scope.asignarEmpleado = function(id) {
        for (var i in $scope.list_empleados)
            if ($scope.list_empleados[i].id == id)
                return $scope.list_empleados[i].nombre + " " + $scope.list_empleados[i].apellido;
    };
    $scope.asignarSalario = function(id) {
        for (var i in $scope.list_empleados)
            if ($scope.list_empleados[i].id == id)
                return $scope.list_empleados[i].salario;
    };
    $scope.next = function() {
        if ($scope.pags <= $scope.list_nomina.length / $scope.c_pag)
            $scope.pags += 1;
        $scope.array_nomina = pagination2($scope.list_nomina, $scope.c_pag, $scope.pags);
    }
    $scope.previous = function() {
        if ($scope.pags == 1)
            $scope.pags = 1;
        else
            $scope.pags -= 1;
        $scope.array_nomina = pagination2($scope.list_nomina, $scope.c_pag, $scope.pags);
    };

    //alerts
    $scope.addAlert = function(tipo, men) {
        $scope.alerts.push({type: tipo, msg: men});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    //fechas
    $scope.today = function() {
        $scope.fecha_inicio = new Date();
        $scope.fecha_fin = new Date();
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

    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
    };

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

    var calcular_resumen = function() {
        $scope.resumen.num_empleados = $scope.list_nomina.length;
        $scope.resumen.total_pagado = 0;
        for (var i in $scope.list_nomina) {
            $scope.resumen.total_pagado += parseInt($scope.list_nomina[i].neto_pagado);
        }
    };
    var crearNomina = function(p) {
        var em = {
            fecha_generado: stringFechaSql(new Date()),
            dias_liquidados: p.dias_liquidados,
            basico: p.basico,
            sub_transporte: p.sub_transporte,
            total_extras: p.total_extras,
            total_devengado: p.total_devengado,
            salud: p.salud,
            pension: p.pension,
            total_vales: p.total_vales,
            otras_deducciones: p.otras_deducciones,
            total_deducciones: p.total_deducciones,
            neto_pagado: p.neto_pagado,
            fecha_pago: null,
            mes: $scope.mes,
            quincena: $scope.quincena,
            empleado_id: p.em.id
        };
        return em;
    };
    var calcular_pago = function(em) {
        //console.log(em);
        if (em.em != undefined) {
            if ($scope.config.calcular_sobre == "Minimo") {
                em.basic = $scope.datos_basicos.salario_minimo / 30 * $scope.config.dias_liquidados;
            } else if ($scope.config.calcular_sobre == "Sueldo") {
                em.basic = em.em.salario / 30 * $scope.config.dias_liquidados;
            }
            em.basico = em.em.salario / 30 * $scope.config.dias_liquidados;
            if ($scope.b_subtrans)
                em.sub_transporte = $scope.datos_basicos.subsidio_transporte / 30 * $scope.config.dias_liquidados;
            else
                em.sub_transporte = 0;

            em.extras = 0;
            em.total_devengado = em.basico + em.sub_transporte + em.extras;
            if ($scope.b_salud)
                em.salud = em.basic * $scope.datos_basicos.salud.empleado;
            else
                em.salud = 0;
            if ($scope.b_pension)
                em.pension = em.basic * $scope.datos_basicos.pension.empleado;
            else
                em.pension = 0;
            em.total_vales = em.total_vales || 0;
            if (!em.otras_deducciones)
                em.otras_deducciones = 0;
            em.total_deducciones = em.salud + em.pension + em.total_vales + em.otras_deducciones;

            em.neto_pagado = em.total_devengado - em.total_deducciones;
        }
        return em;
    };
});
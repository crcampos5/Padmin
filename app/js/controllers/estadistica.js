app.controller('EstadisticaCtrl', function($scope, venta, proveedor, compra) {

    $scope.dataprovider = {
        data: null,
        pag_current_page: null,
        pag_page_count: null,
        pag_per_page: null,
        pag_total_count: null
    };
    $scope.dias_cal = 0;
    $scope.gastos_totales = 0;
    $scope.ventas_totales = 0;
    $scope.efectivo_restante = 0;
    $scope.venta_promedio = 0;
    $scope.gasto_promedio = 0;
    $scope.t_gastos = [];

    $scope.labels = [];
    $scope.series = ['Ventas', 'Gastos'];
    $scope.data = [];
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    var dias_semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];


    /* var initVenta = function() {
     var successCallbackVenta = function(data, status, headers, config) {
     $scope.dataprovider.data = formatDateVentas(data);
     setHeaders($scope.dataprovider, headers);
     cal_es();
     }
     venta.list(successCallbackVenta, null, null, 50);
     }
     initVenta();*/

    var cal_es = function() {
        var v = [];
        var g = [];
        $scope.labels = [];
        $scope.series = ['Ventas', 'Gastos'];
        $scope.data = [];
        $scope.dias_cal = 0;
        $scope.gastos_totales = 0;
        $scope.ventas_totales = 0;
        $scope.efectivo_restante = 0;
        $scope.venta_promedio = 0;
        $scope.gasto_promedio = 0;
        $scope.por_utilidad = 0;
        $scope.compraslist = [];
       
        angular.forEach($scope.dataprovider.data, function(item) {
            if (item != null) {
                $scope.dias_cal += 1
                $scope.ventas_totales += item.venta;
                v.push(item.venta);
                g.push(item.total_gastos);
                $scope.labels.push(dias_semana[item.fecha.getDay()] + " " + item.fecha.getDate());
                $scope.gastos_totales += item.total_gastos;
                $scope.efectivo_restante += item.efectivo_restante;
            }
        });
        $scope.data.push(v);
        $scope.data.push(g);
        $scope.gasto_promedio = $scope.gastos_totales / $scope.dias_cal;
        $scope.venta_promedio = $scope.ventas_totales / $scope.dias_cal;
        $scope.por_utilidad = $scope.efectivo_restante * 100 / $scope.ventas_totales;
    };

    $scope.searchVentas = function() {
        var s = {};
        var successCallback = function(data, status, headers, config) {
            if (data) {
                $scope.dataprovider.data = formatDateVentas(data);
                setHeaders($scope.dataprovider, headers);
                cal_es();
            }
        }
        var successCallbackCompras = function(data, status, headers, config) {
            $scope.compraslist = formatDate(data);
            // cal_compras();
            var successCallbackPro = function(data, status, headers, config) {
                $scope.proveedorlist = data;
                cal_compras();
            }
            proveedor.listpro(successCallbackPro);
        }

        if ($scope.b.fecha_start && $scope.b.fecha_end) {
            s.f_start = stringFechaSql($scope.b.fecha_start, true);
            s.f_end = stringFechaSql($scope.b.fecha_end, true);
        }
        venta.search(s, successCallback);
        compra.search(s, successCallbackCompras);
    }

    var cal_compras = function() {   
         $scope.t_gastos = [];
         $scope.total_g = 0;
        for(var i in $scope.proveedorlist) {
            var p = $scope.proveedorlist[i];
            var item = {};
            var sum = 0;
            for(var j in $scope.compraslist) {
                var c = $scope.compraslist[j]; 
               if(p.id == c.proveedor_id){
                   sum += c.valor;
               }
            }
            item = {
                proveedor_id : p.id,
                nombre : p.nombre,
                valor : sum,
                por : 0,
            };
            $scope.total_g += sum;
            $scope.t_gastos.push(item);
        }
        for(var i in $scope.t_gastos){ 
            $scope.t_gastos[i].por =  $scope.t_gastos[i].valor*100/ $scope.total_g;         
        } 
        $scope.t_gastos.sort(function(a,b){
           return b.valor - a.valor; 
        });
    }

    $scope.reset = function() {
        delete $scope.b.fecha_start;
        delete $scope.b.fecha_end;
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
});



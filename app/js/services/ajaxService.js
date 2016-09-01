
function ajaxService($http,$rootScope,CONFIG) {
    //http://localhost/restpadmin/web/
    //http://localhost/yii/padmin/index.php/api/
    var urlbase = CONFIG.API;

    var uri_compra = urlbase + "compra";
    var uri_proveedor = urlbase + "proveedor";
    var uri_venta = urlbase + "venta";
    var uri_empleado = urlbase + "empleado";
    var uri_vale = urlbase + "vale";
    var uri_nomina = urlbase + "nomina";
    var uri_horasextras = urlbase + "horasextras";
    var uri_operacion = urlbase + "operacion";
    var uri_user= urlbase + "user";

 //Model user

    this.userById = function(id, callback) {
        var url = uri_user + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.userList = function(callback) {
        var url = uri_user;
        ajax(url, callback, "get", null);
    }
    this.userDelete = function(id, callback) {
        var url = uri_user + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.userUpdate = function(id, ope, callback) {
        var url = uri_user + "/" + id;
        ajax(url, callback, "put", ope);
    }
    this.userCreate = function(ope, callback) {
        var url = uri_user;
        ajax(url, callback, "post", ope);
    }


    //Model operacion

    this.operacionById = function(id, callback) {
        var url = uri_operacion + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.operacionList = function(callback) {
        var url = uri_operacion;
        ajax(url, callback, "get", null);
    }
    this.operacionDelete = function(id, callback) {
        var url = uri_operacion + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.operacionUpdate = function(id, ope, callback) {
        var url = uri_operacion + "/" + id;
        ajax(url, callback, "put", ope);
    }
    this.operacionCreate = function(ope, callback) {
        var url = uri_operacion;
        ajax(url, callback, "post", ope);
    }


    //Model horasextras

    this.horasextrasById = function(id, callback) {
        var url = uri_horasextras + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.horasextrasList = function(callback) {
        var url = uri_horasextras;
        ajax(url, callback, "get", null);
    }
    this.horasextrasDelete = function(id, callback) {
        var url = uri_horasextras + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.horasextrasUpdate = function(id, horas, callback) {
        var url = uri_horasextras + "/" + id;
        ajax(url, callback, "put", horas);
    }
    this.horasextrasCreate = function(horas, callback) {
        var url = uri_horasextras;
        ajax(url, callback, "post", horas);
    }

    //Model nomina

    this.nominaById = function(id, callback) {
        var url = uri_nomina + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.nominaList = function(callback) {
        var url = uri_nomina;
        ajax(url, callback, "get", null);
    }
    this.nominaDelete = function(id, callback) {
        var url = uri_nomina + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.nominaUpdate = function(id, nomina, callback) {
        var url = uri_nomina + "/" + id;
        ajax(url, callback, "put", nomina);
    }
    this.nominaCreate = function(nomina, callback) {
        var url = uri_nomina;
        ajax(url, callback, "post", nomina);
    }

    //Model vale

    this.valeById = function(id, callback) {
        var url = uri_vale + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.valeList = function(callback) {
        var url = uri_vale;
        ajax(url, callback, "get", null);
    }
    this.valeDelete = function(id, callback) {
        var url = uri_vale + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.valeUpdate = function(id, vale, callback) {
        var url = uri_vale + "/" + id;
        ajax(url, callback, "put", vale);
    }
    this.valeCreate = function(vale, callback) {
        var url = uri_vale;
        ajax(url, callback, "post", vale);
    }


    //Model empleado

    this.empleadoById = function(id, callback) {
        var url = uri_empleado + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.empleadoList = function(callback) {
        var url = uri_empleado;
        ajax(url, callback, "get", null);
    }
    this.empleadoDelete = function(id, callback) {
        var url = uri_empleado + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.empleadoUpdate = function(id, empleado, callback) {
        var url = uri_empleado + "/" + id;
        ajax(url, callback, "put", empleado);
    }
    this.empleadoCreate = function(empleado, callback) {
        var url = uri_empleado;
        ajax(url, callback, "post", empleado);
    }

    //Model venta

    this.ventaById = function(id, callback) {
        var url = uri_venta + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.ventaList = function(callback) {
        var url = uri_venta;
        ajax(url, callback, "get", null);
    }
    this.ventaDelete = function(id, callback) {
        var url = uri_venta + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.ventaUpdate = function(id, venta, callback) {
        var url = uri_venta + "/" + id;
        ajax(url, callback, "put", venta);
    }
    this.ventaCreate = function(venta, callback) {
        var url = uri_venta;
        ajax(url, callback, "post", venta);
    }

    //Model gasto 

    this.compraById = function(id, callback) {
        var url = uri_compra + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.compraList = function(callback) {
        var url = uri_compra;
        ajax(url, callback, "get", null);
    }
    this.compraDelete = function(id, callback) {
        var url = uri_compra + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.compraUpdate = function(id, gasto, callback) {
        var url = uri_compra + "/" + id;
        ajax(url, callback, "put", gasto);
    }
    this.compraCreate = function(gasto, callback) {
        var url = uri_compra;
        ajax(url, callback, "post", gasto);
    }
    //Model proveedor
    this.proveedorById = function(id, callback) {
        var url = uri_proveedor + "/" + id;
        ajax(url, callback, "get", null);
    }
    this.proveedorList = function(callback) {
        var url = uri_proveedor;
        ajax(url, callback, "get", null);
    }
    this.proveedorDelete = function(id, callback) {
        var url = uri_proveedor + "/" + id;
        ajax(url, callback, "delete", null);
    }
    this.proveedorUpdate = function(id, proveedor, callback) {
        var url = uri_proveedor + "/" + id;
        ajax(url, callback, "put", proveedor);
    }
    this.proveedorCreate = function(proveedor, callback) {
        var url = uri_proveedor;
        ajax(url, callback, "post", proveedor);
    }
    //function ajax
    var ajax = function(url, callback, action, data, errorback) {

        switch (action) {
            case "get":
                $http.get(url)
                        .success(function(data) {
                            if (callback != null)
                                callback(data);
                        }).error(function(err) {
                  // $rootScope.alerts.push({type: 'danger', msg: err.message});
                });
                break;
            case "post":
                if (data != null) {
                    $http.post(url, data)
                            .success(function(data) {
                                if (callback != null)
                                    callback(data);
                            }).error(function(err) {
                        console.log(err);
                    });
                }

                break;
            case "put":
                if (data != null) {
                    $http.put(url, data)
                            .success(function(data) {
                                if (callback != null)
                                    callback(data);
                            }).error(function(err) {
                        console.log(err);
                    });
                }
                break
            case "delete":
                $http.delete(url)
                        .success(function(data) {
                            if (callback != null)
                                callback(data);
                        }).error(function(err) {
                    console.log(err);
                });
                break
        }

    }
}

app.service('ajax_servi', ajaxService);
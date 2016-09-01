function nominaModel($http, $rootScope, CONFIG) {

    var uri = CONFIG.API + 'nomina';

    this.proveedorById = function(id, callback) {
        var url = uri + id;
        $http.get(url)
                .success(function(data, status, headers, config) {
                    if (callback != null)
                        callback(data);
                }).error(function(data, status, headers, config) {
            console.log(data);
        });
    }
    this.list = function(successCallback, errorCallback, pag, limit) {
        var page = pag || 1;
        var lim = limit || 10;
        var url = uri + '?page=' + page + '&per-page=' + lim;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.get(url).success(callsuccess).error(callerror);
    }
    this.listByQuincena = function(successCallback, errorCallback, mes, quincena) {
        var m = mes || 'Mayo';
        var q = quincena || 1;
        var url = uri + '/byquincena?mes=' + m + '&quincena=' + q + '&per-page=' + 50;;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.get(url).success(callsuccess).error(callerror);
    }
    this.delete = function(id, successCallback, errorCallback) {
        var url = uri + "/" + id;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.delete(url).success(callsuccess).error(callerror);
    }
    this.update = function(id, proveedor, successCallback, errorCallback) {
        var url = uri + "/" + id;
        var data = proveedor || null;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.put(url, data).success(callsuccess).error(callerror);
    }
    this.create = function(proveedor, successCallback, errorCallback) {
        var url = uri;
        var data = proveedor || null;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.post(url, data).success(callsuccess).error(callerror);
    }
    this.search = function(val, callback) {
        var data = val || '';
        var url = uri + '/search?val=' + data;
        var callsuccess = callback || null;
        return $http.get(url).then(callsuccess);
    }
}
app.service('nomina', nominaModel);





function operacionModel($http, $rootScope, CONFIG) {

    var uri = CONFIG.API + 'operacion';

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
    this.search = function(val, callback, pag, limit) {
        var data = val || '';
        var page = pag || 1;
        var lim = limit || 10;
        var url = uri + '/search?val=' + data + '&page=' + page + '&per-page=' + lim;
        var callsuccess = callback || null;
        return $http.get(url).success(callsuccess);
    }
    this.saldo = function(successCallback) {
        var url = uri + '/saldo';
        $http.get(url).success(successCallback);
    }
}
app.service('operacion', operacionModel);





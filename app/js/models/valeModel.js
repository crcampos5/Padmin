function valeModel($http, $rootScope, CONFIG) {

    var uri = CONFIG.API + 'vale';

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
    this.byDate = function(date, successCallback, errorCallback) {
        var url = uri + '/bydate?date=' + date;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.get(url).success(callsuccess).error(callerror);
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
    this.update = function(id, compra, successCallback, errorCallback) {
        var url = uri + "/" + id;
        var data = compra || null;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.put(url, data).success(callsuccess).error(callerror);
    }
    this.create = function(compra, successCallback, errorCallback) {
        var url = uri;
        var data = compra || null;
        var callsuccess = successCallback || null;
        var callerror = errorCallback || null;
        $http.post(url, data).success(callsuccess).error(callerror);
    }
    this.search = function(val, callback) {
        var data = val || '';
        var url = uri + '/search';
        var callsuccess = callback || null;
        $http.post(url,data).success(callsuccess);
    }
}
app.service('vale', valeModel);










var setHeaders = function(dataprovider, headers) {
    dataprovider.pag_current_page = headers('X-Pagination-Current-Page');
    dataprovider.pag_page_count = headers('X-Pagination-Page-Count');
    dataprovider.pag_per_page = headers('X-Pagination-Per-Page');
    dataprovider.pag_total_count = headers('X-Pagination-Total-Count');
}
var formatDateVentas = function(ven) {
    var ventas = angular.copy(ven);
    for (var i in ventas) {
        var t = ventas[i].fecha.split(/[- :]/);
        var d = new Date(t[0], t[1] - 1, t[2]);
        ventas[i].fecha = d;
    }
    return ventas;
};
/*var filterCompras = function(fecha, compras) {
 var costos = [];
 for (var i in compras) {
 var dia = compras[i].fecha.getDate();
 var mes = compras[i].fecha.getMonth();
 var anio = compras[i].fecha.getFullYear();
 if (dia == fecha.getDate() && mes == fecha.getMonth() && anio == fecha.getFullYear()) {
 costos.push(compras[i]);
 }
 }
 
 return costos;
 };*/
var formatDate = function(cos) {
    var costos = angular.copy(cos);
    for (var i in costos) {
        var t = costos[i].fecha.split(/[- :]/);
        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        costos[i].fecha = d;
    }
    return costos;
};
var sumTotalCompras = function(array) {
    var total = 0;
    for (var i in array) {
        total += parseInt(array[i].valor);
    }
    return total;
};

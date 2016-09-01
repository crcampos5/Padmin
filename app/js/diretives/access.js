app.directive('myAccess', ['authService', 'removeElement', function(authService, removeElement) {
        return{
            restrict: 'A',
            link: function(scope, element, attributes) {

                var roles = JSON.parse(attributes.myAccess);
                var hasAccess = false;
                for (var i in roles) {
                    if (authService.userHasRole(roles[i])) {
                        hasAccess = true;
                        break;
                    }
                }

                if (!hasAccess) {
                    angular.forEach(element.children(), function(child) {
                        removeElement(child);
                    });
                    removeElement(element);
                }

            }
        }
    }]);
app.constant('removeElement', function(element) {
    element && element.remove && element.remove();
});



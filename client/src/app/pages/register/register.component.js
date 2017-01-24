(function(){

    'use strict';

    angular
        .module('page.register', ['comp.nav', 'comp.foot'])
        .component('register', {
            controller: registerController,
            templateUrl: 'app/pages/register/register.template.html' 
        });


        function registerController() {
            console.log('register component');
        }

})();
(function(){

    'use strict';

    angular
        .module('page.authenticated', ['comp.authenticatedNav','comp.foot', 'comp.offerList', 'factory.auth'])
        .component('authenticated', {
            controller: authenticatedController,
            templateUrl: 'app/pages/authenticated/authenticated.template.html' 
        });


        function authenticatedController($http, $state, authFactory) {
            var vm = this;            




        }

})();
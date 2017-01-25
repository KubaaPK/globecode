(function(){

    'use strict';

    angular
        .module('page.authenticated', ['comp.authenticatedNav','comp.foot', 'factory.token'])
        .component('authenticated', {
            controller: authenticatedController,
            templateUrl: 'app/pages/authenticated/authenticated.template.html' 
        });


        function authenticatedController($http, $state, tokenFactory) {
            var vm = this;            

            vm.$onInit = function() {
                if(tokenFactory.checkIfTokenExpires()) {
                    $state.go('login');
                } 
            }


        }

})();
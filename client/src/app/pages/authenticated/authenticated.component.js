(function(){

    'use strict';

    angular
        .module('page.authenticated', ['comp.authenticatedNav','comp.foot', 'comp.searchOfferForm', 'comp.categoriesList', 'comp.offerList', 'factory.token'])
        .component('authenticated', {
            controller: authenticatedController,
            templateUrl: 'app/pages/authenticated/authenticated.template.html' 
        });


        function authenticatedController($http, $state, tokenFactory) {
            var vm = this;            




        }

})();
(function(){

    'use strict';

    angular
        .module('page.index', ['comp.nav', 'comp.foot', 'factory.auth'])
        .component('index', {
            templateUrl: 'app/pages/index/index.template.html',
            controller: indexController
        });


        function indexController($state, authFactory) {
            var vm = this;

        }

})();
(function(){

    'use strict';

    angular
        .module('page.index', ['comp.nav', 'comp.foot', 'factory.token'])
        .component('index', {
            templateUrl: 'app/pages/index/index.template.html',
            controller: indexController
        });


        function indexController($state, tokenFactory) {
            var vm = this;

        }

})();
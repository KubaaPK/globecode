(function(){

    'use strict';

    angular
        .module('page.index', ['comp.nav', 'comp.foot'])
        .component('index', {
            templateUrl: 'app/pages/index/index.template.html',
            controller: indexController
        });


        function indexController() {
            console.log(2+2);
        }

})();
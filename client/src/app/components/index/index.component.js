(function(){

    'use strict';

    angular
        .module('app.index', [])
        .component('index', {
            controller: indexController,
            templateUrl: 'app/components/index/index.template.html' 
        });


        function indexController() {
            console.log('index component');
        }

})();
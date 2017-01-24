(function(){

    'use strict';

    angular
        .module('page.login', ['comp.nav', 'comp.foot'])
        .component('login', {
            controller: loginController,
            templateUrl: 'app/pages/login/login.template.html' 
        });


        function loginController() {
            console.log('login component');
        }

})();
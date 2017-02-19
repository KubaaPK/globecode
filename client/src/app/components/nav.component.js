(function(){

    'use strict';

    angular
        .module('comp.nav', [])
        .component('navBar', {
            templateUrl: 'app/components/nav.template.html',
            controller: navController
        });

        function navController() {
            var vm = this;


            var navigation = document.querySelector('.navigation-content'),
                showMenuBtn = document.querySelector('.showMenu');

            showMenuBtn.addEventListener('click', function() {
                navigation.classList.toggle('displayMenu');
            })

        }
})();
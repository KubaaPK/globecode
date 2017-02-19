(function(){

    'use strict';

    angular
        .module('comp.authenticatedNav', [])
        .component('authenticatedNavBar', {
            templateUrl: 'app/components/authenticatedNav.template.html',
            controller: authenticatedNavController 
        });

        function authenticatedNavController() {
            var vm = this;

            vm.logOut = function() {
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
            }



            var navigation = document.querySelector('.navigation-content'),
                showMenuBtn = document.querySelector('.showMenu');

            showMenuBtn.addEventListener('click', function() {
                navigation.classList.toggle('displayMenu');
            })


        }

})();
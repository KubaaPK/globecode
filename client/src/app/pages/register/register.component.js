(function(){

    'use strict';

    angular
        .module('page.register', ['comp.nav', 'comp.foot'])
        .component('register', {
            controller: registerController,
            templateUrl: 'app/pages/register/register.template.html' 
        });


        function registerController($http) {
            var vm = this;

            vm.submitRegistration = function () {
                
                var data = {
                    email       : vm.registerEmail,
                    password    : vm.registerPassword
                }

                $http.post('http://localhost:8080/api/users/new', data)
                    .then(function(res) {
                        console.log(res);
                    })
                    .catch(function(err) {
                        console.log(err);
                    })

            }


        }

})();
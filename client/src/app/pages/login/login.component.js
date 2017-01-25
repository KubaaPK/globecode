(function(){

    'use strict';

    angular
        .module('page.login', ['comp.nav', 'comp.foot', 'factory.token'])
        .component('login', {
            controller: loginController,
            templateUrl: 'app/pages/login/login.template.html' 
        });


        function loginController($http, tokenFactory) {
            var vm = this;            

            

            vm.submitLogin = function() {
                var data = {
                    email       : vm.loginEmail,
                    password    : vm.loginPassword
                }

                $http.post('http://localhost:8080/api/users/authenticate', data)
                    .then(function(res) {
                        console.log(res);
                        tokenFactory.saveTokenToLocalStorage(res.data.token);
                        console.log(tokenFactory.checkIfTokenExpires());
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }

        }

})();
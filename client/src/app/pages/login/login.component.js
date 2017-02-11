(function(){

    'use strict';

    angular
        .module('page.login', ['comp.nav', 'comp.foot', 'factory.auth', 'factory.user'])
        .component('login', {
            controller: loginController,
            templateUrl: 'app/pages/login/login.template.html' 
        });


        function loginController($http, $state, authFactory, userFactory) {
            var vm = this;            

           
            

            vm.submitLogin = function() {
                var data = {
                    email       : vm.loginEmail,
                    password    : vm.loginPassword
                }

                authFactory.authenticateUser(data)
                    .then(function(res) {
                        authFactory.saveTokenToLocalStorage(res.data.token);
                        userFactory.saveUserDataToLocalStorage(res.data.user);
                        $state.go('auth.index');
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }

        }

})();
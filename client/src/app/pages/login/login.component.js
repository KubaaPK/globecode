(function(){

    'use strict';

    angular
        .module('page.login', ['comp.nav', 'comp.foot', 'factory.token', 'factory.user'])
        .component('login', {
            controller: loginController,
            templateUrl: 'app/pages/login/login.template.html' 
        });


        function loginController($http, $state, tokenFactory, userFactory) {
            var vm = this;            

            vm.$onInit = function() {
                if(!tokenFactory.checkIfTokenExpires()) {
                    $state.go('authenticated');
                } 
            }
            

            vm.submitLogin = function() {
                var data = {
                    email       : vm.loginEmail,
                    password    : vm.loginPassword
                }

                $http.post('http://localhost:8080/api/users/authenticate', data)
                    .then(function(res) {
                        tokenFactory.saveTokenToLocalStorage(res.data.token);
                        userFactory.saveUserDataToLocalStorage(res.data.user);
                        $state.go('authenticated');
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }

        }

})();
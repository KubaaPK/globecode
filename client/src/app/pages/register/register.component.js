(function(){

    'use strict';

    angular
        .module('page.register', ['comp.nav', 'comp.foot', 'factory.auth', 'factory.user'])
        .component('register', {
            controller: registerController,
            templateUrl: 'app/pages/register/register.template.html' 
        });


        function registerController($http, $state, authFactory, userFactory) {
            var vm = this;

         
            vm.submitRegistration = function () {
                
                var data = {
                    email       : vm.registerEmail,
                    password    : vm.registerPassword
                }

                userFactory.postNewUser()
                    .then(function(res) {
                        if(res.data.token) {
                            authFactory.saveTokenToLocalStorage(res.data.token);
                            userFactory.saveUserDataToLocalStorage(res.data.user);
                            $state.go('auth.index');
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })

            }


        }

})();
(function(){

    'use strict';

    angular
        .module('page.register', ['comp.nav', 'comp.foot', 'factory.token', 'factory.user'])
        .component('register', {
            controller: registerController,
            templateUrl: 'app/pages/register/register.template.html' 
        });


        function registerController($http, $state, tokenFactory, userFactory) {
            var vm = this;

            vm.$onInit = function() {
                if(!tokenFactory.checkIfTokenExpires()) {
                    $state.go('authenticated');
                } 
            }

            vm.submitRegistration = function () {
                
                var data = {
                    email       : vm.registerEmail,
                    password    : vm.registerPassword
                }

                $http.post('http://localhost:8080/api/users/new', data)
                    .then(function(res) {
                        if(res.data.token) {
                            tokenFactory.saveTokenToLocalStorage(res.data.token);
                            userFactory.saveUserDataToLocalStorage(res.data.user);
                            $state.go('authenticated');
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })

            }


        }

})();
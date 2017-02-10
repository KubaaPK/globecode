(function(){

    'use strict';

    angular
        .module('page.addOffer', ['comp.authenticatedNav','comp.foot', 'factory.token'])
        .component('addOffer', {
            controller: addOfferController,
            templateUrl: 'app/pages/addOffer/addOffer.template.html' 
        });


        function addOfferController($http, $state, tokenFactory) {
            var vm = this;            

            vm.addNewOffer = function() {
                var data = {
                    title       : vm.newOffer_title,
                    city        : vm.newOffer_city,
                    state       : vm.newOffer_state,
                    shift       : vm.newOffer_shift,
                    companyName : vm.newOffer_companyName,
                    companySize : vm.newOffer_companySize,
                    description : vm.newOffer_description,
                    www         : vm.newOffer_www,
                    contact     : vm.newOffer_contact,
                    salaryMin   : vm.newOffer_salaryMin,
                    salaryMax   : vm.newOffer_salaryMax,
                    tags        : [vm.newOffer_state, vm.newOffer_shift, vm.newOffer_companySize]
                };
                
                
                $http.post('http://localhost:8080/api/offer/new', data)
                    .then(function(res) {
                        $state.go('auth.index');
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }

            vm.backToIndex = function() {
                $state.go('auth.index');
            }

        }

})();
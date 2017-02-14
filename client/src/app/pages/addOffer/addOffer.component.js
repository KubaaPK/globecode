(function(){

    'use strict';

    angular
        .module('page.addOffer', ['comp.authenticatedNav','comp.foot', 'factory.auth', 'factory.offers'])
        .component('addOffer', {
            controller: addOfferController,
            templateUrl: 'app/pages/addOffer/addOffer.template.html' 
        });


        function addOfferController($http, $state, offersFactory) {
            var vm = this;            

            vm.options = {
                minHeight: 700,
                toolbar: [
                    ['style', ['bold', 'italic', 'underline']],
                    ['fontsize', ['fontsize']],
                    ['para', ['ul', 'ol']]
                ]
            };


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
            
                offersFactory.postNewOffer(data)
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
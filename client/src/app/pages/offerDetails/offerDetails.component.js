(function(){

    'use strict';

    angular
        .module('page.offerDetails', ['comp.authenticatedNav','comp.foot', 'factory.auth', 'factory.offers'])
        .component('offerDetails', {
            controller: offerDetailsController,
            templateUrl: 'app/pages/offerDetails/offerDetails.template.html' 
        });


        function offerDetailsController($http, $state, $stateParams, offersFactory) {
            var vm = this;            
            
            var offerID = $stateParams.offerId;
            
            vm.$onInit = function() {
                offersFactory.getOfferDetails(offerID).then(function(res) {
                    vm.details = res.data.fields;
                    console.log(vm.details);           
                })
                .catch(function(err){
                    console.log(err);
                })
            }



        }

})();
(function(){

    'use strict';

    angular
        .module('page.offerDetails', ['comp.authenticatedNav','comp.foot', 'factory.auth', 'factory.offers'])
        .component('offerDetails', {
            controller: offerDetailsController,
            templateUrl: 'app/pages/offerDetails/offerDetails.template.html' 
        });


        function offerDetailsController($http, $state, $stateParams, $sce, offersFactory, authFactory) {
            var vm = this;            
            
            vm.isTokenExpired = authFactory.isTokenExpired();

            var offerID = $stateParams.offerId;
           
            vm.$onInit = function() {
                offersFactory.getOfferDetails(offerID).then(function(res) {
                    vm.details = res.data;
                    console.log(vm.details); 
                    vm.jobDescriptionEscaped = function() {
                        return $sce.trustAsHtml(vm.details.description);
                    };          
                })
                .catch(function(err){
                    console.log(err);
                })
            }



        }

})();
(function(){

    'use strict';

    angular
        .module('page.myOffers', ['comp.authenticatedNav','comp.foot', 'factory.auth', 'factory.offers', 'factory.user'])
        .component('myOffers', {
            controller: myOffersController,
            templateUrl: 'app/pages/myOffers/myOffers.template.html' 
        });


        function myOffersController($http, $state, $stateParams, offersFactory, userFactory) {
            var vm = this;            
            
            vm.$onInit = function() {
                offersFactory.getMyOffers(userFactory.loadUserDataFromLocalStorage().id)
                    .then(function(res) {
                        vm.myOffers = res.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            } 

            vm.deleteOffer = function(offerID) {
                var data = { id: offerID };
                var deleteConfirm = confirm("Na pewno chcesz usunąć tę ofertę?");
                if(deleteConfirm) {
                     offersFactory.deleteOffer(data)
                    .then(function(res) {
                        console.log(res);
                        $state.go('auth.myOffers');
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                }
               
            }

        }

})();
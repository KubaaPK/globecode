(function(){

    'use strict';

    angular
        .module('page.editOffer', ['comp.authenticatedNav','comp.foot', 'comp.offerList', 'factory.auth', 'factory.offers'])
        .component('editOffer', {
            controller: editOfferController,
            templateUrl: 'app/pages/editOffer/editOffer.template.html' 
        });


        function editOfferController($http, $state, $stateParams, authFactory, offersFactory) {
            var vm = this;            

            vm.options = {
                minHeight: 700,
                toolbar: [
                    ['style', ['bold', 'italic', 'underline']],
                    ['fontsize', ['fontsize']],
                    ['para', ['ul', 'ol']]
                ]
            };


            vm.$onInit = function() {
                offersFactory.getOfferDetails($stateParams.id)
                    .then(function(res) {
                        vm.offerData = res.data;
                        vm.editedOffer_title = vm.offerData.title;
                        vm.editedOffer_city = vm.offerData.city;
                        vm.editedOffer_state = vm.offerData.state;
                        vm.editedOffer_shift = vm.offerData.shift;
                        vm.editedOffer_companySize = vm.offerData.companySize;
                        vm.editedOffer_description = vm.offerData.description;
                        vm.editedOffer_salaryMin = vm.offerData.salaryMin;
                        vm.editedOffer_salaryMax = vm.offerData.salaryMax;
                        vm.editedOffer_companyName = vm.offerData.companyName;
                        vm.editedOffer_www = vm.offerData.www;
                        vm.editedOffer_contact = vm.offerData.contact;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }


            vm.editOffer = function() {
                var data = {
                    id          : vm.offerData._id,
                    title       : vm.editedOffer_title,
                    city        : vm.editedOffer_city,
                    state       : vm.editedOffer_state,
                    shift       : vm.editedOffer_shift,
                    companySize : vm.editedOffer_companySize,
                    description : vm.editedOffer_description,
                    salaryMin   : vm.editedOffer_salaryMin,
                    salaryMax   : vm.editedOffer_salaryMax,
                    companyName : vm.editedOffer_companyName,
                    www         : vm.editedOffer_www,
                    contact     : vm.editedOffer_contact,
                    tags        : [vm.editedOffer_state, vm.editedOffer_shift, vm.editedOffer_companySize],
                    created_at  : Date.now()               
                }

                offersFactory.editOffer(data)
                    .then(function(res) {
                        console.log(res);
                        $state.go('auth.myOffers');
                    })
                    .catch(function(err) {
                        console.log(err);
                    })


            }

            vm.backToMyOffers = function() {
                $state.go('auth.myOffers');
            }

        }

})();
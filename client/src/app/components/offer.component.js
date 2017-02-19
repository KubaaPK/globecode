(function(){

    'use strict';

    angular
        .module('comp.offerList', ['factory.offers'])
        .component('offerList', {
            controller: offerController,
            templateUrl: 'app/components/offer.template.html'
        });
})();


    function offerController($http, offersFactory, moment) {
        var vm = this;

        vm.$onInit = function() {
            vm.offersDisplayLimit = 7;
            offersFactory.getAllOffers()
                .then(function(res) {
                    vm.data = [];
                    vm.offerId = [];
                    for(var i = 0; i<res.data.length;i++) {
                        vm.data.push(res.data[i].fields);
                        vm.offerId.push(res.data[i]._id);
                    }
                    vm.allOffersAmount = res.data.length;
                })
                .catch(function(err) {
                    console.log(err);
                });

            offersFactory.getOffersAmounts()
                .then(function(res) {
                    vm.amounts = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
        

       
     


        var filtersCheckboxes = document.querySelectorAll('.check-with-label');
        for (var i = 0; i < filtersCheckboxes.length; i++) {
            filtersCheckboxes[i].addEventListener('change', function(event) {
                var data = $.map(vm.Filter, function(value, index) {
                    return [value];
                });
                
                offersFactory.postSearchOffers(data)
                    .then(function(res) {
                        vm.data = [];
                        for(var i = 0; i<res.data.length;i++) {
                            vm.data.push(res.data[i].fields);
                        }   
                        vm.allOffersAmount = res.data.length;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                offersFactory.getOffersAmounts().then(function(res) {
                    vm.amounts = res.data;
                }); 
            });
        }

       

        var showFiltersBtn = document.querySelector('.showFilters'),
            filters = document.querySelector('.categories');

        showFiltersBtn.addEventListener('click', function() {
            filters.classList.toggle('displayFilers');
        })




    } // end of controller
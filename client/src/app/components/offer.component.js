(function(){

    'use strict';

    angular
        .module('comp.offerList', [])
        .component('offerList', {
            controller: offerController,
            templateUrl: 'app/components/offer.template.html'
        });
})();


    function offerController($http) {
        var vm = this;
        vm.$onInit = function() {
            $http.get("http://localhost:8080/api/offer/all")
                .then(function(res) {
                    vm.data = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                })
        }
        
     

        document.querySelector("#offer_name").addEventListener('input', function(){
            vm.offerNameFilter = searchOfferService.getSearchByOffer();
            
            console.log(searchOfferService.getSearchByOffer());

           jQuery.trigger({ type: 'keypress', which: 13 });
        });
       
        

    }
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
                    console.log(vm.data);
                })
                .catch(function(err) {
                    console.log(err);
                })

        }
    }
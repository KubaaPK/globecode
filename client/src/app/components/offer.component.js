(function(){

    'use strict';

    angular
        .module('comp.offerList', [])
        .component('offerList', {
            controller: offerController,
            templateUrl: 'app/components/offer.template.html'
        });
})();


    function offerController($http, $interval) {
        var vm = this;
        vm.$onInit = function() {
            $http.get("http://localhost:8080/api/offer/all")
                .then(function(res) {
                    vm.data = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                })
        };
        
        var filtersCheckboxes = document.querySelectorAll('.check-with-label');

        for (var i = 0; i < filtersCheckboxes.length; i++) {
            filtersCheckboxes[i].addEventListener('change', function(event) {
                // console.log(vm.Filter);
                var data = $.map(vm.Filter, function(value, index) {
                    return [value];
                });
                $http.post('http://localhost:8080/api/offer/search', data)
                    .then(function(res) {
                        console.log(res);
                        vm.data = res.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
        }
        


    
    }
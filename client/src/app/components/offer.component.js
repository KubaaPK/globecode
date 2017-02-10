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
                    vm.data = [];
                    for(var i = 0; i<res.data.length;i++) {
                        vm.data.push(res.data[i].fields);
                    }
                    vm.offersAmount = res.data.length;
                    offerPlural(res.data.length);
                })
                .catch(function(err) {
                    console.log(err);
                })
        };
        
        var filtersCheckboxes = document.querySelectorAll('.check-with-label');

        for (var i = 0; i < filtersCheckboxes.length; i++) {
            filtersCheckboxes[i].addEventListener('change', function(event) {
                var data = $.map(vm.Filter, function(value, index) {
                    return [value];
                });
                console.log(data);
                $http.post('http://localhost:8080/api/offer/search', data)
                    .then(function(res) {
                        vm.data = [];
                        for(var i = 0; i<res.data.length;i++) {
                            vm.data.push(res.data[i].fields);
                        }   
                        vm.offersAmount = res.data.length;
                        offerPlural(res.data.length);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
        }
        

        function offerPlural(offers) {
            if(offers === 0 ) {
                vm.offerPlural = "ofert";
            } else if(offers === 1) {
                vm.offerPlural = "ofertę";
            } else if(offers === 2 || offers === 3 || offers === 4) {
                vm.offerPlural = "oferty";
            } else {
                vm.offerPlural = "ofert";
            }
        }



    
    } // end of controller
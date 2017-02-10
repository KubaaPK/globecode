(function(){
    'use strict';

    angular
        .module('factory.offers', [])
        .factory('offersFactory', function($http){

            return {
               getAllOffers: function() {
                    return $http.get('http://localhost:8080/api/offer/all');
               },
               getOffersAmounts: function() {
                    return $http.get("http://localhost:8080/api/offer/amount");
               },
               postSearchOffers: function(data) {
                    return $http.post('http://localhost:8080/api/offer/search', data);
               },
               postNewOffer: function(data) {
                   $http.post('http://localhost:8080/api/offer/new', data);
               }
            }


        });

})();
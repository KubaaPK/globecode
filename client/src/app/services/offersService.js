(function(){
    'use strict';

    angular
        .module('factory.offers', ['factory.auth'])
        .factory('offersFactory', function($http, authFactory){

            return {
               getAllOffers: function() {
                    return $http.get('http://localhost:8080/api/offer/all');
               },
               getOfferDetails: function(offerID) {
                    return $http.get('http://localhost:8080/api/offer/detail/' + offerID);
               },
               getOffersAmounts: function() {
                    return $http.get("http://localhost:8080/api/offer/amount");
               },
               getMyOffers: function(userID) {
                    return $http.get("http://localhost:8080/api/offer/myOffers/" + userID);
               },
               postSearchOffers: function(data) {
                    return $http.post('http://localhost:8080/api/offer/search', data, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                    }) 
               },
               postNewOffer: function(data) {
                    return $http.post('http://localhost:8080/api/offer/new', data, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'x-access-token': authFactory.loadTokenFromLocalStorage()
                                    } 
                    }) 
               },
               deleteOffer: function(data) {
                    return $http.post('http://localhost:8080/api/offer/delete', data, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'x-access-token': authFactory.loadTokenFromLocalStorage()
                                    } 
                    }) 
               },
               editOffer: function(data) {
                   return $http.put('http://localhost:8080/api/offer/edit', data, {
                                    headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'x-access-token': authFactory.loadTokenFromLocalStorage()
                                        } 
                   })
               }
            }


        });

})();
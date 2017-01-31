(function(){
    'use strict';

    angular
        .module('factory.token', ['angular-jwt'])
        .factory('tokenFactory', function(jwtHelper){

            return {
                saveTokenToLocalStorage: function(token) {
                    localStorage.setItem("authToken", token);
                },
                loadTokenFromLocalStorage: function() {
                    return localStorage.getItem("authToken");
                },
                checkTokenExpirationDate: function() {
                    return jwtHelper.getTokenExpirationDate(this.loadTokenFromLocalStorage());
                },
                //if token expires returns true, if not returns false
                isTokenExpired: function() {
                    if(this.loadTokenFromLocalStorage()) {
                        return jwtHelper.isTokenExpired(this.loadTokenFromLocalStorage());  
                    } else {
                        return true;
                    }    
                },
                destroyToken: function() {
                    localStorage.removeItem("authToken");
                }

            }


        });

})();
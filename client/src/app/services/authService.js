(function(){
    'use strict';

    angular
        .module('factory.auth', ['angular-jwt'])
        .factory('authFactory', function(jwtHelper, $http){

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
                },
                authenticateUser: function(data) {
                    return $http.post('http://localhost:8080/api/users/authenticate', data, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    } 
                    });
                }

            }


        });

})();
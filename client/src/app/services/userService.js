(function(){
    'use strict';

    angular
        .module('factory.user', [])
        .factory('userFactory', function($http){

            return {
                saveUserDataToLocalStorage: function(user){
                    localStorage.setItem("user", JSON.stringify(user));
                },
                loadUserDataFromLocalStorage: function(){
                    return localStorage.getItem("user");
                },
                postNewUser: function(data) {
                    return $http.post('http://localhost:8080/api/users/new', data, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    } 
                    });
                }
            }


        });

})();
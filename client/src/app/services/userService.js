(function(){
    'use strict';

    angular
        .module('factory.user', [])
        .factory('userFactory', function(){

            return {
                saveUserDataToLocalStorage: function(user){
                    
                    localStorage.setItem("user", JSON.stringify(user));
                },
                loadUserDataFromLocalStorage: function(){
                    return localStorage.getItem("user");
                }
            }


        });

})();
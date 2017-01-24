(function () {
    'use strict';

    angular
        .module('app.routes', [])

        .config(function($stateProvider, $locationProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('index', {
                    name        : 'index',
                    url         : '/',
                    component   : 'index', 
                })
                .state('register', {
                    name        : 'register',
                    url         : '/register',
                    component   : 'register'
                })
                .state('login', {
                    name        : 'login',
                    url         : '/login',
                    component   : 'login'
                });
            
            $locationProvider.html5Mode(true);

        });

}());
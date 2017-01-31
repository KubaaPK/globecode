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
                })
                .state('auth', {
                    
                })
                .state('auth.index', {
                    name        : 'authenticated',
                    url         : '/authenticated',
                    component   : 'authenticated' 
                })
                .state('auth.addOffer', {
                    name        : 'addOffer',
                    url         : '/authenticated/addOffer',
                    component   : 'addOffer'
                });

            $locationProvider.html5Mode(true);

        });

}());
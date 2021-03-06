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
                })
                .state('auth.myOffers', {
                    name        : 'myOffers',
                    url         : '/authenticated/myOffers',
                    component   : 'myOffers'
                })
                .state('auth.editOffer', {
                    name        : 'editOffer',
                    url         : '/authenticated/myOffers/:id/edit',
                    component   : 'editOffer'
                })
                .state('offerDetail', {
                    name        : 'offerDetail',
                    url         : '/offer/:offerId',
                    component   : 'offerDetails'
                })

            $locationProvider.html5Mode(true);

        });

}());
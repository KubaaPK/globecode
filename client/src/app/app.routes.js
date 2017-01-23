(function () {
    'use strict';

    angular
        .module('app.routes', [])

        .config(function($stateProvider, $locationProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('index', {
                    name: 'index',
                    url: '/',
                    component: 'index', 
                });
            
            $locationProvider.html5Mode(true);

        });

}());
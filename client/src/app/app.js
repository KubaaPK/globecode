(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('angular-jwt');
    require('angular-middleware');
    require('./libs/angular-summernote');
    require('moment');
    require('../../node_modules/moment/locale/pl');
    require('angular-moment');

    // routes
    require('./app.routes');

    // reusable components
    require('./components/nav.component');
    require('./components/foot.component');
    require('./components/authenticatedNav.component');
    require('./components/offer.component');

    //pages
    require('./pages/index/index.component');
    require('./pages/register/register.component');
    require('./pages/login/login.component');
    require('./pages/authenticated/authenticated.component');
    require('./pages/addOffer/addOffer.component');
    require('./pages/myOffers/myOffers.component');
    require('./pages/offerDetails/offerDetails.component');

    //services
    require('./services/authService');
    require('./services/userService');
    require('./services/offersService');


    angular
        .module('globeCode', [
            'ui.router',
            'angular-jwt',
            'summernote',
            'angularMoment',
            'app.routes',
            'page.index',
            'page.register',
            'page.login',
            'page.authenticated',
            'page.addOffer',
            'page.myOffers',
            'page.offerDetails'
        ])
        .run(function($trace, $transitions, $state, $http, $httpParamSerializerJQLike, authFactory, moment) {
            $transitions.onStart({ to: 'auth.**' }, function(trans) {
                var auth = trans.injector().get('authFactory')
                if (auth.isTokenExpired()) {
                return trans.router.stateService.target('login');
                }
            });
             $transitions.onStart({ to: ['login', 'register', 'index'] }, function(trans) {
                var auth = trans.injector().get('authFactory')
                if (!auth.isTokenExpired()) {
                return trans.router.stateService.target('auth.index');
                }
            });

            moment.locale('pl');
            $http.defaults.transformRequest.unshift($httpParamSerializerJQLike);
        })
        .config(['$httpProvider', function ($httpProvider) {

            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};

            $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
                var key, result = [];

                if (typeof data === "string")
                return data;

                for (key in data) {
                if (data.hasOwnProperty(key))
                    result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
                }
                return result.join("&");
            });
        }]);
})();
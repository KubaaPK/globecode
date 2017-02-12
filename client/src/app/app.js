(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('angular-jwt');
    require('angular-middleware');
    require('./libs/angular-summernote');

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
            'app.routes',
            'page.index',
            'page.register',
            'page.login',
            'page.authenticated',
            'page.addOffer',
            'page.offerDetails'
        ])
        .run(function($trace, $transitions, $state, authFactory) {
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
        });
        
})();
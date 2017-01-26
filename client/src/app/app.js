(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('angular-jwt');
    require('angular-middleware');

    // routes
    require('./app.routes');

    // reusable components
    require('./components/nav.component');
    require('./components/foot.component');
    require('./components/authenticatedNav.component');
    require('./components/searchOfferForm.component');
    require('./components/categoriesList.component');

    //pages
    require('./pages/index/index.component');
    require('./pages/register/register.component');
    require('./pages/login/login.component');
    require('./pages/authenticated/authenticated.component');

    //factories
    require('./services/tokenService');
    require('./services/userService');

    angular
        .module('globeCode', [
            'ui.router',
            'ui.router.middleware',
            'angular-jwt',
            'app.routes',
            'page.index',
            'page.register',
            'page.login',
            'page.authenticated'
        ])
        .run(function($trace, $transitions, $state, tokenFactory) {
            $transitions.onStart({ to: 'auth.**' }, function(trans) {
                var auth = trans.injector().get('tokenFactory')
                if (auth.IsTokenExpires()) {
                return trans.router.stateService.target('login');
                }
            });
             $transitions.onStart({ to: ['login', 'register', 'index'] }, function(trans) {
                var auth = trans.injector().get('tokenFactory')
                if (!auth.IsTokenExpires()) {
                return trans.router.stateService.target('auth.index');
                }
            });
        });
        
})();
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
        .run(function($trace, $transitions, tokenFactory) {
            $trace.disable('TRANSITION');

            $transitions.onStart({ to: 'auth.**' }, function(trans) {
                var auth = trans.injector().get('tokenFactory')
                if (auth.IsTokenExpires()) {
                // User isn't authenticated. Redirect to a new Target State
                return trans.router.stateService.target('login');
                }
            });
        });
        
})();
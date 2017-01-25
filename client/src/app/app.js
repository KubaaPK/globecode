(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('angular-jwt');

    // routes
    require('./app.routes');

    // reusable components
    require('./components/nav.component');
    require('./components/foot.component');

    //pages
    require('./pages/index/index.component');
    require('./pages/register/register.component');
    require('./pages/login/login.component');

    //factories
    require('./services/tokenService');

    angular
        .module('globeCode', [
            'ui.router',
            'angular-jwt',
            'app.routes',
            'page.index',
            'page.register',
            'page.login'
        ]);

})();
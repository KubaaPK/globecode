(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');

    // routes
    require('./app.routes');

    // reusable components
    require('./components/nav.component');
    require('./components/foot.component');

    //pages
    require('./pages/index/index.component');
    require('./pages/register/register.component');

    angular
        .module('globeCode', [
            'ui.router',
            'app.routes',
            'page.index',
            'page.register'
        ]);

})();
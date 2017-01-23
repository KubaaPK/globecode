(function () {
    'use strict';

    require('angular');
    require('angular-ui-router');

    require('./app.routes');
    require('./components/index/index.component');

    angular
        .module('globeCode', [
            'ui.router',
            'app.routes',
            'app.index'
        ]);

})();
(function(){

    'use strict';

    angular
        .module('comp.foot', [])
        .component('footBar', {
            templateUrl: 'app/components/foot.template.html' 
        });


        window.addEventListener('scroll', function(){
            if(window.pageYOffset > 600) {
                document.querySelector('.backToTop').classList.add('opacity-visible');
            } else {
                document.querySelector('.backToTop').classList.remove('opacity-visible');
            }
        });


})();
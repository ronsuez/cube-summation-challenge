(function() {
    'use strict';

    angular
        .module('CubeSummation')
        .controller('AppController', Controller);

    Controller.$inject = ['$http'];

    /* @ngInject */
    function Controller($http) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();

(function() {
  'use strict';

  angular
    .module('CubeSummation', [
      ''
    ]);

  angular
    .module('CubeSummation')
    .controller('AppController', Controller);

  Controller.$inject = ['$http'];

  /* @ngInject */
  function Controller($http) {
    var vm = this;

    activate();

    function activate() {
      console.log('AppController activated');
    }

    vm.createCube = function() {

    }

    vm.updateValue = function() {

    }


    vm.queryValue = function() {

    }

  }


})();

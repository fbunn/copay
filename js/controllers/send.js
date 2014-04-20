'use strict';

angular.module('copay.send').controller('SendController',
  function($scope, $rootScope, $location) {
    $scope.title = 'Send';

    $scope.unitIds = ['BTC','mBTC'];
    $scope.selectedUnit = $scope.unitIds[0];

    $scope.submitForm = function(form) {
      if (form.$invalid) {
        $rootScope.flashMessage = { message: 'You can not send a proposal transaction. Please, try again', type: 'error'};
        return;
      }

      var address = form.address.$modelValue;
      var amount = (form.amount.$modelValue * 100000000).toString(); // satoshi to string

      var w = $rootScope.wallet;
      w.createTx( address, amount,function() {
        $rootScope.$digest();
      });
     
      // reset fields
      $scope.address = null;
      $scope.amount = null;
      form.address.$pristine = true;
      form.amount.$pristine = true;

      // TODO: check if createTx has an error.
      $rootScope.flashMessage = { message: 'You send a proposal transaction succefully', type: 'success'};
		};

    $scope.sendTest = function() {
      var w = $rootScope.wallet;
      w.createTx( 'mimoZNLcP2rrMRgdeX5PSnR7AjCqQveZZ4', '12345',function() {
        $rootScope.$digest();
      });
    };
  });

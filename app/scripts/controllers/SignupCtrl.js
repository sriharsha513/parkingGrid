'use strict';

/**
 * @ngdoc function
 * @name parkingGridApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parkingGridApp
 */
angular.module('parkingGridApp')
  .controller('SignupCtrl', function ($scope, $location,
    $localStorage,
    AuthenticationService,
    $uibModal, $log, $document) {

    // During actual implementation check for datatypes
    $scope.user = {
      username: '',
      password: '',
      reenterPassword: '',
      mobileNum: '',
      emailId: '',
      vehicleNum: ''
    }

    $scope.register = function () {
      //Actual Api call
      AuthenticationService.setRegistrationDetails($scope.user);
      $location.path('/login');
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'termsAndConditionModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  });

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('parkingGridApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


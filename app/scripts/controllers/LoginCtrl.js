'use strict';

/**
 * @ngdoc function
 * @name parkingGridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkingGridApp
 */
angular.module('parkingGridApp')
  .controller('LoginCtrl', function ($scope,
    $localStorage,
    $route,
    $location,
    bookedData,
    AuthenticationService) {
    $scope.userDetails = {
      username: null,
      password: null
    };
    var form = $scope.form;
    var bookingExists = false;
    if (bookedData && bookedData.booked) {
      bookingExists = bookedData.booked;
    }
    $scope.loginBtnClick = function () {
      $scope.dataLoading = true;
      var success = function (response) {
        if (bookingExists) {
          $location.path('/confirmation');
        } else {
          $location.path('/overview');
        }
      }
      var failure = function (response) {
        $scope.dataLoading = false;
        console.log(response);
      }
      // todo: need to omit the case senstivity for username
      AuthenticationService.validateUser($scope.userDetails).then(success, failure);
    }
  });



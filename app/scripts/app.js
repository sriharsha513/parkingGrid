'use strict';

/**
 * @ngdoc overview
 * @name parkingGridApp
 * @description
 * # parkingGridApp
 *
 * Main module of the application.
 */
angular
  .module('parkingGridApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'credit-cards'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve:{
          bookedData: function(ParkingData) {
            return ParkingData.getBookingData();
          }
        }
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/overview', {
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl',
        controllerAs: 'signup',
        access: {
          isAccess:true
        }
      })
      .when('/timeslot', {
        templateUrl: 'views/walletInfo.html',
        controller: 'WalletInfoCtrl',
        controllerAs: 'signup'
      })
      .when('/confirmation', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl',
        controllerAs: 'signup',
        resolve:{
          bookedData: function(ParkingData) {
            return ParkingData.getBookingData();
          }
        }
        

      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, $route){
    $rootScope.$on('$routeChangeStart', function(event, curr, prev){
    });

  })
  

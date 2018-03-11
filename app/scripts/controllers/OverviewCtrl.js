angular.module('parkingGridApp')
  .controller('OverviewCtrl', function ($scope, $filter,
    ParkingData, $location) {
    $scope.isDisabled = true;
    $scope.balance = ParkingData.getParkingWalletDetails();
    //$scope.balance = 200;
    var dateAndTimeObj = {
      date: "",
      time: ""
    };
    var success = function (response) {
      console.log(response);
      console.log(JSON.stringify(response));
      $scope.bookingData = response;
    };
    var failure = function (response) {
      console.log(response);
    };
    ParkingData.getParkingData(success, failure);
    $scope.bookSlot = function (data, index) {
      data.time = dateAndTimeObj.time;
      data.date = dateAndTimeObj.date;
      data.booked = true;
      ParkingData.setBookingData(data);
      $scope.selectedItemIndex = index;
      $scope.bookingData[index].booked = data.booked;
      $scope.isDisabled = false;
      console.log($scope.bookingData);
    }
    $scope.reserveSlot = function () {
      console.log('inside reserveSlot');
      if ($scope.balance > 20) {
        $location.path('/confirmation');
      } else {
        $location.path('/timeslot');
      }

    }
    $scope.dateTimeNow = function () {
      $scope.date = new Date();
      dateAndTimeObj.date = $filter('date')($scope.date, "dd/MM/yyyy");
      dateAndTimeObj.time = $filter('date')($scope.date, 'hh:mm:ss a');
    };
    $scope.dateTimeNow();

    $scope.toggleMinDate = function () {
      var minDate = new Date();
      var maxDate = new Date();
      // set to yesterday
      minDate.setDate(minDate.getDate() - 1);
      maxDate.setDate(maxDate.getDate() + 3);
      $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : minDate;
      //    $scope.dateOptions.maxDate = $scope.dateOptions.maxDate ? null : maxDate;
    };

    $scope.dateOptions = {
      showWeeks: false,
      startingDay: 0
    };

    $scope.toggleMinDate();

    // Disable weekend selection
    $scope.disabled = function (calendarDate, mode) {
      return mode === 'day' && (calendarDate.getDay() === 0 || calendarDate.getDay() === 6);
    };

    $scope.open = function ($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.dateOpened = true;
    };

    $scope.dateOpened = false;
    $scope.hourStep = 1;
    $scope.format = "dd-MMM-yyyy";
    $scope.minuteStep = 15;
    // add min-time="minTime" to datetimepicker to use this value 
    $scope.minTime = new Date(0, 0, 0, Math.max(1, $scope.date.getHours() - 2), 0, 0, 0);

    $scope.timeOptions = {
      hourStep: [1, 2, 3],
      minuteStep: [1, 5, 10, 15, 25, 30]
    };

    $scope.showMeridian = true;
    $scope.timeToggleMode = function () {
      $scope.showMeridian = !$scope.showMeridian;
    };

    $scope.$watch("date", function (date) {
      // read date value
      dateAndTimeObj.date = $filter('date')(date, "dd/MM/yyyy");
      dateAndTimeObj.time = $filter('date')(date, 'hh:mm:ss a');
    }, true);

    $scope.resetHours = function () {
      $scope.date.setHours(1);
    };


  });
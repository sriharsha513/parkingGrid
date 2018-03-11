angular.module('parkingGridApp')
    .controller('WalletInfoCtrl', function($scope,$location,$filter,ParkingData){
        //fetch current time slot 
        var timeSlot;
        console.log(timeSlot);
        var date = new Date();
        $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.ddMMMMyyyy = $filter('date')(new Date(), 'dd, MMMM yyyy');
        $scope.HHmmss = $filter('date')(new Date(), 'HH:mm:ss');
        $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
        $scope.cbd = ParkingData.getBookingData();

        // During actual implementation check for datatypes

        $scope.cardInfo = {
            amount: 100,
            name: "",
            number: undefined,
            cvc: "",
            expiration: {
                month: "",
                year: ""
            }
        }
        $scope.submitPayment = function(){
            ParkingData.setParkingWalletDetails($scope.cardInfo);
            $location.path('/overview');
        }
    });

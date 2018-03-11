angular.module('parkingGridApp')
        .factory('ParkingData',function($q,
        $http
        ){
            var currentData = {};
            var parkingFeeInfo = 0;
            var balance = 0;

            // During actual implementation check for datatypes

            var _getParkingData = function(successCtrl, failureCtrl){
                var success = function(response){
                    return successCtrl(response.data);
                }
                var failure = function(response){
                    return failureCtrl(response.data);
                }

                $http.get("../stubs/parkingData.json").then(success, failure)
            }

            var _setBookingData = function(currentBookingData){
                currentData = currentBookingData;
                //http post call
                localStorage.setItem('CurrentBookingData', JSON.stringify(currentBookingData));
            }
            
            var _getBookingData = function(){
                //return currentData;
                //http get call
                return JSON.parse(localStorage.getItem('CurrentBookingData'));
            }

            var _getParkingWalletDetails = function(){
                parkingFeeInfo = JSON.parse(localStorage.getItem('ParkingWalletInfo'));
                parkingFeeInfo === null ? balance = 0 : balance += parkingFeeInfo.amount;
                return balance;
            }

            var _setParkingWalletDetails = function(cardInfo){
                localStorage.setItem('ParkingWalletInfo', JSON.stringify(cardInfo));
            }

            return{
                getParkingData: _getParkingData,
                setBookingData: _setBookingData,
                getBookingData: _getBookingData,
                setParkingWalletDetails: _setParkingWalletDetails,
                getParkingWalletDetails: _getParkingWalletDetails
            }

        });
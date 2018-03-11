
angular.module('parkingGridApp')
    .factory('AuthenticationService', function (
        $q,
        $timeout,
        $localStorage
    ) {
        // var LoginData = [

        //     {
        //         "username": "guru",
        //         "password": "Admin123"
        //     },
        //     {
        //         "username": "sriharsha",
        //         "password": "Admin123"
        //     },
        //     {
        //         "username": "a",
        //         "password": "a",
        //         "money": 100
        //     }
        // ]
        var userData = [];

        var _validateUser = function (userDetails) {
            var deferred = $q.defer();
            var data = JSON.parse(localStorage.getItem('RegistrationDetails'));
            $timeout(function () {
                // validate the user with credentials
                
                // angular.forEach(data, function(value, key){
                //     if(userDetails.username === value.username && userDetails.password === value.password){
                //         return deferred.resolve(value);
                //     }
                // });

                var checkUser = function (userData) {
                    if (userDetails.username === userData.username && userDetails.password === userData.password) {
                        return deferred.resolve(userData);
                    }
                }
                data.filter(checkUser)
                //console.log(data);
                //deferred.resolve(data);
            }, 2000);
            return deferred.promise;
        };

        var _setRegistrationDetails = function (user) {
            userData.push(user);
            //localStorage.setItem('userLoginData', JSON.stringify(LoginData));
            localStorage.setItem('RegistrationDetails', JSON.stringify(userData));
        }
        var _getRegistrationDetails = function() {
            return JSON.parse(localStorage.getItem('RegistrationDetails'));
        }


        return {
            validateUser: _validateUser,
            setRegistrationDetails: _setRegistrationDetails,
            getRegistrationDetails: _getRegistrationDetails
        }

    });

        // // '$q',
        // '$setTimeout',
        // '$localStorage',
angular.module('parkingGridApp')
        .factory('MicroCtrlDataService', function ($q,
                $http) {
                var _fetchMicroCtrlData = function (successCtrl, failureCtrl) {
                        var success = function (response) {
                                return successCtrl(response.data);
                        }
                        var failure = function (response) {
                                return failureCtrl(response.data);
                        }

                        $http.get("../stubs/microCtrlData.json").then(success, failure)
                };

                return {
                        fetchMicroCtrlData: _fetchMicroCtrlData,
                }
        });
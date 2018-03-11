angular.module('parkingGridApp')
    .controller('ConfirmationCtrl', function ($scope, $uibModal, $document,
        $timeout,
        ParkingData,
        bookedData,
        $location,
        MicroCtrlDataService) {
        Object.keys(bookedData).length == 0 ? $location.path('/login') : $scope.bookedData = bookedData;
        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
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
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance, items, selected) {
            $scope.items = items;
            $scope.selected = {
                item: selected || items[0]
            };
            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        var success = function (response) {
            $timeout(function(){
                $scope.showStatusInfo = true;
                if(response.inTime){
                    $scope.status = "YES"; 
                    $scope.inTime = true;
                }else{
                    $scope.status = "NO";
                    $scope.inTime = false;
                }
            }, 5000);
        };
        var failure = function (response) {
            console.log('Waiting for MicroCtrl response');
            console.log(response);
        };
        //MicroCtrlDataService gives you boolean attribute inTime
        //Based on that we will show the things
        MicroCtrlDataService.fetchMicroCtrlData(success, failure);
    });
(function(){
  'use strict';
  angular
    .module('app')
    .controller('TableCtrl', [ '$scope', 'ToastService', 'TableService', 'UtilityService', 'UserService', TableCtrl]);

  function TableCtrl($scope, ToastService, TableService, UtilityService, UserService) {
    $scope.downloads = [];
    $scope.tk = UserService.token();

    var setSize = function(lst) {
      lst.data.forEach(function(download) {
        download.size = UtilityService.formatBytes(download.size);
      })
      return lst;
    };

    TableService.getCompletedDownloads().then(function (response) {
      response = setSize(response);
      $scope.downloads = response.data;
      console.log($scope.downloads);
    }, function(error){
      ToastService.showToast('Oops! Something went wrong fetching data');
    });

  }

})();

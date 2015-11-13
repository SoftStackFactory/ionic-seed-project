"use strict";
/*global angular*/
/*global Ionic*/

angular.module('starter.controllers', [])

.controller('SideMenuCtrl', ["$scope",  function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
}])
.controller('LoginCtrl',["$scope", "SSFAlertsService", "$translate", "$window", "$state", "$ionicHistory", "$ionicAnalytics",
function($scope, SSFAlertsService, $translate, $window, $state, $ionicHistory, $ionicAnalytics) {
  
  var deploy = new Ionic.Deploy();
  $translate.use('es');
  //Deploy check() checks for updates
  deploy.check().then(function(hasUpdate) {
    console.log('Ionic Deploy: Update available: ' + hasUpdate);
    if(hasUpdate) {
      $translate(['LOGIN_CTRL.UPDATE_TITLE_MESSAGE','LOGIN_CTRL.UPDATE_BODY_MESSAGE','LOGIN_CTRL.UPDATE_YES_BUTTON','LOGIN_CTRL.UPDATE_NO_BUTTON']).
      then(function(translation){
   
        SSFAlertsService.showConfirm(translation["LOGIN_CTRL.UPDATE_TITLE_MESSAGE"], translation["LOGIN_CTRL.UPDATE_BODY_MESSAGE"],
                              translation["LOGIN_CTRL.UPDATE_YES_BUTTON"],translation["LOGIN_CTRL.UPDATE_NO_BUTTON"])
        .then(function(response) {
            if(response == true) {
            //Custom Ionic analytics event
            $ionicAnalytics.track('User-Update', {
              mockData: "Relevant data"
            });
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              historyRoot: true,
              disableBack: true
            });
            $state.go("app.update");
           }
        });
      });
    }
  }, function(err) {
    console.error('Ionic Deploy: Unable to check for updates', err);
  });

  $scope.loginData = {
    username: "",
    password: ""
  };
  $scope.doLogin = function(form) {
    if(form.$valid) {
      $translate(['LOGIN_CTRL.LOGIN_SUCCESS_TITLE','LOGIN_CTRL.LOGIN_SUCCESS_MESSAGE']).then(function(translation){
        SSFAlertsService.showAlert(translation["LOGIN_CTRL.LOGIN_SUCCESS_TITLE"], translation["LOGIN_CTRL.LOGIN_SUCCESS_MESSAGE"]);
      });
    }else {
      $translate(['LOGIN_CTRL.LOGIN_FAILED_TITLE','LOGIN_CTRL.LOGIN_FAILED_MESSAGE']).then(function(translation){
        SSFAlertsService.showAlert(translation["LOGIN_CTRL.LOGIN_FAILED_TITLE"], translation["LOGIN_CTRL.LOGIN_FAILED_MESSAGE"]);
      });
    }
  };
}])
.controller('UpdateCtrl', ["$scope", "$ionicLoading", "$state", "$ionicHistory",
function($scope, $ionicLoading, $state, $ionicHistory) {
  
  $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>',
      noBackdrop:true
  });
  $scope.progress = {
    value : "0%"
  };
  var deploy = new Ionic.Deploy();
  deploy.update().then(function(res) {
    //App will automatically reload when updated successfully
     console.log('Ionic Deploy: Update Success! ', res);
  }, function(err) {
    console.log('Ionic Deploy: Update error! ', err);
    goNext();
  }, function(prog) {
     console.log('Ionic Deploy: Progress... ', prog);
     var progString = prog.toString();
     var progArray = progString.split(".");
     $scope.$apply(function() {
       $scope.progress.value = progArray[0] + "%";
     });
  });

  function goNext() {
    $ionicLoading.hide();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      historyRoot: true,
      disableBack: true
    });
    $state.go("app.login");
  }
  
}]);
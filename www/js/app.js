// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'pascalprecht.translate', 'SSFAlerts', 'ngIOS9UIWebViewPatch'])
.constant("LANGUAGE_CODES", {
        "ENGLISH": "en",
        "SPANISH": "es",
        "CHINESE": "cmn"
})
.run(["$ionicPlatform", "$ionicAnalytics", function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    Ionic.io();
    //Dispatch interval, how often do we want our events to be sent to analytics. Default is 30 sec
    $ionicAnalytics.dispatchInterval = 60;
    $ionicAnalytics.register();

  });
}])
.config(["$translateProvider", "LANGUAGE_CODES", function($translateProvider, LANGUAGE_CODES) {
  $translateProvider
  //Load languages files from path 
    .useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    })
    .fallbackLanguage(LANGUAGE_CODES.ENGLISH)
    //Only works if determine preferred language is used
    .registerAvailableLanguageKeys(['en', 'es', 'cmn'], {
      'en_*': LANGUAGE_CODES.ENGLISH,
      'es_*': LANGUAGE_CODES.SPANISH,
      'zh_*': LANGUAGE_CODES.CHINESE
    })
    
    //determinePreferredLanguage tries to look at the locale and determine the language. 
    .determinePreferredLanguage();
    //To set the language, uncomment the next line of code and comment "determinePreferredLanguage"
   // .preferredLanguage(LANGUAGE_CODES.ENGLISH)
    
}])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'SideMenuCtrl'
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.update', {
    url: '/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/update.html',
        controller: 'UpdateCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
}])
.run(["$state", "$ionicHistory", function($state, $ionicHistory){
  //Set deploy channel, default is production. Other available channels are staging and dev..
  var deploy = new Ionic.Deploy();
  deploy.setChannel("dev");
  //CHECK FOR UPDATES AND UPDATE AUTOMATICALLY ON APP START
  /*deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      if(hasUpdate) {
         goNext("app.update");
      }else {
         goNext("app.login");
      }
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
        goNext("app.login");
    });
    
    function goNext(goTo) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        historyRoot: true,
        disableBack: true
       });
       $state.go(goTo);
    }*/
}])
.config(['$ionicAutoTrackProvider', function($ionicAutoTrackProvider) {
  // Don't track which elements the user clicks on.
  $ionicAutoTrackProvider.disableTracking('Tap');
}]);

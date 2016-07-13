// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.rating', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform, $rootScope, $state, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.goHome = function() {
	  $ionicHistory.nextViewOptions({historyRoot: true});
	  $state.go('home');
  };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('home', {
	  url: '/',
	  templateUrl: 'templates/home.html'
  })
  .state('preTest', {
	  url: '/pre-test',
	  templateUrl: 'templates/pre-test.html',
	  controller: 'PretestCtrl',
	  onEnter: function($state) {
		  var userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
		  if(userAnswers) {
			  $state.go('preTestReport', {userAnswers: userAnswers});
		  }
	  }
  })

  .state('chatRooms', {
	  url: '/chat',
	  templateUrl: 'templates/chat-rooms.html',
	  controller: 'ChatRoomsCtrl'
  })
  .state('chat', {
	  url: '/chat/:roomID',
	  templateUrl: 'templates/chat.html',
	  params: { chat: null },
	  controller: 'ChatCtrl'
  })

  .state('preTestReport', {
	  url: '/pre-test-report',
	  templateUrl: 'templates/pre-test-report.html',
	  params: {
		  userAnswers: null
	  },
	  controller: 'PretestReportCtrl'
  })

  .state('symptoms', {
    url: '/symptoms',
	templateUrl: 'templates/symptoms.html',
	controller: 'DashCtrl'
  })

  .state('resources', {
      url: '/resources',
	  abstract: true,
	  template: '<ion-nav-view></ion-nav-view>'
    })
  .state('resources.categories', {
	  url: '/categories',
	  templateUrl: 'templates/resources-categories.html',
	  controller: function($scope, Resources) {
		  $scope.categories = Resources;
	  }
  })
  .state('resources.items', {
	  url: '/categories/:category/items',
	  templateUrl: 'templates/resources-items.html',
	  controller: function($scope, $stateParams, Resources) {
		  $scope.category = $stateParams.category;
		  $scope.items = Resources[$stateParams.category];
	  }
  })
  .state('resources.detail', {
	  url: '/categories/:category/items/:itemID',
	  templateUrl: 'templates/resources-detail.html',
	  controller: function($scope, $stateParams, Resources) {
		  $scope.resource = Resources[$stateParams.category][$stateParams.itemID];
	  }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/resources', '/resources/category');

});

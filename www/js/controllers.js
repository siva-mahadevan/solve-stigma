angular.module('starter.controllers', [])

.controller('ChatCtrl', function($scope, $ionicPopup, $stateParams, $ionicLoading, $firebaseArray, ChatService) {
	$scope.messages = [];
	$scope.currentMessage = "";
	var roomID;

	if(!ChatService.userData) {
		$scope.data = {};

		$ionicPopup.show({
			template: '<input type="text" ng-model="data.userName">',
			title: 'Enter your name',
			subTitle: 'Alphanumeric characters only',
			scope: $scope,
			buttons: [{
				text: '<b>Submit</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.userName) {
						e.preventDefault();
					} else {
						return $scope.data.userName;
					}
				}
			}]
		}).then(function(userName) {
			$ionicLoading.show({
				template: 'Loading...'
			}).then(function(){
				ChatService.login(userName, function() {
					$ionicLoading.hide().then(init);
				});
			});
		});
	} else {
		init();
	}

	$scope.sendMessage = function() {
		console.log('this was called');
		if($scope.currentMessage) {
			ChatService.chat.sendMessage(roomID, $scope.currentMessage, 'default', function() {
				$scope.currentMessage = "";
			});
		}
	};

	function init() {
		$scope.currentUserName = ChatService.userName;

		roomID = $stateParams.roomID;
		ChatService.chat.enterRoom(roomID);

		ChatService.chat.getRoom(roomID, function(room) {
			$scope.roomName = room.name;
		});

		$scope.messages = $firebaseArray(ChatService.chatRef.child('/room-messages/' + roomID).orderByChild("timestamp").limitToLast(25));
	}
})

.controller('ChatRoomsCtrl', function($scope, $ionicPopup, $ionicLoading, ChatService) {
	if(!ChatService.userData) {
		$scope.data = {};

		$ionicPopup.show({
			template: '<input type="text" ng-model="data.userName">',
			title: 'Enter your name',
			subTitle: 'Alphanumeric characters only',
			scope: $scope,
			buttons: [{
				text: '<b>Submit</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.userName) {
						e.preventDefault();
					} else {
						return $scope.data.userName;
					}
				}
			}]
		}).then(function(userName) {
			$ionicLoading.show({
				template: 'Loading...'
			}).then(function(){
				ChatService.login(userName, function() {
					$ionicLoading.hide();
				});
			});
		});
	}

	ChatService.chat.getRoomList(function(rooms) {
		$scope.rooms = rooms;
	});

})

.controller('PretestCtrl', function($scope, $ionicPopup, $ionicHistory, $state, PretestQuestions) {
	var userAnswers = [];

	$scope.currentQuestion = 0;
	$scope.chooseAnswer = function(answer) {
		userAnswers[$scope.currentQuestion] = answer;
		if($scope.currentQuestion == $scope.questions.length - 1) {
			$ionicPopup.alert({
				title: 'Pre-Test Complete!',
				template: 'Successfully completed the Mental Illness Awareness Pre-Test.'
			}).then(function() {
				$ionicHistory.nextViewOptions({disableBack: true});
				$state.go('preTestReport', {userAnswers: userAnswers});
			});
		} else {
			$scope.currentQuestion++;
		}
	};
	$scope.questions = PretestQuestions;
})

.controller('PretestReportCtrl', function($scope, $stateParams, $ionicHistory, $state, PretestQuestions) {
	$ionicHistory.removeBackView();
	$scope.questions = PretestQuestions;
	$scope.userAnswers = $stateParams.userAnswers || JSON.parse(localStorage.getItem('userAnswers'));
	localStorage.setItem('userAnswers', JSON.stringify($scope.userAnswers));

	$scope.resetTest = function() {
		localStorage.removeItem('userAnswers');
		$ionicHistory.nextViewOptions({disableBack: true});
		$state.go('preTest');
	};
})

.controller('DashCtrl', function($scope, MentalDisorders) {
	$scope.disorders = MentalDisorders;
});

formApplication.controller('formController', ['$scope', 'formService',
	function ($scope, formService) {

		var todayMinus18 = new Date();
		todayMinus18.setFullYear(todayMinus18.getFullYear() - 18);

		$scope.dateChanged = function () {
			$scope.tooYoung = $scope.user.birthdate > todayMinus18;
			$scope.form.birthdate.$setValidity("You are too young", !$scope.tooYoung);
		}

		$scope.submit = function (user) {
			formService.sendUserData(user)
				.success(function (data) {
					console.log(data);
				})
				.error(function (data) {
					console.log('error');
				});
		}
	}]);
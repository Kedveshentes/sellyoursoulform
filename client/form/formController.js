formApplication.controller('formController', ['$scope', 'formService',
	function ($scope, formService) {

		var aMoment18YearsAgo = moment().subtract(18, 'years');

		$scope.dateChanged = function () {
			$scope.tooYoung = moment($scope.user.birthdate) > aMoment18YearsAgo;
			$scope.form.birthdate.$setValidity("You are too young", !$scope.tooYoung);
		}

		$scope.submit = function (user) {
			formService.sendUserData(user)
				.success(function (data) {
					alert('Your data has been sent successfully!')
				})
				.error(function (data) {
					alert('Something went wrong, most likely you have passed the client side validation.')
				});
		}
	}]);
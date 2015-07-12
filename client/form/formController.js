formApplication.controller('formController', ['$scope', 'formService',
	function ($scope, formService) {

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
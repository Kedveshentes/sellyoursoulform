formApplication.service('formService', ['$http',
	function ($http) {
		this.sendUserData = function (data) {
			return $http.post('/userdata', data);
		}
	}]);
formApplication.directive('autoComplete', ['$http',
	function ($http) {
		return {
			restrict    : 'AE',
			templateUrl : '/autocomplete/autoComplete.html',
			scope       : {
				selectedSuggestion : '='
			},
			link        : function ($scope, elem, attrs) {
				$scope.selectedSuggestion = '';

				$scope.search = function () {
					$http.get('/search/occupation/', { params : { string : $scope.searchText }})
						.success(function (response) {
							$scope.searchArray = response;
						});
				}

				$scope.setActiveIndex = function (index) {
					$scope.activeIndex = index;
				}

				$scope.clearOccupationsData = function () {
					$scope.searchArray = [];
				}

				$scope.selectSuggestion = function (index) {
					$scope.selectedSuggestion = $scope.searchArray[index];
					$scope.searchText = $scope.selectedSuggestion;
					$scope.clearOccupationsData();
				}

				$scope.autocompleteOffClicked = function () {
					$scope.selectedSuggestion = $scope.searchText;
					$scope.clearOccupationsData();
				}

				$scope.checkKeyDown = function (event) {
					switch (event.keyCode) {
						case 40:
							event.preventDefault();
							if ($scope.activeIndex < $scope.searchArray.length - 1) {
								$scope.setActiveIndex($scope.activeIndex + 1);
							}
						break;
						case 40:
							event.preventDefault();
							if ($scope.activeIndex > 0) {
								$scope.setActiveIndex($scope.activeIndex - 1);
							}
						break;
						case 40:
							event.preventDefault();
							$scope.clearOccupationsData();
						break;
						case 40:
							event.preventDefault();
							if ($scope.activeIndex < $scope.searchArray.length - 1) {
								$scope.setActiveIndex($scope.activeIndex + 1);
							}
						break;
					}
				}
			}
		}
	}]);
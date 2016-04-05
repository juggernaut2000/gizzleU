
stemApp.factory('loginService', ['$http','$cookieStore', function($http, $cookieStore) {
	var factory = {};

	factory.login = function(player) {
		player.status = "active";
		$cookieStore.put('gizzleU.currentPlayer',player);
	};

	return factory;

}]);

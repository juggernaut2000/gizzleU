
stemApp.factory('playerService', ['$http','$cookieStore', function($http, $cookieStore) {
	var factory = {};
	var goLive = false;
	var currentPlayer = $cookieStore.get('gizzleU.currentPlayer');
	//var currentPlayer = null;

	var players =
	[
		{
			"profileId" : "Sasha",
            "password": "",
			"avatar" : "princess-girl",
			"badges" : ["blue", "green", "orange", "star"],
			"points" : 5000,
			"status" : ""
		},
		{
			"profileId" : "Nivea",
            "password": "",
			"avatar" : "cat-girl",
			"badges" : ["blue", "green"],
			"points" : 1600,
			"status" : ""
		},
		{
			"profileId" : "Destiny",
            "password": "",
			"avatar" : "horn-girl",
			"badges" : ["blue"],
			"points" : 700,
			"status" : ""
		}
	];

	factory.addPlayer = function(newPlayer) {
		if(goLive) {
			$http({
				method: 'PUT',
				url: 'http://GizzleU.mybluemix.net/profile/new/:'+ newPlayer.profileId
			}).then(function successCallback(response) {
				console.log(response);
				playerData = response.data;
				newPlayer.requestId = playerData._id;
				/*if(playerData){
					updatePlayer = {};
					updatePlayer._id = playerData._id;
					updatePlayer.profileId = playerData._id;
					newPlayer.currentLevel = newPlayer.avatar;
					$http({
						method: 'POST',
						url: 'http://GizzleU.mybluemix.net/profile/update',
						data:
					}).then(function successCallback(response) {
						questions = response.data;
					}, function errorCallback(response) {
						console.log(error);
					});
				}*/
			}, function errorCallback(response) {
				console.log("*******ERROR********");
				console.log(response);
			});
		}else{
			players.push(newPlayer);
		}

		currentPlayer = newPlayer;
	};

	factory.setPlayer = function(inputPlayer) {
		for(i in players){
			player = players[i];
			if(player.profileId === inputPlayer.profileId ){
				player.status = "active";
				currentPlayer = player;
			}
		}
	};

	factory.getCurrentPlayer = function() {
		return currentPlayer;
	};

	factory.getAllPlayers = function() {
		if(goLive) {
			$http({
				method: 'GET',
				url: 'http://GizzleU.mybluemix.net/profile/new/:'+profileId
			}).then(function successCallback(response) {
				questions = response.data;
			}, function errorCallback(response) {
				console.log(error);
			});
		}else{
			found = false;
			for(i in players){
				player = players[i];
				if(player.profileId === currentPlayer.profileId ){
					found = true;
					break;
				}
			}
			if(!found)
				players.push(currentPlayer);
		}

		return players;
	};

	factory.addPoints = function(points) {
		currentPlayer.points += points;
	};

	factory.getTotalPoints = function() {
		return currentPlayer.points;
	};

	factory.recordPoints = function() {
		return players;
	};

	return factory;

}]);


angular.module('stemApp').factory('gameService', function() {
	var factory = {};
	var currentTile = "";
	var selectedTiles = [];


	factory.getCurrentQuestion = function() {
		return totalPoints;
	};

	factory.setCurrentTile = function(tile) {
		currentTile = tile;
	};

	factory.getCurrentTile = function() {
		return currentTile;
	};

	factory.addTileToSelectedList = function() {
		selectedTiles.push(currentTile);
	};

	factory.getSelectedTiles = function() {
		return selectedTiles;
	};

	return factory;

});

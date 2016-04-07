
angular.module('stemApp').factory('questionService', ['$http', function($http) {
	var factory = {};
	var getLiveQuestions = false;
	var currentQuestion = "";
	var answerState = false;
	var questions =	{
		"fashion" : [
			{
				"id" : "01",
				"questionText" : "The popular ugg boots were made of sheep skin on the outside and fleece on the inside?  What is fleece made of?",
				"correctAnswer" : "plastic",
				"answerChoices" : ["sheeps fur", "cotton", "rayon"],
				"points" : 500,
				"category" : "fashion",
				"funfact" : "Traditional fleece fabric comes from polyester, which is made from plastic",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			}
		],
		"hair-makeup" : [
			{
				"id" : "01",
				"questionText" : "If you run out of lip balm what alternative can you use?",
				"correctAnswer" : "Eye cream",
				"answerChoices" : ["cold cream", "lemon juice", "tooth paste"],
				"points" : 100,
				"category" : "hair-makeup",
				"funfact" : "The main ingredient in eye cream is Vitamin E oil which contains a	multitude of antioxidants that protect and repair the skin",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "One of the element's used in makeup is 'O'. What is the element's name?",
				"correctAnswer" : "Oxygen",
				"answerChoices" : ["Oval", "Oilyn", "Oxycodin"],
				"points" : 200,
				"category" : "hair-makeup",
				"funfact" : "Oxygen is a chemical element with symbol O and atomic number 8. It is believed that it promotes healing & helps skin look young.",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			}
		],
		"pop-culture" : [
			{
				"id" : "01",
				"questionText" : "Name the most popular site to shop online, it's also the name of the South American river that contains the largest volume of water in the world?",
				"correctAnswer" : "Amazon",
				"answerChoices" : ["Zazzle", "Yahoo", "Google"],
				"points" : 200,
				"category" : "pop-culture",
				"funfact" : "In one second the Amazon pours more than 55 million gallons, or 600,000 cubic meters of water, into the Atlantic Ocean, which dilutes the ocean's saltiness for 100 miles from shore",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "Hoverboards became popular in 2015.  What enable the boards to move?",
				"correctAnswer" : "gravity",
				"answerChoices" : ["friction", "heat", "magnets"],
				"points" : 1000,
				"category" : "pop-culture",
				"funfact" : "This scooter uses accelero meter-based leveling and gyroscopic sensors that detect the changes within the pitch angle and for balancing enabling it to drive the wheels backwards and forward as necessary to return the pitch to uprightness",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			}
		],
		"music" : [
			{
				"id" : "01",
				"questionText" : "Silento's Watch Me Whip went viral last year. How many musical bars is the song made of",
				"correctAnswer" : "23",
				"answerChoices" : ["10", "54", "100"],
				"points" : 500,
				"category" : "music",
				"funfact" : "Watch Me Whip was originally recorded as a 15-second Instagram video",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			}
		]
	};

	factory.getQuestions = function() {
		if(getLiveQuestions) {
			$http({
				method: 'GET',
				url: 'https://api.github.com/users'
			}).then(function successCallback(response) {
				questions = response.data;
			}, function errorCallback(response) {
				console.log(error);
			});
		}
		return questions
	};

	factory.setCurrentQuestion = function(selectedQuestion) {
		currentQuestion = selectedQuestion;
	};

	factory.getCurrentQuestion = function() {
		return currentQuestion;
	};

	factory.setAnswerState = function(isAnswerCorrect) {
		answerState = isAnswerCorrect;
	};

	factory.getAnswerState = function() {
		return answerState;
	};

	return factory;

}]);

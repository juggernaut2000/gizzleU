
angular.module('stemApp').factory('questionService', ['$http', function($http) {
	var factory = {};
	var getLiveQuestions = false;
	var currentQuestion = "";
	var answerState = false;
	var questions =	{
		"fashion" : [
			{
				"id" : "01",
				"questionText" : "100At the SuperBowl, Beyonce work an outfit made of what metal?",
				"correctAnswer" : "gold",
				"answerChoices" : ["silver", "copper", "iron", "plutonim"],
				"points" : 100,
				"category" : "fashion",
				"funfact" : "Beyonce is an alien",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "500The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 500,
				"category" : "fashion",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "200The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 200,
				"category" : "fashion",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "1000The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 1000,
				"category" : "fashion",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			}
		],
		"hair-makeup" : [
			{
				"id" : "01",
				"questionText" : "200At the SuperBowl, Beyonce work an outfit made of what metal?",
				"correctAnswer" : "gold",
				"answerChoices" : ["silver", "copper", "iron", "plutonim"],
				"points" : 200,
				"category" : "hair-makeup",
				"funfact" : "Beyonce is an alien",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "100The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 100,
				"category" : "hair-makeup",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "1000Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 1000,
				"category" : "hair-makeup",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "500Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 500,
				"category" : "hair-makeup",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			}
		],
		"pop-culture" : [
			{
				"id" : "01",
				"questionText" : "1000At the SuperBowl, Beyonce work an outfit made of what metal?",
				"correctAnswer" : "gold",
				"answerChoices" : ["silver", "copper", "iron", "plutonim"],
				"points" : 1000,
				"category" : "pop-culture",
				"funfact" : "Beyonce is an alien",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "200The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 200,
				"category" : "pop-culture",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "100Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 100,
				"category" : "pop-culture",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "500Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 500,
				"category" : "pop-culture",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			}
		],
		"music" : [
			{
				"id" : "01",
				"questionText" : "200At the SuperBowl, Beyonce work an outfit made of what metal?",
				"correctAnswer" : "gold",
				"answerChoices" : ["silver", "copper", "iron", "plutonim"],
				"points" : 200,
				"category" : "music",
				"funfact" : "Beyonce is an alien",
				"correctAttempts" : 0, //session based: show questions that have been attempted the least
				"incorrectAttempts" : 0
			},
			{
				"id" : "02",
				"questionText" : "1000The Millennium Force in Ohio is the world's largest and tallest steel roller coaster.  What braking systm was it engineered with?",
				"correctAnswer" : "magnetic",
				"answerChoices" : ["friction", "heat", "glass", "platinum"],
				"points" : 1000,
				"category" : "music",
				"funfact" : "It travels at speeds up to 92 miles per hour",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "500Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 500,
				"category" : "music",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
				"incorrectAttempts" : 0
			},
			{
				"id" : "01",
				"questionText" : "100Twitter, the most popular social media app is written in what programming language",
				"correctAnswer" : "python",
				"answerChoices" : ["java", "javascript", "c++", "swift"],
				"points" : 100,
				"category" : "music",
				"funfact" : "Twitter has over 50 billion users which is more than the number of people in the world",
				"correctAttempts" : 0,
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

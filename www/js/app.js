var stemApp = angular.module('stemApp', ['ngRoute', 'ui.bootstrap', 'ngCookies']);

//stemApp.config(function ($routeProvider, $locationProvider) {
stemApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'GameController',
                templateUrl: 'views/gameboard.html'
                //You need to remove the beginning "/".
                //It works just perfect while you simulate on the PC browser and works fine on iOS as well but fails only in case of Android
                //templateUrl: '/views/gameboard.html'
           })
        .when('/login',
            {
                controller: 'LoginController',
                templateUrl: 'views/login.html'
            })
        .when('/question',
            {
                controller: 'QuestionController',
                templateUrl: 'views/question.html'
            })
        .when('/dashboard',
            {
                controller: 'DashboardController',
                templateUrl: 'views/dashboard.html'
            })
        .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
    //$locationProvider.hashPrefix('!');
});

stemApp.run(['$location','$cookieStore', function($location, $cookieStore){
    currentPlayer = $cookieStore.get('gizzleU.currentPlayer');
    if(!currentPlayer){
        $location.path('/login');
    }
   // $location.path('/login');

}]);

stemApp.controller('GameController', ['$scope', '$location', 'questionService','gameService', 'playerService',
    function($scope, $location, questionService, gameService, playerService) {
        $scope.game = {
            "totalPoints": 0
        };

        $scope.selectedTiles = gameService.getSelectedTiles();
        $scope.questions = questionService.getQuestions();
        $scope.game.totalPoints = playerService.getTotalPoints();


        $scope.displayQuestion = function(tileCategory, points, selectedTile) {
            gameService.setCurrentTile(selectedTile);
            categoryQuestions = $scope.questions[tileCategory]
            for (i in categoryQuestions) {
                question = categoryQuestions[i]
                if(points == question.points){
                    question.answerChoices.push(question.correctAnswer);
                    question.answerChoices = shuffleArray(question.answerChoices);
                    questionService.setCurrentQuestion(question);
                    $location.path('/question');
                }
            }
        }

        $scope.isAnswered = function(tile) {
            isAnswered = false;
            if($scope.selectedTiles.indexOf(tile) != -1){
                isAnswered = true;
            }
            return isAnswered;
        }

        $scope.showDashboard = function(tile) {
            $location.path('/dashboard');
        }
    }
]);

stemApp.controller('LoginController', ['$scope', '$location','loginService','playerService',
    function($scope, $location, loginService, playerService) {
        $scope.player = {
            "profileId": "",
            "password": "",
            "avatar": "",
            "points": 0
        };

        $scope.login = function() {
            loginService.login($scope.player)
            playerService.addPlayer($scope.player);
            $location.path('/gameboard');
        };

        $scope.cancel = function() {
            $location.path('/gameboard');
        };
    }
]);

stemApp.controller('DashboardController', ['$scope', '$location','playerService',
    function($scope, $location, playerService) {
        $scope.count = 0;
        $scope.allPlayers = playerService.getAllPlayers();
    }
]);

stemApp.controller('QuestionController', ['$scope', '$location','$uibModal', 'questionService', 'gameService', 'playerService',
    function($scope, $location, $uibModal, questionService, gameService, playerService) {
        $scope.currentQuestion = questionService.getCurrentQuestion();
        $scope.answerState = questionService.getAnswerState();
        $scope.question = {
            "selectedAnswer": ""
        };

        $scope.setAnswer = function(answer){
            $scope.question.selectedAnswer = answer;
        };

        $scope.checkAnswer = function(){
            if($scope.question.selectedAnswer == $scope.currentQuestion.correctAnswer){
                questionService.setAnswerState(true)
                playerService.addPoints( $scope.currentQuestion.points)
            }else{
                questionService.setAnswerState(false)
            }

            gameService.addTileToSelectedList()
            $scope.open();
        };

        $scope.open = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal_answers.html',
                controller: 'AnswerModalController',
                size: 'sm',
            });
        };

    }
]);


stemApp.controller('AnswerModalController', ['$scope','$uibModalInstance', '$location', 'questionService',
    function ($scope, $uibModalInstance, $location, questionService) {
        $scope.currentQuestion = questionService.getCurrentQuestion();
        $scope.answerState = questionService.getAnswerState();
        $scope.question = {
            "funfact": "",
            "answerTitle": "",
            "displayHighlight": "",
            "displayText": "",
            "displayPostText": "",
            "modalIcon": "",
            "modalTitle": ""
        };

        if($scope.answerState){
            $scope.question.modalTitle = "Cha-Ching! ";
            $scope.question.modalIcon = "fa fa-bolt fa-2x";
            $scope.question.displayText = "You rocked it! Rack em. Add another ";
            $scope.question.displayHighlight = $scope.currentQuestion.points;
            $scope.question.displayPostText = " to the pot!";
            $scope.question.answerTitle = "Did you know?";
            $scope.question.funfact = $scope.currentQuestion.funfact;
        }else{
            $scope.question.modalTitle = "Awww Man...";
            $scope.question.modalIcon = "fa fa-meh-o fa-2x";
            $scope.question.displayText = "Good try, but not quite right. Next time, be one with the force";
        };

        $scope.ok = function () {
            $uibModalInstance.close();
            $location.path('/gameboard');
        };
    }
]);



/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
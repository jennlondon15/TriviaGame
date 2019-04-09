const game = {
  currentQuestion: 0,
  correctAnswer: '',
  counter: 30,
  correct: 0,
  incorrect: 0,
  startCountDown() {
    // TODO - Load Question on Start
    // TODO - Hide elements as needed during game/during end
    // TODO - Call other functions to show win/lose view
    // TODO - Reset countdown as user acknowledges answer
    // TODO - Check if game is over and rain money if the won more than 7 💰💰💰💰
    // TODO - Make it sparkle
    // TODO - Fade animations when user clicks start and fade to next questions
    // TODO - Kiss my husband! 💘

    const timer = setInterval(function() {
      console.log(game.counter);
      $('#counter-number').text((game.counter -= 1));
      if (game.counter <= 0) {
        $('#counter-number').fadeOut('slow');
        game.loadQuestion();
        game.counter = 30;
        clearInterval(timer);
      }
    }, 1000);

    if (game.counter === 0) {
      console.log('Looks Like You Ran Out Of Time!');
      game.timeUp();
    }
  },
  selectQuestion: number => questions[number],
  loadQuestion() {
    // If number is less then length of Question array use the currentQuestion Number, if not return to zero
    const QNumber =
      game.currentQuestion < questions.length
        ? game.currentQuestion
        : (game.currentQuestion = 0);

    // Call for current question, Function will return question object
    const q = game.selectQuestion(QNumber);

    // Queue up the next question selector
    game.currentQuestion += 1;

    // Set question text on DOM
    $('.question').text(q.question);
    // Empty out answer options before loading new ones
    $('.answer').empty();
    // Loop through answer array and make new options for new question
    $.each(q.answers, function(key, value) {
      // Function returns html <p>Answer</p> and appends it to answers container
      game.createOptions(value);
    });
  },
  createOptions(options) {
    // create a new p element
    const answerBlock = document.createElement('p');
    // and give it some content
    const answerText = document.createTextNode(options);
    // add the text node to the newly created p
    answerBlock.appendChild(answerText);
    // Add Answerblock to answers container
    $('.answer').append(answerBlock);
  },
};

// Clicks
$('#start-over').on('click', function() {
  game.reset();
});

$('.answer-button').on('click', function(e) {
  game.clicked(e);
});

$('#start').on('click', function() {
  game.startCountDown();
});

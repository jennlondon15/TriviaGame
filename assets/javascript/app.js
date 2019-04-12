// TODO Link images
// TODO Make it looks awesome
// TODO Add a "next question" button when answer screen shows up

const panel = $('.quiz');
const countStartNumber = 30;

// click events
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '.start', function(e) {
  $('.timer').prepend(
    '<h2>Time Remaining: <span id="count-number">30</span> Seconds</h2>'
  );
  game.loadQuestion();
});

// question array
const questions = [
  {
    question: 'How much were admission prices when Disney World first opened?',
    answers: ['$1.10', '$1.00', '$0.75', '$1.50'],
    correctAnswer: '$1.00',
    image: '../images/question1.jpg',
  },
  {
    question:
      'When Disneyland was first built, what occupied the land before it was bought by Walt?',
    answers: ['A horse track', 'Open land', 'An apple farm', 'An orange grove'],
    correctAnswer: 'An orange grove',
    image: '../images/question2.jpg',
  },
  {
    question:
      'After building Disneyland, where did Walt always live when he visited Disneyland?',
    answers: [
      'Above the firehouse',
      'A small apartment in Club 33',
      'In the Cinderella castle',
      'A house near the park',
    ],
    correctAnswer: 'Above the firehouse',
    image: '../images/question3.jpg',
  },
  {
    question:
      'At the train station in New Orleans Square, guests can hear a telegraph clicking away. What does the message say?',
    answers: [
      'It is the lyrics to "The Mickey Mouse Club" theme',
      'It is the speech Walt Disney gave when the park first opened',
      'It is the lyrics to Walts favorite song, "Feed the birds"',
      'Nothing, just random clicks',
    ],
    correctAnswer:
      'It is the speech Walt Disney gave when the park first opened',
    image: '../images/question4.jpg',
  },
  {
    question: 'What was Mickey Mouse originally named?',
    answers: ['Elias Mouse', 'Oswald', 'Nicolas Mouse', 'Mortimer Mouse'],
    correctAnswer: 'Mortimer Mouse',
    image: '../images/question5.jpg',
  },
  {
    question: 'Which Disneyland attraction was present opening day?',
    answers: [
      'Dumbo the Flying Elephant',
      'Alice In Wonderland',
      'The Jungle Cruise',
      'The Enchanted Tiki Room',
    ],
    correctAnswer: 'The Jungle Cruise',
    image: '../images/question6.jpg',
  },
  {
    question:
      'What is the name of the exclusive, invite-only car on the Disneyland Railroad?',
    answers: ['Lily Bell', 'C.K. Holliday', 'Ron Disney', 'Minnie Mouse'],
    correctAnswer: 'Lily Bell',
    image: '../images/question7.jpg',
  },
  {
    question: 'How many days did it take to build Disneyland?',
    answers: ['1251', '421', '365', '999'],
    correctAnswer: '365',
    image: '../images/question8.jpg',
  },
  {
    question:
      'What is the most expensive Disneyland Resort attraction ever built?',
    answers: [
      'Radiator Springs Racers',
      'Star Tours',
      'Twilight Zone Tower of Terror',
      'Indiana Jones Adventure: Temple of the Forbidden Eye',
    ],
    correctAnswer: 'Radiator Springs Racers',
    image: '../images/question9.jpg',
  },
  {
    question:
      'What was the last attraction which Walt Disney himself participated in designing?',
    answers: [
      'Fantasmic!',
      'Big Thunder Mountain Railroad',
      'The Pirates of the Caribbean',
      'Peter Pans Flight',
    ],
    correctAnswer: 'The Pirates of the Caribbean',
    image: '../images/question10.jpeg',
  },
];

const game = {
  questions,
  currentQuestion: 0,
  count: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown() {
    game.count--;
    $('#count-number').html(game.count);
    // console.log('#count-number');

    if (game.count === 0) {
      // console.log('Looks Like You Ran Out Of Time!');
      game.timeUp();
    }
  },
  loadQuestion() {
    timer = setInterval(game.countdown, 1000);
    panel.html(`<h2>${questions[this.currentQuestion].question}</h2>`);
    for (let i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append(
        `${'<button class="answer-button" class="button"' + 'data-name="'}${
          questions[this.currentQuestion].answers[i]
        }">${questions[this.currentQuestion].answers[i]}</button>`
      );
    }
  },
  nextQuestion() {
    game.count = countStartNumber;
    $('#count-number').html(game.count);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp() {
    clearInterval(timer);
    $('#count-number').html(game.count);

    panel.html('<h2>The Timer Ran Out!</h2>');
    panel.append(
      `<h3>The Answer Is: ${questions[this.currentQuestion].correctAnswer}`
    );

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },
  results() {
    clearInterval(timer);

    panel.html('<h2>Good Job! Lets See How You Did.</h2>');
    $('#count-number').html(game.count);
    panel.append(`<h3>Answered Correctly: ${game.correct}</h3>`);
    panel.append(`<h3>Answered Incorrectly: ${game.incorrect}</h3>`);
    panel.append(
      `<h3>Left Unanswered: ${questions.length -
        (game.incorrect + game.correct)}</h3>`
    );
    panel.append('<br><button class="start-over">Play Again</button>');
  },
  clicked(e) {
    clearInterval(timer);

    if (
      $(e.target).data('name') === questions[this.currentQuestion].correctAnswer
    ) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Ah Man! That Wasnt Right!</h2>');
    panel.append(
      `<h3>The Answer Is: ${questions[game.currentQuestion].correctAnswer}</h3>`
    );

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },
  answeredCorrectly() {
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Yay! You Got It Right!</h2>');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },
  reset() {
    this.currentQuestion = 0;
    this.count = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  },
};

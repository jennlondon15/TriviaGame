const panel = $('.card');
const countStartNumber = 30;

// Clicks
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('.container').prepend(
    '<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>'
  );
  game.loadQuestion();
});

// Questions
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
    question: 'What is the name of the exclusive, invite-only car on the Disneyland Railroad?
    ',
    answers: ['Lily Bell', 'C.K. Holliday', 'Ron Disney', 'Minnie Mouse'],
    correctAnswer: 'Lilly Bell',
    image: '../images/question7.jpg',
  },
  {
    question:
      'How many days did it take to build Disneyland?',
    answers: ['1251', '421', '999', '365'],
    correctAnswer: '365',
    image: '../images/question8.jpg',
  },
  {
    question:
      'What is the most expensive Disneyland Resort attraction ever built?',
    answers: ['Radiator Springs Racers', 'Star Tours', 'Twilight Zone Tower of Terror', 'Indiana Jones Adventure: Temple of the Forbidden Eye'],
    correctAnswer: 'Radiator Springs Racers',
    image: '../images/question9.jpg',
  },
  {
    question:
      'What was the last attraction which Walt Disney himself participated in designing?',
    answers: ['Fantasmic!', 'Big Thunder Mountain Railroad', 'The Pirates of the Caribbean', 'Peter Pans Flight'],
    correctAnswer: 'The Pirates of the Caribbean',
    image: '../images/question10.jpeg',
  },
];

var game = {
  questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown() {
    game.counter--;
    $('#counter-num').html(game.counter);

    if (game.counter === 0) {
      console.log('Looks Like You Ran Out Of Time!');
      game.timeUp();
    }
  },
  loadQuestion() {
    timer = setInterval(game.countdown, 1000);
    panel.html(`<h2>${questions[this.currentQuestion].question}</h2>`);
    for (let i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append(
        `${'<button class="answer-button" id="button"' + 'data-name="'}${
          questions[this.currentQuestion].answers[i]
        }">${questions[this.currentQuestion].answers[i]}</button>`
      );
    }
  },
  nextQuestion() {
    game.counter = countStartNumber;
    $('#counter-num').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },


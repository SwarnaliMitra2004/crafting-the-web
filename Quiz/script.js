// DOM Elements
const startScreen = document.getElementById("start-screen"); // This is the start screen element, it contains the title and the start button
const quizScreen = document.getElementById("quiz-screen"); // This is the quiz screen element, it contains the question, answers, and progress bar
const resultScreen = document.getElementById("result-screen"); // This is the result screen element, it contains the final score, message, and restart button
const startButton = document.getElementById("start-btn"); // This is the start button element, it starts the quiz when clicked
const questionText = document.getElementById("question-text"); // This is the question text element, it displays the current question
const answersContainer = document.getElementById("answers-container"); // This is the answers container element, it holds the answer buttons for the current question
const currentQuestionSpan = document.getElementById("current-question"); // This is the current question span element, it displays the current question number
const totalQuestionsSpan = document.getElementById("total-questions"); // This is the total questions span element, it displays the total number of questions in the quiz
const scoreSpan = document.getElementById("score"); // This is the score span element, it displays the current score of the user during the quiz
const finalScoreSpan = document.getElementById("final-score"); // This is the final score span element, it displays the final score of the user after the quiz is completed
const maxScoreSpan = document.getElementById("max-score"); // This is the max score span element, it displays the maximum possible score in the quiz (which is the total number of questions)
const resultMessage = document.getElementById("result-message"); // This is the result message element, it displays a message based on the user's performance after the quiz is completed
const restartButton = document.getElementById("restart-btn"); // This is the restart button element, it restarts the quiz when clicked
const progressBar = document.getElementById("progress"); // This is the progress bar element, it shows the user's progress through the quiz

// Quiz Data
const quizQuestions = [ // This is an array of quiz questions, each question is an object with a question property and an answers property. The answers property is an array of answer objects, each answer object has a text property and a correct property that indicates whether the answer is correct or not.
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length; // This sets the total questions span to the length of the quizQuestions array, which is the total number of questions in the quiz
maxScoreSpan.textContent = quizQuestions.length; // This sets the max score span to the length of the quizQuestions array, which is the maximum possible score in the quiz (since each question is worth 1 point)

// event listeners
startButton.addEventListener("click", startQuiz); // This adds a click event listener to the start button, which calls the startQuiz function when the button is clicked
restartButton.addEventListener("click", restartQuiz); // This adds a click event listener to the restart button, which calls the restartQuiz function when the button is clicked

function startQuiz() { // This function is called when the start button is clicked, it initializes the quiz state and shows the first question
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active"); // This removes the "active" class from the start screen, which hides it
  quizScreen.classList.add("active"); // This adds the "active" class to the quiz screen, which shows it

  showQuestion();
}

function showQuestion() { // This function displays the current question and its answers on the quiz screen
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]; // This gets the current question object from the quizQuestions array using the currentQuestionIndex

  currentQuestionSpan.textContent = currentQuestionIndex + 1; // This sets the current question span to the current question index + 1 (because the index is 0-based, we add 1 to display it as a 1-based number)

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100; // This calculates the progress percentage by dividing the current question index by the total number of questions and multiplying by 100 to get a percentage value
  progressBar.style.width = progressPercent + "%"; // This sets the width of the progress bar to the calculated progress percentage, visually representing the user's progress through the quiz

  questionText.textContent = currentQuestion.question; // This sets the question text element to the question property of the current question object, displaying the current question on the quiz screen

  answersContainer.innerHTML = ""; // This clears the answers container by setting its innerHTML to an empty string, this is necessary to remove the previous question's answers before adding the new ones

  currentQuestion.answers.forEach((answer) => { // This iterates over the answers array of the current question object, for each answer object it creates a button element to display the answer text and sets up the correct/incorrect state
    const button = document.createElement("button"); // This creates a new button element for each answer
    button.textContent = answer.text; // This sets the text content of the button to the text property of the answer object, displaying the answer text on the button
    button.classList.add("answer-btn"); // This adds the "answer-btn" class to the button, which applies the styling defined in the CSS for answer buttons

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct; // This sets a custom data attribute called "correct" on the button element, its value is set to the correct property of the answer object (which is a boolean indicating whether the answer is correct or not). This allows us to easily check if the selected answer is correct when the button is clicked.

    button.addEventListener("click", selectAnswer); // This adds a click event listener to the button, which calls the selectAnswer function when the button is clicked. The selectAnswer function will handle the logic for checking if the selected answer is correct and updating the quiz state accordingly.

    answersContainer.appendChild(button); // This appends the created button element to the answers container, which adds the answer button to the quiz screen for the current question
  });
}

function selectAnswer(event) { // This function is called when an answer button is clicked, it checks if the selected answer is correct, updates the score, and moves to the next question or shows the results if it was the last question
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target; // This gets the button element that was clicked from the event object, which is the target of the click event
  const isCorrect = selectedButton.dataset.correct === "true"; // This checks if the "correct" data attribute of the selected button is equal to the string "true", which indicates whether the selected answer is correct or not. The dataset.correct value is a string, so we compare it to the string "true" to determine if the answer is correct.

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => { // This iterates over all the child elements of the answers container (which are the answer buttons) and applies styling to indicate which answers are correct and which one was selected
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => { // This sets a timeout to delay the transition to the next question or the results screen, allowing the user to see the feedback on their answer before moving on
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() { // This function is called when the quiz is completed, it hides the quiz screen, shows the result screen, and displays the final score and a message based on the user's performance
  quizScreen.classList.remove("active"); // This removes the "active" class from the quiz screen, which hides it
  resultScreen.classList.add("active"); // This adds the "active" class to the result screen, which shows it

  finalScoreSpan.textContent = score; // This sets the final score span to the user's final score, which is stored in the score variable

  const percentage = (score / quizQuestions.length) * 100; // This calculates the percentage score by dividing the user's score by the total number of questions and multiplying by 100 to get a percentage value. This percentage will be used to determine the message displayed to the user based on their performance in the quiz.

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() { // This function is called when the restart button is clicked, it resets the quiz state and shows the start screen again
  resultScreen.classList.remove("active"); // This removes the "active" class from the result screen, which hides it
  startScreen.classList.add("active"); // This adds the "active" class to the start screen, which shows it

  startQuiz();
}
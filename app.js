let questions = [];
let currentQuizIndex = 0;
let score = 0;
let playerName = "";

// Start quiz with player's name input
function start() {
  playerName = document.getElementById("player-name").value;
  if (playerName) {
    document.getElementById("name-container").style.display = "none";
    document.getElementById("question-input").style.display = "block";
  } else {
    alert("Please enter your name!");
  }
}

// Adding questions to the quiz
function addQuestion() {
  const question = document.getElementById("new-question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const option3 = document.getElementById("option3").value;
  const option4 = document.getElementById("option4").value;
  const correctAnswer = document.getElementById("correct-answer").value;

  if (question && option1 && option2 && option3 && option4 && correctAnswer) {
    questions.push({
      question,
      options: [option1, option2, option3, option4],
      correct: parseInt(correctAnswer) - 1,  // Correct index
    });

    // Clearing inputs after adding
    document.getElementById("new-question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("correct-answer").value = "";
    alert("Question added!");
  } else {
    alert("Please fill all fields!");
  }
}

// Start the quiz after adding questions
function startQuiz() {
  if (questions.length === 0) {
    alert("Add some questions first!");
    return;
  }
  document.getElementById("question-input").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  displayQuizQuestion();
}

// Displaying the question and options
function displayQuizQuestion() {
  if (currentQuizIndex < questions.length) {
    const currentQuestion = questions[currentQuizIndex];
    document.getElementById("quiz-question").innerText = currentQuestion.question;

    let optionsHtml = "";
    currentQuestion.options.forEach((option, index) => {
      optionsHtml += `<button class="option-btn" onclick="submitAnswer(${index})">${option}</button><br/>`;
    });

    optionsHtml += `<button class="option-btn" onclick="showAnswer()">Don't Know</button>`;
    document.getElementById("options").innerHTML = optionsHtml;
  } else {
    endQuiz();
  }
}

// Handling the user's answer selection
function submitAnswer(selectedIndex) {
  const correctIndex = questions[currentQuizIndex].correct;
  const options = document.querySelectorAll(".option-btn");

  options.forEach((option, index) => {
    option.disabled = true;  // Disable all options after selection

    if (index === correctIndex) {
      option.classList.add("correct");  // Correct option turns green
    }

    if (index === selectedIndex && selectedIndex !== correctIndex) {
      option.classList.add("wrong");  // Wrong option turns red
    }

    if (index !== correctIndex) {
      option.classList.add("faded");  // Fade non-selected and non-correct options
    }
  });

  if (selectedIndex === correctIndex) {
    score += 10;  // Increase score if answer is correct
  }

  document.getElementById("score").innerText = score;
  currentQuizIndex++;

  // Delay before moving to the next question
  setTimeout(() => {
    displayQuizQuestion();
  }, 3000);
}

// Show correct answer when "Don't Know" is clicked
function showAnswer() {
  const correctIndex = questions[currentQuizIndex].correct;
  const options = document.querySelectorAll(".option-btn");

  options.forEach((option, index) => {
    if (index === correctIndex) {
      option.classList.add("correct");
    } else {
      option.classList.add("faded");
    }
  });

  currentQuizIndex++;
  setTimeout(() => {
    displayQuizQuestion();
  }, 3000);
}

// Restart quiz with the same set of questions
function tryAgain() {
  currentQuizIndex = 0;
  score = 0;
  document.getElementById("quiz-end").style.display = "none";
  startQuiz();
}

// Restart quiz with new questions
function newQuiz() {
  currentQuizIndex = 0;
  score = 0;
  document.getElementById("quiz-end").style.display = "none";
  document.getElementById("name-container").style.display = "block";
}

// End the quiz and display the final score
function endQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("quiz-end").style.display = "block";
  document.getElementById("final-score").innerText = `${playerName}, your final score is: ${score}`;
}

// Exit the quiz
function exitQuiz() {
  alert("Thank you for playing!");
  document.getElementById("quiz-end").style.display = "none";
  document.getElementById("name-container").style.display = "block";
}

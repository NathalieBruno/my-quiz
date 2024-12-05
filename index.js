let darkMode = document.querySelector(".dark-mode-toggle");
let darkModeToggle = document.querySelector("#dark-mode");

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light theme 🌞 " : "Dark theme 😎";
});

const quizQuestions = [
  {
    question: "Vilken färg har solen?",
    answers: [
      { text: "grön", correct: false },
      { text: "lila", correct: false },
      { text: "gul", correct: true },
    ],
  },
  {
    question: "Vilken färg har månen?",
    answers: [
      { text: "grön", correct: false },
      { text: "gul", correct: true },
      { text: "lila", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let startBtn = document.querySelector("#start-btn");
let nextBtn = document.querySelector("#next-btn");
let quizSection = document.querySelector(".quiz-section");

startBtn.addEventListener("click", () => {
  document.querySelector("#start-page").style.display = "none";
  document.querySelector(".main-container").style.display = "block";
  showQuestion(currentQuestionIndex);
});

let userAnswers = new Array(quizQuestions.length).fill(null);

const showQuestion = (questionIndex) => {
  let questionCounter = document.querySelector(".question-counter");
  questionCounter.textContent = `Fråga ${questionIndex + 1} av ${quizQuestions.length}`;

  let questionText = document.querySelector(".question-text");
  questionText.textContent = quizQuestions[questionIndex].question;

  let answerContainer = document.querySelector(".answer-container");
  answerContainer.innerHTML = "";

  quizQuestions[questionIndex].answers.forEach((answer) => {
    let answerBtn = document.createElement("button");
    answerBtn.classList.add("btn", "answer-btn");
    answerBtn.textContent = answer.text;
    answerBtn.dataset.correct = answer.correct;
    answerContainer.appendChild(answerBtn);
  });
};

quizSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer-btn")) {
    quizSection.querySelectorAll(".answer-btn").forEach((btn) => btn.classList.remove("selected"));
    event.target.classList.add("selected");
    userAnswers[currentQuestionIndex] = event.target.textContent;
  }
});

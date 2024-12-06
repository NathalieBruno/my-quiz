let darkMode = document.querySelector("#dark-mode");
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
let nextBtn = document.querySelector(".next-btn");
let quizSection = document.querySelector(".quiz-section");
let resultBtn = document.querySelector(".result-btn");
let resultSection = document.querySelector(".result");
let exitBtn = document.querySelector(".exit-btn");

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

  let isLastQuestion = questionIndex === quizQuestions.length - 1;
  nextBtn.classList.toggle("hidden", isLastQuestion);
  resultBtn.classList.toggle("hidden", !isLastQuestion);
};

quizSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer-btn")) {
    quizSection.querySelectorAll(".answer-btn").forEach((btn) => btn.classList.remove("selected"));
    event.target.classList.add("selected");
    userAnswers[currentQuestionIndex] = event.target.textContent;
  }
});

nextBtn.addEventListener("click", () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("För att gå vidare behöver du först svara på frågan.");
    return;
  }
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});

const getQuizResult = (correctAnswers) => {
  let totalScore = correctAnswers / quizQuestions.length;

  if (totalScore < 0.5) return { text: "Du är underkänd.", color: "red" };
  if (totalScore < 0.75) return { text: "Du är godkänd.", color: "orange" };
  return { text: "Du är godkänd, riktigt bra jobbat!", color: "green" };
};

const showResult = () => {
  let correctAnswers = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    let correctOption = quizQuestions[i].answers.find((option) => option.correct);
    if (userAnswers[i] === correctOption.text) correctAnswers++;
  }

  let result = getQuizResult(correctAnswers);
  let resultText = result.text;
  let resultColor = result.color;

  resultSection.innerHTML = `
  <h2>Ditt resultat</h2>
<p style="color:${resultColor}">
Du fick ${correctAnswers} av ${quizQuestions.length} möjliga rätt svar.
</p>
<p style="color:${resultColor}">${resultText}</p>
`;

  [quizSection, nextBtn, resultBtn].forEach((element) => {
    element.classList.add("hidden");
  });

  exitBtn.classList.remove("hidden");
};

resultBtn.addEventListener("click", () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Du behöver välja ett svar för att kunna se ditt resultat. ");
    return;
  }
  showResult();
});

const restartQuiz = () => {
  nextBtn.classList.remove("hidden");
  resultBtn.classList.remove("hidden");
  exitBtn.classList.add("hidden");
  resultSection.innerHTML = "";
  currentQuestionIndex = 0;
  userAnswers = new Array(quizQuestions.length).fill(null);
  document.querySelector(".main-container").style.display = "none";
  quizSection.classList.remove("hidden");

  document.querySelector(".start-page").style.display = "block";
};
exitBtn.addEventListener("click", restartQuiz);

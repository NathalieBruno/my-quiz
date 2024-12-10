const quizQuestions = [
  {
    question: "Vilken är den största staden i Australien, inte räknad som huvudstad?",
    answers: [
      { text: "Sydney", correct: true },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Vad heter den traditionella japanska teceremonin?",
    answers: [
      { text: "Sumi-e", correct: false },
      { text: "Kintsugi", correct: false },
      { text: "Chanoyu", correct: true },
    ],
  },
  //   {
  //     question: "Vilken planet i vårt solsystem är känd som den röda planeten?",
  //     answers: [
  //       { text: "Mars", correct: true },
  //       { text: "Jupiter", correct: false },
  //       { text: "Venus", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Vilket land har världens största ö, Grönland?",
  //     answers: [
  //       { text: "Danmark", correct: true },
  //       { text: "Island", correct: false },
  //       { text: "Kanada", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Vilken av dessa dansstilar är förknippad med Brasilien och dansas ofta under karnevalen?",
  //     answers: [
  //       { text: "Salsa", correct: false },
  //       { text: "Samba", correct: true },
  //       { text: "Bachata", correct: false },
  //     ],
  //   },
  //   {
  //     question: "I vilket land är det vanligt att dricka mate, ett örtte som serveras i en speciell behållare?",
  //     answers: [
  //       { text: "Argentina", correct: true },
  //       { text: "Brasilien", correct: false },
  //       { text: "Chile", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Vilken stad kallas ofta för 'The Big Apple'? 🍎 ",
  //     answers: [
  //       { text: "Los Angeles", correct: false },
  //       { text: "New York", correct: true },
  //       { text: "Chicago", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Vilket land är känt för att ha de mest unika köket i världen, med mat som kimchi och bibimbap?",
  //     answers: [
  //       { text: "Japan", correct: false },
  //       { text: "Sydkorea", correct: true },
  //       { text: "Kina", correct: false },
  //     ],
  //   },
  //   {
  //     question: "I vilket land hittar man den Machu Picchu, en världsberömd inka-stad i Anderna?",
  //     answers: [
  //       { text: "Peru", correct: true },
  //       { text: "Chile", correct: false },
  //       { text: "Bolivia", correct: false },
  //     ],
  //   },
  //   {
  //     question: "Vilket land är känt för att fira Dagen för de döda, en tradition där man hedrar sina förfäder?",
  //     answers: [
  //       { text: "Mexiko", correct: true },
  //       { text: "Argentina", correct: false },
  //       { text: "Colombia", correct: false },
  //     ],
  //   },
];

let currentQuestionIndex = 0;
let startBtn = document.querySelector(".start-btn");
let nextBtn = document.querySelector(".next-btn");
let quizSection = document.querySelector(".quiz-section");
let resultBtn = document.querySelector(".result-btn");
let resultSection = document.querySelector(".result");
let exitBtn = document.querySelector(".exit-btn");
let darkMode = document.querySelector("#dark-mode");
let darkModeToggle = document.querySelector("#dark-mode");
let playerName = "";

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light theme 🌞 " : "Dark theme 😎";
});

startBtn.addEventListener("click", () => {
  playerName = document.querySelector("#player-name").value;
  if (!playerName.trim()) {
    alert("Du behöver fylla i ett spelnamn innan vi kan starta igång spelet.");
    return;
  }
  document.querySelector(".start-page").classList.add("hidden");
  document.querySelector(".quiz-container").classList.remove("hidden");
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

  resultSection.innerHTML = `
  <h2>${playerName} här kommer ditt resultat:</h2>
<p class="result-text ${result.color}">
Du fick ${correctAnswers} av ${quizQuestions.length} möjliga rätt svar.
</p>
<p class="result-text ${result.color}">${result.text}</p>
`;

  [quizSection, nextBtn, resultBtn].forEach((element) => {
    element.classList.add("hidden");
  });

  resultSection.classList.remove("hidden");
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
  resultBtn.classList.add("hidden");
  exitBtn.classList.add("hidden");
  resultSection.innerHTML = "";
  document.querySelector("#player-name").value = "";
  playerName = "";
  document.querySelector(".quiz-container").classList.add("hidden");
  document.querySelector(".start-page").classList.remove("hidden");
  quizSection.classList.remove("hidden");

  currentQuestionIndex = 0;
  userAnswers = new Array(quizQuestions.length).fill(null);
};
exitBtn.addEventListener("click", restartQuiz);

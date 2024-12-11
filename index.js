const quizQuestions = [
  {
    question: "Vad får du om du beställer en 'Dirty Chai' på ett kafé?",
    answers: [
      { text: "En Chai latte med dubbel espresso", correct: true },
      { text: "En americano med kaffesump toppad med kanel", correct: false },
      { text: "Chai latte och karamellsirap", correct: false },
    ],
  },
  {
    question: "Vilken planet i vårt solsystem är känd som den röda planeten?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "Vilken ögrupp tillhör Galápagosöarna?",
    answers: [
      { text: "Ecuador", correct: true },
      { text: "Colombia", correct: false },
      { text: "Venezuela", correct: false },
    ],
  },
  {
    question: "Vilken av dessa dansstilar är förknippad med Brasilien och dansas ofta under karnevalen?",
    answers: [
      { text: "Salsa", correct: false },
      { text: "Samba", correct: true },
      { text: "Bachata", correct: false },
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
  {
    question: "Vilken skådespelare spelade huvudrollen som 'Joker' i filmen från 2019?",
    answers: [
      { text: "Joaquin Phoenix", correct: true },
      { text: "Heath Ledger", correct: false },
      { text: "Jared Leto", correct: false },
    ],
  },
  {
    question: "Vilken stad kallas ofta för 'The Big Apple'? 🍎 ",
    answers: [
      { text: "Los Angeles", correct: false },
      { text: "New York", correct: true },
      { text: "Chicago", correct: false },
    ],
  },
  {
    question: "Vilken var Disneys första animerade långfilm?",
    answers: [
      { text: "Snövit och de sju dvärgarna", correct: true },
      { text: "Bambi", correct: false },
      { text: "Dumbo", correct: false },
    ],
  },
  {
    question: "I vilket land hittar man Machu Picchu, en världsberömd inka-stad i Anderna?",
    answers: [
      { text: "Peru", correct: true },
      { text: "Chile", correct: false },
      { text: "Bolivia", correct: false },
    ],
  },
  {
    question: "Vilket land är känt för att fira 'Dagen för de döda', en tradition där man hedrar sina förfäder?",
    answers: [
      { text: "Mexiko", correct: true },
      { text: "Japan", correct: false },
      { text: "Colombia", correct: false },
    ],
  },
];

const element = {
  darkModeBtn: document.querySelector("#dark-mode"),
  startBtn: document.querySelector(".start-btn"),
  nextBtn: document.querySelector(".next-btn"),
  quizSection: document.querySelector(".quiz-section"),
  resultBtn: document.querySelector(".result-btn"),
  resultSection: document.querySelector(".result"),
  exitBtn: document.querySelector(".exit-btn"),
  playerNameInput: document.querySelector("#player-name"),
  startPage: document.querySelector(".start-page"),
  quizContainer: document.querySelector(".quiz-container"),
  questionCounter: document.querySelector(".question-counter"),
  questionText: document.querySelector(".question-text"),
  answerContainer: document.querySelector(".answer-container"),
};

let currentQuestionIndex = 0;
let playerName = "";
let userAnswers = new Array(quizQuestions.length).fill(null);

element.startBtn.addEventListener("click", () => {
  playerName = element.playerNameInput.value;
  if (!playerName.trim()) {
    alert("Du behöver fylla i ett spelnamn innan vi kan starta igång spelet.");
    return;
  }
  element.startPage.classList.add("hidden");
  element.quizContainer.classList.remove("hidden");
  showQuestion(currentQuestionIndex);
});

const showQuestion = (questionIndex) => {
  element.questionCounter.textContent = `Fråga ${questionIndex + 1} av ${quizQuestions.length}`;
  element.questionText.textContent = quizQuestions[questionIndex].question;
  element.answerContainer.innerHTML = "";

  quizQuestions[questionIndex].answers.forEach((answer) => {
    let answerBtn = document.createElement("button");
    answerBtn.classList.add("btn", "answer-btn");
    answerBtn.textContent = answer.text;
    answerBtn.dataset.correct = answer.correct;
    element.answerContainer.appendChild(answerBtn);
  });

  let isLastQuestion = questionIndex === quizQuestions.length - 1;
  element.nextBtn.classList.toggle("hidden", isLastQuestion);
  element.resultBtn.classList.toggle("hidden", !isLastQuestion);
};

element.quizSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer-btn")) {
    element.quizSection.querySelectorAll(".answer-btn").forEach((btn) => btn.classList.remove("selected"));
    event.target.classList.add("selected");
    userAnswers[currentQuestionIndex] = event.target.textContent;
  }
});

element.nextBtn.addEventListener("click", () => {
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

  element.resultSection.innerHTML = `
  <h2>${playerName} här kommer ditt resultat:</h2>
<p class="result-text ${result.color}">
Du fick ${correctAnswers} av ${quizQuestions.length} möjliga rätt svar.
</p>
<p class="result-text ${result.color}">${result.text}</p>
`;

  [element.quizSection, element.nextBtn, element.resultBtn].forEach((elements) => {
    elements.classList.add("hidden");
  });

  element.resultSection.classList.remove("hidden");
  element.exitBtn.classList.remove("hidden");
};

element.resultBtn.addEventListener("click", () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Du behöver välja ett svar för att kunna se ditt resultat. ");
    return;
  }
  showResult();
});

element.darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  element.darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "Ljust läge 🌞 " : "Mörkt läge 😎";
});

const restartQuiz = () => {
  element.nextBtn.classList.remove("hidden");
  element.resultBtn.classList.add("hidden");
  element.exitBtn.classList.add("hidden");
  element.resultSection.innerHTML = "";
  element.quizContainer.classList.add("hidden");
  element.startPage.classList.remove("hidden");
  element.quizSection.classList.remove("hidden");
  element.playerNameInput.value = "";

  currentQuestionIndex = 0;
  playerName = "";
  userAnswers = new Array(quizQuestions.length).fill(null);
};
element.exitBtn.addEventListener("click", restartQuiz);

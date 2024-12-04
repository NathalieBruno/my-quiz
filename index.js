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
];

let currentQuestionIndex = 0;
let startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", () => {
  document.querySelector("#start-page").style.display = "none";
  document.querySelector(".main-container").style.display = "block";
  showQuestion(currentQuestionIndex);
});

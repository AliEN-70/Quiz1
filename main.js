let quizData = [
  {
    question: "Which prostaglandin analog is used for cervical ripening during labor induction?",
    options: ["Alprostadil","Misoprostol","Dinoprostone","Carboprost"],
    correct: "Dinoprostone",
  },
  {
    question: "Which prostaglandin analog is used for medical termination of pregnancy in combination with mifepristone?",
    options: ["Latanoprost","Misoprostol","Epoprostenol","Dinoprostone"],
    correct: "Misoprostol",
  },
  {
    question:
      "Which prostaglandin analog is commonly used in the treatment of glaucoma to reduce intraocular pressure?",
    options: [
      "Alprostadil",
      "Latanoprost",
      "Misoprostol",
      "Carboprost",
    ],
    correct: "Latanoprost",
  },
  {
    question:
      "Which prostaglandin analog is used in the treatment of pulmonary arterial hypertension (PAH)?",
    options: [
      "Epoprostenol",
      "Alprostadil",
      "Carboprost",
      "Misoprostol"
    ],
    correct: "Epoprostenol",
  },
  {
    question:
      " Carboprost, a prostaglandin F2α analog, is primarily used for which clinical condition?",
    options: [
      "Pulmonary hypertension",
      "Postpartum hemorrhage",
      "Glaucoma",
      "Peptic ulcer prevention"

    ],
    correct: "Postpartum hemorrhage",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
      const resultItem = document.createElement("div");
      resultItem.classList.add("question-container");

      const userAnswer = localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer = quizData[i].correct;

      let answeredCorrectly = userAnswer === correctAnswer;

      if (!answeredCorrectly) {
          resultItem.classList.add("incorrect");
      } else {
          resultItem.classList.add("correct");
      }

      resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
          quizData[i].question
      }</div>
      <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
      <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

      quizResult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Retake Quiz";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});

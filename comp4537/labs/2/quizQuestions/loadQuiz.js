const getQuestions = async () => {
  try {
    const response = await fetch('./quiz.json');
    const json = await response.json();
    return json;
  } catch (err) {
    console.err(err);
  }
  return [];
};

const input = prompt('How many questions do you want to see?');
let number;

number = parseInt(input, 10);

if (isNaN(number)) {
  number = 0;
} else if (number > 5) {
  number = 5;
}

getQuestions();

const loadQuiz = async () => {
  const { questions } = await getQuestions();
  const body = document.getElementById('quizBody');

  for (let i = 0; i < number; i += 1) {
    const currentQuestion = questions[i];

    const div = document.createElement('div');
    div.className = 'margin-bottom-30';

    // Create Question
    const title = document.createElement('h2');
    title.innerHTML = currentQuestion.question;
    div.appendChild(title);

    // Create Answer Div
    const answerDiv = document.createElement('div');
    answerDiv.className = 'flex-column';
    div.appendChild(answerDiv);

    for (let j = 0; j < currentQuestion.choices.length; j += 1) {
      const currentChoice = currentQuestion.choices[j];

      const answers = document.createElement('div');
      answers.className = 'text-align-left margin-top-5';

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = i;
      radioButton.value = j;

      const label = document.createElement('label');
      label.innerHTML = currentChoice;
      answers.appendChild(radioButton);
      answers.appendChild(label);

      answerDiv.appendChild(answers);
    }

    body.appendChild(div);
  }
};

loadQuiz();

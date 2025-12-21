
//Student login
const currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
if (!currentStudent) {
    window.location.href = 'login.html';
}

//Services
const  examService = new ExamService();
const  questionService = new QuestionService();
const  choiceService = new ChoiceService();
const  resultsService = new StudentExamResultsService();
const  answersService = new StudentAnswersService();

//Url
const  url = document.URL;
const  examId = parseInt(url.split('examId=')[1]);

//get exam and questions
const  exam = examService.getById(examId);
if (!exam) {
    alert('Exam not found');
    window.location.href = 'index.html';
}

if (resultsService.hasTakenExam(currentStudent.id, examId)) {
    alert('You have already taken this exam');
    window.location.href = 'index.html';
}

let questions = questionService.getByExam(examId);
if (questions.length === 0) {
    alert('No questions found');
    window.location.href = 'index.html';
}

questions = randomOrder(questions);

let  currentQuestionIndex = 0;
let  score = 0;
let  totalExam = exam.durationMinutes * 60;
let  timePerQuestion = Math.floor(totalExam / questions.length);
let  questionTimerInterval = null;
let  totalTimerInterval = null;
let  answered = false;
let  studentAnswers = [];

//random function
function randomOrder(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

//Total timer
function totalTimer() {
    totalTimerInterval = setInterval(function () {
        totalExam--;

        const  minutes = Math.floor(totalExam / 60);
        const  seconds = totalExam % 60;

        document.getElementById('totalTimeText').textContent = minutes + ' minutes ' + seconds + ' seconds';
        if (totalExam <= 0) {
            clearInterval(totalTimerInterval);
            showResult();
        }
    }, 1000);
}

function startQuestionTimer() {
    let questionTimeLeft = timePerQuestion;
    answered = false;

    questionTimerInterval = setInterval(function () {
        questionTimeLeft--;
        document.getElementById('questionTimer').textContent = questionTimeLeft + 's';

        if (questionTimeLeft <= 0) {
            clearInterval(questionTimerInterval);
            if (!answered) {
                saveAnswerAsWrong();
                autoNextQuestion();
            }
        }
    }, 1000);
}

function autoNextQuestion() {
    answered = true;

    const allButtons = document.querySelectorAll('.answer-btn');
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }

    document.getElementById('nextBtn').disabled = false;
}

function saveAnswerAsWrong() {
    const question = questions[currentQuestionIndex];

    studentAnswers.push({
        questionId: question.id,
        selectedChoiceId: null,
        isCorrect: false
    });
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];

    document.getElementById('questionText').textContent = question.questionText;

    var questionImage = document.getElementById('questionImage');
    if (question.image) {
        questionImage.src = '../../assets/images/' + question.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }

    var choices = choiceService.getByQuestion(question.id);

    // random choices
    choices = randomOrder(choices);

    //buttons
    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';

    for (let i = 0; i < choices.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary answer-btn';
        btn.textContent = choices[i].answerText;
        btn.setAttribute('is-correct', choices[i].isCorrect);
        btn.setAttribute('choice-id', choices[i].id);

        btn.onclick = function () {
            selectAnswer(this);
        };
        choicesContainer.appendChild(btn);
    }

    document.getElementById('nextBtn').disabled = true;
    startQuestionTimer();
}

function selectAnswer(btn) {
    if (answered) return;

    answered = true;
    clearInterval(questionTimerInterval);

    var allButtons = document.querySelectorAll('.answer-btn');
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }

    const isCorrect = btn.getAttribute('is-correct') === 'true';
    const choiceId = btn.getAttribute('choice-id');
    const question = questions[currentQuestionIndex];

    studentAnswers.push({
        questionId: question.id,
        selectedChoiceId: choiceId,
        isCorrect: isCorrect
    });

    if (isCorrect) {

        btn.className = 'btn btn-success answer-btn';
        score += question.score;
    } else {
        btn.className = 'btn btn-danger answer-btn';
    }

    document.getElementById('nextBtn').disabled = false;
}

document.getElementById('nextBtn').onclick = function () {
    clearInterval(questionTimerInterval);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        clearInterval(totalTimerInterval);
        showResult();
        saveResults();
    }
};

function saveResults() {
    const resultId = resultsService.get().length + 1;
    const currentDate = new Date().toLocaleDateString();

    const result = new StudentExamResults(
        resultId,
        examId,
        currentStudent.id,
        score,
        currentDate
    );

    resultsService.store(result);

    for (let i = 0; i < studentAnswers.length; i++) {
        const answerId = answersService.get().length + 1;

        const answer = new StudentAnswers(
            answerId,
            studentAnswers[i].questionId,
            studentAnswers[i].selectedChoiceId,
            resultId,
            studentAnswers[i].isCorrect
        );

        answersService.store(answer);
    }

    console.log('Results saved successfully!');
}

function showResult() {
    document.getElementById('questionCard').style.display = 'none';
    document.getElementById('resultCard').style.display = 'block';

    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
        totalScore += questions[i].score;
    }

    const percentage = Math.round((score / totalScore) * 100);

    document.getElementById('resultCircle').textContent = percentage + '%';
    document.getElementById('resultText').textContent = 'You got ' + score + ' out of ' + totalScore + ' points.';
}

displayQuestion();
totalTimer();
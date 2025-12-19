
//Student login
var currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
if (!currentStudent) {
    window.location.href = 'login.html';
}

//Services
var examService = new ExamService();
var questionService = new QuestionService();
var choiceService = new ChoiceService();
var resultsService = new StudentExamResultsService();
var answersService = new StudentAnswersService();

//Url
var url = document.URL;
var examId = parseInt(url.split('examId=')[1]);

//get exam and questions
var exam = examService.getById(examId);
if (!exam) {
    alert('Exam not found');
    window.location.href = 'index.html';
}

if (resultsService.hasTakenExam(currentStudent.id, examId)) {
    alert('You have already taken this exam');
    window.location.href = 'index.html';
}

var questions = questionService.getByExam(examId);
if (questions.length === 0) {
    alert('No questions found');
    window.location.href = 'index.html';
}

questions = randomOrder(questions);

var currentQuestionIndex = 0;
var score = 0;
var totalExam = exam.durationMinutes * 60;
var timePerQuestion = Math.floor(totalExam / questions.length);
var questionTimerInterval = null;
var totalTimerInterval = null;
var answered = false;
var studentAnswers = [];

//random function
function randomOrder(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

//Total timer
function totalTimer() {
    totalTimerInterval = setInterval(function () {
        totalExam--;

        var minutes = Math.floor(totalExam / 60);
        var seconds = totalExam % 60;

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

    var allButtons = document.querySelectorAll('.answer-btn');
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }

    document.getElementById('nextBtn').disabled = false;
}

function saveAnswerAsWrong() {
    var question = questions[currentQuestionIndex];

    studentAnswers.push({
        questionId: question.id,
        selectedChoiceId: null,
        isCorrect: false
    });
}

function displayQuestion() {
    var question = questions[currentQuestionIndex];

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
    var choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';

    for (var i = 0; i < choices.length; i++) {
        var btn = document.createElement('button');
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

    var isCorrect = btn.getAttribute('is-correct') === 'true';
    var choiceId = btn.getAttribute('choice-id');
    var question = questions[currentQuestionIndex];

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
    var resultId = resultsService.get().length + 1;
    var currentDate = new Date().toLocaleDateString();

    var result = new StudentExamResults(
        resultId,
        examId,
        currentStudent.id,
        score,
        currentDate
    );

    resultsService.store(result);

    for (var i = 0; i < studentAnswers.length; i++) {
        var answerId = answersService.get().length + 1;

        var answer = new StudentAnswers(
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

    var totalScore = 0;
    for (var i = 0; i < questions.length; i++) {
        totalScore += questions[i].score;
    }

    var percentage = Math.round((score / totalScore) * 100);

    document.getElementById('resultCircle').textContent = percentage + '%';
    document.getElementById('resultText').textContent = 'You got ' + score + ' out of ' + totalScore + ' points.';
}

displayQuestion();
totalTimer();
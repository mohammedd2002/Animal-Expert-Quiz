var examService = new ExamService();
var questionService = new QuestionService();
var choiceService = new ChoiceService();

var generateBtn = document.getElementById('generateQuestions');
var saveBtn = document.getElementById('saveBtn');
var container = document.getElementById('questionsContainer');
var errorMsg = document.getElementById('errorMsg');

function createQuestionHTML(index) {
    return `
    <div class="border p-3 mb-4">

        <label>Question ${index}</label>
        <input type="text" class="form-control mb-2" id="questionText${index}">

        <label>Image</label>
        <input type="file" class="form-control mb-2" id="questionImage${index}" accept="image/*">

        <input type="text" class="form-control mb-2" id="choiceA${index}" placeholder="Choice A">
        <input type="text" class="form-control mb-2" id="choiceB${index}" placeholder="Choice B">
        <input type="text" class="form-control mb-2" id="choiceC${index}" placeholder="Choice C">
        <input type="text" class="form-control mb-2" id="choiceD${index}" placeholder="Choice D">

        <label>Correct Answer</label>
        <select class="form-select mb-2" id="correctAnswer${index}">
            <option value="">Choose</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>

        <div class="row">
            <div class="col-md-6">
                <select class="form-select" id="questionLevel${index}">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>
            <div class="col-md-6">
                <input type="number" class="form-control" id="questionScore${index}" placeholder="Score">
            </div>
        </div>

    </div>
    `;
}

generateBtn.onclick = function () {
    var count = document.getElementById('questionCount').value;

    if (count < 15) {
        showError("Exam must contain at least 15 questions");
        return;
    }

    container.innerHTML = "";

    for (var i = 1; i <= count; i++) {
        container.innerHTML += createQuestionHTML(i);
    }
};

saveBtn.onclick = function () {

    var examName = document.getElementById('examName').value;
    var examDuration = document.getElementById('examDuration').value;
    var count = document.getElementById('questionCount').value;

    if (!examName || !examDuration) {
        showError("Please fill exam data");
        return;
    }

    if (count < 15) {
        showError("Exam must contain at least 15 questions");
        return;
    }

    var totalScore = 0;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var examId = examService.get().length + 1;

    var exam = new Exam(
        examId,
        examName,
        examDuration,
        count,
        currentUser.id
    );

    examService.store(exam);

    for (var i = 1; i <= count; i++) {

        var text = document.getElementById('questionText' + i).value;

        var imageInput = document.getElementById('questionImage' + i);
        var imagePath = imageInput.files[0] ? imageInput.files[0].name : '';

        var level = document.getElementById('questionLevel' + i).value;
        var score = Number(document.getElementById('questionScore' + i).value);
        var correct = document.getElementById('correctAnswer' + i).value;

        var a = document.getElementById('choiceA' + i).value;
        var b = document.getElementById('choiceB' + i).value;
        var c = document.getElementById('choiceC' + i).value;
        var d = document.getElementById('choiceD' + i).value;

        if (!text || !a || !b || !c || !d || !correct || !score) {
            showError("Please fill all question fields");
            return;
        }

        totalScore += score;

        var questionId = questionService.get().length + 1;

        var choiceA = new Choice(choiceService.get().length + 1, a, correct == 'A', questionId);
        choiceService.store(choiceA);

        var choiceB = new Choice(choiceService.get().length + 1, b, correct == 'B', questionId);
        choiceService.store(choiceB);

        var choiceC = new Choice(choiceService.get().length + 1, c, correct == 'C', questionId);
        choiceService.store(choiceC);

        var choiceD = new Choice(choiceService.get().length + 1, d, correct == 'D', questionId);
        choiceService.store(choiceD);

        var choicesArray = [choiceA, choiceB, choiceC, choiceD];

        var question = new Question(
            questionId,
            text,
            imagePath,
            level,
            score,
            choicesArray, 
            examId
        );

        questionService.store(question);
    }

    if (totalScore !== 100) {
        showError("Total exam score must be 100");
        return;
    }

    window.location.href = "home.html";
};

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('d-none');
}
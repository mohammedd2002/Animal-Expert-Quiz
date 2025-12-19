
// =================== Errors ===================

let errorService = new ErrorService();
let divErrors = document.getElementById("errors");
let divSuccess = document.getElementById("success");

// =============== Services =======================
const examService = new ExamService();
const questionService = new QuestionService();
const choiceService = new ChoiceService();

// =================== Get Exam Id ===================
let search = window.location.search;
let params = new URLSearchParams(search);
let examId = Number(params.get("examId"));

// =================== Check Can Be Update Or Not  ============

if (examService.getStudents(examId).length > 0) {
    
    const hasStudentsMessage = true;

    window.location.href = `../../pages/teacher/home.html?hasStudentsMessage=${hasStudentsMessage}`;
}

// =================== Get Exam ===================

const exam = examService.getById(examId);

// =================== Show Exam Data ===================
document.getElementById("exam_name").value = exam.examName;
document.getElementById("exam_duration").value = Number(exam.durationMinutes);
document.getElementById("exam_question_count").value = Number(exam.questionsCount);


// =================== Show Exam Questions ================

let questionsElement = document.getElementById("questions");
const questions = questionService.getByExam(examId);
questionsElement.innerHTML = "";
questions.forEach(function (question, index) {

    const questionRow = createQuestion(index + 1);
    // =================== Show Question Data ====================
    questionRow.querySelector(".question_title").value = question.questionText;
    questionRow.querySelector(".question_level").value = question.difficulty;
    questionRow.querySelector(".question_score").value = Number(question.score);

    //========================Show Choices Data ==================
    const choices = choiceService.getByQuestion(question.id);

    const choiceInputs = questionRow.querySelectorAll(".question_choice");

    const correctAnswerInputs = questionRow.querySelectorAll(".question_correct");

    choices.forEach(function (choice, index) {
        choiceInputs[index].value = choice.answerText;

        if (choice.isCorrect) {
            correctAnswerInputs[index].checked = true;
        }
    });
    //========================Delete Question Btn ==================
    const deleteQuestionBtn = questionRow.querySelector(".delete-question-btn");

    deleteQuestionBtn.addEventListener("click", function (event) {
        errorService.clear();
        divErrors.innerHTML = "";
        divSuccess.innerHTML = "";

        if (validateDeleteQuestion()) {
            handleDeleteQuestion(questionRow, question.id);

            divSuccess.appendChild(createSuccessAlert("Exam Question Deleted Successfully"));
            window.scrollTo({ top: 0, left: 0 });

        } else {

            errorService.getAll().forEach(error => {
                divErrors.appendChild(createErrorAlert(error));
            });
            window.scrollTo({ top: 0, left: 0 });
        }
    });

    questionsElement.appendChild(questionRow);

});


// =================== Update Exam  ================

const updateExamBtn = document.getElementById("update_exam_btn");
updateExamBtn.addEventListener("click", function () {
    errorService.clear();
    divErrors.innerHTML = "";
    divSuccess.innerHTML = "";

    if (validateUpdateExam()) {
        handleUpdateExam();

        divSuccess.appendChild(createSuccessAlert("Exam Updated Successfully"));
        window.scrollTo({ top: 0, left: 0 });
    } else {
        errorService.getAll().forEach(error => {
            divErrors.appendChild(createErrorAlert(error));
        });

        window.scrollTo({ top: 0, left: 0 });
    }
});

function handleUpdateExam() {

    // =================== Update Exam ===================
    const exam = examService.getById(examId);

    exam.examName = document.getElementById("exam_name").value.trim();
    exam.durationMinutes = Number(document.getElementById("exam_duration").value);
    exam.questionsCount = Number(document.getElementById("exam_question_count").value);

    examService.update(exam);
    // =================== Update Questions And Choices ============

    // =================== Update Questions ===========
    const oldQuestions = examService.getQuestions(examId);

    const questionRows = document.querySelectorAll(".question-row");

    questionRows.forEach(function (questionRow, index) {

        let questionUpdated = oldQuestions[index];

        const questionTitle = questionRow.querySelector(".question_title").value;
        const questionLevel = questionRow.querySelector(".question_level").value;
        const questionScore = Number(questionRow.querySelector(".question_score").value);



        const questionImageInput = questionRow.querySelector(".question_image");

        let questionImage = questionUpdated.image;

        if (FileService.getImageName(questionImageInput)) {
            questionImage = FileService.getImageName(questionImageInput);
        }

        questionUpdated.questionText = questionTitle;
        questionUpdated.image = questionImage;
        questionUpdated.difficulty = questionLevel;
        questionUpdated.score = questionScore;

        questionService.update(questionUpdated);

        // =================== Update Choices ===========

        let oldChoices = questionService.getChoices(questionUpdated.id);

        const choiceInputs = questionRow.querySelectorAll(".question_choice");

        const questionCorrectAnswer = questionRow.querySelector(".question_correct:checked").value;
        choiceInputs.forEach(function (choiceInput, index) {

            let choiceUpdated = oldChoices[index];

            const choiceAnswerText = choiceInput.value;
            const choiceIsCorrect = choiceInput.value.toLowerCase() === questionCorrectAnswer;

            choiceUpdated.choiceAnswerText = choiceAnswerText;
            choiceUpdated.choiceIsCorrect = choiceIsCorrect;

            choiceService.update(choiceUpdated);
        });

    });
}
function validateUpdateExam() {



    const examName = document.getElementById("exam_name").value.trim();
    const examDurationMinutes = Number(document.getElementById("exam_duration").value);
    const questionsCount = Number(document.getElementById("exam_question_count").value);

    if (examName === "") {
        errorService.add("Exame Title Is Required ");
    }


    if (examDurationMinutes <= 0) {
        errorService.add("Exame Duration Must Be  Greater Than 0 Minutes");
    }


    if (questionsCount < 4) {
        errorService.add("Exam Must Have At Least 15 Questions");
    }


    // validaion questions 

    const questionRows = document.querySelectorAll(".question-row");

    let sumScore = 0;

    let levels = {
        easy: 0,
        medium: 0,
        hard: 0
    }
    let questionNumber = 0;
    for (let questionRow of questionRows) {
        questionNumber += 1;


        const questionTitle = questionRow.querySelector(".question_title").value.trim();
        const questionScore = Number(questionRow.querySelector(".question_score").value);
        const questionLevel = questionRow.querySelector(".question_level").value;
        const correctAnswer = questionRow.querySelector(".question_correct:checked");
        const choiceInputs = questionRow.querySelectorAll(".question_choice");
        //  quetion title
        if (questionTitle === "") {
            errorService.add(`Question ${questionNumber}: title is required`);
        }


        // question choices
        let choiceInputNumber = 0;
        for (let choiceInput of choiceInputs) {
            choiceInputNumber += 1
            if (choiceInput.value.trim() === "") {
                errorService.add(`Question ${questionNumber}: choice ${choiceInputNumber} is required`);
            }
        }

        // correct answer
        if (correctAnswer === null) {
            errorService.add(`Question ${questionNumber}: correct answer is required`);
        }

        // score 
        if (isNaN(questionScore) || questionScore <= 0) {
            errorService.add(`Question ${questionNumber}: Must Have Score`);

        } else {
            sumScore += questionScore;
        }

        // level 
        levels[questionLevel] += 1;

    }

    if (sumScore !== 100) {

        errorService.add("Total exam score must equal 100");
    }


    if (levels.easy === 0 || levels.medium === 0 || levels.hard === 0) {
        errorService.add("Exam must include Easy, Medium, Hard ");
    }

    return !errorService.hasErrors();

}

// =================== Delete Question ================

function handleDeleteQuestion(questionRow, questionId) {

    questionRow.remove();
    questionService.delete(questionId);
}


function validateDeleteQuestion(minQuestions = 4) {

    const questionRows = document.querySelectorAll(".question-row");
    let questionsCount = questionRows.length;
    if (questionsCount <= minQuestions) {
        errorService.add("Exam Must Have At Least 15 Questions");
    }

    return !errorService.hasErrors();
}



// ================ create Question Element ===================

function createQuestion(number) {

    // ============== Question Row ===========
    const questionRow = document.createElement("div");
    questionRow.className = "question-row";

    // ==============  Question Title ===========
    const questionTitleLabel = createLabel("Question  :" + number);
    const questionTitleInput = createInput("text", "form-control question_title", "", "Enter question");
    const questionTitleGroup = createGroupInput("mb-3 ");

    questionTitleGroup.appendChild(questionTitleLabel);
    questionTitleGroup.appendChild(questionTitleInput);

    // ==============  Question Image ===========
    const questionImageLabel = createLabel("Image :");
    const questionImageInput = createInput("file", "form-control question_image");
    const questionImageGroup = createGroupInput("mb-3");

    questionImageGroup.appendChild(questionImageLabel);
    questionImageGroup.appendChild(questionImageInput);

    // ==============  Question Choices ===========

    const questionChoices = ["A", "B", "C", "D"];

    const questionChoicesGroup = createGroupInput("row mb-3");

    questionChoices.map(function (questionChoice) {

        const questionChoiceLabel = createLabel("Choice " + questionChoice);
        const questionChoiceInput = createInput("text", "form-control question_choice", "", "Choice " + questionChoice, questionChoice.toLowerCase());
        const questionChoiceGroup = createGroupInput("col-md-6");

        questionChoiceGroup.appendChild(questionChoiceLabel);
        questionChoiceGroup.appendChild(questionChoiceInput);

        questionChoicesGroup.appendChild(questionChoiceGroup);

    });
    // ==============  Question Correct Answer ===========
    const questionAnswers = ["a", "b", "c", "d"];

    const questionCorrectGroup = createGroupInput("mb-3");

    const questionCorrectLabel = createLabel("Correct Answer:");

    questionCorrectGroup.appendChild(questionCorrectLabel);

    questionAnswers.map(function (questionAnswer) {

        const questionCorrectRadioInput = createRadio("question_correct_" + number, questionAnswer, "form-check-input question_correct");

        const questionCorrectRadioLabel = createLabel(questionAnswer.toUpperCase(), "form-check-label");

        const questionCorrectRadioGroup = createGroupInput("form-check form-check-inline");


        questionCorrectRadioGroup.appendChild(questionCorrectRadioInput);

        questionCorrectRadioGroup.appendChild(questionCorrectRadioLabel);

        questionCorrectGroup.appendChild(questionCorrectRadioGroup);

    });

    // ==============  Question Level And  Score ===========

    const questionLevelAndScoreGroup = createGroupInput("row mb-3");

    // ======= Level

    const levelOption = ["easy", "medium", "hard"];

    const questionLevelLabel = createLabel("Level:");

    const questionLevelSelectInput = createSelect("form-select question_level", levelOption);
    const questionLevelSelectInputGroup = createGroupInput("col-md-5");

    questionLevelSelectInputGroup.appendChild(questionLevelLabel);
    questionLevelSelectInputGroup.appendChild(questionLevelSelectInput);

    // ======= Score

    const questionScoreLabel = createLabel("Score:");
    const questionScoreInput = createInput("number", "form-control question_score", "question_score", "", 5);
    const questionScoreGroup = createGroupInput("col-md-5");

    questionScoreGroup.appendChild(questionScoreLabel);
    questionScoreGroup.appendChild(questionScoreInput);

    // ============== Delete Question Btn ===========
    const deleteQuestionBtn = createBtn(
        "Delete Question",
        "button",
        "btn btn-danger delete-question-btn w-100 h-70"
    );

    const deleteQuestionGroup = createGroupInput(
        "col-md-2 d-flex align-items-end"
    );

    deleteQuestionGroup.appendChild(deleteQuestionBtn);

    // =======Level And  Score Group 
    questionLevelAndScoreGroup.appendChild(questionLevelSelectInputGroup);
    questionLevelAndScoreGroup.appendChild(questionScoreGroup);
    questionLevelAndScoreGroup.appendChild(deleteQuestionGroup);

    const hrElement = createHr();


    // Append Inputs To Question Row 
    questionRow.appendChild(questionTitleGroup);
    questionRow.appendChild(questionImageGroup);
    questionRow.appendChild(questionChoicesGroup);
    questionRow.appendChild(questionCorrectGroup);
    questionRow.appendChild(questionLevelAndScoreGroup);
    questionRow.appendChild(hrElement);


    return questionRow;
}


// ================ Create Basic Elemets   =====================
function createInput(type = "text", className, name, placeholder, value) {

    const input = document.createElement("input");
    input.type = type;
    if (className) {
        input.className = className;
    }
    if (name) {
        input.name = name;
    }
    if (placeholder) {
        input.placeholder = placeholder;
    }
    if (value !== undefined) {
        input.value = value;
    }

    return input;
}

function createLabel(text, className = "form-label") {
    const label = document.createElement("label");
    label.className = className;
    label.innerText = text;
    return label;
}


function createSelect(className, options) {
    const select = document.createElement("select");
    select.className = className;

    options.map(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.innerText = option.toUpperCase();
        select.appendChild(optionElement);
    });

    return select;
}


function createRadio(name, value, className) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = name;
    radio.value = value;
    radio.className = className;
    return radio;
}

function createGroupInput(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

function createHr() {
    return document.createElement("hr");

}

function createErrorAlert(message) {

    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.innerText = message;

    return alert;
}
function createSuccessAlert(message) {

    const alert = document.createElement("div");
    alert.className = "alert alert-success";
    alert.innerText = message;

    return alert;
}

function createBtn(btnText = "", btnType = "button", btnClass = "btn btn-danger delete-question-btn", btnValue = "") {
    let button = document.createElement("button");

    button.innerText = btnText;
    button.type = btnType;
    button.className = btnClass;
    button.value = btnValue;

    return button;
}





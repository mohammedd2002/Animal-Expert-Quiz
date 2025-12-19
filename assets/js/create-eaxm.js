let errorService = new ErrorService();
// ================ Add Question Element  ===============

let generateQuestionsBtn = document.getElementById("generate_questions_btn");
let questionsElement = document.getElementById("questions");
let divErrors = document.getElementById("errors");
let divSuccess = document.getElementById("success");

let saveExamBtn = document.getElementById("save_exam_btn");


generateQuestionsBtn.addEventListener("click", function () {

    questionsElement.innerHTML = "";
    divErrors.innerHTML = "";
    divSuccess.innerHTML = "";

    const questionNumber =
        Number(document.getElementById("exam_question_count").value);

    if (isNaN(questionNumber) || questionNumber < 2) {
        divErrors.appendChild(
            createErrorAlert("Must enter a valid number of questions (minimum 15)")
        );
        return;
    }

    saveExamBtn.style.display = "block";

    for (let i = 0; i < questionNumber; i++) {
        questionsElement.appendChild(createQuestion(i + 1));
    }
});
saveExamBtn.addEventListener("click", function (event) {

    errorService.clear();
    divErrors.innerHTML = "";
    divSuccess.innerHTML = "";

    if (validateStoreExam()) {
        handleStorExam();
        divSuccess.appendChild(createSuccessAlert("Exam Created Successfully"));
        questionsElement.innerHTML = "";
        document.getElementById("exam_name").value = "";
        document.getElementById("exam_duration").value = "";
        document.getElementById("exam_question_count").value = "";
        saveExamBtn.style.display = "none";
        window.scrollTo({ top: 0, left: 0 });
    } else {
        errorService.getAll().forEach(error => {
            divErrors.appendChild(createErrorAlert(error));
        });
        window.scrollTo({ top: 0, left: 0 });
    }
});

function handleStorExam(event) {



    const storageService = new StorageService();
    const examService = new ExamService();
    const questionService = new QuestionService();
    const choiceService = new ChoiceService();


    const examId = storageService.getNextIdForItem('exams');
    const teacher = AuthTeacherService.currentTeacher();
    const examName = document.getElementById("exam_name").value;
    const examDurationMinutes = document.getElementById("exam_duration").value;
    const questionsCount = Number(document.getElementById("exam_question_count").value);


    const exam = new Exam(
        examId,
        examName,
        examDurationMinutes,
        questionsCount,
        teacher.id
    );
    examService.store(exam);

    const questionRows = document.querySelectorAll(".question-row");


    questionRows.forEach(function (questionRow) {

        const questionId = storageService.getNextIdForItem("questions");
        const questionTitle = questionRow.querySelector(".question_title").value;
        const questionImage = FileService.getImageName(questionRow.querySelector(".question_image"));
        const questionLevel = questionRow.querySelector(".question_level").value;
        const questionScore = Number(questionRow.querySelector(".question_score").value);


        questionService.store(new Question(
            questionId,
            questionTitle,
            questionImage,
            questionLevel,
            questionScore,
            examId
        ));


        const correctAnswer =
            questionRow.querySelector(".question_correct:checked").value;

        const choiceInputs =
            questionRow.querySelectorAll(".question_choice");


        choiceInputs.forEach(function (choiceInput) {

            const choiceId = storageService.getNextIdForItem("choices");
            const choiceAnswerText = choiceInput.value;
            const choiceIsCorrect = choiceInput.value.toLowerCase() === correctAnswer;

            const choice = new Choice(
                choiceId,
                choiceAnswerText,
                choiceIsCorrect,
                questionId
            );
            choiceService.store(choice);
        });

    });
}

function validateStoreExam() {



    const examName = document.getElementById("exam_name").value.trim();
    const examDurationMinutes = Number(document.getElementById("exam_duration").value);
    const questionsCount = Number(document.getElementById("exam_question_count").value);

    if (examName === "") {
        errorService.add("Exame Title Is Required ");
    }


    if (examDurationMinutes <= 0) {
        errorService.add("Exame Duration Must Be  Greater Than 0 Minutes");
    }


    if (questionsCount < 15) {
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
        const questionImage = FileService.getImageName(questionRow.querySelector(".question_image"));
        const questionScore = Number(questionRow.querySelector(".question_score").value);
        const questionLevel = questionRow.querySelector(".question_level").value;
        const correctAnswer = questionRow.querySelector(".question_correct:checked");
        const choiceInputs = questionRow.querySelectorAll(".question_choice");
        //  quetion title
        if (questionTitle === "") {
            errorService.add(`Question ${questionNumber}: title is required`);
        }
        // question image 
        if (questionImage === null) {
            errorService.add(`Question ${questionNumber}: image is required`);
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


    if (levels.easy === 0 || levels.medium  === 0 || levels.hard === 0) {
        errorService.add("Exam must include Easy, Medium, Hard ");
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
    const questionTitleGroup = createGroupInput("mb-3");

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
    const questionLevelSelectInputGroup = createGroupInput("col-md-6");

    questionLevelSelectInputGroup.appendChild(questionLevelLabel);
    questionLevelSelectInputGroup.appendChild(questionLevelSelectInput);

    // ======= Score


    const questionScoreLabel = createLabel("Score:");
    const questionScoreInput = createInput("number", "form-control question_score", "question_score", "", 5);
    const questionScoreGroup = createGroupInput("col-md-6");

    questionScoreGroup.appendChild(questionScoreLabel);
    questionScoreGroup.appendChild(questionScoreInput);

    // =======Level And  Score Group 
    questionLevelAndScoreGroup.appendChild(questionLevelSelectInputGroup);
    questionLevelAndScoreGroup.appendChild(questionScoreGroup);

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






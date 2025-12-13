
// ================ Add Question Element  ===============
let addQuesionButton = document.getElementById("add-question");
let questionsElement = document.getElementById("questions");

addQuesionButton.addEventListener("click", function (event) {
    questionsElement.appendChild(createQuestionElement());

});

// ================ Add Question  ===============

// static techer now 

let teacherService = new TeacherService();

let teacher = teacherService.getById(1);

let examName = document.getElementById("exam_name");
let examQuestion = document.getElementById("exam_question");
let examImage = document.getElementById("exam_image");
let examChoice = document.querySelectorAll(".exam_choice");
let examCorrect = document.querySelector("input[name='exam_correct']:checked");


let examLevel = document.getElementById("exam_level");
let examScore = document.getElementById("exam_score");
















































































function createQuestionElement() {
    let questionRow = document.createElement('div');
    questionRow.classList.add("question-row");

    // ================ Question Name ===============
    let questionName = document.createElement("div");
    questionName.classList.add("mb-3");

    let questionNameLabel = document.createElement("label");
    questionNameLabel.classList.add("form-label");
    questionNameLabel.innerText = "Question :";

    let questionNameInput = document.createElement("input");
    questionNameInput.type = "text";
    questionNameInput.classList.add("form-control");
    questionNameInput.placeholder = "Enter question";

    questionName.appendChild(questionNameLabel);
    questionName.appendChild(questionNameInput);
    questionRow.appendChild(questionName);

    // ================ Question Image ===============
    let questionImage = document.createElement("div");
    questionImage.classList.add("mb-3");

    let questionImageLabel = document.createElement("label");
    questionImageLabel.classList.add("form-label");
    questionImageLabel.innerText = "Image:";

    let questionImageInput = document.createElement("input");
    questionImageInput.type = "file";
    questionImageInput.classList.add("form-control");

    questionImage.appendChild(questionImageLabel);
    questionImage.appendChild(questionImageInput);
    questionRow.appendChild(questionImage);

    // ================ Question Choices ===============
    let rowChoice1 = document.createElement("div");
    rowChoice1.classList.add("row", "mb-3");

    let choiceA = createChoiceElement("Choice A:");
    let choiceB = createChoiceElement("Choice B:");
    rowChoice1.appendChild(choiceA);
    rowChoice1.appendChild(choiceB);
    questionRow.appendChild(rowChoice1);

    let rowChoice2 = document.createElement("div");
    rowChoice2.classList.add("row", "mb-3");

    let choiceC = createChoiceElement("Choice C:");
    let choiceD = createChoiceElement("Choice D:");
    rowChoice2.appendChild(choiceC);
    rowChoice2.appendChild(choiceD);
    questionRow.appendChild(rowChoice2);

    // ================ Correct Answer ===============
    let correctAnswerDiv = document.createElement("div");
    correctAnswerDiv.classList.add("mb-3");

    let correctAnswerLabel = document.createElement("label");
    correctAnswerLabel.classList.add("form-label");
    correctAnswerLabel.innerText = "Correct Answer:";

    correctAnswerDiv.appendChild(correctAnswerLabel);

    let correctAnswerA = createCorrectAnswerElement("a");
    let correctAnswerB = createCorrectAnswerElement("b");
    let correctAnswerC = createCorrectAnswerElement("c");
    let correctAnswerD = createCorrectAnswerElement("d");

    correctAnswerDiv.appendChild(correctAnswerA);
    correctAnswerDiv.appendChild(correctAnswerB);
    correctAnswerDiv.appendChild(correctAnswerC);
    correctAnswerDiv.appendChild(correctAnswerD);
    questionRow.appendChild(correctAnswerDiv);

    // ================ Level and Score ===============
    let rowLevelAndScore = document.createElement("div");
    rowLevelAndScore.classList.add("row", "mb-3");

    let questionLevel = document.createElement("div");
    questionLevel.classList.add("col-md-6");

    let questionLevelLabel = document.createElement("label");
    questionLevelLabel.classList.add("form-label");
    questionLevelLabel.innerText = "Level:";

    let questionLevelSelect = document.createElement("select");
    questionLevelSelect.classList.add("form-select");

    let optionEasy = createOption("Easy");
    let optionMedium = createOption("Medium");
    let optionHard = createOption("Hard");

    questionLevelSelect.appendChild(optionEasy);
    questionLevelSelect.appendChild(optionMedium);
    questionLevelSelect.appendChild(optionHard);

    questionLevel.appendChild(questionLevelLabel);
    questionLevel.appendChild(questionLevelSelect);
    rowLevelAndScore.appendChild(questionLevel);

    // ================ Score ===============
    let rowScore = document.createElement("div");
    rowScore.classList.add("col-md-6");

    let rowScoreLabel = document.createElement("label");
    rowScoreLabel.classList.add("form-label");
    rowScoreLabel.innerText = "Score:";

    let rowScoreInput = document.createElement("input");
    rowScoreInput.type = "number";
    rowScoreInput.classList.add("form-control");
    rowScoreInput.value = "5";

    rowScore.appendChild(rowScoreLabel);
    rowScore.appendChild(rowScoreInput);
    rowLevelAndScore.appendChild(rowScore);

    questionRow.appendChild(rowLevelAndScore);

    // ================ line ===============
    let hr = document.createElement("hr");
    questionRow.appendChild(hr);

    return questionRow;
}

function createOption(text) {
    let option = document.createElement("option");
    option.innerHTML = text;
    return option;
}

function createCorrectAnswerElement(text) {
    let correctAnswer = document.createElement("div");
    correctAnswer.classList.add("form-check", "form-check-inline");

    let correctAnswerInput = document.createElement("input");
    correctAnswerInput.classList.add("form-check-input");
    correctAnswerInput.type = "radio";
    correctAnswerInput.name = "correct";
    correctAnswerInput.id = text;

    let correctAnswerLabel = document.createElement("label");
    correctAnswerLabel.classList.add("form-check-label");
    correctAnswerLabel.setAttribute("for", text);
    correctAnswerLabel.innerText = text.toUpperCase();

    correctAnswer.appendChild(correctAnswerInput);
    correctAnswer.appendChild(correctAnswerLabel);

    return correctAnswer;
}

function createChoiceElement(text) {
    let questionChoice = document.createElement("div");
    questionChoice.classList.add("col-md-6");

    let questionChoiceLabel = document.createElement("label");
    questionChoiceLabel.classList.add("form-label");
    questionChoiceLabel.innerText = text;

    let questionChoiceInput = document.createElement("input");
    questionChoiceInput.type = "text";
    questionChoiceInput.classList.add("form-control");
    questionChoiceInput.placeholder = text;

    questionChoice.appendChild(questionChoiceLabel);
    questionChoice.appendChild(questionChoiceInput);

    return questionChoice;
}
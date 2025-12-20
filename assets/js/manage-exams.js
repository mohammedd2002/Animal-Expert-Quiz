
let storageService = new StorageService();
let examService = new ExamService();
let examStudentService = new ExamStudentService();
let studentExamResultService = new StudentExamResultsService();
let studentAnswersService = new StudentAnswersService();
let choiceService = new ChoiceService();

let errorService = new ErrorService();

let divErrors = document.getElementById("errors");
let divSuccess = document.getElementById("success");



let examsByTeacherId = examService.getByTeacherId(AuthTeacherService.currentTeacher().id);

let examIdElement = document.getElementById("exam_id");

examsByTeacherId.map(function (exam) {

    examIdElement.appendChild(createOption(exam.id, exam.examName));
});

// ====================== Show Results By Exam  ===================

const studentResultsAccordion = document.getElementById("student-results-accordion");

examIdElement.addEventListener("change", function (event) {

    studentResultsAccordion.innerHTML="";

    const examId = Number(examIdElement.value);

    const examStudents = examService.getStudents(examId);

    examStudents.map(function (student, index) {


    
        const studentExamResult = studentExamResultService.getResult(examId, student.id);

        if (studentExamResult) {
            const examQuestions = examService.getQuestions(examId);

            let examQuestionsWithAnswers = [];

            examQuestions.map(function (examQuestion) {

                let studentAnswer = studentAnswersService.getAnswer(studentExamResult.id, examQuestion.id);
                console.log(studentExamResult.id, examQuestion.id);
                let studentAnswerText = choiceService.getById(studentAnswer.selectedChoiceId).answerText;

                examQuestionsWithAnswers.push(
                    {
                        questionText: examQuestion.questionText,
                        image: examQuestion.image,
                        studentAnswerText: studentAnswerText,

                    }

                );
            });


            studentResultsAccordion.appendChild(createStudentAccordionItem(
                student.id, student.username, studentExamResult.score, studentExamResult.dateTaken,
                examQuestionsWithAnswers
            ));
        }

    
    });


});


// ====================== Create Elaments ===================

function createStudentAccordionItem(studentId, studentName, score, date, questions) {


    const accordionItem = createGroupInput("accordion-item");


    const accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";

    const accordionButton = createButton(
        studentName + " - " + score + " - " + date,
        "accordion-button collapsed"
    );
    accordionButton.setAttribute("data-bs-toggle", "collapse");
    accordionButton.setAttribute("data-bs-target", "#" + studentId);

    accordionHeader.appendChild(accordionButton);


    const accordionCollapse = createGroupInput("accordion-collapse collapse");
    accordionCollapse.id = studentId;


    const accordionBody = createGroupInput("accordion-body");

    const bodyTitle = document.createElement("strong");
    bodyTitle.innerText = " Answer s: " + studentName;

    accordionBody.appendChild(bodyTitle);
    accordionBody.appendChild(createBr());
    accordionBody.appendChild(createBr());

    // ============== Questions ===========
    questions.map(function (question, index) {
        accordionBody.appendChild(
            createQuestion(
                index + 1,
                question.questionText,
                question.image,

                question.studentAnswerText
            )
        );
    });

    accordionCollapse.appendChild(accordionBody);


    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionCollapse);

    return accordionItem;
}


function createQuestion(number, questionText, imageSrc, studentAnswer) {


    const questionRow = document.createElement("div");


    const questionTextDiv = document.createElement("div");
    questionTextDiv.innerText = "Q" + number + ": " + questionText;


    const questionImage = createImage( "../../assets/images/" + imageSrc
        ,
        "img-thumbnail my-2"
    );


    const studentAnswerSpan = createSpan(
        "Student Answer: " + studentAnswer,
        "text-success"
    );



    questionRow.appendChild(questionTextDiv);
    questionRow.appendChild(createBr());
    questionRow.appendChild(questionImage);
    questionRow.appendChild(createBr());
    questionRow.appendChild(studentAnswerSpan);
    questionRow.appendChild(createBr());

    questionRow.appendChild(createBr());
    questionRow.appendChild(createBr());

    return questionRow;
}


function createButton(text, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.innerText = text;
    return button;
}

function createImage(src, className) {
    const img = document.createElement("img");
    img.src = src;
    img.className = className;
    img.style.width="100px";
    img.style.height="100px";
    return img;
}

function createSpan(text, className) {
    const span = document.createElement("span");
    span.className = className;
    span.innerText = text;
    return span;
}

function createBr() {
    return document.createElement("br");
}



function createOption(value = "", text = "") {
    let optionElement = document.createElement("option");
    optionElement.value = value;
    optionElement.innerText = text;
    return optionElement;
}


function createInput(type = "text", className, name, placeholder, value, id) {

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
    if (id) {
        input.id = id;
    }
    if (value !== undefined) {
        input.value = value;
    }

    return input;
}

function createLabel(text, className = "form-label", forValue = "") {
    const label = document.createElement("label");
    label.className = className;
    label.innerText = text;
    label.setAttribute("for", forValue);
    return label;
}
function createGroupInput(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
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

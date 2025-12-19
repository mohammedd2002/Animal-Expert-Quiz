
let storageService = new StorageService();
let examService = new ExamService();
let examStudentService = new ExamStudentService();
let errorService = new ErrorService();




let divErrors = document.getElementById("errors");
let divSuccess = document.getElementById("success");



let examsByTeacherId = examService.getByTeacherId(AuthTeacherService.currentTeacher().id);

let examId = document.getElementById("exam_id");
examId.innerHTML = "";

examsByTeacherId.map(function (exam) {

    examId.appendChild(createOption(exam.id, exam.examName));
});

// ==============  students ===========
let students = (new StudentService()).get();

let studentsElement = document.getElementById("students");
students.map(function (student) {

    studentsElement.appendChild(createCheckBoxGroup(student.username, student.id, student.id));
});

// ============== assign exam  ======
let assignExamBtn = document.getElementById("assign-exam-btn");
assignExamBtn.addEventListener("click", function () {

    errorService.clear();
    divErrors.innerHTML = "";
    divSuccess.innerHTML = "";

    if (validateHandleAssignExamToStudents()) {
        handleAssignExamToStudents();


        divSuccess.appendChild(createSuccessAlert("Assign Exame Maked Successfully"));
        examId.value = "";
        let checkboxes = studentsElement.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => checkbox.checked = false);


    } else {

        errorService.getAll().forEach(error => {
            divErrors.appendChild(createErrorAlert(error));
        });
    }

});


function handleAssignExamToStudents() {


    let examId = Number(document.getElementById("exam_id").value); //  return 0 or number;

    let selectedStudents = document.querySelectorAll(".students_ids:checked"); // array of objects , length = number 
    let selectedStudentsIds = [];
    for (let student of selectedStudents) {

        selectedStudentsIds.push(Number(student.id));
    }

    selectedStudentsIds.map(function (selectedStudentId, index) {
        examStudentService.store(new ExamStudent(
            storageService.getNextIdForItem("examStudents"),
            examId,
            selectedStudentId));
    });

}

function validateHandleAssignExamToStudents() {
    let examId = Number(document.getElementById("exam_id").value); //  return 0 or number;
    if (examId === 0) {

        errorService.add("Not Selected Valid Exame ");

    }
    let selectedStudents = document.querySelectorAll(".students_ids:checked");
    if (selectedStudents.length <= 0) {
        errorService.add("Not Selected Valid Students ");

    }
    return !errorService.hasErrors();
}


function createCheckBoxGroup(text, value, forValue) {
    const label = createLabel(text, "form-check-label", forValue);
    const input = createInput("checkbox", "form-check-input students_ids", "students_ids", "", value, forValue);
    const group = createGroupInput("form-check mb-2");

    group.appendChild(input);
    group.appendChild(label);

    return group;
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


let storageService = new StorageService();
let examService = new ExamService();
let examStudentService = new ExamStudentService();
let errorService = new ErrorService();

let divErrors = document.getElementById("errors");
let divSuccess = document.getElementById("success");


let examsByTeacher = examService.getByTeacherId(AuthTeacherService.currentTeacher().id);
let examsElement = document.getElementById("exams");

examsByTeacher.map(function (exam, index) {

    examsElement.appendChild(createRowExam(exam.examName, exam.durationMinutes, exam.id));
});



function createRowExam(examName = "", examDuration = "", examId) {

    let trExam = document.createElement("tr");

    let colName = document.createElement("td");
    colName.innerText = examName;

    let colDuration = document.createElement("td");
    colDuration.innerText = examDuration;

    let colActions = document.createElement("td");
    let showBtn = document.createElement("a");
    showBtn.classList.add("btn", "btn-sm", "btn-outline-warning", "me-2");
    showBtn.innerText = "Edit";
    showBtn.href = `../../pages/teacher/edit-exam.html?examId=${examId}`;

    colActions.appendChild(showBtn);
    trExam.appendChild(colName);
    trExam.appendChild(colDuration);
    trExam.appendChild(colActions);


    showBtn.addEventListener("click", function (event) {

        errorService.clear();
        divErrors.innerHTML = "";

        if (!validateCanBeEdit(examId)) {
            event.preventDefault();

            errorService.getAll().forEach(error => {
                divErrors.appendChild(createErrorAlert(error));
            });
        }
    });

    return trExam;

}
// =================== Get has Students Message ===================

function createErrorAlert(message) {

    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.innerText = message;

    return alert;
}

function validateCanBeEdit(examId) {
    if (examService.getStudents(examId).length > 0) {

        errorService.add("You cannot edit the exam because it is already running.");
    }

    return !errorService.hasErrors();
}






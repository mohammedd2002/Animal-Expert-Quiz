
let currentStudent = JSON.parse(localStorage.getItem('currentStudent'));




if (!currentStudent) {
    window.location.href = '../../login.html';
} else {
    let userData = currentStudent.data || currentStudent;

    document.getElementById('studentName').textContent = userData.username;
    document.getElementById('studentGrade').textContent = userData.grade;
    document.getElementById('studentMobile').textContent = userData.mobileNumber;
    document.getElementById('navbarUsername').textContent = userData.username;
    document.getElementById('profileImage').src = userData.image;

    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentStudent');
    });
}

function loadRequiredExams() {

    var examService = new ExamService();
    var examStudentService = new ExamStudentService();
    var resultsService = new StudentExamResultsService();

    var requiredExamsList = document.getElementById('requiredExamsList');
    var noExams = document.getElementById('noRequiredExams');
    var completedBody = document.getElementById('completedExamsBody');

    requiredExamsList.innerHTML = '';
    completedBody.innerHTML = '';

    var assignedExams = examStudentService.getByStudent(currentStudent.id);

    if (assignedExams.length === 0) {
        noExams.classList.remove('d-none');
        requiredExamsList.appendChild(noExams);
        return;
    }

    noExams.classList.add('d-none');

    assignedExams.forEach(function (item) {
        var exam = examService.getById(item.examId);
        if (!exam) return;

        if (resultsService.hasTakenExam(currentStudent.id, exam.id)) {
            var result = resultsService.get().find(r => r.studentId == currentStudent.id && r.examId == exam.id);
            var tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${exam.examName}</td>
                <td>${result.score}</td>
                <td>${result.dateTaken}</td>
            `;
            completedBody.appendChild(tr);
        } else {
            var li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            li.innerHTML = `
            <div>
                <strong>${exam.examName}</strong><br>
                <small class="text-muted">
                    Duration: ${exam.durationMinutes} minutes |
                    Questions: ${exam.questionsCount}
                </small>
            </div>

            <button class="btn btn-sm btn-primary">
                Start Exam
            </button>
        `;

            li.querySelector('button').onclick = function () {
                window.location.href = 'exam.html?examId=' + exam.id;
            };

            requiredExamsList.appendChild(li);
        }
    });
}
loadRequiredExams();
class ExamStudentService extends StorageService {
    // examStudent

    store(examStudent = {}) {

        let examStudents = this.get();
        examStudents.push(examStudent);
        this.setItem('examStudents', examStudents);
    }

    get() {

        return this.getItem('examStudents');
    }

    getById(examStudentId) {
        let examStudents = this.get();
        return examStudents.find(function (examStudent) {
            return examStudent.id === examStudentId;

        });
    }



    getByStudent(studentId) {
        var examStudents = this.get();
        var studentExams = [];

        for (var i = 0; i < examStudents.length; i++) {
            if (examStudents[i].studentId == studentId) {
                studentExams.push(examStudents[i]);
            }
        }

        return studentExams;
    }

    getByExam(examId) {
        var examStudents = this.get();
        var examStudentsList = [];

        for (var i = 0; i < examStudents.length; i++) {
            if (examStudents[i].examId == examId) {
                examStudentsList.push(examStudents[i]);
            }
        }

        return examStudentsList;
    }

    isAssigned(examId, studentId) {
        var examStudents = this.get();

        for (var i = 0; i < examStudents.length; i++) {
            if (examStudents[i].examId == examId && examStudents[i].studentId == studentId) {
                return true;
            }
        }

        return false;
    }
}
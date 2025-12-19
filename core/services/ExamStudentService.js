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

}
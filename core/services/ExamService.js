class ExamService extends StorageService {

    store(exam = {}) {

        let exams = this.get();
        exams.push(exam);
        this.setItem('exams', exams);
    }

    get() {

        return this.getItem('exams');
    }

    getById(examId) {
        let exams = this.get();
        return exams.find(function (exam) {
            return exam.id === examId;

        });
    }


    getByTeacherId(teacherId) {
        let exams = this.get();
        return exams.filter(function (exam) {

            return exam.teacherId === teacherId;
        });

    }

    getQuestions(examId) {

        let questions = this.getItem('questions');
        return questions.filter(function (question) {

            return question.examId === examId;
        })
    }

    assignStudents(examId, studentIds) {

        let examStudents = this.getItem("examStudents");

        studentIds.map(function (studentId) {

            return examStudents.push(new ExamStudent(null, examId, studentId));

        });

    }
    getStudents(examId) {
        let examStudents = this.getItem("examStudents");

        let studentIds = examStudents.filter(function (examStudent) {

            return examStudent.examId === examId;
        }).map(function (examStudent) {

            return examStudent.studentId;
        });

        let students = (new StudentService()).get();

        return students.filter(function (student) {

            return studentIds.includes(student.id);
        })
    }

    update(examUpdated) {

        let exams = this.get();

        exams = exams.map(function (exam) {

            if (exam.id === examUpdated.id) {

                return examUpdated;
            } else {
                return exam;
            }

        });

        this.setItem('exams', exams);


    }

    delete(examId) {
        let exams = this.get();

        exams = exams.filter(function (exam) {

            return exam.id !== examId;
        });

        this.setItem('exams', exams);
    }
}
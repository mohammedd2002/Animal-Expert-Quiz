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

    getQuestions(examId) {

        let questions = this.getItem('questions');
        return questions.filter(function (question) {

            return question.examId === examId;
        })
    }

}
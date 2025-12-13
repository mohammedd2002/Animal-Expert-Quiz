class QuestionService extends StorageService {

    store(question = {}) {

        let questions = this.get();
        questions.push(question);
        this.setItem('questions', questions);
    }

    get() {

        return this.getItem('questions');
    }

    getById(questionId) {

        let questions = this.get();
        return questions.find(function (question) {
            return question.id == questionId;

        });
    }

    getByExam(examId) {

        let questions = this.get();
        return questions.filter(function (question) {

            return question.examId == examId;
        });
    }

    getChoices(questionId) {

        return (new ChoiceService()).getByQuestion(questionId);
    }
}


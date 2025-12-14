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
    update(questionId, updatedQuestion) {
        let questions = this.get();
        let index = -1;

        for (let i = 0; i < questions.length; i++) {
            if (questions[i].id == questionId) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            for (let key in updatedQuestion) {
                questions[index][key] = updatedQuestion[key];
            }

            this.setItem('questions', questions);
            return true;
        }

        return false;
    }


    delete(questionId) {

        let questions = this.get();
        let filteredQuestions = questions.filter(function (question) {
            return question.id != questionId;
        });
        this.setItem('questions', filteredQuestions);
    }

    deleteByExam(examId) {

        let questions = this.get();
        let filteredQuestions = questions.filter(function (question) {
            return question.examId != examId;
        });
        this.setItem('questions', filteredQuestions);
    }
}


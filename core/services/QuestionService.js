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
    update(questionUpdated) {
        let questions = this.get();

        questions = questions.map(function (question) {
            if (question.id === questionUpdated.id) {
                return questionUpdated;
            } else {
                return question;
            }
        });

        this.setItem('questions', questions);
    }

    delete(questionId) {
        let questions = this.get();

        questions = questions.filter(function (question) {
            return question.id !== questionId;
        });

        this.setItem('questions', questions);
    }

    // deleteByExam(examId) {

    //     let questions = this.get();
    //     let filteredQuestions = questions.filter(function (question) {
    //         return question.examId != examId;
    //     });
    //     this.setItem('questions', filteredQuestions);
    // }
}


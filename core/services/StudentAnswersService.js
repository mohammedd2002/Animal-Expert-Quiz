class StudentAnswersService extends StorageService {

    store(answer = {}) {

        let answers = this.get();
        answers.push(answer);
        this.setItem('answers', answers);
    }

    get() {

        return this.getItem('answers');
    }

    getById(answerId) {
        let answers = this.get();
        return answers.find(function (answer) {
            return answer.id === answerId;

        });
    }

    getAnswer(resultId, questionId) {

        let answers = this.get();

        return answers.find(function (answer) {

            return answer.resultId === resultId && answer.questionId === questionId;

        });

    }


}
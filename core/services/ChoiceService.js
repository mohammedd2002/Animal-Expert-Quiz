class ChoiceService extends StorageService {

    store(choice = {}) {

        let choices = this.get();
        choices.push(choice);
        this.setItem('choices', choices);
    }

    get() {

        return this.getItem('choices');
    }

    getById(choiceId) {

        let choices = this.get();
        return choices.find(function (choice) {
            return choice.id == choiceId;

        });
    }

    getByQuestion(questionId) {

        let choices = this.get();
        return choices.filter(function (choice) {

            return choice.questionId == questionId;
        });
    }
}


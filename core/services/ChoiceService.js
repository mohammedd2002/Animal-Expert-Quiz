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

    update(choiceUpdated) {
        let choices = this.get();

        choices = choices.map(function (choice) {
            return choice.id === choiceUpdated.id ? choiceUpdated : choice;
        });

        this.setItem('choices', choices);
    }

    delete(choiceId) {
        let choices = this.get();
        choices = choices.filter(choice => choice.id !== choiceId);
        this.setItem('choices', choices);
    }
}


class StudentAnswersService extends StorageService {

    store(answer) {
        var answers = this.get();
        answers.push(answer);
        this.setItem('studentAnswers', answers);
    }

    get() {
        return this.getItem('studentAnswers');
    }

   
}
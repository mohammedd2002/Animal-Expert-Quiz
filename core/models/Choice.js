class Choice {


    id;
    answerText;
    isCorrect;
    questionId;

    constructor(id, answerText, isCorrect, questionId) {

        this.id = id;
        this.answerText = answerText;
        this.isCorrect = isCorrect;
        this.questionId = questionId;

    }
}
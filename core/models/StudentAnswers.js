class StudentAnswers{
    id;
    questionId;
    selectedChoiceId;
    resultId;
    isCorrect;

    constructor(id, questionId, selectedChoiceId, resultId, isCorrect) {

        this.id = id;
        this.questionId = questionId;
        this.selectedChoiceId = selectedChoiceId;
        this.resultId = resultId;
        this.isCorrect = isCorrect;


    }
}
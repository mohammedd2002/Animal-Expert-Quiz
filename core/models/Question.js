class Question {

    id;
    questionText;
    image;
    difficulty;
    score;
    choices;
    examId;

    constructor(id, questionText, image, difficulty, score, choices, examId) {
        this.id = id;
        this.questionText = questionText;
        this.image = image;
        this.difficulty = difficulty;
        this.score = score;
        this.choices = choices;
        this.examId = examId;

    }

}
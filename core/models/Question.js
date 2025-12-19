class Question {

    id;
    questionText;
    image;
    difficulty;
    score;
    examId;

    constructor(id, questionText, image, difficulty, score,  examId) {
        this.id = id;
        this.questionText = questionText;
        this.image = image;
        this.difficulty = difficulty;
        this.score = score;
        this.examId = examId;

    }

}
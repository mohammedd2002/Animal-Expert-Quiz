class Exam {

    id;
    examName;
    durationMinutes;
    questionsCount;
    teacherId;

    constructor(id, examName, durationMinutes, questionsCount, teacherId) {
        this.id = id;
        this.examName = examName;
        this.durationMinutes = durationMinutes;
        this.questionsCount = questionsCount;
        this.teacherId = teacherId;
    }

}
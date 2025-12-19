class StudentExamResultsService extends StorageService {

    store(result) {
        var results = this.get();
        results.push(result);
        this.setItem('studentExamResults', results);
    }

    get() {
        return this.getItem('studentExamResults');
    }

    getById(resultId) {
        let results = this.get();
        return results.find(function (result) {
            return result.id === resultId;

        });
    }

    getResult(examId, studentId) {
        let results = this.getItem('studentExamResults');

        return results.find(function (result) {

            return result.examId === examId && result.studentId === studentId;

        });
    }

    hasTakenExam(studentId, examId) {
        var results = this.get();
        
        for (var i = 0; i < results.length; i++) {
            if (results[i].studentId == studentId && results[i].examId == examId) {
                return true;
            }
        }
        
        return false;
    }
}
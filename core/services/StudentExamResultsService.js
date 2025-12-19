class StudentExamResultsService extends StorageService {

    store(result) {
        var results = this.get();
        results.push(result);
        this.setItem('studentExamResults', results);
    }

    get() {
        return this.getItem('studentExamResults');
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
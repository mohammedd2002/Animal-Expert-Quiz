class StudentExamResultService extends StorageService {

    store(result = {}) {

        let results = this.get();
        results.push(result);
        this.setItem('results', results);
    }

    get() {

        return this.getItem('results');
    }

    getById(resultId) {
        let results = this.get();
        return results.find(function (result) {
            return result.id === resultId;

        });
    }

    getResult(examId, studentId) {
        let results = this.getItem('results');
        
        return results.find(function (result) {

            return result.examId === examId && result.studentId === studentId;

        });
    }



}
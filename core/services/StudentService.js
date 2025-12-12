class StudentService extends StorageService {

    store(student = {}) {

        let students = this.get();
        students.push(student);
        this.setItem('students', students);
    }

    get() {

        return this.getItem('students');
    }

    getById(studentId) {

        let students = this.get();
        return students.find(function (student) {
            return student.id == studentId;

        });
    }
}


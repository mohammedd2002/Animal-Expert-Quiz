class TeacherService extends StorageService {

    store(teacher = {}) {

        let teachers = this.get();
        teachers.push(teacher);
        this.setItem('teachers', teachers);
    }

    get() {

        return this.getItem('teachers');
    }

    getById(teacherId) {
        let teachers = this.get();
        return teachers.find(function (teacher) {
            return teacher.id === teacherId

        });

    }
    getExams(teacherId) {

        let exams = this.getItem('exams');

        return exams.filter(function (exam) {

            return exam.teacherId === teacherId;
        });
    }

    getByUsername(username) {
        let teachers = this.get();
        return teachers.find(function (teacher) {
            return teacher.username == username;
        });
    }

}
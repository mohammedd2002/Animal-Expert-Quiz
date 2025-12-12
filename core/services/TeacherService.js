class TeacherService extends StorageService {

    store(teacher = {}) {

        let teachers = this.get();
        teachers.push(teacher);
        this.setItem('teachers', teachers);
    }

    get() {

        return this.getItem('teachers');
    }

    exams(teacherId) {

        let exams = this.getItem('exams');

        return exams.filter(function (exam, index, exams) {

            return exam.teacherId === teacherId;
        });

    }


}
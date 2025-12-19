window.onload = function () {
    const storage = new StorageService();

    const existingTeachers = storage.getItem('teachers');

     if (existingTeachers.length > 0) {
        return;
    }

    const teachers = [
        new Teacher(1, 'teacher1', '123456', 'Animals'),
        new Teacher(2, 'teacher2', '123456', 'Planets')
    ];
    storage.setItem('teachers', teachers);
}
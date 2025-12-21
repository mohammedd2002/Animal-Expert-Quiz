window.onload = function () {

    let storage = new StorageService();

    let existingTeachers = storage.getItem('teachers');
    if (existingTeachers && existingTeachers.length > 0) {
        return;
    }

    const imagePath = '../../assets/images/';

    let teachers = [
        new Teacher(1, 'teacher1', '123456', 'Animals'),
        new Teacher(2, 'teacher2', '123456', 'Planets')
    ];
    storage.setItem('teachers', teachers);

    let students = [
        new Student(1, 'ahmed', '123456', 1, '01012345678', '../../assets/images/photo-1500648767791-00dcc994a43e.png'),
        new Student(2, 'sara', '123456', 2, '01087654321', '../../assets/images/premium_photo-1689551670902-19b441a6afde.png')
    ];
    storage.setItem('students', students);

    let exam = new Exam(1, 'Animals Expert Quiz', 15, 15, 1);
    storage.setItem('exams', [exam]);

    let questions = [
        new Question(1, 'What is the king of the jungle?', imagePath + 'lion.jpeg', 'Easy', 7, 1),
        new Question(2, 'Which animal has a long neck?', imagePath + 'giraffe.jpg', 'Easy', 7, 1),
        new Question(3, 'What is the fastest land animal?', imagePath + 'cheetah.jpg', 'Medium', 4, 1),
        new Question(4, 'Which animal is known for its stripes?', imagePath + 'zebra.jpg', 'Easy', 6, 1),
        new Question(5, 'What do pandas eat?', imagePath + 'panda.jpg', 'Easy', 6, 1),
        new Question(6, 'Which bird cannot fly?', imagePath + 'ostrich.jpg', 'Medium', 7, 1),
        new Question(7, 'What is the largest mammal?', imagePath + 'whale.jpg', 'Medium', 7, 1),
        new Question(8, 'Which animal lives in the desert?', imagePath + 'camel.jpg', 'Easy', 6, 1),
        new Question(9, 'What sound does a cat make?', imagePath + 'cat.jpg', 'Easy', 7, 1),
        new Question(10, 'Which animal has a trunk?', imagePath + 'elephant.jpg', 'Easy', 7, 1),
        new Question(11, 'What is a baby dog called?', imagePath + 'puppy.jpg', 'Easy', 7, 1),
        new Question(12, 'Which animal sleeps hanging upside down?', imagePath + 'bat.jpg', 'Medium', 7, 1),
        new Question(13, 'What color is a polar bear skin?', imagePath + 'polarbear.jpg', 'Hard', 8, 1),
        new Question(14, 'Which animal can change its color?', imagePath + 'chameleon.jpg', 'Medium', 7, 1),
        new Question(15, 'What is the tallest animal?', imagePath + 'giraffe.jpg', 'Easy', 7, 1)
    ];
    storage.setItem('questions', questions);

    let choices = [
        new Choice(1, 'Lion', true, 1),
        new Choice(2, 'Tiger', false, 1),
        new Choice(3, 'Elephant', false, 1),
        new Choice(4, 'Bear', false, 1),

        new Choice(5, 'Elephant', false, 2),
        new Choice(6, 'Giraffe', true, 2),
        new Choice(7, 'Horse', false, 2),
        new Choice(8, 'Camel', false, 2),

        new Choice(9, 'Lion', false, 3),
        new Choice(10, 'Cheetah', true, 3),
        new Choice(11, 'Horse', false, 3),
        new Choice(12, 'Dog', false, 3),

        new Choice(13, 'Zebra', true, 4),
        new Choice(14, 'Horse', false, 4),
        new Choice(15, 'Tiger', false, 4),
        new Choice(16, 'Giraffe', false, 4),

        new Choice(17, 'Bamboo', true, 5),
        new Choice(18, 'Meat', false, 5),
        new Choice(19, 'Fish', false, 5),
        new Choice(20, 'Grass', false, 5),

        new Choice(21, 'Eagle', false, 6),
        new Choice(22, 'Ostrich', true, 6),
        new Choice(23, 'Parrot', false, 6),
        new Choice(24, 'Owl', false, 6),

        new Choice(25, 'Elephant', false, 7),
        new Choice(26, 'Blue Whale', true, 7),
        new Choice(27, 'Giraffe', false, 7),
        new Choice(28, 'Shark', false, 7),

        new Choice(29, 'Camel', true, 8),
        new Choice(30, 'Penguin', false, 8),
        new Choice(31, 'Bear', false, 8),
        new Choice(32, 'Dolphin', false, 8),

        new Choice(33, 'Bark', false, 9),
        new Choice(34, 'Meow', true, 9),
        new Choice(35, 'Roar', false, 9),
        new Choice(36, 'Chirp', false, 9),

        new Choice(37, 'Elephant', true, 10),
        new Choice(38, 'Rhino', false, 10),
        new Choice(39, 'Hippo', false, 10),
        new Choice(40, 'Lion', false, 10),

        new Choice(41, 'Puppy', true, 11),
        new Choice(42, 'Kitten', false, 11),
        new Choice(43, 'Calf', false, 11),
        new Choice(44, 'Cub', false, 11),

        new Choice(45, 'Bat', true, 12),
        new Choice(46, 'Sloth', false, 12),
        new Choice(47, 'Monkey', false, 12),
        new Choice(48, 'Bird', false, 12),

        new Choice(49, 'White', false, 13),
        new Choice(50, 'Black', true, 13),
        new Choice(51, 'Gray', false, 13),
        new Choice(52, 'Brown', false, 13),

        new Choice(53, 'Chameleon', true, 14),
        new Choice(54, 'Snake', false, 14),
        new Choice(55, 'Frog', false, 14),
        new Choice(56, 'Lizard', false, 14),

        new Choice(57, 'Elephant', false, 15),
        new Choice(58, 'Giraffe', true, 15),
        new Choice(59, 'Camel', false, 15),
        new Choice(60, 'Horse', false, 15)
    ];
    storage.setItem('choices', choices);

    let examStudent = new ExamStudent(1, 1, 1);
    storage.setItem('examStudents', [examStudent]);
};

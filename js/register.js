
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();


    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const grade = document.getElementById('regGrade').value;
    const mobileNumber = document.getElementById('regMobile').value.trim();
    const image = document.getElementById('regProfilePicture').files[0];
    const registerError = document.getElementById('registerError');

    if (!username || !password || !grade || !mobileNumber) {
        registerError.textContent = 'Please fill all required fields';
        registerError.classList.remove('d-none');
        return;
    }

    const studentService = new StudentService();

    if (studentService.getByUsername(username)) {
        registerError.textContent = 'Username already exists';
        registerError.classList.remove('d-none');
        return;
    }

    const students = studentService.get();
    const newId = students.length + 1;

    let imagePath = '../../assets/images/default.png';

    if (image) {
        imagePath = `../../assets/images/${image.name}`;
    }

    const student = new Student(
        newId,
        username,
        password,
        grade,
        mobileNumber,
        imagePath
    );

    studentService.store(student);

    localStorage.setItem('currentUser', JSON.stringify({
        id: student.id,
        username: student.username,
        userType: 'student',
        data: student
    }));

    location.href = 'pages/student/index.html';
});

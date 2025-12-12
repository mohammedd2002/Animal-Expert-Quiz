document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;
    let userType = document.getElementById('userType').value;
    let error = document.getElementById('Error');

    let user = null;

    if (userType == 'student') {
        let studentService = new StudentService();
        user = studentService.getByUsername(username);
    } else {
        let teacherService = new TeacherService();
        user = teacherService.getByUsername(username);
    }

    if (user && user.password == password) {
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            username: user.username,
            userType: userType,
            data: user
        }));

        if (userType == 'student') {
            window.location.href = 'index.html';
        } else {
            window.location.href = '../teacher/home.html';
        }
    } else {
        error.textContent = 'Invalid username or password';
        error.classList.remove('d-none');
    }
});


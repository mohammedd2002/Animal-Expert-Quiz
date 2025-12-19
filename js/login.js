document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    var userType = document.getElementById('userType').value;
    var error = document.getElementById('Error');

    var user = null;

    if (userType == 'student') {
        var studentService = new StudentService();
        user = studentService.getByUsername(username);
    } else {
        var teacherService = new TeacherService();
        user = teacherService.getByUsername(username);
    }

    if (user && user.password == password) {
        
        if (userType == 'teacher') {
            localStorage.setItem('currentTeacher', JSON.stringify(user));
            window.location.href = 'pages/teacher/home.html';
        } else {
            localStorage.setItem('currentStudent', JSON.stringify(user));
            window.location.href = 'pages/student/index.html';
        }
        
    } else {
        error.textContent = 'Invalid username or password';
        error.classList.remove('d-none');
    }
});
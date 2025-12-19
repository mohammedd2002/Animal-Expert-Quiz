
if (AuthTeacherService.currentTeacher() === null) {

    window.location = "../../login.html";

}




//logout

window.addEventListener('load', function () {
    let currentTeacher = JSON.parse(localStorage.getItem('currentTeacher'));

    if (!currentTeacher) {
        window.location.href = '../../login.html';
    } else {
        document.getElementById('logoutBtn').addEventListener('click', function () {
            localStorage.removeItem('currentTeacher');
            window.location.href = '../../login.html';
        });
    }

    document.getElementById("teacherName").innerText = currentTeacher.username;

});
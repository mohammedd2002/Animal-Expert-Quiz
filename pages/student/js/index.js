let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'login.html';
} else {
    let userData = currentUser.data || currentUser;

    document.getElementById('studentName').textContent = userData.username;
    document.getElementById('studentGrade').textContent = userData.grade;
    document.getElementById('studentMobile').textContent = userData.mobileNumber;
    document.getElementById('navbarUsername').textContent = userData.username;
    document.getElementById('profileImage').src = userData.image;

    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
    });
}
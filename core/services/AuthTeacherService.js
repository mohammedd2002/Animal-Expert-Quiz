class AuthTeacherService {

    static login() {


    }

    static register() {


    }

    static currentTeacher() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        return user && user.userType === "teacher" ? user : null;
    }



}
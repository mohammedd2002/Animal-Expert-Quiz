class AuthTeacherService {

    static login() {


    }

    static register() {


    }

    static currentTeacher() {

        const user = JSON.parse(localStorage.getItem("currentTeacher"));

        return user ? user : null;
    }



}
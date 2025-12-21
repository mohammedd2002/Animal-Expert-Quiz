# Online Exam System

---

## 📁 Project Structure

```
project-root/
│
├── assets/
│   ├── css/
│   │   └── teacher/
│   │       └── style.css
│   ├── js/
│   │   ├── assign-students.js
│   │   ├── create-eaxm.js
│   │   ├── dashboard-teacher.js
│   │   ├── edit-exam.js
│   │   ├── exam.js
│   │   ├── index.js
│   │   ├── manage-exams.js
│   │   ├── teacher-home.js
│   │   └── teacher-seeder.js
│   └── images/
│       └── [exam question images]
│
├── core/
│   ├── models/
│   │   ├── Choice.js
│   │   ├── Exam.js
│   │   ├── ExamStudent.js
│   │   ├── Question.js
│   │   ├── Student.js
│   │   ├── StudentAnswers.js
│   │   ├── StudentExamResults.js
│   │   └── Teacher.js
│   │
│   └── services/
│       ├── AuthStudentService.js
│       ├── AuthTeacherService.js
│       ├── ChoiceService.js
│       ├── ErrorService.js
│       ├── ExamService.js
│       ├── ExamStudentService.js
│       ├── FileService.js
│       ├── QuestionService.js
│       ├── StorageService.js
│       ├── StudentAnswersService.js
│       ├── StudentExamResultsService.js
│       ├── StudentExamResultService.js
│       ├── StudentService.js
│       └── TeacherService.js
│
├── data/
│   └── seed.js
│
├── js/
│   ├── helpers.js
│   ├── login.js
│   └── register.js
│
├── pages/
│   ├── student/
│   │   ├── exam.html
│   │   └── index.html
│   │
│   └── teacher/
│       ├── assign-students.html
│       ├── create-exam.html
│       ├── edit-exam.html
│       ├── home.html
│       └── manage-exams.html
│
├── login.html
├── register.html
└── teacher-seeder.html




### First Run

When you first open `login.html`, the system will:
1. Automatically run `seed.js`
2. Create initial data in localStorage:
   - 2 teachers
   - 2 students
   - 1 complete exam with 15 questions
   - 1 exam assignment

## Image Handling

### Important: How Images Work

The system stores **only filenames** in localStorage, not the actual image data.

#### For Teachers (Creating Exams)
1. Select an image file using the file input
2. System extracts the filename using `FileService.getImageName()`
3. **You must manually place the image** in `assets/images/` folder
4. Image path is constructed as: `../../assets/images/[filename]`

#### For Students (Profile Pictures)
1. Select profile picture during registration
2. Path is stored as: `../../assets/images/[filename]`
3. Default image available: `default.png`


**⚠️ Important**: Make sure these images exist in `assets/images/` for the seed data to work properly.

## 📖 Usage Guide

### Login Credentials

#### Student Account
```
Username: ahmed
Password: 123456

- Has an assigned exam ready to take
- Grade 1 student

### Teacher Account

Username: teacher1
Password: 123456
```
- Owns the "Animals Expert Quiz"
- Can create and manage exams

#### Alternative Teacher
```
Username: teacher2
Password: 123456
```
- Teaches "Planets" course


## 🔧 Technical Details

### Architecture
- **Pure Vanilla JavaScript** (ES6+)
- **Object-Oriented Programming** with classes
- **Service Layer Pattern** for data operations
- **localStorage** for data persistence
- **Bootstrap 5.3** for UI components

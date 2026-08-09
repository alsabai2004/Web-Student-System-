// ===== تسجيل الدخول =====
function login(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "home.html";
    } else {
        alert("بيانات الدخول غير صحيحة");
    }
}

// ===== جلب الطلاب من التخزين =====
function getStudents() {
    let students = localStorage.getItem("students");
    if (students === null) {
        return [];
    } else {
        return JSON.parse(students);
    }
}

// ===== حفظ الطلاب في التخزين =====
function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

// ===== إضافة طالب =====
function addStudent(event) {
    event.preventDefault();
    let students = getStudents();

    let student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        level: document.getElementById("level").value,
        gpa: document.getElementById("gpa").value
    };

    students.push(student);
    saveStudents(students);
    alert("تمت إضافة الطالب بنجاح");
    window.location.href = "home.html";
}

// ===== حذف طالب (بدون filter) =====
function deleteStudent(event) {
    event.preventDefault();
    let students = getStudents();
    let id = document.getElementById("deleteId").value;
    let newStudents = [];

    for (let i = 0; i < students.length; i++) {
        if (students[i].id !== id) {
            newStudents.push(students[i]);
        }
    }

    saveStudents(newStudents);
    alert("تم حذف الطالب");
    window.location.href = "home.html";
}

// ===== تعديل طالب (بدون map) =====
function updateStudent(event) {
    event.preventDefault();
    let students = getStudents();
    let id = document.getElementById("updateId").value;
    let newStudents = [];

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            let updatedStudent = {
                id: id,
                name: document.getElementById("updateName").value,
                department: document.getElementById("updateDepartment").value,
                level: document.getElementById("updateLevel").value,
                gpa: document.getElementById("updateGpa").value
            };
            newStudents.push(updatedStudent);
        } else {
            newStudents.push(students[i]);
        }
    }

    saveStudents(newStudents);
    alert("تم تعديل البيانات");
    window.location.href = "home.html";
}

// ===== عرض جميع الطلاب (بدون forEach) =====
function displayStudents() {
    let students = getStudents();
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        table.innerHTML = table.innerHTML + `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.level}</td>
                <td>${student.gpa}</td>
            </tr>
        `;
    }
}

// ===== البحث عن طالب (بدون find) =====
function searchStudent(event) {
    event.preventDefault();
    let students = getStudents();
    let id = document.getElementById("searchId").value;
    let result = document.getElementById("searchResult");
    let foundStudent = null;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            foundStudent = students[i];
            break;
        }
    }

    if (foundStudent !== null) {
        result.innerHTML = `
            <p>الاسم: ${foundStudent.name}</p>
            <p>القسم: ${foundStudent.department}</p>
            <p>المستوى: ${foundStudent.level}</p>
            <p>المعدل: ${foundStudent.gpa}</p>
        `;
    } else {
        result.innerHTML = "<p>الطالب غير موجود</p>";
    }
  }

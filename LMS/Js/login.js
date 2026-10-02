/* =========================================================
   LEARNORA LMS — LOGIN JAVASCRIPT
   Multi-User Student / Teacher / Parent Login
   Dynamic Account-Based LMS
   Parent → Child Relationship
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const loginForm = document.getElementById("loginForm");

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    const loginError = document.getElementById("loginError");
    const loginSuccess = document.getElementById("loginSuccess");

    const loginButton = document.getElementById("loginButton");
    const passwordToggle = document.getElementById("passwordToggle");

    const rememberMe = document.getElementById("rememberMe");

    const roleOptions =
        document.querySelectorAll(".role-option");

    const demoToggle =
        document.getElementById("demoToggle");

    const demoContent =
        document.getElementById("demoContent");

    const demoButtons =
        document.querySelectorAll(".use-demo");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const forgotModal =
        document.getElementById("forgotModal");

    const modalClose =
        document.getElementById("modalClose");

    const forgotForm =
        document.getElementById("forgotForm");

    const resetEmail =
        document.getElementById("resetEmail");

    const resetMessage =
        document.getElementById("resetMessage");


    /* =====================================================
       USER DATABASE
       ===================================================== */

    const users = [

        /* =================================================
           STUDENT 1 — SHEHERYAR
           ================================================= */

        {
            id: "STU001",

            email: "student@learnora.com",
            password: "Student@123",

            name: "Sheheryar Ahmed",
            firstName: "Sheheryar",

            role: "student",

            program: "BS Software Engineering",
            semester: "8th Semester",

            avatar: "SA",

            studentId: "LR-STU-001",

            gpa: "3.42",
            attendance: 87,
            overallProgress: 78,

            coursesCount: 5,

            courses: [

                {
                    code: "CS-401",
                    name: "Software Engineering",
                    instructor: "Dr. Ahmed Khan",
                    progress: 82,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "CS-403",
                    name: "Database Systems",
                    instructor: "Prof. Sarah Malik",
                    progress: 74,
                    grade: "B+",
                    credits: 3
                },

                {
                    code: "DS-301",
                    name: "Data Analytics",
                    instructor: "Dr. Hamza Ali",
                    progress: 68,
                    grade: "B+",
                    credits: 3
                },

                {
                    code: "CS-405",
                    name: "Web Engineering",
                    instructor: "Mr. Bilal Ahmed",
                    progress: 79,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "SE-410",
                    name: "Software Project Management",
                    instructor: "Dr. Fatima Noor",
                    progress: 72,
                    grade: "B+",
                    credits: 3
                }

            ],

            assignments: [

                {
                    title: "Software Requirements Document",
                    course: "Software Engineering",
                    due: "Sep 30, 2026",
                    status: "pending"
                },

                {
                    title: "Database Normalization",
                    course: "Database Systems",
                    due: "Oct 02, 2026",
                    status: "pending"
                },

                {
                    title: "Data Cleaning Report",
                    course: "Data Analytics",
                    due: "Oct 05, 2026",
                    status: "submitted"
                }

            ]
        },


        /* =================================================
           STUDENT 2 — ALI
           ================================================= */

        {
            id: "STU002",

            email: "ali@learnora.com",
            password: "Ali@123",

            name: "Ali Khan",
            firstName: "Ali",

            role: "student",

            program: "BS Computer Science",
            semester: "7th Semester",

            avatar: "AK",

            studentId: "LR-STU-002",

            gpa: "3.71",
            attendance: 92,
            overallProgress: 84,

            coursesCount: 6,

            courses: [

                {
                    code: "CS-401",
                    name: "Software Engineering",
                    instructor: "Dr. Ahmed Khan",
                    progress: 91,
                    grade: "A",
                    credits: 3
                },

                {
                    code: "CS-403",
                    name: "Database Systems",
                    instructor: "Prof. Sarah Malik",
                    progress: 88,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "DS-301",
                    name: "Data Analytics",
                    instructor: "Dr. Hamza Ali",
                    progress: 79,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "CS-405",
                    name: "Web Engineering",
                    instructor: "Mr. Bilal Ahmed",
                    progress: 86,
                    grade: "A",
                    credits: 3
                },

                {
                    code: "AI-310",
                    name: "Artificial Intelligence",
                    instructor: "Dr. Usman Raza",
                    progress: 81,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "SE-410",
                    name: "Project Management",
                    instructor: "Dr. Fatima Noor",
                    progress: 83,
                    grade: "A",
                    credits: 3
                }

            ],

            assignments: [

                {
                    title: "AI Research Paper",
                    course: "Artificial Intelligence",
                    due: "Sep 29, 2026",
                    status: "pending"
                },

                {
                    title: "Database Project",
                    course: "Database Systems",
                    due: "Oct 01, 2026",
                    status: "submitted"
                },

                {
                    title: "Web Engineering Assignment",
                    course: "Web Engineering",
                    due: "Oct 04, 2026",
                    status: "pending"
                }

            ]
        },


        /* =================================================
           STUDENT 3 — SARA
           ================================================= */

        {
            id: "STU003",

            email: "sara@learnora.com",
            password: "Sara@123",

            name: "Sara Ahmed",
            firstName: "Sara",

            role: "student",

            program: "BS Software Engineering",
            semester: "6th Semester",

            avatar: "SA",

            studentId: "LR-STU-003",

            gpa: "3.58",
            attendance: 89,
            overallProgress: 81,

            coursesCount: 5,

            courses: [

                {
                    code: "SE-301",
                    name: "Software Design",
                    instructor: "Dr. Ahmed Khan",
                    progress: 85,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "CS-303",
                    name: "Database Systems",
                    instructor: "Prof. Sarah Malik",
                    progress: 78,
                    grade: "B+",
                    credits: 3
                },

                {
                    code: "DS-301",
                    name: "Data Analytics",
                    instructor: "Dr. Hamza Ali",
                    progress: 83,
                    grade: "A-",
                    credits: 3
                },

                {
                    code: "WEB-302",
                    name: "Web Development",
                    instructor: "Mr. Bilal Ahmed",
                    progress: 88,
                    grade: "A",
                    credits: 3
                },

                {
                    code: "SE-305",
                    name: "Software Testing",
                    instructor: "Dr. Fatima Noor",
                    progress: 75,
                    grade: "B+",
                    credits: 3
                }

            ],

            assignments: [

                {
                    title: "Software Testing Report",
                    course: "Software Testing",
                    due: "Sep 30, 2026",
                    status: "pending"
                },

                {
                    title: "Web Development Project",
                    course: "Web Development",
                    due: "Oct 03, 2026",
                    status: "submitted"
                },

                {
                    title: "Analytics Case Study",
                    course: "Data Analytics",
                    due: "Oct 06, 2026",
                    status: "pending"
                }

            ]
        },


        /* =================================================
           STUDENT 4 — HAMZA
           ================================================= */

        {
            id: "STU004",

            email: "hamza@learnora.com",
            password: "Hamza@123",

            name: "Hamza Malik",
            firstName: "Hamza",

            role: "student",

            program: "BS Data Science",
            semester: "5th Semester",

            avatar: "HM",

            studentId: "LR-STU-004",

            gpa: "3.26",
            attendance: 84,
            overallProgress: 71,

            coursesCount: 5,

            courses: [

                {
                    code: "DS-301",
                    name: "Data Analytics",
                    instructor: "Dr. Hamza Ali",
                    progress: 73,
                    grade: "B+",
                    credits: 3
                },

                {
                    code: "DS-303",
                    name: "Machine Learning",
                    instructor: "Dr. Usman Raza",
                    progress: 69,
                    grade: "B",
                    credits: 3
                },

                {
                    code: "CS-303",
                    name: "Database Systems",
                    instructor: "Prof. Sarah Malik",
                    progress: 76,
                    grade: "B+",
                    credits: 3
                },

                {
                    code: "STAT-301",
                    name: "Statistics",
                    instructor: "Dr. Ayesha Noor",
                    progress: 67,
                    grade: "B",
                    credits: 3
                },

                {
                    code: "CS-305",
                    name: "Python Programming",
                    instructor: "Mr. Bilal Ahmed",
                    progress: 70,
                    grade: "B+",
                    credits: 3
                }

            ],

            assignments: [

                {
                    title: "Machine Learning Model",
                    course: "Machine Learning",
                    due: "Oct 01, 2026",
                    status: "pending"
                },

                {
                    title: "Statistics Analysis",
                    course: "Statistics",
                    due: "Oct 04, 2026",
                    status: "pending"
                },

                {
                    title: "Python Data Analysis",
                    course: "Python Programming",
                    due: "Oct 07, 2026",
                    status: "submitted"
                }

            ]
        },


        /* =================================================
           TEACHER
           ================================================= */

        {
            id: "TCH001",

            email: "teacher@learnora.com",
            password: "Teacher@123",

            name: "Dr. Ahmed Khan",
            firstName: "Ahmed",

            role: "teacher",

            program: "Software Engineering Department",
            semester: "",

            avatar: "AK"
        },


        /* =================================================
           PARENT 1 — SHEHERYAR'S FATHER
           ================================================= */

        {
            id: "PAR001",

            email: "father.sheheryar@learnora.com",
            password: "Father@123",

            name: "Mr. Ahmed Ahmed",
            firstName: "Ahmed",

            role: "parent",

            program: "Parent Portal",
            semester: "",

            avatar: "AA",

            parentId: "LR-PAR-001",

            relationship: "Father",

            childId: "STU001",

            childName: "Sheheryar Ahmed",

            childStudentId: "LR-STU-001"
        },


        /* =================================================
           PARENT 2 — SHEHERYAR'S MOTHER
           ================================================= */

        {
            id: "PAR002",

            email: "mother.sheheryar@learnora.com",
            password: "Mother@123",

            name: "Mrs. Ayesha Ahmed",
            firstName: "Ayesha",

            role: "parent",

            program: "Parent Portal",
            semester: "",

            avatar: "AA",

            parentId: "LR-PAR-002",

            relationship: "Mother",

            childId: "STU001",

            childName: "Sheheryar Ahmed",

            childStudentId: "LR-STU-001"
        },


        /* =================================================
           PARENT 3 — ALI'S FATHER
           ================================================= */

        {
            id: "PAR003",

            email: "father.ali@learnora.com",
            password: "FatherAli@123",

            name: "Mr. Imran Khan",
            firstName: "Imran",

            role: "parent",

            program: "Parent Portal",
            semester: "",

            avatar: "IK",

            parentId: "LR-PAR-003",

            relationship: "Father",

            childId: "STU002",

            childName: "Ali Khan",

            childStudentId: "LR-STU-002"
        },


        /* =================================================
           PARENT 4 — SARA'S MOTHER
           ================================================= */

        {
            id: "PAR004",

            email: "mother.sara@learnora.com",
            password: "SaraMother@123",

            name: "Mrs. Nadia Ahmed",
            firstName: "Nadia",

            role: "parent",

            program: "Parent Portal",
            semester: "",

            avatar: "NA",

            parentId: "LR-PAR-004",

            relationship: "Mother",

            childId: "STU003",

            childName: "Sara Ahmed",

            childStudentId: "LR-STU-003"
        },

        {
    id: "PAR004",
    name: "Hamza's Mother",
    email: "mother.hamza@learnora.com",
    password: "HamzaMother@123",
    role: "parent",
    relationship: "Mother",
    childId: "STU004"
}

    ];


    /* =====================================================
       CURRENT ROLE
       ===================================================== */

    let currentRole = "student";


    /* =====================================================
       NORMALIZE ROLE
       ===================================================== */

    function normalizeRole(role) {

        return String(role || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       NORMALIZE EMAIL
       ===================================================== */

    function normalizeEmail(email) {

        return String(email || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       HIDE LOGIN MESSAGES
       ===================================================== */

    function hideMessages() {

        if (loginError) {
            loginError.classList.remove("show");
        }

        if (loginSuccess) {
            loginSuccess.classList.remove("show");
        }

    }


    /* =====================================================
       CLEAR FORM ERRORS
       ===================================================== */

    function clearErrors() {

        if (usernameError) {
            usernameError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (username) {
            username.classList.remove("input-error");
        }

        if (password) {
            password.classList.remove("input-error");
        }

    }


    /* =====================================================
       CLEAR PREVIOUS LOGIN SESSION
       ===================================================== */

    function clearPreviousSession() {

        const sessionKeys = [

            "learnora_current_user",
            "learnora_logged_in",
            "learnora_user_role",
            "learnora_user_email",
            "learnora_user_id",
            "learnora_student_name",
            "learnora_current_parent",
            "learnora_current_child"

        ];

        sessionKeys.forEach(key => {

            localStorage.removeItem(key);
            sessionStorage.removeItem(key);

        });

    }


    /* =====================================================
       SAVE USER DATABASE
       ===================================================== */

    function saveUserDatabase() {

        try {

            const safeUsers =
                JSON.parse(
                    JSON.stringify(users)
                );

            localStorage.setItem(
                "learnora_users",
                JSON.stringify(safeUsers)
            );

            console.log(
                "Learnora user database saved:",
                safeUsers
            );

        }

        catch (error) {

            console.error(
                "Unable to save Learnora user database:",
                error
            );

        }

    }


    /* =====================================================
       FIND STUDENT BY ID
       ===================================================== */

    function findStudentById(studentId) {

        if (!studentId) {
            return null;
        }

        return users.find(user => {

            return (

                user.id === studentId &&

                normalizeRole(user.role) ===
                "student"

            );

        }) || null;

    }


    /* =====================================================
       SAVE CURRENT USER
       ===================================================== */

    function saveCurrentUser(account) {

        /*
         * Create a completely separate copy.
         */

        const currentUser =
            JSON.parse(
                JSON.stringify(account)
            );


        /* -----------------------------------------------
           FIND LINKED CHILD FOR PARENT
           ----------------------------------------------- */

        let linkedChild = null;


        if (
            normalizeRole(
                currentUser.role
            ) === "parent"
        ) {

            linkedChild =
                findStudentById(
                    currentUser.childId
                );


            if (linkedChild) {

                /*
                 * Store only a safe copy of child
                 * inside current parent session.
                 */

                currentUser.child = {

                    id: linkedChild.id,

                    name: linkedChild.name,

                    firstName:
                        linkedChild.firstName,

                    email: linkedChild.email,

                    role: linkedChild.role,

                    program: linkedChild.program,

                    semester: linkedChild.semester,

                    avatar: linkedChild.avatar,

                    studentId:
                        linkedChild.studentId,

                    gpa: linkedChild.gpa,

                    attendance:
                        linkedChild.attendance,

                    overallProgress:
                        linkedChild.overallProgress,

                    coursesCount:
                        linkedChild.coursesCount,

                    courses:
                        linkedChild.courses || [],

                    assignments:
                        linkedChild.assignments || [],

                    results:
                        linkedChild.results || [],

                    attendanceData:
                        linkedChild.attendanceData || [],

                    quizzes:
                        linkedChild.quizzes || [],

                    exams:
                        linkedChild.exams || [],

                    schedule:
                        linkedChild.schedule || [],

                    announcements:
                        linkedChild.announcements || []
                };


                /*
                 * Also save separately for parent.js.
                 */

                localStorage.setItem(
                    "learnora_current_child",
                    JSON.stringify(
                        currentUser.child
                    )
                );

            }

            else {

                localStorage.removeItem(
                    "learnora_current_child"
                );

            }

        }


        /* -----------------------------------------------
           LOGIN STATUS
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_logged_in",
            "true"
        );


        /* -----------------------------------------------
           ROLE
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_user_role",
            normalizeRole(
                currentUser.role
            )
        );


        /* -----------------------------------------------
           EMAIL
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_user_email",
            currentUser.email
        );


        /* -----------------------------------------------
           USER ID
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_user_id",
            currentUser.id
        );


        /* -----------------------------------------------
           NAME
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_student_name",
            currentUser.name
        );


        /* -----------------------------------------------
           COMPLETE CURRENT USER
           ----------------------------------------------- */

        localStorage.setItem(
            "learnora_current_user",
            JSON.stringify(
                currentUser
            )
        );


        /* -----------------------------------------------
           CURRENT PARENT
           ----------------------------------------------- */

        if (
            normalizeRole(
                currentUser.role
            ) === "parent"
        ) {

            localStorage.setItem(
                "learnora_current_parent",
                JSON.stringify(
                    currentUser
                )
            );

        }


        /* -----------------------------------------------
           ALSO SAVE IN SESSION STORAGE
           ----------------------------------------------- */

        sessionStorage.setItem(
            "learnora_current_user",
            JSON.stringify(
                currentUser
            )
        );

        sessionStorage.setItem(
            "learnora_logged_in",
            "true"
        );

        sessionStorage.setItem(
            "learnora_user_role",
            normalizeRole(
                currentUser.role
            )
        );

        sessionStorage.setItem(
            "learnora_user_id",
            currentUser.id
        );


        console.log(
            "Current Learnora User Saved:",
            currentUser
        );


        if (linkedChild) {

            console.log(
                "Linked Child:",
                linkedChild
            );

        }

    }


    /* =====================================================
       ROLE SELECTOR
       ===================================================== */

    roleOptions.forEach(option => {

        option.addEventListener("click", () => {

            roleOptions.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            option.classList.add(
                "active"
            );


            currentRole =
                normalizeRole(
                    option.dataset.role
                );


            hideMessages();
            clearErrors();


            if (username) {

                if (
                    currentRole ===
                    "student"
                ) {

                    username.placeholder =
                        "Enter your student email or username";

                }

                else if (
                    currentRole ===
                    "teacher"
                ) {

                    username.placeholder =
                        "Enter your teacher email or username";

                }

                else if (
                    currentRole ===
                    "parent"
                ) {

                    username.placeholder =
                        "Enter your parent email or username";

                }

            }

        });

    });


    /* =====================================================
       PASSWORD SHOW / HIDE
       ===================================================== */

    if (
        passwordToggle &&
        password
    ) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector(
                        "i"
                    );


                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";


                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    }


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                }

                else {

                    password.type =
                        "password";


                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }


                    passwordToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }


    /* =====================================================
       DEMO ACCESS TOGGLE
       ===================================================== */

    if (
        demoToggle &&
        demoContent
    ) {

        demoToggle.addEventListener(
            "click",
            () => {

                demoContent.classList.toggle(
                    "open"
                );


                const icon =
                    demoToggle.querySelector(
                        "i"
                    );


                if (!icon) {
                    return;
                }


                if (
                    demoContent.classList.contains(
                        "open"
                    )
                ) {

                    icon.classList.remove(
                        "fa-chevron-down"
                    );

                    icon.classList.add(
                        "fa-chevron-up"
                    );

                }

                else {

                    icon.classList.remove(
                        "fa-chevron-up"
                    );

                    icon.classList.add(
                        "fa-chevron-down"
                    );

                }

            }
        );

    }


    /* =====================================================
       USE DEMO ACCOUNT
       ===================================================== */

    demoButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const email =
                    button.dataset.email ||
                    "";


                const userPassword =
                    button.dataset.password ||
                    "";


                const role =
                    normalizeRole(
                        button.dataset.role
                    );


                if (username) {

                    username.value =
                        email;

                }


                if (password) {

                    password.value =
                        userPassword;

                }


                roleOptions.forEach(
                    option => {

                        option.classList.remove(
                            "active"
                        );


                        if (
                            normalizeRole(
                                option.dataset.role
                            ) === role
                        ) {

                            option.classList.add(
                                "active"
                            );

                        }

                    }
                );


                currentRole =
                    role;


                clearErrors();
                hideMessages();


                setTimeout(() => {

                    if (loginForm) {

                        loginForm.requestSubmit();

                    }

                }, 200);

            }
        );

    });


    /* =====================================================
       VALIDATE LOGIN
       ===================================================== */

    function validateLogin() {

        let valid = true;


        clearErrors();


        const emailValue =
            username
                ? username.value.trim()
                : "";


        const passwordValue =
            password
                ? password.value
                : "";


        /* -----------------------------------------------
           USERNAME / EMAIL
           ----------------------------------------------- */

        if (!emailValue) {

            if (usernameError) {

                usernameError.textContent =
                    "Please enter your email or username.";

            }


            if (username) {

                username.classList.add(
                    "input-error"
                );

            }


            valid = false;

        }


        /* -----------------------------------------------
           PASSWORD
           ----------------------------------------------- */

        if (!passwordValue) {

            if (passwordError) {

                passwordError.textContent =
                    "Please enter your password.";

            }


            if (password) {

                password.classList.add(
                    "input-error"
                );

            }


            valid = false;

        }


        return valid;

    }


    /* =====================================================
       LOGIN SUBMIT
       ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                hideMessages();


                if (!validateLogin()) {

                    return;

                }


                /* =========================================
                   FORM VALUES
                   ========================================= */

                const emailValue =
                    normalizeEmail(
                        username.value
                    );


                const passwordValue =
                    password.value;


                const selectedRole =
                    normalizeRole(
                        currentRole
                    );


                /* =========================================
                   FIND USER ACCOUNT
                   ========================================= */

                const account =
                    users.find(user => {

                        const userEmail =
                            normalizeEmail(
                                user.email
                            );


                        const userPassword =
                            String(
                                user.password
                            );


                        const userRole =
                            normalizeRole(
                                user.role
                            );


                        return (

                            userEmail ===
                            emailValue

                            &&

                            userPassword ===
                            passwordValue

                            &&

                            userRole ===
                            selectedRole

                        );

                    });


                /* =========================================
                   INVALID LOGIN
                   ========================================= */

                if (!account) {

                    if (loginError) {

                        loginError.classList.add(
                            "show"
                        );


                        const message =
                            loginError.querySelector(
                                "span"
                            );


                        if (message) {

                            message.textContent =
                                `Invalid ${selectedRole} credentials. Please check your email and password.`;

                        }

                    }


                    console.log(
                        "Login failed:",
                        {
                            email: emailValue,
                            role: selectedRole
                        }
                    );


                    return;

                }


                /* =========================================
                   PARENT CHILD VALIDATION
                   ========================================= */

                if (
                    selectedRole ===
                    "parent"
                ) {

                    const child =
                        findStudentById(
                            account.childId
                        );


                    if (!child) {

                        if (loginError) {

                            loginError.classList.add(
                                "show"
                            );


                            const message =
                                loginError.querySelector(
                                    "span"
                                );


                            if (message) {

                                message.textContent =
                                    "This parent account is not linked to a valid student account.";

                            }

                        }


                        console.error(
                            "Parent child relationship not found:",
                            account
                        );


                        return;

                    }

                }


                /* =========================================
                   CLEAR OLD ACCOUNT
                   ========================================= */

                clearPreviousSession();


                /* =========================================
                   SAVE COMPLETE USER DATABASE
                   ========================================= */

                saveUserDatabase();


                /* =========================================
                   SAVE CURRENT ACCOUNT
                   ========================================= */

                saveCurrentUser(
                    account
                );


                /* =========================================
                   REMEMBER ME
                   ========================================= */

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "learnora_remember",
                        "true"
                    );

                }

                else {

                    localStorage.removeItem(
                        "learnora_remember"
                    );

                }


                /* =========================================
                   SUCCESS MESSAGE
                   ========================================= */

                if (loginSuccess) {

                    loginSuccess.classList.add(
                        "show"
                    );


                    const message =
                        loginSuccess.querySelector(
                            "span"
                        );


                    if (message) {

                        if (
                            selectedRole ===
                            "parent"
                        ) {

                            message.textContent =
                                `Welcome ${account.firstName}! ${account.relationship} portal loaded. Redirecting...`;

                        }

                        else {

                            message.textContent =
                                `Welcome ${account.firstName}! Login successful. Redirecting...`;

                        }

                    }

                }


                /* =========================================
                   LOADING STATE
                   ========================================= */

                if (loginButton) {

                    loginButton.classList.add(
                        "loading"
                    );

                    loginButton.disabled =
                        true;

                }


                /* =========================================
                   DEBUG
                   ========================================= */

                console.log(
                    "LOGIN SUCCESS",
                    {
                        id: account.id,
                        name: account.name,
                        email: account.email,
                        role: account.role,
                        childId:
                            account.childId ||
                            null
                    }
                );


                console.log(
                    "Saved Current User:",
                    JSON.parse(
                        localStorage.getItem(
                            "learnora_current_user"
                        )
                    )
                );


                /* =========================================
                   REDIRECT
                   ========================================= */

                setTimeout(() => {

                    /* -------------------------------------
                       STUDENT
                       ------------------------------------- */

                    if (
                        selectedRole ===
                        "student"
                    ) {

                        window.location.href =
                            "/Html/students/dashboard.html";

                        return;

                    }


                    /* -------------------------------------
                       TEACHER
                       ------------------------------------- */

                    if (
                        selectedRole ===
                        "teacher"
                    ) {

                        window.location.href =
                            "/Html/teacher/dashboard.html";

                        return;

                    }


                    /* -------------------------------------
                       PARENT
                       ------------------------------------- */

                    if (
                        selectedRole ===
                        "parent"
                    ) {

                        window.location.href =
                            "/Html/parent/dashboard.html";

                        return;

                    }

                }, 800);

            }
        );

    }


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    if (
        forgotPassword &&
        forgotModal
    ) {

        forgotPassword.addEventListener(
            "click",
            () => {

                forgotModal.classList.add(
                    "show"
                );


                setTimeout(() => {

                    if (resetEmail) {

                        resetEmail.focus();

                    }

                }, 100);

            }
        );

    }


    /* =====================================================
       CLOSE FORGOT PASSWORD MODAL
       ===================================================== */

    function closeForgotModal() {

        if (forgotModal) {

            forgotModal.classList.remove(
                "show"
            );

        }


        if (resetMessage) {

            resetMessage.textContent =
                "";

            resetMessage.className =
                "reset-message";

        }

    }


    /* =====================================================
       MODAL CLOSE BUTTON
       ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeForgotModal
        );

    }


    /* =====================================================
       CLOSE MODAL ON OVERLAY
       ===================================================== */

    if (forgotModal) {

        forgotModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    forgotModal
                ) {

                    closeForgotModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeForgotModal();

            }

        }
    );


    /* =====================================================
       FORGOT PASSWORD FORM
       ===================================================== */

    if (forgotForm) {

        forgotForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    resetEmail
                        ? normalizeEmail(
                            resetEmail.value
                        )
                        : "";


                if (!email) {

                    if (resetMessage) {

                        resetMessage.textContent =
                            "Please enter your email address.";

                        resetMessage.className =
                            "reset-message show";

                    }

                    return;

                }


                /* -----------------------------------------
                   CHECK WHETHER EMAIL EXISTS
                   ----------------------------------------- */

                const account =
                    users.find(user => {

                        return (
                            normalizeEmail(
                                user.email
                            ) === email
                        );

                    });


                if (resetMessage) {

                    if (account) {

                        resetMessage.textContent =
                            "Password reset instructions have been sent to your email.";

                    }

                    else {

                        /*
                         * For a frontend demo, we don't reveal
                         * unnecessary account details.
                         */

                        resetMessage.textContent =
                            "If an account exists for this email, reset instructions have been sent.";

                    }


                    resetMessage.classList.add(
                        "show"
                    );

                }


                setTimeout(() => {

                    closeForgotModal();

                }, 2500);

            }
        );

    }


    /* =====================================================
       SAVE DATABASE ON LOGIN PAGE LOAD
       ===================================================== */

    saveUserDatabase();


    /* =====================================================
       LOAD REMEMBERED USER
       ===================================================== */

    const remembered =
        localStorage.getItem(
            "learnora_remember"
        );


    const savedEmail =
        localStorage.getItem(
            "learnora_user_email"
        );


    const savedRole =
        localStorage.getItem(
            "learnora_user_role"
        );


    if (
        remembered === "true" &&
        savedEmail
    ) {

        if (username) {

            username.value =
                savedEmail;

        }


        if (savedRole) {

            const normalizedSavedRole =
                normalizeRole(
                    savedRole
                );


            roleOptions.forEach(
                option => {

                    option.classList.remove(
                        "active"
                    );


                    if (
                        normalizeRole(
                            option.dataset.role
                        ) ===
                        normalizedSavedRole
                    ) {

                        option.classList.add(
                            "active"
                        );

                    }

                }
            );


            currentRole =
                normalizedSavedRole;

        }


        if (rememberMe) {

            rememberMe.checked =
                true;

        }

    }


    /* =====================================================
       USERNAME INPUT EVENT
       ===================================================== */

    if (username) {

        username.addEventListener(
            "input",
            () => {

                username.classList.remove(
                    "input-error"
                );


                if (usernameError) {

                    usernameError.textContent =
                        "";

                }


                hideMessages();

            }
        );

    }


    /* =====================================================
       PASSWORD INPUT EVENT
       ===================================================== */

    if (password) {

        password.addEventListener(
            "input",
            () => {

                password.classList.remove(
                    "input-error"
                );


                if (passwordError) {

                    passwordError.textContent =
                        "";

                }


                hideMessages();

            }
        );

    }


    /* =====================================================
       INITIAL STUDENT ROLE
       ===================================================== */

    let roleAlreadySelected =
        false;


    roleOptions.forEach(option => {

        if (
            option.classList.contains(
                "active"
            )
        ) {

            roleAlreadySelected =
                true;

        }

    });


    if (!roleAlreadySelected) {

        roleOptions.forEach(option => {

            if (
                normalizeRole(
                    option.dataset.role
                ) ===
                "student"
            ) {

                option.classList.add(
                    "active"
                );

            }

        });

    }


    /* =====================================================
       FINAL SYSTEM CHECK
       ===================================================== */

    console.log(
        "======================================="
    );

    console.log(
        "Learnora Login System Loaded Successfully."
    );

    console.log(
        `Available Accounts: ${users.length}`
    );

    console.log(
        "Students:",
        users.filter(
            user =>
                normalizeRole(user.role) ===
                "student"
        ).length
    );

    console.log(
        "Teachers:",
        users.filter(
            user =>
                normalizeRole(user.role) ===
                "teacher"
        ).length
    );

    console.log(
        "Parents:",
        users.filter(
            user =>
                normalizeRole(user.role) ===
                "parent"
        ).length
    );

    console.log(
        "======================================="
    );

});
/* =========================================================
   LEARNORA LMS
   PARENT PORTAL CONTROLLER
   File: js/parent.js
========================================================= */

"use strict";

let currentParent = null;
let currentChild = null;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeParentPortal();
});


function initializeParentPortal() {

    const loggedInUser = getCurrentLoggedInUser();

    if (!loggedInUser) {
        redirectToLogin();
        return;
    }

    const role = String(loggedInUser.role || "").toLowerCase();

    if (role !== "parent") {
        redirectToCorrectRole(loggedInUser);
        return;
    }

    currentParent = loggedInUser;

    currentChild = findLinkedStudent(currentParent);

    if (!currentChild) {
        showChildNotFoundState();
        return;
    }

    renderParentInformation();
    renderChildInformation();

    const page = getCurrentPage();

    switch (page) {

        case "dashboard.html":
        case "":
            renderDashboard();
            break;

        case "results.html":
            renderResultsPage();
            break;

        case "schedule.html":
            renderSchedulePage();
            break;

        case "attendance.html":
            renderAttendancePage();
            break;

        case "assignments.html":
            renderAssignmentsPage();
            break;

        case "quizzes.html":
            renderQuizzesPage();
            break;

        case "profile.html":
            renderParentProfile();
            break;

        default:
            renderDashboard();
            break;
    }
}


/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentLoggedInUser() {

    let user = null;

    try {

        const localUser =
            localStorage.getItem("learnora_current_user");

        if (localUser) {
            user = JSON.parse(localUser);
        }

    } catch (error) {

        console.error(
            "Error reading localStorage:",
            error
        );

    }

    if (!user) {

        try {

            const sessionUser =
                sessionStorage.getItem("learnora_current_user");

            if (sessionUser) {
                user = JSON.parse(sessionUser);
            }

        } catch (error) {

            console.error(
                "Error reading sessionStorage:",
                error
            );

        }
    }

    return user;
}


/* =========================================================
   ALL USERS
========================================================= */

function getAllUsers() {

    try {

        const users =
            localStorage.getItem("learnora_users");

        if (!users) {
            return [];
        }

        const parsed =
            JSON.parse(users);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Unable to read users:",
            error
        );

        return [];
    }
}


/* =========================================================
   FIND LINKED STUDENT
========================================================= */

function findLinkedStudent(parent) {

    if (!parent) {
        return null;
    }

    /*
       Parent account should contain:
       childId
    */

    const childId =
        parent.childId ||
        parent.studentId ||
        parent.child_id ||
        parent.linkedStudentId;

    /*
       If complete child object already exists
    */

    if (
        parent.child &&
        typeof parent.child === "object"
    ) {
        return parent.child;
    }

    if (
        parent.student &&
        typeof parent.student === "object"
    ) {
        return parent.student;
    }

    if (!childId) {

        console.warn(
            "No childId found in parent account."
        );

        return null;
    }

    const users = getAllUsers();

    const student =
        users.find(function (user) {

            if (!user) {
                return false;
            }

            const role =
                String(
                    user.role || ""
                ).toLowerCase();

            const userId =
                user.id ||
                user.studentId;

            return (
                role === "student" &&
                String(userId) === String(childId)
            );

        });

    return student || null;
}


/* =========================================================
   CURRENT PAGE
========================================================= */

function getCurrentPage() {

    return window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

}


/* =========================================================
   REDIRECT LOGIN
========================================================= */

function redirectToLogin() {

    window.location.href = "../login.html";

}


/* =========================================================
   REDIRECT ROLE
========================================================= */

function redirectToCorrectRole(user) {

    const role =
        String(
            user.role || ""
        ).toLowerCase();

    if (role === "student") {

        window.location.href =
            "../students/dashboard.html";

        return;
    }

    if (role === "teacher") {

        window.location.href =
            "../teacher/dashboard.html";

        return;
    }

    window.location.href =
        "../login.html";
}


/* =========================================================
   PARENT INFORMATION
========================================================= */

function renderParentInformation() {

    if (!currentParent) {
        return;
    }

    const name =
        currentParent.name ||
        currentParent.fullName ||
        "Parent";

    setText(
        "sidebarParentName",
        name
    );

    setText(
        "topbarParentName",
        name
    );

    setText(
        "welcomeParentName",
        name
    );

    setText(
        "parentEmail",
        currentParent.email || "—"
    );

    const initials =
        getInitials(name);

    setText(
        "sidebarParentAvatar",
        initials
    );

    setText(
        "topbarParentAvatar",
        initials
    );
}


/* =========================================================
   CHILD INFORMATION
========================================================= */

function renderChildInformation() {

    if (!currentChild) {
        return;
    }

    const childName =
        currentChild.name ||
        currentChild.fullName ||
        "Student";

    const childEmail =
        currentChild.email ||
        "—";

    const academic =
        getAcademicData();

    const program =
        academic.program ||
        currentChild.program ||
        currentChild.degree ||
        "Student";

    const semester =
        academic.semester ||
        currentChild.semester ||
        "—";

    const studentId =
        currentChild.studentId ||
        currentChild.id ||
        "—";

    setText(
        "sidebarChildName",
        childName
    );

    setText(
        "childNameHeading",
        childName
    );

    setText(
        "childNameMini",
        childName
    );

    setText(
        "childName",
        childName
    );

    setText(
        "childEmail",
        childEmail
    );

    setText(
        "childProgram",
        program
    );

    setText(
        "childProgramMini",
        program
    );

    setText(
        "welcomeChildProgram",
        program
    );

    setText(
        "childSemester",
        semester
    );

    setText(
        "childStudentId",
        studentId
    );

    setText(
        "dataChildName",
        childName
    );

    setText(
        "welcomeChildNameCard",
        childName
    );

    setText(
        "welcomeChildName",
        childName
    );

    const initials =
        getInitials(childName);

    setText(
        "childAvatar",
        initials
    );

    setText(
        "childLargeAvatar",
        initials
    );

    setText(
        "welcomeChildAvatar",
        initials
    );
}


/* =========================================================
   ACADEMIC DATA
========================================================= */

function getAcademicData() {

    if (!currentChild) {
        return {};
    }

    if (
        currentChild.academicData &&
        typeof currentChild.academicData === "object"
    ) {
        return currentChild.academicData;
    }

    return currentChild;
}


/* =========================================================
   RESULTS
========================================================= */

function getResults() {

    const academic =
        getAcademicData();

    const results =
        academic.results ||
        currentChild.results ||
        [];

    return Array.isArray(results)
        ? results
        : [];
}


/* =========================================================
   COURSES
========================================================= */

function getCourses() {

    const academic =
        getAcademicData();

    const courses =
        academic.courses ||
        currentChild.courses ||
        currentChild.enrolledCourses ||
        [];

    return Array.isArray(courses)
        ? courses
        : [];
}


/* =========================================================
   EXAMS
========================================================= */

function getExams() {

    const academic =
        getAcademicData();

    const exams =
        academic.exams ||
        academic.examSchedule ||
        academic.schedule ||
        currentChild.exams ||
        currentChild.examSchedule ||
        currentChild.schedule ||
        [];

    return Array.isArray(exams)
        ? exams
        : [];
}


/* =========================================================
   ATTENDANCE
========================================================= */

function getAttendance() {

    const academic =
        getAcademicData();

    return (
        academic.attendance ??
        currentChild.attendance ??
        academic.attendanceData ??
        currentChild.attendanceData ??
        null
    );
}


/* =========================================================
   ASSIGNMENTS
========================================================= */

function getAssignments() {

    const academic =
        getAcademicData();

    const assignments =
        academic.assignments ||
        currentChild.assignments ||
        [];

    return Array.isArray(assignments)
        ? assignments
        : [];
}


/* =========================================================
   QUIZZES
========================================================= */

function getQuizzes() {

    const academic =
        getAcademicData();

    const quizzes =
        academic.quizzes ||
        currentChild.quizzes ||
        [];

    return Array.isArray(quizzes)
        ? quizzes
        : [];
}


/* =========================================================
   ANNOUNCEMENTS
========================================================= */

function getAnnouncements() {

    const academic =
        getAcademicData();

    const announcements =
        academic.announcements ||
        currentChild.announcements ||
        [];

    return Array.isArray(announcements)
        ? announcements
        : [];
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    renderDashboardStats();

    renderDashboardExams();

    renderDashboardResults();

    renderDashboardAssignments();

    renderDashboardQuizzes();

    renderDashboardCourses();

    renderDashboardAnnouncements();
}


/* =========================================================
   DASHBOARD STATS
========================================================= */

function renderDashboardStats() {

    const academic =
        getAcademicData();

    const results =
        getResults();

    const courses =
        getCourses();

    const assignments =
        getAssignments();

    const quizzes =
        getQuizzes();

    const cgpa =
        academic.cgpa ||
        currentChild.cgpa ||
        "—";

    setText(
        "cgpaValue",
        cgpa
    );

    setText(
        "coursesValue",
        courses.length
    );

    const pendingAssignments =
        assignments.filter(
            function (item) {
                return !isSubmitted(item);
            }
        ).length;

    const pendingQuizzes =
        quizzes.filter(
            function (item) {
                return !isQuizAttempted(item);
            }
        ).length;

    setText(
        "pendingValue",
        pendingAssignments +
        pendingQuizzes
    );

    const attendance =
        calculateAttendance();

    setText(
        "attendanceValue",
        attendance !== null
            ? formatPercentage(attendance)
            : "—"
    );

    const gpa =
        academic.semesterGPA ||
        academic.gpa ||
        calculateGPA(results);

    setText(
        "semesterGPA",
        gpa !== null
            ? formatNumber(gpa)
            : "—"
    );
}


/* =========================================================
   DASHBOARD EXAMS
========================================================= */

function renderDashboardExams() {

    const container =
        document.getElementById(
            "upcomingExams"
        );

    if (!container) {
        return;
    }

    const exams =
        getUpcomingExams();

    if (!exams.length) {

        container.innerHTML =
            emptyState(
                "fa-regular fa-calendar",
                "No upcoming exams found."
            );

        return;
    }

    container.innerHTML =
        exams
            .slice(0, 5)
            .map(createExamCard)
            .join("");
}


/* =========================================================
   DASHBOARD RESULTS
========================================================= */

function renderDashboardResults() {

    const tbody =
        document.getElementById(
            "recentResults"
        );

    if (!tbody) {
        return;
    }

    const results =
        getResults();

    if (!results.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    No results available.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        results
            .slice()
            .reverse()
            .slice(0, 5)
            .map(function (result) {

                const course =
                    result.course ||
                    result.courseName ||
                    result.subject ||
                    "—";

                const code =
                    result.code ||
                    result.courseCode ||
                    "—";

                const marks =
                    result.marks ??
                    result.score ??
                    "—";

                const grade =
                    result.grade ||
                    calculateGrade(result.marks);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(course)}
                        </td>

                        <td>
                            ${escapeHTML(code)}
                        </td>

                        <td>
                            ${escapeHTML(
                                String(marks)
                            )}
                        </td>

                        <td>
                            ${createGradeBadge(grade)}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   DASHBOARD ASSIGNMENTS
========================================================= */

function renderDashboardAssignments() {

    const container =
        document.getElementById(
            "assignmentList"
        );

    if (!container) {
        return;
    }

    const assignments =
        getAssignments();

    if (!assignments.length) {

        container.innerHTML =
            emptyState(
                "fa-solid fa-file-pen",
                "No assignments available."
            );

        return;
    }

    container.innerHTML =
        assignments
            .slice(0, 5)
            .map(createAssignmentItem)
            .join("");
}


/* =========================================================
   DASHBOARD QUIZZES
========================================================= */

function renderDashboardQuizzes() {

    const container =
        document.getElementById(
            "quizList"
        );

    if (!container) {
        return;
    }

    const quizzes =
        getQuizzes();

    if (!quizzes.length) {

        container.innerHTML =
            emptyState(
                "fa-solid fa-circle-question",
                "No quizzes available."
            );

        return;
    }

    container.innerHTML =
        quizzes
            .slice(0, 5)
            .map(createQuizItem)
            .join("");
}


/* =========================================================
   DASHBOARD COURSES
========================================================= */

function renderDashboardCourses() {

    const container =
        document.getElementById(
            "courseList"
        );

    if (!container) {
        return;
    }

    const courses =
        getCourses();

    if (!courses.length) {

        container.innerHTML =
            emptyState(
                "fa-solid fa-book",
                "No courses available."
            );

        return;
    }

    container.innerHTML =
        courses
            .slice(0, 6)
            .map(function (course) {

                const name =
                    typeof course === "string"
                        ? course
                        : (
                            course.name ||
                            course.title ||
                            course.courseName ||
                            "Course"
                        );

                const code =
                    typeof course === "object"
                        ? (
                            course.code ||
                            course.courseCode ||
                            ""
                        )
                        : "";

                return `
                    <div class="course-item">

                        <div class="course-item-icon">
                            <i class="fa-solid fa-book-open"></i>
                        </div>

                        <div class="course-item-info">

                            <strong>
                                ${escapeHTML(name)}
                            </strong>

                            <span>
                                ${escapeHTML(code)}
                            </span>

                        </div>

                    </div>
                `;

            })
            .join("");
}


/* =========================================================
   DASHBOARD ANNOUNCEMENTS
========================================================= */

function renderDashboardAnnouncements() {

    const container =
        document.getElementById(
            "announcementList"
        );

    if (!container) {
        return;
    }

    const announcements =
        getAnnouncements();

    const badge =
        document.getElementById(
            "announcementCount"
        );

    if (badge) {
        badge.textContent =
            announcements.length;
    }

    if (!announcements.length) {

        container.innerHTML =
            emptyState(
                "fa-regular fa-bell",
                "No announcements available."
            );

        return;
    }

    container.innerHTML =
        announcements
            .slice(0, 5)
            .map(function (item) {

                return `
                    <div class="announcement-item">

                        <div class="announcement-icon">
                            <i class="fa-regular fa-bell"></i>
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    item.title ||
                                    "Announcement"
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    item.message ||
                                    item.description ||
                                    ""
                                )}
                            </p>

                        </div>

                    </div>
                `;

            })
            .join("");
}


/* =========================================================
   RESULTS PAGE
========================================================= */

function renderResultsPage() {

    const results =
        getResults();

    const academic =
        getAcademicData();

    setText(
        "currentCGPA",
        academic.cgpa ||
        currentChild.cgpa ||
        "—"
    );

    const gpa =
        academic.semesterGPA ||
        academic.gpa ||
        calculateGPA(results);

    setText(
        "semesterGPA",
        gpa !== null
            ? formatNumber(gpa)
            : "—"
    );

    setText(
        "completedCourses",
        results.length
    );

    const credits =
        results.reduce(
            function (total, result) {

                return total +
                    Number(
                        result.creditHours ||
                        result.credits ||
                        0
                    );

            },
            0
        );

    setText(
        "creditHours",
        credits
    );

    renderResultsTable(results);

    renderResultSummary(results);
}


/* =========================================================
   RESULTS TABLE
========================================================= */

function renderResultsTable(results) {

    const tbody =
        document.getElementById(
            "resultsTableBody"
        );

    if (!tbody) {
        return;
    }

    if (!results.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    No academic results available.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        results
            .map(function (result) {

                const course =
                    result.course ||
                    result.courseName ||
                    result.subject ||
                    "—";

                const code =
                    result.code ||
                    result.courseCode ||
                    "—";

                const credits =
                    result.creditHours ||
                    result.credits ||
                    "—";

                const marks =
                    result.marks ??
                    result.score ??
                    "—";

                const grade =
                    result.grade ||
                    calculateGrade(result.marks);

                const point =
                    result.gradePoint ??
                    result.gpa ??
                    calculateGradePoint(grade);

                const semester =
                    result.semester ||
                    result.term ||
                    "—";

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(course)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(code)}
                        </td>

                        <td>
                            ${escapeHTML(
                                String(credits)
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                String(marks)
                            )}
                        </td>

                        <td>
                            ${createGradeBadge(grade)}
                        </td>

                        <td>
                            ${escapeHTML(
                                String(point)
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                String(semester)
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   RESULT SUMMARY
========================================================= */

function renderResultSummary(results) {

    if (!results.length) {
        setText("highestGrade", "—");
        setText("averageMarks", "—");
        setText("passedCourses", "0");
        setText("failedCourses", "0");
        return;
    }

    const marks =
        results
            .map(function (item) {
                return Number(
                    item.marks ??
                    item.score
                );
            })
            .filter(function (value) {
                return !Number.isNaN(value);
            });

    const average =
        marks.length
            ? marks.reduce(
                (a, b) => a + b,
                0
            ) / marks.length
            : null;

    setText(
        "averageMarks",
        average !== null
            ? `${formatNumber(average)}%`
            : "—"
    );

    const passed =
        results.filter(function (item) {

            const marks =
                Number(
                    item.marks ??
                    item.score ??
                    0
                );

            return marks >= 50;

        }).length;

    setText(
        "passedCourses",
        passed
    );

    setText(
        "failedCourses",
        results.length - passed
    );
}


/* =========================================================
   SCHEDULE PAGE
========================================================= */

function renderSchedulePage() {

    const exams =
        getExams();

    const upcoming =
        getUpcomingExams();

    renderExamList(upcoming);

    renderScheduleTable(exams);

    populateSemesterFilter(exams);

    setText(
        "scheduleChildName",
        currentChild?.name ||
        currentChild?.fullName ||
        "Student"
    );

    setText(
        "scheduleExamTotal",
        exams.length
    );
}


/* =========================================================
   UPCOMING EXAMS
========================================================= */

function getUpcomingExams() {

    const exams =
        getExams();

    if (!exams.length) {
        return [];
    }

    const now =
        new Date();

    return exams
        .filter(function (exam) {

            if (!exam.date) {
                return true;
            }

            const date =
                new Date(exam.date);

            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {
                return true;
            }

            return date >= now;

        })
        .sort(function (a, b) {

            const dateA =
                a.date
                    ? new Date(a.date)
                    : new Date("2999-12-31");

            const dateB =
                b.date
                    ? new Date(b.date)
                    : new Date("2999-12-31");

            return (
                dateA.getTime() -
                dateB.getTime()
            );

        });
}


/* =========================================================
   EXAM LIST
========================================================= */

function renderExamList(exams) {

    const container =
        document.getElementById(
            "examList"
        );

    if (!container) {
        return;
    }

    if (!exams.length) {

        container.innerHTML =
            emptyState(
                "fa-regular fa-calendar",
                "No upcoming exams."
            );

        return;
    }

    container.innerHTML =
        exams
            .slice(0, 5)
            .map(createExamCard)
            .join("");
}


/* =========================================================
   EXAM CARD
========================================================= */

function createExamCard(exam) {

    const course =
        exam.course ||
        exam.courseName ||
        exam.subject ||
        "Exam";

    const code =
        exam.code ||
        exam.courseCode ||
        "";

    const time =
        exam.time ||
        "Time not specified";

    const room =
        exam.room ||
        exam.location ||
        "Room not specified";

    return `
        <div class="exam-item">

            <div class="exam-date">

                <strong>
                    ${escapeHTML(
                        getDateDay(exam.date)
                    )}
                </strong>

                <span>
                    ${escapeHTML(
                        getDateMonth(exam.date)
                    )}
                </span>

            </div>

            <div class="exam-details">

                <strong>
                    ${escapeHTML(course)}
                </strong>

                <span>
                    ${escapeHTML(code)}
                </span>

                <small>

                    <i class="fa-regular fa-clock"></i>

                    ${escapeHTML(time)}

                    &nbsp; • &nbsp;

                    ${escapeHTML(room)}

                </small>

            </div>

        </div>
    `;
}


/* =========================================================
   SCHEDULE TABLE
========================================================= */

function renderScheduleTable(exams) {

    const tbody =
        document.getElementById(
            "scheduleTableBody"
        );

    if (!tbody) {
        return;
    }

    if (!exams.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    No exam schedule available.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        exams
            .map(function (exam) {

                return `
                    <tr>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    exam.date
                                )
                            )}
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    exam.course ||
                                    exam.courseName ||
                                    exam.subject ||
                                    "—"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                exam.code ||
                                exam.courseCode ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                exam.time ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                exam.room ||
                                exam.location ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${createStatusBadge(
                                exam.status ||
                                "Upcoming"
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   SEMESTER FILTER
========================================================= */

function populateSemesterFilter(exams) {

    const select =
        document.getElementById(
            "semesterFilter"
        );

    if (!select) {
        return;
    }

    const semesters =
        [
            ...new Set(
                exams
                    .map(function (exam) {
                        return (
                            exam.semester ||
                            exam.term
                        );
                    })
                    .filter(Boolean)
            )
        ];

    semesters.forEach(function (semester) {

        const exists =
            Array.from(
                select.options
            ).some(function (option) {
                return (
                    option.value ===
                    String(semester)
                );
            });

        if (exists) {
            return;
        }

        const option =
            document.createElement("option");

        option.value =
            semester;

        option.textContent =
            semester;

        select.appendChild(option);
    });

    if (
        select.dataset.listenerAttached ===
        "true"
    ) {
        return;
    }

    select.dataset.listenerAttached =
        "true";

    select.addEventListener(
        "change",
        function () {

            const value =
                this.value;

            const filtered =
                value === "all"
                    ? exams
                    : exams.filter(
                        function (exam) {

                            return String(
                                exam.semester ||
                                exam.term ||
                                ""
                            ) ===
                            String(value);

                        }
                    );

            renderScheduleTable(
                filtered
            );

            setText(
                "scheduleExamTotal",
                filtered.length
            );
        }
    );
}


/* =========================================================
   ATTENDANCE PAGE
========================================================= */

function renderAttendancePage() {

    const attendance =
        getAttendance();

    const summary =
        calculateAttendanceSummary(
            attendance
        );

    setText(
        "overallAttendance",
        formatPercentage(
            summary.percentage
        )
    );

    setText(
        "attendanceCircleValue",
        formatPercentage(
            summary.percentage
        )
    );

    setText(
        "presentDays",
        summary.present
    );

    setText(
        "absentDays",
        summary.absent
    );

    setText(
        "totalClasses",
        summary.total
    );

    setText(
        "leaveCount",
        summary.leave
    );

    setText(
        "presentCount",
        summary.present
    );

    setText(
        "absentCount",
        summary.absent
    );


    /* Attendance message */

    const message =
        document.getElementById(
            "attendanceMessage"
        );

    if (message) {

        if (summary.percentage === null) {

            message.textContent =
                "Attendance data is not available.";

        } else if (
            summary.percentage >= 90
        ) {

            message.textContent =
                "Excellent attendance record.";

        } else if (
            summary.percentage >= 80
        ) {

            message.textContent =
                "Good attendance record.";

        } else if (
            summary.percentage >= 75
        ) {

            message.textContent =
                "Attendance is satisfactory.";

        } else {

            message.textContent =
                "Attendance is below the required level.";

        }
    }


    /* Attendance circle */

    const circle =
        document.getElementById(
            "attendanceCircle"
        );

    if (
        circle &&
        summary.percentage !== null
    ) {

        const percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(
                        summary.percentage
                    )
                )
            );

        circle.style.setProperty(
            "--attendance",
            `${percentage}%`
        );
    }


    renderAttendanceTable(
        attendance
    );
}


/* =========================================================
   CALCULATE ATTENDANCE
========================================================= */

function calculateAttendance() {

    const attendance =
        getAttendance();


    /* Number */

    if (
        typeof attendance === "number" &&
        !Number.isNaN(attendance)
    ) {

        return Number(attendance);
    }


    /* Object */

    if (
        attendance &&
        typeof attendance === "object" &&
        !Array.isArray(attendance)
    ) {

        const percentage =
            attendance.percentage ??
            attendance.attendancePercentage ??
            attendance.overall ??
            attendance.overallAttendance ??
            attendance.rate;

        if (
            percentage !== undefined &&
            percentage !== null &&
            !Number.isNaN(
                Number(percentage)
            )
        ) {

            return Number(percentage);
        }
    }


    /* Array */

    if (
        Array.isArray(attendance) &&
        attendance.length
    ) {

        return calculateAttendanceSummary(
            attendance
        ).percentage;
    }


    /* Fallback */

    const academic =
        getAcademicData();

    const fallback =
        academic.attendancePercentage ??
        academic.overallAttendance ??
        currentChild.attendancePercentage ??
        currentChild.overallAttendance;

    if (
        fallback !== undefined &&
        fallback !== null &&
        !Number.isNaN(
            Number(fallback)
        )
    ) {

        return Number(fallback);
    }

    return null;
}


/* =========================================================
   ATTENDANCE SUMMARY
========================================================= */

function calculateAttendanceSummary(
    attendance
) {

    let present = 0;
    let absent = 0;
    let leave = 0;
    let total = 0;
    let percentage = null;


    /* =====================================================
       NUMBER
    ===================================================== */

    if (
        typeof attendance === "number" &&
        !Number.isNaN(attendance)
    ) {

        percentage =
            Number(attendance);
    }


    /* =====================================================
       OBJECT
    ===================================================== */

    if (
        attendance &&
        typeof attendance === "object" &&
        !Array.isArray(attendance)
    ) {

        present =
            Number(
                attendance.present ??
                attendance.presentDays ??
                attendance.classesPresent ??
                attendance.attended ??
                0
            );

        absent =
            Number(
                attendance.absent ??
                attendance.absentDays ??
                attendance.classesAbsent ??
                attendance.missed ??
                0
            );

        leave =
            Number(
                attendance.leave ??
                attendance.leaves ??
                attendance.leaveDays ??
                0
            );

        total =
            Number(
                attendance.total ??
                attendance.totalClasses ??
                attendance.classes ??
                attendance.recordedClasses ??
                0
            );

        const directPercentage =
            attendance.percentage ??
            attendance.attendancePercentage ??
            attendance.overall ??
            attendance.overallAttendance ??
            attendance.rate;

        if (
            directPercentage !== undefined &&
            directPercentage !== null &&
            !Number.isNaN(
                Number(directPercentage)
            )
        ) {

            percentage =
                Number(
                    directPercentage
                );
        }

        if (
            total <= 0 &&
            (
                present > 0 ||
                absent > 0 ||
                leave > 0
            )
        ) {

            total =
                present +
                absent +
                leave;
        }

        if (
            percentage === null &&
            total > 0
        ) {

            percentage =
                (
                    present /
                    total
                ) * 100;
        }
    }


    /* =====================================================
       ARRAY
    ===================================================== */

    if (
        Array.isArray(attendance)
    ) {

        present = 0;
        absent = 0;
        leave = 0;

        attendance.forEach(
            function (record) {

                if (!record) {
                    return;
                }

                const status =
                    String(
                        record.status ??
                        record.attendance ??
                        record.attendanceStatus ??
                        ""
                    )
                    .trim()
                    .toLowerCase();

                if (
                    status === "present" ||
                    status === "p" ||
                    status === "1" ||
                    status === "true"
                ) {

                    present++;

                } else if (
                    status === "absent" ||
                    status === "a" ||
                    status === "0" ||
                    status === "false"
                ) {

                    absent++;

                } else if (
                    status === "leave" ||
                    status === "l"
                ) {

                    leave++;
                }
            }
        );

        total =
            present +
            absent +
            leave;

        percentage =
            total > 0
                ? (
                    present /
                    total
                ) * 100
                : null;
    }


    if (Number.isNaN(present)) {
        present = 0;
    }

    if (Number.isNaN(absent)) {
        absent = 0;
    }

    if (Number.isNaN(leave)) {
        leave = 0;
    }

    if (Number.isNaN(total)) {
        total = 0;
    }


    return {
        present,
        absent,
        leave,
        total,
        percentage
    };
}


/* =========================================================
   ATTENDANCE TABLE
========================================================= */

function renderAttendanceTable(
    attendance
) {

    const tbody =
        document.getElementById(
            "attendanceTableBody"
        );

    if (!tbody) {
        return;
    }

    const courseMap = {};


    /* =====================================================
       ARRAY ATTENDANCE
    ===================================================== */

    if (
        Array.isArray(attendance)
    ) {

        attendance.forEach(
            function (record) {

                if (!record) {
                    return;
                }

                const course =
                    record.course ||
                    record.courseName ||
                    record.subject ||
                    "Other";

                const code =
                    record.code ||
                    record.courseCode ||
                    "—";

                const key =
                    `${course}|${code}`;

                if (!courseMap[key]) {

                    courseMap[key] = {

                        course,
                        code,
                        present: 0,
                        absent: 0,
                        leave: 0

                    };
                }

                const status =
                    String(
                        record.status ??
                        record.attendance ??
                        record.attendanceStatus ??
                        ""
                    )
                    .trim()
                    .toLowerCase();

                if (
                    status === "present" ||
                    status === "p" ||
                    status === "1" ||
                    status === "true"
                ) {

                    courseMap[key].present++;

                } else if (
                    status === "absent" ||
                    status === "a" ||
                    status === "0" ||
                    status === "false"
                ) {

                    courseMap[key].absent++;

                } else if (
                    status === "leave" ||
                    status === "l"
                ) {

                    courseMap[key].leave++;
                }
            }
        );
    }


    /* =====================================================
       OBJECT COURSE-WISE ATTENDANCE
    ===================================================== */

    if (
        attendance &&
        typeof attendance === "object" &&
        !Array.isArray(attendance)
    ) {

        const courseWise =
            attendance.courseWise ||
            attendance.courses ||
            attendance.records ||
            [];

        if (
            Array.isArray(courseWise)
        ) {

            courseWise.forEach(
                function (item) {

                    if (!item) {
                        return;
                    }

                    const course =
                        item.course ||
                        item.courseName ||
                        item.subject ||
                        item.name ||
                        "Other";

                    const code =
                        item.code ||
                        item.courseCode ||
                        "—";

                    const key =
                        `${course}|${code}`;

                    if (!courseMap[key]) {

                        courseMap[key] = {

                            course,
                            code,
                            present: 0,
                            absent: 0,
                            leave: 0

                        };
                    }

                    courseMap[key].present +=
                        Number(
                            item.present ??
                            item.presentDays ??
                            item.attended ??
                            0
                        ) || 0;

                    courseMap[key].absent +=
                        Number(
                            item.absent ??
                            item.absentDays ??
                            item.missed ??
                            0
                        ) || 0;

                    courseMap[key].leave +=
                        Number(
                            item.leave ??
                            item.leaveDays ??
                            0
                        ) || 0;

                }
            );
        }
    }


    const courses =
        Object.values(courseMap);


    if (!courses.length) {

        tbody.innerHTML = `
            <tr>

                <td colspan="7">

                    No course-wise attendance available.

                </td>

            </tr>
        `;

        return;
    }


    tbody.innerHTML =
        courses
            .map(function (item) {

                const total =
                    item.present +
                    item.absent +
                    item.leave;

                const percentage =
                    total > 0
                        ? (
                            item.present /
                            total
                        ) * 100
                        : 0;

                const status =
                    percentage >= 90
                        ? "Excellent"
                        : percentage >= 75
                            ? "Good"
                            : "Low";

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    item.course
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                item.code
                            )}
                        </td>

                        <td>
                            ${item.present}
                        </td>

                        <td>
                            ${item.absent}
                        </td>

                        <td>
                            ${total}
                        </td>

                        <td>
                            ${formatPercentage(
                                percentage
                            )}
                        </td>

                        <td>
                            ${createStatusBadge(
                                status
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   ASSIGNMENTS PAGE
========================================================= */

function renderAssignmentsPage() {

    const assignments =
        getAssignments();

    renderAssignmentStats(
        assignments
    );

    renderAssignmentTable(
        assignments
    );

}


/* =========================================================
   ASSIGNMENT STATS
========================================================= */

function renderAssignmentStats(
    assignments
) {

    const total =
        assignments.length;

    const submitted =
        assignments.filter(
            isSubmitted
        ).length;

    const pending =
        total -
        submitted;

    const graded =
        assignments.filter(
            function (item) {

                return (
                    item.grade !== undefined ||
                    item.marks !== undefined
                );

            }
        ).length;

    setText(
        "totalAssignments",
        total
    );

    setText(
        "submittedAssignments",
        submitted
    );

    setText(
        "pendingAssignments",
        pending
    );

    setText(
        "gradedAssignments",
        graded
    );
}


/* =========================================================
   ASSIGNMENT TABLE
========================================================= */

function renderAssignmentTable(
    assignments,
    filter = "all"
) {

    const tbody =
        document.getElementById(
            "assignmentTableBody"
        );

    if (!tbody) {
        return;
    }

    let filtered =
        assignments;

    if (filter === "pending") {

        filtered =
            assignments.filter(
                function (item) {
                    return !isSubmitted(item);
                }
            );
    }

    if (filter === "submitted") {

        filtered =
            assignments.filter(
                isSubmitted
            );
    }

    if (!filtered.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    No assignments found.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        filtered
            .map(function (item) {

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    item.title ||
                                    item.name ||
                                    "Assignment"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                item.course ||
                                item.courseName ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    item.dueDate ||
                                    item.deadline
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    item.submittedAt ||
                                    item.submissionDate
                                )
                            )}
                        </td>

                        <td>
                            ${
                                item.marks ??
                                item.score ??
                                "—"
                            }
                        </td>

                        <td>
                            ${createStatusBadge(
                                getAssignmentStatus(
                                    item
                                )
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   QUIZZES PAGE
========================================================= */

function renderQuizzesPage() {

    const quizzes =
        getQuizzes();

    renderQuizStats(quizzes);

    renderQuizTable(quizzes);

    renderRecentQuizList(quizzes);
}


/* =========================================================
   QUIZ STATS
========================================================= */

function renderQuizStats(
    quizzes
) {

    const total =
        quizzes.length;

    const attempted =
        quizzes.filter(
            isQuizAttempted
        ).length;

    const pending =
        total -
        attempted;

    const scores =
        quizzes
            .map(
                getQuizPercentage
            )
            .filter(function (value) {

                return value !== null;

            });

    const average =
        scores.length
            ? scores.reduce(
                (a, b) => a + b,
                0
            ) / scores.length
            : null;

    setText(
        "totalQuizzes",
        total
    );

    setText(
        "attemptedQuizzes",
        attempted
    );

    setText(
        "pendingQuizzes",
        pending
    );

    setText(
        "averageQuizScore",
        average !== null
            ? `${formatNumber(
                average
            )}%`
            : "—"
    );
}


/* =========================================================
   QUIZ TABLE
========================================================= */

function renderQuizTable(
    quizzes,
    filter = "all"
) {

    const tbody =
        document.getElementById(
            "quizTableBody"
        );

    if (!tbody) {
        return;
    }

    let filtered =
        quizzes;

    if (filter === "attempted") {

        filtered =
            quizzes.filter(
                isQuizAttempted
            );
    }

    if (filter === "pending") {

        filtered =
            quizzes.filter(
                function (quiz) {

                    return !isQuizAttempted(
                        quiz
                    );

                }
            );
    }

    if (!filtered.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6">
                    No quizzes found.
                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML =
        filtered
            .map(function (quiz) {

                const percentage =
                    getQuizPercentage(
                        quiz
                    );

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHTML(
                                    quiz.title ||
                                    quiz.name ||
                                    "Quiz"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(
                                quiz.course ||
                                quiz.courseName ||
                                "—"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    quiz.date ||
                                    quiz.quizDate
                                )
                            )}
                        </td>

                        <td>
                            ${
                                quiz.score ??
                                quiz.marks ??
                                "—"
                            }
                        </td>

                        <td>
                            ${
                                percentage !== null
                                    ? formatNumber(
                                        percentage
                                    ) + "%"
                                    : "—"
                            }
                        </td>

                        <td>
                            ${createStatusBadge(
                                isQuizAttempted(quiz)
                                    ? "Attempted"
                                    : "Pending"
                            )}
                        </td>

                    </tr>
                `;

            })
            .join("");
}


/* =========================================================
   RECENT QUIZZES
========================================================= */

function renderRecentQuizList(
    quizzes
) {

    const container =
        document.getElementById(
            "recentQuizList"
        );

    if (!container) {
        return;
    }

    const attempted =
        quizzes.filter(
            isQuizAttempted
        );

    if (!attempted.length) {

        container.innerHTML =
            emptyState(
                "fa-solid fa-chart-line",
                "No completed quizzes available."
            );

        return;
    }

    container.innerHTML =
        attempted
            .slice()
            .reverse()
            .slice(0, 5)
            .map(function (quiz) {

                const percentage =
                    getQuizPercentage(
                        quiz
                    );

                return `
                    <div class="quiz-item">

                        <div class="quiz-icon">

                            <i class="fa-solid fa-circle-question"></i>

                        </div>

                        <div class="quiz-info">

                            <strong>
                                ${escapeHTML(
                                    quiz.title ||
                                    quiz.name ||
                                    "Quiz"
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    quiz.course ||
                                    quiz.courseName ||
                                    "Course"
                                )}
                            </span>

                        </div>

                        <div class="quiz-score">

                            <strong>
                                ${
                                    quiz.score ??
                                    quiz.marks ??
                                    "—"
                                }
                            </strong>

                            <span>
                                ${
                                    percentage !== null
                                        ? formatNumber(
                                            percentage
                                        ) + "%"
                                        : ""
                                }
                            </span>

                        </div>

                    </div>
                `;

            })
            .join("");
}


/* =========================================================
   PROFILE
========================================================= */

function renderParentProfile() {

    if (!currentParent) {
        return;
    }

    setText(
        "profileParentName",
        currentParent.name ||
        "Parent"
    );

    setText(
        "profileParentEmail",
        currentParent.email ||
        "—"
    );

    setText(
        "profileParentPhone",
        currentParent.phone ||
        "—"
    );

    setText(
        "profileParentRole",
        "Parent"
    );

    if (currentChild) {

        setText(
            "profileChildName",
            currentChild.name ||
            "Student"
        );

        setText(
            "profileChildEmail",
            currentChild.email ||
            "—"
        );
    }
}


/* =========================================================
   CHILD NOT FOUND
========================================================= */

function showChildNotFoundState() {

    console.error(
        "No linked student found for parent.",
        currentParent
    );

    const containers = [
        "resultsTableBody",
        "scheduleTableBody",
        "attendanceTableBody",
        "assignmentTableBody",
        "quizTableBody"
    ];

    containers.forEach(function (id) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        element.innerHTML = `
            <tr>

                <td colspan="10">

                    No student is linked
                    to this parent account.

                </td>

            </tr>
        `;
    });
}


/* =========================================================
   ASSIGNMENT HELPERS
========================================================= */

function isSubmitted(
    assignment
) {

    const status =
        String(
            assignment.status ||
            ""
        ).toLowerCase();

    return (
        assignment.submitted === true ||
        status === "submitted" ||
        status === "graded" ||
        Boolean(
            assignment.submittedAt ||
            assignment.submissionDate
        )
    );
}


function getAssignmentStatus(
    assignment
) {

    const status =
        String(
            assignment.status ||
            ""
        ).toLowerCase();

    if (
        status === "graded" ||
        assignment.grade !== undefined ||
        assignment.marks !== undefined
    ) {

        return "Graded";
    }

    if (
        status === "submitted" ||
        isSubmitted(assignment)
    ) {

        return "Submitted";
    }

    return "Pending";
}


/* =========================================================
   QUIZ HELPERS
========================================================= */

function isQuizAttempted(
    quiz
) {

    const status =
        String(
            quiz.status ||
            ""
        ).toLowerCase();

    return (
        quiz.attempted === true ||
        status === "attempted" ||
        status === "completed" ||
        quiz.score !== undefined ||
        quiz.marks !== undefined
    );
}


function getQuizPercentage(
    quiz
) {

    const percentage =
        quiz.percentage ??
        quiz.percent;

    if (
        percentage !== undefined &&
        percentage !== null
    ) {

        return Number(
            percentage
        );
    }

    const score =
        Number(
            quiz.score ??
            quiz.marks
        );

    const total =
        Number(
            quiz.total ??
            quiz.totalMarks ??
            quiz.maxMarks
        );

    if (
        !Number.isNaN(score) &&
        !Number.isNaN(total) &&
        total > 0
    ) {

        return (
            score /
            total *
            100
        );
    }

    return null;
}


/* =========================================================
   GPA
========================================================= */

function calculateGPA(
    results
) {

    if (!results.length) {
        return null;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach(function (result) {

        const grade =
            result.grade ||
            calculateGrade(
                result.marks
            );

        const point =
            Number(
                result.gradePoint ??
                result.gpa ??
                calculateGradePoint(grade)
            );

        const credits =
            Number(
                result.creditHours ||
                result.credits ||
                1
            );

        if (!Number.isNaN(point)) {

            totalPoints +=
                point *
                credits;

            totalCredits +=
                credits;
        }

    });

    if (!totalCredits) {
        return null;
    }

    return (
        totalPoints /
        totalCredits
    );
}


/* =========================================================
   GRADE
========================================================= */

function calculateGrade(
    marks
) {

    const value =
        Number(marks);

    if (
        Number.isNaN(value)
    ) {
        return "—";
    }

    if (value >= 90) return "A+";
    if (value >= 85) return "A";
    if (value >= 80) return "A-";
    if (value >= 75) return "B+";
    if (value >= 70) return "B";
    if (value >= 65) return "B-";
    if (value >= 60) return "C+";
    if (value >= 55) return "C";
    if (value >= 50) return "D";

    return "F";
}


/* =========================================================
   GRADE POINT
========================================================= */

function calculateGradePoint(
    grade
) {

    const points = {

        "A+": 4.00,
        "A": 4.00,
        "A-": 3.67,
        "B+": 3.33,
        "B": 3.00,
        "B-": 2.67,
        "C+": 2.33,
        "C": 2.00,
        "C-": 1.67,
        "D": 1.00,
        "F": 0.00

    };

    return (
        points[
            String(
                grade || ""
            ).toUpperCase()
        ] ?? "—"
    );
}


/* =========================================================
   UI HELPERS
========================================================= */

function createGradeBadge(
    grade
) {

    return `
        <span class="grade-badge">
            ${escapeHTML(
                String(
                    grade || "—"
                )
            )}
        </span>
    `;
}


function createStatusBadge(
    status
) {

    return `
        <span class="status-badge">
            ${escapeHTML(
                String(
                    status || "Pending"
                )
            )}
        </span>
    `;
}


function createAssignmentItem(
    assignment
) {

    return `
        <div class="assignment-item">

            <div class="assignment-icon">

                <i class="fa-solid fa-file-pen"></i>

            </div>

            <div class="assignment-info">

                <strong>
                    ${escapeHTML(
                        assignment.title ||
                        assignment.name ||
                        "Assignment"
                    )}
                </strong>

                <span>
                    ${escapeHTML(
                        assignment.course ||
                        assignment.courseName ||
                        "Course"
                    )}
                </span>

                <small>
                    Due:
                    ${escapeHTML(
                        formatDate(
                            assignment.dueDate ||
                            assignment.deadline
                        )
                    )}
                </small>

            </div>

            ${createStatusBadge(
                getAssignmentStatus(
                    assignment
                )
            )}

        </div>
    `;
}


function createQuizItem(
    quiz
) {

    const percentage =
        getQuizPercentage(quiz);

    return `
        <div class="quiz-item">

            <div class="quiz-icon">

                <i class="fa-solid fa-circle-question"></i>

            </div>

            <div class="quiz-info">

                <strong>
                    ${escapeHTML(
                        quiz.title ||
                        quiz.name ||
                        "Quiz"
                    )}
                </strong>

                <span>
                    ${escapeHTML(
                        quiz.course ||
                        quiz.courseName ||
                        "Course"
                    )}
                </span>

            </div>

            <div class="quiz-score">

                <strong>
                    ${
                        quiz.score ??
                        quiz.marks ??
                        "—"
                    }
                </strong>

                <span>
                    ${
                        percentage !== null
                            ? formatNumber(
                                percentage
                            ) + "%"
                            : ""
                    }
                </span>

            </div>

        </div>
    `;
}


function emptyState(
    icon,
    message
) {

    return `
        <div class="empty-state">

            <i class="${icon}"></i>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>
    `;
}


/* =========================================================
   GENERAL HELPERS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        value !== undefined &&
        value !== null
            ? value
            : "—";
}


function getInitials(
    name
) {

    if (!name) {
        return "P";
    }

    const words =
        String(name)
            .trim()
            .split(/\s+/);

    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}


function formatDate(
    value
) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value);
    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


function getDateDay(
    value
) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }

    return date.getDate();
}


function getDateMonth(
    value
) {

    if (!value) {
        return "---";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "---";
    }

    return date
        .toLocaleDateString(
            "en-US",
            {
                month: "short"
            }
        )
        .toUpperCase();
}


function formatNumber(
    value
) {

    const number =
        Number(value);

    if (
        Number.isNaN(number)
    ) {
        return "—";
    }

    return number.toFixed(2);
}


function formatPercentage(
    value
) {

    if (
        value === null ||
        value === undefined ||
        Number.isNaN(
            Number(value)
        )
    ) {

        return "—";
    }

    return (
        Number(value).toFixed(1) +
        "%"
    );
}


function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}
/* =========================================================
   LEARNORA LMS — STUDENT PORTAL JAVASCRIPT
   Frontend / Static LMS Functionality
   ========================================================= */


/* =========================================================
   1. GLOBAL HELPERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initStudentPortal();
});


function initStudentPortal() {

    initSidebar();
    initActiveNavigation();
    initSearch();
    initNotifications();
    initCourseActions();
    initLectureFilters();
    initGeneralFilters();
    initTabs();
    initModal();
    initQuiz();
    initButtons();
    initLocalStorage();
}


/* =========================================================
   2. SIDEBAR MENU
   CLOSED BY DEFAULT
   OPENS ONLY WHEN THREE-LINE BUTTON IS PRESSED
   ========================================================= */

function initSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");

    const menuButton =
        document.querySelector(".mobile-menu-btn");


    /* Required elements check */

    if (!sidebar || !menuButton) {
        return;
    }


    /* =====================================================
       FORCE SIDEBAR CLOSED ON PAGE LOAD
       ===================================================== */

    sidebar.classList.remove("open");

    if (overlay) {
        overlay.classList.remove("show");
    }

    document.body.classList.remove(
        "sidebar-open"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    /* =====================================================
       THREE LINE BUTTON
       OPEN / CLOSE SIDEBAR
       ===================================================== */

    menuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            const isOpen =
                sidebar.classList.contains("open");


            if (isOpen) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    /* =====================================================
       OVERLAY CLICK
       ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            () => {

                closeSidebar();

            }
        );

    }


    /* =====================================================
       NAVIGATION CLICK
       ===================================================== */

    const navLinks =
        sidebar.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeSidebar();

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       OPEN SIDEBAR
       ===================================================== */

    function openSidebar() {

        sidebar.classList.add("open");


        if (overlay) {

            overlay.classList.add("show");

        }


        document.body.classList.add(
            "sidebar-open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /* =====================================================
       CLOSE SIDEBAR
       ===================================================== */

    function closeSidebar() {

        sidebar.classList.remove("open");


        if (overlay) {

            overlay.classList.remove("show");

        }


        document.body.classList.remove(
            "sidebar-open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   3. ACTIVE SIDEBAR NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (
            linkPage &&
            linkPage === currentPage
        ) {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   4. GLOBAL SEARCH
   ========================================================= */

function initSearch() {

    const searchInputs =
        document.querySelectorAll(
            ".topbar-search input, [data-search]"
        );


    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            debounce(function () {

                const query =
                    this.value
                        .trim()
                        .toLowerCase();


                performSearch(query);

            }, 250)
        );

    });

}


function performSearch(query) {

    const searchableItems =
        document.querySelectorAll(
            `
            .course-card,
            .lecture-item,
            .recording-card,
            .assignment-item,
            .quiz-card,
            .announcement-item,
            .material-card,
            .activity-item
            `
        );


    if (!searchableItems.length) {
        return;
    }


    searchableItems.forEach(item => {

        const text =
            item.innerText
                .toLowerCase();


        if (
            !query ||
            text.includes(query)
        ) {

            item.style.display = "";

        } else {

            item.style.display = "none";

        }

    });

}


/* =========================================================
   5. NOTIFICATIONS
   ========================================================= */

function initNotifications() {

    const notificationButtons =
        document.querySelectorAll(
            ".topbar-icon"
        );


    notificationButtons.forEach(button => {

        const icon =
            button.querySelector("i");


        if (
            icon &&
            icon.classList.contains(
                "fa-bell"
            )
        ) {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "You have 3 new notifications.",
                        "info"
                    );


                    const dot =
                        button.querySelector(
                            ".notification-dot"
                        );


                    if (dot) {
                        dot.remove();
                    }

                }
            );

        }

    });

}


/* =========================================================
   6. COURSE ACTIONS
   ========================================================= */

function initCourseActions() {

    /* Open course */

    const openButtons =
        document.querySelectorAll(
            "[data-course-open], .open-course"
        );


    openButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const target =
                    button.dataset.courseOpen ||
                    button.getAttribute("href");


                if (
                    target &&
                    target !== "#"
                ) {

                    return;
                }


                event.preventDefault();


                window.location.href =
                    "course-detail.html";

            }
        );

    });


    /* Drop course */

    const dropButtons =
        document.querySelectorAll(
            ".drop-course, [data-drop-course]"
        );


    dropButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const courseName =
                    button.dataset.dropCourse ||
                    getClosestCourseName(button);


                const confirmed =
                    window.confirm(
                        `Are you sure you want to drop ${courseName}?`
                    );


                if (!confirmed) {
                    return;
                }


                const card =
                    button.closest(
                        ".course-card, tr, .assignment-item"
                    );


                if (card) {

                    card.style.opacity =
                        "0.45";


                    button.disabled =
                        true;


                    button.textContent =
                        "Dropped";

                }


                showToast(
                    `${courseName} has been dropped successfully.`,
                    "success"
                );

            }
        );

    });


    /* Add course */

    const addButtons =
        document.querySelectorAll(
            ".add-course, [data-add-course]"
        );


    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const courseName =
                    button.dataset.addCourse ||
                    getClosestCourseName(button);


                button.disabled =
                    true;


                button.innerHTML =
                    `<i class="fa-solid fa-check"></i> Added`;


                button.classList.remove(
                    "btn-primary"
                );


                button.classList.add(
                    "btn-success"
                );


                showToast(
                    `${courseName} has been added to your courses.`,
                    "success"
                );

            }
        );

    });


    /* Course code search */

    const courseSearchButton =
        document.querySelector(
            "#courseSearchBtn, .course-code-search .btn"
        );


    const courseCodeInput =
        document.querySelector(
            "#courseCode, .course-code-search .form-input"
        );


    if (
        courseSearchButton &&
        courseCodeInput
    ) {

        courseSearchButton.addEventListener(
            "click",
            () => {

                const code =
                    courseCodeInput.value
                        .trim()
                        .toUpperCase();


                if (!code) {

                    showToast(
                        "Please enter a course code.",
                        "warning"
                    );


                    courseCodeInput.focus();

                    return;
                }


                searchCourseCode(code);

            }
        );


        courseCodeInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    courseSearchButton.click();

                }

            }
        );

    }

}


/* =========================================================
   7. COURSE CODE SEARCH
   ========================================================= */

function searchCourseCode(code) {

    const courseCards =
        document.querySelectorAll(
            "[data-course-code]"
        );


    let found = false;


    courseCards.forEach(card => {

        const cardCode =
            card.dataset.courseCode
                ?.toUpperCase();


        if (
            cardCode === code
        ) {

            found = true;


            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            card.style.boxShadow =
                "0 0 0 4px rgba(37,99,235,0.15)";


            setTimeout(() => {

                card.style.boxShadow = "";

            }, 1800);

        }

    });


    if (found) {

        showToast(
            `Course ${code} found.`,
            "success"
        );

        return;
    }


    /* Demo course lookup */

    const demoCourses = {

        "AI-401": {
            name: "Artificial Intelligence",
            instructor: "Dr. Hassan Ahmed"
        },

        "CS-409": {
            name: "Cloud Computing",
            instructor: "Dr. Bilal Khan"
        },

        "DS-405": {
            name: "Machine Learning",
            instructor: "Dr. Ayesha Malik"
        }

    };


    if (demoCourses[code]) {

        showToast(
            `${demoCourses[code].name} — ${demoCourses[code].instructor}`,
            "info"
        );

        return;
    }


    showToast(
        `No course found with code ${code}.`,
        "danger"
    );

}


/* =========================================================
   8. LECTURE FILTERS
   ========================================================= */

function initLectureFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const lectureItems =
        document.querySelectorAll(
            ".lecture-item"
        );


    if (
        !filterButtons.length ||
        !lectureItems.length
    ) {
        return;
    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter ||
                    button.textContent
                        .trim()
                        .toLowerCase();


                lectureItems.forEach(item => {

                    const status =
                        getLectureStatus(item);


                    if (
                        filter === "all" ||
                        filter.includes("all")
                    ) {

                        item.style.display =
                            "";

                        return;
                    }


                    if (
                        filter.includes("completed")
                    ) {

                        item.style.display =
                            status === "completed"
                                ? ""
                                : "none";

                        return;
                    }


                    if (
                        filter.includes("pending")
                    ) {

                        item.style.display =
                            status !== "completed"
                                ? ""
                                : "none";

                        return;
                    }


                    item.style.display =
                        "";

                });

            }
        );

    });

}


function getLectureStatus(item) {

    if (
        item.querySelector(
            ".badge-success"
        )
    ) {

        return "completed";

    }


    if (
        item.querySelector(
            ".badge-warning"
        )
    ) {

        return "pending";

    }


    if (
        item.classList.contains(
            "completed"
        )
    ) {

        return "completed";

    }


    return "pending";

}


/* =========================================================
   9. GENERAL FILTERS
   ========================================================= */

function initGeneralFilters() {

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );


    filterButtons.forEach(button => {

        if (
            button.closest(
                ".lecture-list"
            )
        ) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                if (!filter) {
                    return;
                }


                const group =
                    button.closest(
                        ".filter-group"
                    );


                if (group) {

                    group
                        .querySelectorAll(
                            "[data-filter]"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });

                }


                button.classList.add(
                    "active"
                );


                applyGenericFilter(
                    filter
                );

            }
        );

    });

}


function applyGenericFilter(filter) {

    const normalized =
        filter.toLowerCase();


    const items =
        document.querySelectorAll(
            `
            .assignment-item,
            .quiz-card,
            .recording-card,
            .material-card,
            .announcement-item
            `
        );


    if (!items.length) {
        return;
    }


    items.forEach(item => {

        if (
            normalized === "all"
        ) {

            item.style.display =
                "";

            return;
        }


        const status =
            item.dataset.status
                ?.toLowerCase() || "";


        const text =
            item.innerText
                .toLowerCase();


        if (
            status === normalized ||
            text.includes(normalized)
        ) {

            item.style.display =
                "";

        } else {

            item.style.display =
                "none";

        }

    });

}


/* =========================================================
   10. COURSE / PAGE TABS
   ========================================================= */

function initTabs() {

    const tabs =
        document.querySelectorAll(
            ".tab"
        );


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            event => {

                const target =
                    tab.dataset.tab;


                if (
                    !target &&
                    !tab.getAttribute("href")
                ) {

                    event.preventDefault();

                }


                const parent =
                    tab.parentElement;


                if (parent) {

                    parent
                        .querySelectorAll(
                            ".tab"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });

                }


                tab.classList.add(
                    "active"
                );


                if (target) {

                    switchTabContent(
                        target
                    );

                }

            }
        );

    });

}


function switchTabContent(target) {

    const sections =
        document.querySelectorAll(
            "[data-tab-content]"
        );


    sections.forEach(section => {

        if (
            section.dataset.tabContent ===
            target
        ) {

            section.style.display =
                "";

        } else {

            section.style.display =
                "none";

        }

    });

}


/* =========================================================
   11. MODAL
   ========================================================= */

function initModal() {

    const modalTriggers =
        document.querySelectorAll(
            "[data-modal]"
        );


    modalTriggers.forEach(trigger => {

        trigger.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const modalId =
                    trigger.dataset.modal;


                const modal =
                    document.getElementById(
                        modalId
                    );


                if (modal) {

                    openModal(modal);

                }

            }
        );

    });


    const closeButtons =
        document.querySelectorAll(
            ".modal-close, [data-modal-close]"
        );


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modal =
                    button.closest(
                        ".modal-overlay"
                    );


                if (modal) {

                    closeModal(modal);

                }

            }
        );

    });


    document.addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {

                closeModal(
                    event.target
                );

            }

        }
    );

}


function openModal(modal) {

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =========================================================
   12. QUIZ SYSTEM
   ========================================================= */

let currentQuestion = 0;

let quizQuestions = [];


function initQuiz() {

    const quizForm =
        document.querySelector(
            "#quizForm, .quiz-question-card"
        );


    if (!quizForm) {
        return;
    }


    setupQuizQuestions();

    setupQuizNavigation();

    setupQuizTimer();

    setupQuestionMap();

    restoreQuizAnswers();

}


/* =========================================================
   QUIZ QUESTIONS
   ========================================================= */

function setupQuizQuestions() {

    const questions =
        document.querySelectorAll(
            "[data-question]"
        );


    if (!questions.length) {

        quizQuestions = [];

        return;
    }


    quizQuestions =
        Array.from(questions);


    quizQuestions.forEach(
        (question, index) => {

            question.dataset.index =
                index;


            if (index !== 0) {

                question.style.display =
                    "none";

            }

        }
    );


    updateQuestionCounter();

}


/* =========================================================
   QUIZ NAVIGATION
   ========================================================= */

function setupQuizNavigation() {

    const nextButton =
        document.querySelector(
            "#nextQuestion, [data-next-question]"
        );


    const previousButton =
        document.querySelector(
            "#previousQuestion, [data-previous-question]"
        );


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                saveCurrentAnswer();


                goToQuestion(
                    currentQuestion + 1
                );

            }
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                saveCurrentAnswer();


                goToQuestion(
                    currentQuestion - 1
                );

            }
        );

    }


    const submitButton =
        document.querySelector(
            "#submitQuiz, [data-submit-quiz]"
        );


    if (submitButton) {

        submitButton.addEventListener(
            "click",
            submitQuiz
        );

    }

}


/* =========================================================
   GO TO QUESTION
   ========================================================= */

function goToQuestion(index) {

    if (!quizQuestions.length) {
        return;
    }


    if (
        index < 0 ||
        index >= quizQuestions.length
    ) {

        return;
    }


    quizQuestions.forEach(
        question => {

            question.style.display =
                "none";

        }
    );


    currentQuestion =
        index;


    quizQuestions[
        currentQuestion
    ].style.display =
        "";


    updateQuestionCounter();

    updateQuizNavigation();

    updateQuestionMap();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   QUESTION COUNTER
   ========================================================= */

function updateQuestionCounter() {

    const current =
        document.querySelector(
            "#currentQuestion, [data-current-question]"
        );


    const total =
        document.querySelector(
            "#totalQuestions, [data-total-questions]"
        );


    if (current) {

        current.textContent =
            currentQuestion + 1;

    }


    if (total) {

        total.textContent =
            quizQuestions.length;

    }


    const progress =
        document.querySelector(
            "[data-quiz-progress]"
        );


    if (progress) {

        const percentage =
            quizQuestions.length
                ? (
                    (
                        (currentQuestion + 1) /
                        quizQuestions.length
                    ) * 100
                )
                : 0;


        progress.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   QUIZ NAVIGATION BUTTONS
   ========================================================= */

function updateQuizNavigation() {

    const previous =
        document.querySelector(
            "#previousQuestion, [data-previous-question]"
        );


    const next =
        document.querySelector(
            "#nextQuestion, [data-next-question]"
        );


    if (previous) {

        previous.disabled =
            currentQuestion === 0;

    }


    if (next) {

        if (
            currentQuestion ===
            quizQuestions.length - 1
        ) {

            next.innerHTML =
                `Submit <i class="fa-solid fa-check"></i>`;

        } else {

            next.innerHTML =
                `Next <i class="fa-solid fa-arrow-right"></i>`;

        }

    }

}


/* =========================================================
   QUESTION MAP
   ========================================================= */

function setupQuestionMap() {

    const mapButtons =
        document.querySelectorAll(
            ".question-map-btn"
        );


    mapButtons.forEach(
        (button, index) => {

            button.addEventListener(
                "click",
                () => {

                    saveCurrentAnswer();

                    goToQuestion(index);

                }
            );

        }
    );


    updateQuestionMap();

}


function updateQuestionMap() {

    const mapButtons =
        document.querySelectorAll(
            ".question-map-btn"
        );


    mapButtons.forEach(
        (button, index) => {

            button.classList.toggle(
                "active",
                index === currentQuestion
            );

        }
    );

}


/* =========================================================
   SAVE QUIZ ANSWER
   ========================================================= */

function saveCurrentAnswer() {

    if (!quizQuestions.length) {
        return;
    }


    const current =
        quizQuestions[
            currentQuestion
        ];


    const selected =
        current.querySelector(
            "input[type='radio']:checked"
        );


    if (!selected) {
        return;
    }


    localStorage.setItem(
        `learnora_quiz_${getQuizId()}_${currentQuestion}`,
        selected.value
    );


    const mapButton =
        document.querySelector(
            `.question-map-btn:nth-child(${currentQuestion + 1})`
        );


    if (mapButton) {

        mapButton.classList.add(
            "completed"
        );

    }

}


/* =========================================================
   RESTORE QUIZ ANSWERS
   ========================================================= */

function restoreQuizAnswers() {

    if (!quizQuestions.length) {
        return;
    }


    quizQuestions.forEach(
        (question, index) => {

            const saved =
                localStorage.getItem(
                    `learnora_quiz_${getQuizId()}_${index}`
                );


            if (!saved) {
                return;
            }


            const radio =
                question.querySelector(
                    `input[value="${saved}"]`
                );


            if (radio) {

                radio.checked =
                    true;

            }

        }
    );

}


/* =========================================================
   QUIZ ID
   ========================================================= */

function getQuizId() {

    const quiz =
        document.querySelector(
            "[data-quiz-id]"
        );


    if (
        quiz &&
        quiz.dataset.quizId
    ) {

        return quiz.dataset.quizId;

    }


    return (
        document.title
            .toLowerCase()
            .replace(
                /[^a-z0-9]+/g,
                "_"
            )
    );

}


/* =========================================================
   13. QUIZ TIMER
   ========================================================= */

let quizTimerInterval = null;


function setupQuizTimer() {

    const timer =
        document.querySelector(
            "[data-quiz-timer], #quizTimer"
        );


    if (!timer) {
        return;
    }


    let minutes =
        parseInt(
            timer.dataset.minutes || "20",
            10
        );


    let seconds =
        parseInt(
            timer.dataset.seconds || "0",
            10
        );


    function updateTimer() {

        const formattedMinutes =
            String(minutes)
                .padStart(2, "0");


        const formattedSeconds =
            String(seconds)
                .padStart(2, "0");


        timer.textContent =
            `${formattedMinutes}:${formattedSeconds}`;


        if (
            minutes === 0 &&
            seconds === 0
        ) {

            clearInterval(
                quizTimerInterval
            );


            showToast(
                "Time is over. Your quiz is being submitted.",
                "danger"
            );


            setTimeout(
                submitQuiz,
                700
            );


            return;

        }


        if (seconds === 0) {

            minutes--;

            seconds = 59;

        } else {

            seconds--;

        }


        if (
            minutes < 2
        ) {

            timer.style.background =
                "#fff0f0";


            timer.style.color =
                "#dc2626";

        }

    }


    updateTimer();


    quizTimerInterval =
        setInterval(
            updateTimer,
            1000
        );

}


/* =========================================================
   14. SUBMIT QUIZ
   ========================================================= */

function submitQuiz() {

    saveCurrentAnswer();


    const confirmed =
        window.confirm(
            "Are you sure you want to submit this quiz?"
        );


    if (!confirmed) {
        return;
    }


    if (quizTimerInterval) {

        clearInterval(
            quizTimerInterval
        );

    }


    const answers =
        quizQuestions.map(
            question => {

                const selected =
                    question.querySelector(
                        "input[type='radio']:checked"
                    );


                return selected
                    ? selected.value
                    : null;

            }
        );


    localStorage.setItem(
        `learnora_quiz_result_${getQuizId()}`,
        JSON.stringify({
            answers,
            submittedAt:
                new Date().toISOString()
        })
    );


    showToast(
        "Quiz submitted successfully!",
        "success"
    );


    setTimeout(() => {

        const resultsPage =
            "results.html";


        if (
            window.location.pathname
                .includes("/student/")
        ) {

            window.location.href =
                resultsPage;

        }

    }, 1200);

}


/* =========================================================
   15. BUTTON INTERACTIONS
   ========================================================= */

function initButtons() {

    /* =====================================================
       WATCH RECORDING
       ===================================================== */

    const recordingButtons =
        document.querySelectorAll(
            ".watch-recording, [data-watch-recording]"
        );


    recordingButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const title =
                    button.dataset.watchRecording ||
                    "Lecture Recording";


                showToast(
                    `Opening ${title}...`,
                    "info"
                );


                button.innerHTML =
                    `<i class="fa-solid fa-play"></i> Playing`;

            }
        );

    });


    /* =====================================================
       SUBMIT ASSIGNMENT
       ===================================================== */

    const submitAssignmentButtons =
        document.querySelectorAll(
            ".submit-assignment, [data-submit-assignment]"
        );


    submitAssignmentButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "Assignment submission panel opened.",
                        "info"
                    );

                }
            );

        }
    );


    /* =====================================================
       START QUIZ
       ===================================================== */

    const startQuizButtons =
        document.querySelectorAll(
            ".start-quiz, [data-start-quiz]"
        );


    startQuizButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const href =
                    button.getAttribute(
                        "href"
                    );


                if (
                    href &&
                    href !== "#"
                ) {

                    return;
                }


                window.location.href =
                    "quiz.html";

            }
        );

    });


    /* =====================================================
       DOWNLOAD MATERIAL
       ===================================================== */

    const downloadButtons =
        document.querySelectorAll(
            ".download-material, [data-download-material]"
        );


    downloadButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const href =
                    button.getAttribute(
                        "href"
                    );


                if (
                    href &&
                    href !== "#"
                ) {

                    return;
                }


                event.preventDefault();


                showToast(
                    "Demo download started.",
                    "info"
                );

            }
        );

    });


    /* =====================================================
       CONTINUE LECTURE
       FIXED PATH
       ===================================================== */

    const lectureButtons =
        document.querySelectorAll(
            ".continue-lecture, [data-continue-lecture]"
        );


    lectureButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const href =
                    button.getAttribute(
                        "href"
                    );


                if (
                    href &&
                    href !== "#"
                ) {

                    return;
                }


                /*
                 * dashboard.html and other student pages
                 * are inside Html/student/
                 */

                window.location.href =
                    "lectures.html";

            }
        );

    });

}


/* =========================================================
   16. LOCAL STORAGE
   ========================================================= */

function initLocalStorage() {

    /* Student name */

    const savedName =
        localStorage.getItem(
            "learnora_student_name"
        );


    if (savedName) {

        const nameElements =
            document.querySelectorAll(
                "[data-student-name]"
            );


        nameElements.forEach(
            element => {

                element.textContent =
                    savedName;

            }
        );

    }


    /* Default student name */

    if (!savedName) {

        localStorage.setItem(
            "learnora_student_name",
            "Sheheryar Ahmed"
        );

    }


    /* Theme preference */

    const theme =
        localStorage.getItem(
            "learnora_theme"
        );


    if (
        theme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }

}


/* =========================================================
   17. UTILITY — TOAST
   ========================================================= */

function showToast(
    message,
    type = "info"
) {

    let container =
        document.querySelector(
            ".toast-container"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.className =
            "toast-container";


        container.style.position =
            "fixed";


        container.style.right =
            "22px";


        container.style.bottom =
            "22px";


        container.style.zIndex =
            "9999";


        container.style.display =
            "flex";


        container.style.flexDirection =
            "column";


        container.style.gap =
            "10px";


        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.style.minWidth =
        "280px";


    toast.style.maxWidth =
        "380px";


    toast.style.padding =
        "13px 15px";


    toast.style.borderRadius =
        "11px";


    toast.style.background =
        "#ffffff";


    toast.style.border =
        "1px solid #e2e8f0";


    toast.style.boxShadow =
        "0 15px 40px rgba(15,23,42,.15)";


    toast.style.display =
        "flex";


    toast.style.alignItems =
        "center";


    toast.style.gap =
        "10px";


    toast.style.fontFamily =
        "DM Sans, Manrope, sans-serif";


    toast.style.fontSize =
        "11px";


    toast.style.fontWeight =
        "700";


    toast.style.color =
        "#0f172a";


    let icon =
        "fa-circle-info";


    let iconColor =
        "#2563eb";


    if (type === "success") {

        icon =
            "fa-circle-check";


        iconColor =
            "#059669";

    }


    if (type === "warning") {

        icon =
            "fa-triangle-exclamation";


        iconColor =
            "#d97706";

    }


    if (type === "danger") {

        icon =
            "fa-circle-xmark";


        iconColor =
            "#dc2626";

    }


    toast.innerHTML = `
        <i
            class="fa-solid ${icon}"
            style="
                color:${iconColor};
                font-size:15px;
            "
        ></i>

        <span>${escapeHTML(message)}</span>
    `;


    container.appendChild(
        toast
    );


    requestAnimationFrame(() => {

        toast.style.opacity =
            "0";


        toast.style.transform =
            "translateY(10px)";


        toast.style.transition =
            "all .25s ease";


        requestAnimationFrame(() => {

            toast.style.opacity =
                "1";


            toast.style.transform =
                "translateY(0)";

        });

    });


    setTimeout(() => {

        toast.style.opacity =
            "0";


        toast.style.transform =
            "translateY(10px)";


        setTimeout(() => {

            toast.remove();

        }, 250);

    }, 3000);

}


/* =========================================================
   18. UTILITY — GET COURSE NAME
   ========================================================= */

function getClosestCourseName(
    element
) {

    const card =
        element.closest(
            `
            .course-card,
            .assignment-item,
            .quiz-card,
            tr
            `
        );


    if (!card) {
        return "Course";
    }


    const title =
        card.querySelector(
            `
            .course-cover-title,
            .course-title,
            .assignment-title,
            .quiz-title,
            .table-title
            `
        );


    if (title) {

        return title.textContent.trim();

    }


    return "Course";

}


/* =========================================================
   19. UTILITY — DEBOUNCE
   ========================================================= */

function debounce(
    callback,
    delay
) {

    let timeout;


    return function (...args) {

        clearTimeout(timeout);


        timeout =
            setTimeout(
                () => {

                    callback.apply(
                        this,
                        args
                    );

                },
                delay
            );

    };

}


/* =========================================================
   20. UTILITY — ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
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


/* =========================================================
   21. WINDOW RESIZE
   KEEP SIDEBAR CLOSED
   ========================================================= */

window.addEventListener(
    "resize",
    debounce(() => {

        const sidebar =
            document.querySelector(
                ".sidebar"
            );


        const overlay =
            document.querySelector(
                ".sidebar-overlay"
            );


        const menuButton =
            document.querySelector(
                ".mobile-menu-btn"
            );


        if (!sidebar) {
            return;
        }


        /*
         * Sidebar remains closed after resize.
         * User can open it again using the
         * three-line menu button.
         */

        sidebar.classList.remove(
            "open"
        );


        if (overlay) {

            overlay.classList.remove(
                "show"
            );

        }


        document.body.classList.remove(
            "sidebar-open"
        );


        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }, 150)
);


/* =========================================================
   22. PREVENT DOUBLE FORM SUBMISSION
   ========================================================= */

document.addEventListener(
    "submit",
    event => {

        const form =
            event.target;


        if (
            !form.matches(
                "form"
            )
        ) {

            return;
        }


        const submitButton =
            form.querySelector(
                "button[type='submit']"
            );


        if (!submitButton) {
            return;
        }


        if (
            submitButton.dataset.submitting ===
            "true"
        ) {

            event.preventDefault();

            return;
        }


        submitButton.dataset.submitting =
            "true";


        setTimeout(() => {

            submitButton.dataset.submitting =
                "false";

        }, 1500);

    }
);


/* =========================================================
   23. SMOOTH INTERNAL LINKS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {
            return;
        }


        const targetId =
            link.getAttribute(
                "href"
            );


        if (
            targetId === "#" ||
            targetId.length < 2
        ) {

            return;
        }


        const target =
            document.querySelector(
                targetId
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   24. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            quizTimerInterval
        ) {

            /*
             * Timer continues naturally.
             * Reserved for future server
             * synchronization.
             */

        }

    }
);


/* =========================================================
   25. GLOBAL EXPORTS
   ========================================================= */

window.LearnoraStudent = {

    showToast,

    openModal,

    closeModal,

    goToQuestion,

    submitQuiz,

    searchCourseCode

};


/* =========================================================
   END OF STUDENT.JS
   ========================================================= */
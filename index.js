// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: ["#ffffff", "#a3bffa", "#64b5f6"] },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
        size: { value: 2, random: true, anim: { enable: true, speed: 1, size_min: 0.5 } },
        line_linked: { enable: false },
        move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 200, line_linked: { opacity: 0.3 } }, push: { particles_nb: 5 } }
    },
    retina_detect: true
});

// Telegram Post Loading
let currentPostId = 11;
const maxPostId = 25;
const postsContainer = document.getElementById('telegram-posts');
const errorMessage = document.getElementById('error-message');
const loadingMessage = document.getElementById('loading');
let count=0;
async function loadPosts() {
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';

    let hasPosts = false;

while (currentPostId < maxPostId  (currentPostId < 20 || currentPostId > 24)) {
        currentPostId++;
        const postDiv = document.createElement('div');
        postDiv.className = 'telegram-post';
        postsContainer.appendChild(postDiv);

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?7';
        script.async = true;
        script.setAttribute('data-telegram-post', `eldor_soft_dev/${currentPostId}`);
        script.setAttribute('data-width', '100%');

        const isLoaded = await new Promise((resolve) => {
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            postDiv.appendChild(script);
        });

        if (isLoaded) {
            hasPosts = true;
        } else {
            postDiv.remove();
            console.log(`Post ${currentPostId} topilmadi, keyingisiga o‘tildi`);
        }
    }

    loadingMessage.style.display = 'none';
    if (!hasPosts) {
        errorMessage.style.display = 'block';
    }
}

// Quiz Logic
const QUESTIONS = [
    { question: "JavaScript dasturlash tili nima uchun ishlatiladi?", answers: [
            { text: "Veb sahifalarni dizayni uchun", correct: false },
            { text: "Ma'lumotlar bazasini boshqarish uchun", correct: false },
            { text: "Interaktivlik qo'shish uchun", correct: true },
            { text: "Matn yozish uchun", correct: false }
        ]},
    { question: "Qaysi kalit so'z JavaScriptda o'zgaruvchi e'lon qilish uchun ishlatiladi?", answers: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "string", correct: false },
            { text: "def", correct: false }
        ]},
    { question: "JavaScript faylining kengaytmasi qanday?", answers: [
            { text: ".java", correct: false },
            { text: ".js", correct: true },
            { text: ".json", correct: false },
            { text: ".script", correct: false }
        ]},
    { question: "JavaScriptda massiv elementlariga qanday murojaat qilinadi?", answers: [
            { text: "array(index)", correct: false },
            { text: "array[index]", correct: true },
            { text: "array.index", correct: false },
            { text: "array->index", correct: false }
        ]},
    { question: "Qaysi usul HTML elementini ID orqali tanlaydi?", answers: [
            { text: "getElementByClassName", correct: false },
            { text: "querySelector", correct: false },
            { text: "getElementById", correct: true },
            { text: "getElementsByTagName", correct: false }
        ]},
    { question: "JavaScriptda '===' operatori nima qiladi?", answers: [
            { text: "Faqat qiymatlarni taqqoslaydi", correct: false },
            { text: "Qiymat va tipni taqqoslaydi", correct: true },
            { text: "Faqat tiplarni taqqoslaydi", correct: false },
            { text: "O'zgaruvchilarni o'zgartiradi", correct: false }
        ]},
    { question: "JavaScriptda 'null' va 'undefined' o'rtasidagi farq nima?", answers: [
            { text: "Ikkalasi bir xil", correct: false },
            { text: "null qiymat yo'qligini, undefined e'lon qilinmaganligini bildiradi", correct: true },
            { text: "undefined qiymat yo'qligini bildiradi", correct: false },
            { text: "null o'zgaruvchi turini o'zgartiradi", correct: false }
        ]},
    { question: "JavaScriptda 'forEach' metodi nima uchun ishlatiladi?", answers: [
            { text: "Massivni elementlarini o'zgartirish uchun", correct: false },
            { text: "Massiv elementlari bo'yicha takrorlash uchun", correct: true },
            { text: "Massivni saralash uchun", correct: false },
            { text: "Massivni teskari tartibga keltirish uchun", correct: false }
        ]},
    { question: "JavaScriptda 'async/await' qanday ishlatiladi?", answers: [
            { text: "Sinxron funksiyalar uchun", correct: false },
            { text: "Asinxron operatsiyalarni boshqarish uchun", correct: true },
            { text: "DOM elementlarini o'zgartirish uchun", correct: false },
            { text: "Massivlarni filtr qilish uchun", correct: false }
        ]},
    { question: "Reactda komponent qanday yaratiladi?", answers: [
            { text: "Class yoki funksiya orqali", correct: true },
            { text: "HTML teglari orqali", correct: false },
            { text: "CSS selektorlari orqali", correct: false },
            { text: "JSON obyekti orqali", correct: false }
        ]}
];

let currentIndex = 0;
let correctAnswers = 0;
let answeredQuestions = 0;
let isMenuOpen = false;

const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

// Initialize menu state
function initializeMenu() {
    if (window.innerWidth <= 640) {
        navMenu.style.display = "none";
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        isMenuOpen = false;
    } else {
        navMenu.style.display = "flex";
        navMenu.classList.remove("open");
        menuToggle.style.display = "none";
        isMenuOpen = false;
    }
}

// Hamburger Menu Toggle
menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        navMenu.style.display = "flex";
        navMenu.classList.add("open");
        menuToggle.classList.add("active");
    } else {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        setTimeout(() => {
            if (!isMenuOpen) navMenu.style.display = "none";
        }, 300);
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (window.innerWidth <= 640 && isMenuOpen) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            isMenuOpen = false;
            setTimeout(() => {
                navMenu.style.display = "none";
            }, 300);
        }
    }
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 640) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            isMenuOpen = false;
            setTimeout(() => {
                navMenu.style.display = "none";
            }, 300);
        }
    });
});

// Page Navigation
function showPage(pageId) {
    pages.forEach(page => page.classList.add("hidden"));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.remove("hidden");
    navLinks.forEach(link => link.classList.remove("bg-blue-700"));
    const activeLink = document.querySelector(`a[href="#${pageId}"]`);
    if (activeLink) activeLink.classList.add("bg-blue-700");
    if (pageId === "test") loadQuestion();
    if (pageId === "telegram") loadPosts();
}

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageId = link.getAttribute("href").substring(1);
        showPage(pageId);
    });
});

// Quiz Logic
function updateProgress() {
    const progress = (answeredQuestions / QUESTIONS.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function loadQuestion() {
    const current = QUESTIONS[currentIndex];
    questionEl.textContent = `${currentIndex + 1}. ${current.question}`;
    answersEl.innerHTML = "";
    questionBox.classList.remove("fade-in");
    void questionBox.offsetWidth;
    questionBox.classList.add("fade-in");

    current.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.classList.add("answer-button", "w-full", "p-3", "bg-gray-100", "rounded-lg", "text-gray-800", "border", "border-gray-300", "text-left");
        btn.onclick = () => selectAnswer(answer.correct, btn);
        answersEl.appendChild(btn);
    });

    nextBtn.classList.add("hidden");
    updateProgress();
}

function selectAnswer(correct, selectedBtn) {
    if (correct) correctAnswers++;
    answeredQuestions++;
    updateProgress();
    nextBtn.classList.remove("hidden");

    Array.from(answersEl.children).forEach(btn => {
        btn.disabled = true;
        const answer = QUESTIONS[currentIndex].answers.find(a => a.text === btn.textContent);
        if (answer.correct) {
            btn.classList.add("bg-green-200", "border-green-400");
        } else if (btn === selectedBtn) {
            btn.classList.add("bg-red-200", "border-red-400");
        }
    });
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < QUESTIONS.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    resultBox.classList.add("fade-in");
    scoreEl.textContent = `Siz ${QUESTIONS.length} ta savoldan ${correctAnswers} to'g'ri javob berdingiz (${Math.round((correctAnswers / QUESTIONS.length) * 100)}%).`;
}

// Initialize
initializeMenu();
showPage("home");
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
window.addEventListener("resize", initializeMenu);

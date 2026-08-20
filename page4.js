/* =========================================================
   PAGE 4
   OUR LITTLE STORY
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const scenes = {
    intro: document.getElementById("introScene"),
    tease: document.getElementById("teaseScene"),
    ready: document.getElementById("readyScene"),
    wonderIntro: document.getElementById("wonderIntro"),
    quiz: document.getElementById("quizScene"),
    taj: document.getElementById("tajScene"),
    find: document.getElementById("findScene"),
    dinnerIntro: document.getElementById("dinnerIntro"),
    dinner: document.getElementById("dinnerScene"),
    curtain: document.getElementById("curtainScene"),
    memory: document.getElementById("memoryTransition")
};

const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const whooshSound = document.getElementById("whooshSound");
const sparkleSound = document.getElementById("sparkleSound");

const musicButton = document.getElementById("musicButton");

let musicStarted = false;


/* =========================================================
   SAFE SOUND
========================================================= */

function playSound(audio) {

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {
        // Browser may block audio before user interaction.
    });
}


/* =========================================================
   MUSIC
========================================================= */

function startMusic() {

    if (musicStarted) return;

    bgMusic.volume = 0.42;

    bgMusic.play()
        .then(() => {

            musicStarted = true;

            musicButton.classList.add("playing");

        })
        .catch(() => {
            // Audio will start after another interaction.
        });
}

musicButton.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play().catch(() => {});

        musicButton.classList.add("playing");

    } else {

        bgMusic.pause();

        musicButton.classList.remove("playing");
    }
});


/* =========================================================
   SCENE SWITCHER
========================================================= */

function showScene(scene) {

    Object.values(scenes).forEach(currentScene => {

        currentScene.classList.add("hidden");
        currentScene.classList.remove("active");

    });

    scene.classList.remove("hidden");
    scene.classList.add("active");
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticle() {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.bottom =
        (-10 - Math.random() * 20) + "px";

    particle.style.animationDuration =
        (4 + Math.random() * 6) + "s";

    particle.style.animationDelay =
        Math.random() * 2 + "s";

    particle.style.opacity =
        0.3 + Math.random() * 0.7;

    document.getElementById("particles")
        .appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 10000);
}

setInterval(createParticle, 450);


/* =========================================================
   INTRO
========================================================= */

document
    .getElementById("wakeButton")
    .addEventListener("click", () => {

        startMusic();
        playSound(clickSound);

        showScene(scenes.tease);

    });


/* =========================================================
   TEASING POPUPS
========================================================= */

const teaseTitle =
    document.getElementById("teaseTitle");

const teaseText =
    document.getElementById("teaseText");

const teaseNext =
    document.getElementById("teaseNext");


const teaseMessages = [

    {
        title: "There you are...",
        text: "Come on sweetheart. I know you're awake."
    },

    {
        title: "You're late.",
        text: "To your own little party, of all things."
    },

    {
        title: "But I'll forgive you.",
        text: "Because I have something much more interesting planned."
    },

    {
        title: "It's time.",
        text: "Ready to find out how well you remember us?"
    }

];

let teaseIndex = 0;


teaseNext.addEventListener("click", () => {

    playSound(clickSound);

    teaseIndex++;

    if (teaseIndex < teaseMessages.length) {

        teaseTitle.style.opacity = "0";
        teaseText.style.opacity = "0";

        setTimeout(() => {

            teaseTitle.textContent =
                teaseMessages[teaseIndex].title;

            teaseText.textContent =
                teaseMessages[teaseIndex].text;

            teaseTitle.style.opacity = "1";
            teaseText.style.opacity = "1";

        }, 250);

    } else {

        showScene(scenes.ready);

    }

});


/* =========================================================
   READY
========================================================= */

document
    .getElementById("readyButton")
    .addEventListener("click", () => {

        playSound(whooshSound);

        showScene(scenes.wonderIntro);

        const content =
            document.querySelector(".wonder-intro-content");

        content.classList.remove("show");

        setTimeout(() => {
            content.classList.add("show");
        }, 150);

        setTimeout(() => {

            startQuiz();

        }, 5200);

    });


/* =========================================================
   QUIZ DATA
========================================================= */

/*
   IMPORTANT:

   These are the seven questions for now.
   You can change the questions and answers
   directly here without touching the HTML.
*/

const questions = [

    {
        wonder: "Great Wall",
        icon: "✦",
        question: "Who is more likely to remember a tiny detail from a conversation?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Petra",
        icon: "◆",
        question: "Who was more likely to start talking first?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Ritesh"
    },

    {
        wonder: "Colosseum",
        icon: "◇",
        question: "Who is more dramatic when something doesn't go their way?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Machu Picchu",
        icon: "✧",
        question: "Who is more likely to say 'I'm fine' when they clearly aren't?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Christ the Redeemer",
        icon: "✦",
        question: "Who would plan a surprise and then struggle to keep it secret?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Ritesh"
    },

    {
        wonder: "Chichén Itzá",
        icon: "◆",
        question: "Who would fall asleep first during a movie?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Taj Mahal",
        icon: "♥",
        question: "Who has the more special place in the other's heart?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    }

];


let currentQuestion = 0;
let score = 0;


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    showScene(scenes.quiz);

    loadQuestion();

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    const questionText =
        document.getElementById("questionText");

    const answersContainer =
        document.getElementById("answers");

    const wonderIcon =
        document.getElementById("wonderIcon");

    const wonderNumber =
        document.getElementById("wonderNumber");

    const counter =
        document.getElementById("questionCounter");

    const progress =
        document.getElementById("progressBar");

    const feedback =
        document.getElementById("answerFeedback");

    const nextButton =
        document.getElementById("nextQuestion");


    wonderIcon.textContent =
        question.icon;

    wonderNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    counter.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / 07`;

    questionText.textContent =
        question.question;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    feedback.textContent = "";

    nextButton.classList.remove("show");

    answersContainer.innerHTML = "";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer;

        button.addEventListener("click", () => {

            selectAnswer(button, answer);

        });

        answersContainer.appendChild(button);

    });

}


/* =========================================================
   ANSWER
========================================================= */

function selectAnswer(button, answer) {

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-button");

    buttons.forEach(btn => {

        btn.classList.add("disabled");

    });

    playSound(clickSound);


    if (answer === question.correct) {

        button.classList.add("correct");

        score++;

        document.getElementById("answerFeedback")
            .textContent =
            "I knew you'd remember that. ♥";

    } else {

        button.classList.add("wrong");

        document.getElementById("answerFeedback")
            .textContent =
            `Hmm... the answer was ${question.correct}.`;

        buttons.forEach(btn => {

            if (btn.textContent === question.correct) {
                btn.classList.add("correct");
            }

        });

    }

    document
        .getElementById("nextQuestion")
        .classList.add("show");

}


/* =========================================================
   NEXT QUESTION
========================================================= */

document
    .getElementById("nextQuestion")
    .addEventListener("click", () => {

        playSound(clickSound);

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    });


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

    showScene(scenes.taj);

    playSound(sparkleSound);

}


/* =========================================================
   TAJ CONTINUE
========================================================= */

document
    .getElementById("tajContinue")
    .addEventListener("click", () => {

        playSound(whooshSound);

        showScene(scenes.find);

    });


/* =========================================================
   FIND RITESH
========================================================= */

const hiddenStars =
    document.querySelectorAll(".hidden-star");

const foundMessage =
    document.getElementById("foundMessage");


hiddenStars.forEach(star => {

    star.addEventListener("click", () => {

        playSound(clickSound);

        const isCorrect =
            star.dataset.correct === "true";

        if (isCorrect) {

            playSound(sparkleSound);

            foundMessage.classList.add("show");

            star.style.opacity = "0";

            setTimeout(() => {

                showScene(scenes.dinnerIntro);

            }, 2500);

        } else {

            star.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)"
                    },
                    {
                        transform:
                            "translate(-50%, -50%) scale(1.5)"
                    },
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)"
                    }
                ],
                {
                    duration: 350
                }
            );

        }

    });

});


/* =========================================================
   DINNER START
========================================================= */

document
    .getElementById("dinnerStart")
    .addEventListener("click", () => {

        playSound(clickSound);

        showScene(scenes.dinner);

    });


/* =========================================================
   DINNER FOOD
========================================================= */

const foodData = {

    starter: {
        title: "The first bite",
        text: "For the beginning of every little adventure we've had."
    },

    main: {
        title: "For my beautiful lady",
        text: "Because ordinary dinners are boring when I can make one special for you."
    },

    dessert: {
        title: "Something sweet",
        text: "Although honestly... you're still sweeter."
    },

    drink: {
        title: "A little toast",
        text: "To everything we've already lived through — and everything still waiting for us."
    },

    secret: {
        title: "One last compliment",
        text: "I love how charismatic, interactive and full of life you are. You have a very special place in my life."
    }

};


const foodButtons =
    document.querySelectorAll(".food-bite");

const foodTitle =
    document.getElementById("foodTitle");

const foodText =
    document.getElementById("foodText");


foodButtons.forEach(button => {

    button.addEventListener("click", () => {

        playSound(clickSound);

        const food =
            button.dataset.food;

        const data =
            foodData[food];

        foodTitle.textContent =
            data.title;

        foodText.textContent =
            data.text;

        button.style.transform =
            "scale(0.7)";

        setTimeout(() => {

            button.style.transform =
                "scale(1)";

        }, 250);

    });

});


/* =========================================================
   DINNER COMPLETION
========================================================= */

let dinnerItemsClicked = new Set();

foodButtons.forEach(button => {

    button.addEventListener("click", () => {

        dinnerItemsClicked.add(
            button.dataset.food
        );

        if (dinnerItemsClicked.size === 5) {

            setTimeout(() => {

                startCurtainSequence();

            }, 1400);

        }

    });

});


/* =========================================================
   CURTAIN SEQUENCE
========================================================= */

function startCurtainSequence() {

    playSound(whooshSound);

    showScene(scenes.curtain);

    /*
        Curtains close for 2.5 seconds.
        Then the center goes black.
        Then Page 4's final transition begins.
    */

    setTimeout(() => {

        startMemoryTransition();

    }, 5800);

}


/* =========================================================
   TIME TO LOOK AT US
========================================================= */

function startMemoryTransition() {

    bgMusic.volume = 0.15;

    showScene(scenes.memory);

    setTimeout(() => {

        bgMusic.volume = 0.05;

    }, 1200);

}


/* =========================================================
   GO TO PAGE 5
========================================================= */

document
    .getElementById("memoryGo")
    .addEventListener("click", () => {

        playSound(whooshSound);

        /*
            CHANGE THIS FILE NAME IF YOUR PAGE 5
            FILE HAS A DIFFERENT NAME.
        */

        window.location.href = "page5.html";

    });


/* =========================================================
   INITIAL SETUP
========================================================= */

document.addEventListener("click", () => {

    startMusic();

}, {
    once: true
});


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            bgMusic.pause();

            musicButton.classList.remove("playing");

        }

    }
);

"use strict";

/* =========================================================
   PAGE 4 — OUR LITTLE STORY
   FINAL MATCHED JAVASCRIPT
========================================================= */


/* =========================================================
   AUDIO
========================================================= */

const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const whooshSound = document.getElementById("whooshSound");
const sparkleSound = document.getElementById("sparkleSound");
const musicButton = document.getElementById("musicButton");


function playSound(audio, volume = 0.6) {

    if (!audio) return;

    audio.volume = volume;
    audio.currentTime = 0;

    const promise = audio.play();

    if (promise !== undefined) {
        promise.catch(() => {});
    }
}


function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.4;

    const promise = bgMusic.play();

    if (promise !== undefined) {
        promise.catch(() => {});
    }

    if (musicButton) {
        musicButton.classList.add("playing");
    }
}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicButton) {

    musicButton.addEventListener("click", function () {

        if (bgMusic.paused) {

            startMusic();

        } else {

            bgMusic.pause();

            musicButton.classList.remove("playing");

        }

    });

}


/* =========================================================
   SCENES
========================================================= */

const scenes = document.querySelectorAll(".scene");


function showScene(id) {

    scenes.forEach(function (scene) {

        scene.classList.remove("active");
        scene.classList.add("hidden");

    });


    const target = document.getElementById(id);

    if (!target) {

        console.error("Scene not found:", id);
        return;

    }


    target.classList.remove("hidden");
    target.classList.add("active");

}


/* =========================================================
   INITIAL STATE
========================================================= */

showScene("introScene");


/* =========================================================
   WAKE UP
========================================================= */

const wakeButton =
    document.getElementById("wakeButton");


if (wakeButton) {

    wakeButton.addEventListener("click", function () {

        /* Start music AFTER user interaction */
        startMusic();

        /* Click sound */
        playSound(clickSound, 0.75);

        /* Move to first teasing popup */
        showScene("teaseScene");

    });

}


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


if (teaseNext) {

    teaseNext.addEventListener("click", function () {

        playSound(clickSound, 0.65);

        teaseIndex++;


        if (teaseIndex < teaseMessages.length) {

            teaseTitle.textContent =
                teaseMessages[teaseIndex].title;

            teaseText.textContent =
                teaseMessages[teaseIndex].text;

            /*
             * Restart popup animation
             */
            const popup =
                document.getElementById("teasePopup");

            if (popup) {

                popup.style.animation = "none";

                void popup.offsetWidth;

                popup.style.animation =
                    "popupIn 0.8s cubic-bezier(.2,.8,.2,1)";

            }

        } else {

            showScene("readyScene");

        }

    });

}


/* =========================================================
   READY
========================================================= */

const readyButton =
    document.getElementById("readyButton");


if (readyButton) {

    readyButton.addEventListener("click", function () {

        playSound(clickSound, 0.6);

        playSound(whooshSound, 0.65);

        showScene("wonderIntro");


        const wonderContent =
            document.querySelector(".wonder-intro-content");


        if (wonderContent) {

            wonderContent.classList.remove("show");

            void wonderContent.offsetWidth;

            wonderContent.classList.add("show");

        }


        /*
         * Give the "7 memories / 7 wonders"
         * sequence time to play.
         */
        setTimeout(function () {

            startQuiz();

        }, 5000);

    });

}


/* =========================================================
   QUIZ DATA
========================================================= */

const questions = [

    {
        icon: "✦",
        question:
            "Who is more likely to remember a tiny detail from a conversation?",
        answers: ["Ritesh", "Tisha"],
        correct: "Tisha"
    },

    {
        icon: "◆",
        question:
            "Who is more likely to plan a surprise and struggle to keep it secret?",
        answers: ["Ritesh", "Tisha"],
        correct: "Ritesh"
    },

    {
        icon: "◇",
        question:
            "Who is more likely to fall asleep first?",
        answers: ["Ritesh", "Tisha"],
        correct: "Tisha"
    },

    {
        icon: "✧",
        question:
            "Who is more likely to say 'I'm fine' when they clearly aren't?",
        answers: ["Ritesh", "Tisha"],
        correct: "Tisha"
    },

    {
        icon: "✦",
        question:
            "Who is more likely to turn a simple moment into an adventure?",
        answers: ["Ritesh", "Tisha"],
        correct: "Ritesh"
    },

    {
        icon: "◆",
        question:
            "Who is more likely to remember a special place?",
        answers: ["Ritesh", "Tisha"],
        correct: "Tisha"
    },

    {
        icon: "♥",
        question:
            "Who has a very special place in the other's heart?",
        answers: ["Ritesh", "Tisha"],
        correct: "Tisha"
    }

];


let currentQuestion = 0;


/* =========================================================
   START QUIZ
========================================================= */

function startQuiz() {

    currentQuestion = 0;

    showScene("quizScene");

    loadQuestion();

}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    if (!question) return;


    const icon =
        document.getElementById("wonderIcon");

    const number =
        document.getElementById("wonderNumber");

    const counter =
        document.getElementById("questionCounter");

    const progress =
        document.getElementById("progressBar");

    const text =
        document.getElementById("questionText");

    const answers =
        document.getElementById("answers");

    const feedback =
        document.getElementById("answerFeedback");

    const next =
        document.getElementById("nextQuestion");


    icon.textContent =
        question.icon;

    number.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    counter.textContent =
        String(currentQuestion + 1).padStart(2, "0")
        + " / "
        + String(questions.length).padStart(2, "0");


    progress.style.width =
        ((currentQuestion + 1) /
        questions.length * 100) + "%";


    text.textContent =
        question.question;


    answers.innerHTML = "";

    feedback.textContent = "";

    next.classList.remove("show");


    question.answers.forEach(function (answer) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "answer-button";

        button.textContent =
            answer;


        button.addEventListener("click", function () {

            answerQuestion(button, answer);

        });


        answers.appendChild(button);

    });

}


/* =========================================================
   ANSWER
========================================================= */

function answerQuestion(button, answer) {

    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(".answer-button");


    buttons.forEach(function (item) {

        item.classList.add("disabled");

    });


    playSound(clickSound, 0.55);


    if (answer === question.correct) {

        button.classList.add("correct");

        document.getElementById(
            "answerFeedback"
        ).textContent =
            "I knew you'd remember that. ♥";

    } else {

        button.classList.add("wrong");


        document.getElementById(
            "answerFeedback"
        ).textContent =
            "Not quite... the answer was "
            + question.correct
            + ".";


        buttons.forEach(function (item) {

            if (item.textContent === question.correct) {

                item.classList.add("correct");

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

const nextQuestion =
    document.getElementById("nextQuestion");


if (nextQuestion) {

    nextQuestion.addEventListener("click", function () {

        playSound(clickSound, 0.55);

        currentQuestion++;


        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showTaj();

        }

    });

}


/* =========================================================
   TAJ MAHAL
========================================================= */

function showTaj() {

    showScene("tajScene");

    playSound(sparkleSound, 0.8);

}


const tajContinue =
    document.getElementById("tajContinue");


if (tajContinue) {

    tajContinue.addEventListener("click", function () {

        playSound(clickSound, 0.55);

        playSound(whooshSound, 0.6);

        showScene("findScene");

    });

}


/* =========================================================
   FIND RITESH
========================================================= */

const hiddenStars =
    document.querySelectorAll(".hidden-star");

const foundMessage =
    document.getElementById("foundMessage");


hiddenStars.forEach(function (star) {

    star.addEventListener("click", function () {

        const isCorrect =
            star.dataset.correct === "true";


        playSound(clickSound, 0.45);


        if (!isCorrect) {

            return;

        }


        playSound(sparkleSound, 0.85);


        star.style.opacity = "0";

        foundMessage.classList.add("show");


        setTimeout(function () {

            showScene("dinnerIntro");

        }, 1800);

    });

});


/* =========================================================
   DINNER INTRO
========================================================= */

const dinnerStart =
    document.getElementById("dinnerStart");


if (dinnerStart) {

    dinnerStart.addEventListener("click", function () {

        playSound(clickSound, 0.55);

        showScene("dinnerScene");

    });

}


/* =========================================================
   DINNER FOOD
========================================================= */

const foodData = {

    starter: {

        title: "The first bite",

        text:
            "For the beginning of every little adventure we've had."

    },

    main: {

        title: "For my beautiful lady",

        text:
            "Because ordinary dinners are boring when I can make one special for you."

    },

    dessert: {

        title: "Something sweet",

        text:
            "Although honestly... you're still sweeter."

    },

    drink: {

        title: "A little toast",

        text:
            "To everything we've already lived through — and everything still waiting for us."

    },

    secret: {

        title: "One last compliment",

        text:
            "I love how charismatic, interactive and full of life you are. You have a very special place in my life."

    }

};


const foodButtons =
    document.querySelectorAll(".food-bite");


const foodTitle =
    document.getElementById("foodTitle");


const foodText =
    document.getElementById("foodText");


const clickedFoods =
    new Set();


foodButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const type =
            button.dataset.food;


        const data =
            foodData[type];


        if (!data) return;


        playSound(clickSound, 0.55);


        foodTitle.textContent =
            data.title;


        foodText.textContent =
            data.text;


        clickedFoods.add(type);


        button.style.transform =
            "scale(0.78)";


        setTimeout(function () {

            button.style.transform =
                "";

        }, 220);


        if (clickedFoods.size === 5) {

            setTimeout(function () {

                startCurtainTransition();

            }, 1000);

        }

    });

});


/* =========================================================
   CURTAINS
========================================================= */

let curtainsStarted = false;


function startCurtainTransition() {

    if (curtainsStarted) return;

    curtainsStarted = true;


    playSound(whooshSound, 0.75);


    showScene("curtainScene");


    /*
     * Curtains close for 2.5 seconds.
     *
     * Then we keep the screen dark
     * for another 2 seconds.
     *
     * Then the heart appears.
     */


    setTimeout(function () {

        showMemoryTransition();

    }, 4500);

}


/* =========================================================
   MEMORY TRANSITION
========================================================= */

function showMemoryTransition() {

    showScene("memoryTransition");


    if (bgMusic) {

        /*
         * Softly lower the music
         */
        bgMusic.volume = 0.12;

    }

}


/* =========================================================
   GO TO PAGE 5
========================================================= */

const memoryGo =
    document.getElementById("memoryGo");


if (memoryGo) {

    memoryGo.addEventListener("click", function () {

        playSound(clickSound, 0.55);

        playSound(whooshSound, 0.65);


        /*
         * Small fade before Page 5
         */

        const transition =
            document.getElementById("memoryTransition");


        if (transition) {

            transition.style.transition =
                "opacity 0.8s ease";

            transition.style.opacity = "0";

        }


        setTimeout(function () {

            window.location.href =
                "page5.html";

        }, 800);

    });

}


/* =========================================================
   OPTIONAL FLOATING PARTICLES
========================================================= */

const particleContainer =
    document.getElementById("particles");


function createParticle() {

    if (!particleContainer) return;


    const particle =
        document.createElement("div");


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        (80 + Math.random() * 20) + "%";


    particle.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    particleContainer.appendChild(particle);


    setTimeout(function () {

        particle.remove();

    }, 10000);

}


setInterval(createParticle, 900);


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "✓ Page 4 JavaScript loaded successfully"
);

console.log(
    "✓ Audio elements detected:",
    {
        bgMusic: !!bgMusic,
        clickSound: !!clickSound,
        whooshSound: !!whooshSound,
        sparkleSound: !!sparkleSound
    }
);

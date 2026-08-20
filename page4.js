/* =========================================================
   PAGE 4 - OPTIMIZED JAVASCRIPT
========================================================= */

"use strict";

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


/* =========================================================
   SAFE AUDIO
========================================================= */

function playAudio(audio, volume = 1) {

    if (!audio) return;

    try {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;

        const promise = audio.play();

        if (promise) {
            promise.catch(() => {});
        }

    } catch (error) {
        console.log("Audio unavailable.");
    }
}


/* =========================================================
   MUSIC
========================================================= */

let musicPlaying = false;

function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.4;

    const promise = bgMusic.play();

    if (promise) {

        promise
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add("playing");

            })
            .catch(() => {});

    }
}


musicButton.addEventListener("click", function () {

    if (bgMusic.paused) {

        startMusic();

    } else {

        bgMusic.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

    }

});


/* =========================================================
   RELIABLE SCENE SWITCH
========================================================= */

function showScene(scene) {

    if (!scene) return;

    Object.values(scenes).forEach(function (currentScene) {

        if (!currentScene) return;

        currentScene.classList.add("hidden");
        currentScene.classList.remove("active");

    });

    scene.classList.remove("hidden");
    scene.classList.add("active");

}


/* =========================================================
   SMALL PARTICLES
========================================================= */

function createParticle() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.bottom =
        "-10px";

    particle.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    container.appendChild(particle);

    setTimeout(function () {

        particle.remove();

    }, 10000);

}

setInterval(createParticle, 700);


/* =========================================================
   1. WAKE UP
========================================================= */

const wakeButton =
    document.getElementById("wakeButton");


wakeButton.addEventListener("click", function () {

    console.log("Wake button clicked.");

    startMusic();

    playAudio(clickSound, 0.7);

    showScene(scenes.tease);

});


/* =========================================================
   2. TEASING POPUPS
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


teaseNext.addEventListener("click", function () {

    playAudio(clickSound, 0.7);

    teaseIndex++;

    if (teaseIndex < teaseMessages.length) {

        teaseTitle.textContent =
            teaseMessages[teaseIndex].title;

        teaseText.textContent =
            teaseMessages[teaseIndex].text;

        /*
           Restart popup animation.
        */

        const popup =
            document.getElementById("teasePopup");

        popup.style.animation = "none";

        void popup.offsetWidth;

        popup.style.animation =
            "popupIn 0.8s cubic-bezier(.2,.8,.2,1)";

    } else {

        showScene(scenes.ready);

    }

});


/* =========================================================
   3. READY
========================================================= */

const readyButton =
    document.getElementById("readyButton");


readyButton.addEventListener("click", function () {

    playAudio(whooshSound, 0.6);

    showScene(scenes.wonderIntro);

    const content =
        document.querySelector(".wonder-intro-content");

    content.classList.remove("show");

    void content.offsetWidth;

    content.classList.add("show");

    /*
       Short cinematic pause.
       Not an unnecessary long JS delay.
    */

    setTimeout(function () {

        startQuiz();

    }, 3800);

});


/* =========================================================
   4. QUIZ DATA
========================================================= */

const questions = [

    {
        wonder: "Great Wall",
        icon: "✦",
        question:
            "Who is more likely to remember a tiny detail from a conversation?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Petra",
        icon: "◆",
        question:
            "Who was more likely to start talking first?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Ritesh"
    },

    {
        wonder: "Colosseum",
        icon: "◇",
        question:
            "Who is more dramatic when something doesn't go their way?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Machu Picchu",
        icon: "✧",
        question:
            "Who is more likely to say 'I'm fine' when they clearly aren't?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Christ the Redeemer",
        icon: "✦",
        question:
            "Who would plan a surprise and then struggle to keep it secret?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Ritesh"
    },

    {
        wonder: "Chichén Itzá",
        icon: "◆",
        question:
            "Who would fall asleep first during a movie?",
        answers: [
            "Ritesh",
            "Tisha"
        ],
        correct: "Tisha"
    },

    {
        wonder: "Taj Mahal",
        icon: "♥",
        question:
            "Who has the more special place in the other's heart?",
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
   5. START QUIZ
========================================================= */

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    showScene(scenes.quiz);

    loadQuestion();

}


/* =========================================================
   6. LOAD QUESTION
========================================================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    if (!question) return;


    const questionText =
        document.getElementById("questionText");

    const answers =
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
        String(currentQuestion + 1).padStart(2, "0")
        + " / "
        + String(questions.length).padStart(2, "0");

    questionText.textContent =
        question.question;

    progress.style.width =
        ((currentQuestion + 1) /
        questions.length * 100) + "%";

    feedback.textContent = "";

    nextButton.classList.remove("show");

    answers.innerHTML = "";


    question.answers.forEach(function (answer) {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.type =
            "button";

        button.textContent =
            answer;

        button.addEventListener("click", function () {

            selectAnswer(button, answer);

        });

        answers.appendChild(button);

    });

}


/* =========================================================
   7. SELECT ANSWER
========================================================= */

function selectAnswer(button, answer) {

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-button");


    /*
       Prevent multiple clicks.
    */

    buttons.forEach(function (btn) {

        btn.classList.add("disabled");

    });


    playAudio(clickSound, 0.6);


    if (answer === question.correct) {

        button.classList.add("correct");

        score++;

        document.getElementById(
            "answerFeedback"
        ).textContent =
            "I knew you'd remember that. ♥";

    } else {

        button.classList.add("wrong");

        document.getElementById(
            "answerFeedback"
        ).textContent =
            "Hmm... the answer was "
            + question.correct
            + ".";


        buttons.forEach(function (btn) {

            if (
                btn.textContent ===
                question.correct
            ) {

                btn.classList.add("correct");

            }

        });

    }


    document
        .getElementById("nextQuestion")
        .classList.add("show");

}


/* =========================================================
   8. NEXT QUESTION
========================================================= */

document
    .getElementById("nextQuestion")
    .addEventListener("click", function () {

        playAudio(clickSound, 0.6);

        currentQuestion++;

        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    });


/* =========================================================
   9. FINISH QUIZ
========================================================= */

function finishQuiz() {

    showScene(scenes.taj);

    playAudio(sparkleSound, 0.7);

}


/* =========================================================
   10. TAJ MAHAL → FIND RITESH
========================================================= */

document
    .getElementById("tajContinue")
    .addEventListener("click", function () {

        playAudio(whooshSound, 0.6);

        showScene(scenes.find);

    });


/* =========================================================
   11. FIND RITESH
========================================================= */

const hiddenStars =
    document.querySelectorAll(".hidden-star");

const foundMessage =
    document.getElementById("foundMessage");


hiddenStars.forEach(function (star) {

    star.addEventListener("click", function () {

        const correct =
            star.dataset.correct === "true";


        if (correct) {

            playAudio(sparkleSound, 0.8);

            star.style.opacity = "0";

            foundMessage.classList.add("show");


            setTimeout(function () {

                showScene(scenes.dinnerIntro);

            }, 1800);


        } else {

            playAudio(clickSound, 0.4);

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
   12. DINNER INTRO
========================================================= */

document
    .getElementById("dinnerStart")
    .addEventListener("click", function () {

        playAudio(clickSound, 0.6);

        showScene(scenes.dinner);

    });


/* =========================================================
   13. DINNER DATA
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


let dinnerItemsClicked =
    new Set();


foodButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const food =
            button.dataset.food;

        const data =
            foodData[food];


        playAudio(clickSound, 0.5);


        foodTitle.textContent =
            data.title;

        foodText.textContent =
            data.text;


        dinnerItemsClicked.add(food);


        button.style.transform =
            "scale(0.75)";


        setTimeout(function () {

            button.style.transform =
                "scale(1)";

        }, 200);


        /*
           All five discovered.
        */

        if (
            dinnerItemsClicked.size === 5
        ) {

            setTimeout(function () {

                startCurtainSequence();

            }, 900);

        }

    });

});


/* =========================================================
   14. CURTAIN SEQUENCE
========================================================= */

let curtainStarted = false;


function startCurtainSequence() {

    if (curtainStarted) return;

    curtainStarted = true;


    playAudio(whooshSound, 0.7);

    showScene(scenes.curtain);


    /*
       Let the curtains close,
       then move to the final transition.
    */

    setTimeout(function () {

        startMemoryTransition();

    }, 4300);

}


/* =========================================================
   15. MEMORY TRANSITION
========================================================= */

function startMemoryTransition() {

    showScene(scenes.memory);


    /*
       Slowly lower music.
    */

    if (bgMusic) {

        bgMusic.volume = 0.18;

        setTimeout(function () {

            bgMusic.volume = 0.06;

        }, 1200);

    }

}


/* =========================================================
   16. GO TO PAGE 5
========================================================= */

document
    .getElementById("memoryGo")
    .addEventListener("click", function () {

        playAudio(whooshSound, 0.6);

        /*
           Your Page 5 file.
        */

        window.location.href =
            "page5.html";

    });


/* =========================================================
   INITIAL STATE
========================================================= */

showScene(scenes.intro);

console.log(
    "Page 4 loaded successfully."
);

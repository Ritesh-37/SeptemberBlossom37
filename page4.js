"use strict";

/* =====================================================
   PAGE 4
   OUR LITTLE STORY
===================================================== */


/* =====================================================
   AUDIO
===================================================== */

const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const whooshSound = document.getElementById("whooshSound");
const sparkleSound = document.getElementById("sparkleSound");

const musicButton =
    document.getElementById("musicButton");


function playAudio(audio, volume) {

    if (!audio) {
        return;
    }

    audio.volume = volume;

    audio.currentTime = 0;

    const promise = audio.play();

    if (promise) {
        promise.catch(function () {});
    }
}


function startMusic() {

    if (!bgMusic) {
        return;
    }

    bgMusic.volume = 0.38;

    const promise =
        bgMusic.play();

    if (promise) {
        promise.catch(function () {});
    }

    if (musicButton) {
        musicButton.classList.add("playing");
    }
}


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener(
    "click",
    function () {

        if (bgMusic.paused) {

            startMusic();

        } else {

            bgMusic.pause();

            musicButton.classList.remove("playing");

        }

    }
);


/* =====================================================
   SCENE SYSTEM
===================================================== */

const scenes =
    document.querySelectorAll(".scene");


function showScene(id) {

    scenes.forEach(function (scene) {

        scene.classList.remove("active");

    });


    const scene =
        document.getElementById(id);


    if (!scene) {

        console.error(
            "Scene does not exist:",
            id
        );

        return;

    }


    scene.classList.add("active");

}


/* =====================================================
   START
===================================================== */

showScene("introScene");


/* =====================================================
   WAKE UP
===================================================== */

const wakeButton =
    document.getElementById("wakeButton");


wakeButton.addEventListener(
    "click",
    function () {

        /*
         * FIRST USER INTERACTION
         *
         * BGM starts here.
         */

        startMusic();

        playAudio(
            clickSound,
            0.75
        );


        showScene("teaseScene");

    }
);


/* =====================================================
   TEASING
===================================================== */

const teaseTitle =
    document.getElementById("teaseTitle");

const teaseText =
    document.getElementById("teaseText");

const teaseNext =
    document.getElementById("teaseNext");

const teasePopup =
    document.getElementById("teasePopup");


const teaseMessages = [

    {
        title: "There you are...",
        text:
            "Come on sweetheart. I know you're awake."
    },

    {
        title: "You're late.",
        text:
            "To your own little party, of all things."
    },

    {
        title: "But I'll forgive you.",
        text:
            "Because I have something much more interesting planned."
    },

    {
        title: "It's time.",
        text:
            "Ready to find out how well you remember us?"
    }

];


let teaseIndex = 0;


teaseNext.addEventListener(
    "click",
    function () {

        playAudio(
            clickSound,
            0.65
        );


        teaseIndex++;


        if (
            teaseIndex <
            teaseMessages.length
        ) {

            teaseTitle.textContent =
                teaseMessages[teaseIndex].title;

            teaseText.textContent =
                teaseMessages[teaseIndex].text;


            /*
             * Restart popup animation
             */

            teasePopup.style.animation =
                "none";

            void teasePopup.offsetWidth;

            teasePopup.style.animation =
                "popupIn 0.8s ease";

        } else {

            showScene("readyScene");

        }

    }
);


/* =====================================================
   READY
===================================================== */

const readyButton =
    document.getElementById("readyButton");


readyButton.addEventListener(
    "click",
    function () {

        playAudio(
            clickSound,
            0.55
        );

        playAudio(
            whooshSound,
            0.65
        );


        showScene("wonderIntro");


        /*
         * Wait for the 7 wonders sequence.
         */

        setTimeout(
            function () {

                startQuiz();

            },
            5000
        );

    }
);


/* =====================================================
   QUIZ DATA
===================================================== */

const questions = [

    {
        icon: "✦",

        text:
            "Who is more likely to remember a tiny detail from a conversation?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Tisha"
    },


    {
        icon: "◆",

        text:
            "Who is more likely to plan a surprise and struggle to keep it secret?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Ritesh"
    },


    {
        icon: "◇",

        text:
            "Who is more likely to fall asleep first?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Tisha"
    },


    {
        icon: "✧",

        text:
            "Who is more likely to say 'I'm fine' when they clearly aren't?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Tisha"
    },


    {
        icon: "✦",

        text:
            "Who is more likely to turn a simple moment into an adventure?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Ritesh"
    },


    {
        icon: "◆",

        text:
            "Who is more likely to remember a special place?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Tisha"
    },


    {
        icon: "♥",

        text:
            "Who has a very special place in the other's heart?",

        answers:
            ["Ritesh", "Tisha"],

        correct:
            "Tisha"
    }

];


let currentQuestion = 0;


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz() {

    currentQuestion = 0;

    showScene("quizScene");

    loadQuestion();

}


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    const wonderIcon =
        document.getElementById("wonderIcon");

    const wonderNumber =
        document.getElementById("wonderNumber");

    const counter =
        document.getElementById("questionCounter");

    const progress =
        document.getElementById("progressBar");

    const questionText =
        document.getElementById("questionText");

    const answers =
        document.getElementById("answers");

    const feedback =
        document.getElementById("answerFeedback");

    const next =
        document.getElementById("nextQuestion");


    wonderIcon.textContent =
        question.icon;


    wonderNumber.textContent =
        String(
            currentQuestion + 1
        ).padStart(2, "0");


    counter.textContent =
        String(
            currentQuestion + 1
        ).padStart(2, "0")
        +
        " / "
        +
        String(
            questions.length
        ).padStart(2, "0");


    progress.style.width =
        (
            (
                currentQuestion + 1
            )
            /
            questions.length
            *
            100
        )
        + "%";


    questionText.textContent =
        question.text;


    answers.innerHTML = "";

    feedback.textContent = "";

    next.classList.remove("show");


    question.answers.forEach(
        function (answer) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                function () {

                    answerQuestion(
                        button,
                        answer
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   ANSWER
===================================================== */

function answerQuestion(
    selectedButton,
    answer
) {

    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button) {

            button.classList.add(
                "disabled"
            );

        }
    );


    playAudio(
        clickSound,
        0.5
    );


    if (
        answer ===
        question.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );


        document.getElementById(
            "answerFeedback"
        ).textContent =
            "I knew you'd remember that. ♥";


    } else {

        selectedButton.classList.add(
            "wrong"
        );


        document.getElementById(
            "answerFeedback"
        ).textContent =
            "Not quite... the answer was "
            +
            question.correct
            +
            ".";


        buttons.forEach(
            function (button) {

                if (
                    button.textContent ===
                    question.correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    document
        .getElementById(
            "nextQuestion"
        )
        .classList.add("show");

}


/* =====================================================
   NEXT QUESTION
===================================================== */

document
    .getElementById("nextQuestion")
    .addEventListener(
        "click",
        function () {

            playAudio(
                clickSound,
                0.5
            );


            currentQuestion++;


            if (
                currentQuestion <
                questions.length
            ) {

                loadQuestion();

            } else {

                showTaj();

            }

        }
    );


/* =====================================================
   TAJ
===================================================== */

function showTaj() {

    showScene("tajScene");

    playAudio(
        sparkleSound,
        0.8
    );

}


document
    .getElementById("tajContinue")
    .addEventListener(
        "click",
        function () {

            playAudio(
                clickSound,
                0.5
            );

            playAudio(
                whooshSound,
                0.6
            );

            showScene("findScene");

        }
    );


/* =====================================================
   FIND RITESH
===================================================== */

const stars =
    document.querySelectorAll(
        ".hidden-star"
    );


let foundRitesh = false;


stars.forEach(
    function (star) {

        star.addEventListener(
            "click",
            function () {

                playAudio(
                    clickSound,
                    0.45
                );


                const correct =
                    star.dataset.correct ===
                    "true";


                if (!correct) {

                    return;

                }


                if (foundRitesh) {

                    return;

                }


                foundRitesh = true;


                playAudio(
                    sparkleSound,
                    0.85
                );


                star.style.opacity =
                    "0";


                document
                    .getElementById(
                        "foundMessage"
                    )
                    .classList.add(
                        "show"
                    );


                setTimeout(
                    function () {

                        showScene(
                            "dinnerIntro"
                        );

                    },
                    1800
                );

            }
        );

    }
);


/* =====================================================
   DINNER INTRO
===================================================== */

document
    .getElementById("dinnerStart")
    .addEventListener(
        "click",
        function () {

            playAudio(
                clickSound,
                0.55
            );

            showScene(
                "dinnerScene"
            );

        }
    );


/* =====================================================
   DINNER
===================================================== */

const foodData = {

    starter: {

        title:
            "The first bite",

        text:
            "For the beginning of every little adventure we've had."

    },


    main: {

        title:
            "For my beautiful lady",

        text:
            "Because ordinary dinners are boring when I can make one special for you."

    },


    dessert: {

        title:
            "Something sweet",

        text:
            "Although honestly... you're still sweeter."

    },


    drink: {

        title:
            "A little toast",

        text:
            "To everything we've already lived through — and everything still waiting for us."

    },


    secret: {

        title:
            "One last compliment",

        text:
            "I love how charismatic, interactive and full of life you are. You have a very special place in my life."

    }

};


const foodButtons =
    document.querySelectorAll(
        ".food-bite"
    );


const foodTitle =
    document.getElementById(
        "foodTitle"
    );


const foodText =
    document.getElementById(
        "foodText"
    );


const clickedFoods =
    new Set();


foodButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const type =
                    button.dataset.food;


                const data =
                    foodData[type];


                if (!data) {

                    return;

                }


                playAudio(
                    clickSound,
                    0.55
                );


                foodTitle.textContent =
                    data.title;


                foodText.textContent =
                    data.text;


                clickedFoods.add(
                    type
                );


                button.style.transform =
                    "scale(0.75)";


                setTimeout(
                    function () {

                        button.style.transform =
                            "";

                    },
                    220
                );


                /*
                 * All five have been discovered.
                 */

                if (
                    clickedFoods.size ===
                    5
                ) {

                    setTimeout(
                        function () {

                            closeCurtains();

                        },
                        1000
                    );

                }

            }
        );

    }
);


/* =====================================================
   CURTAINS
===================================================== */

let curtainsClosed =
    false;


function closeCurtains() {

    if (curtainsClosed) {

        return;

    }


    curtainsClosed = true;


    playAudio(
        whooshSound,
        0.75
    );


    showScene(
        "curtainScene"
    );


    /*
     * 2.5 sec curtains close
     *
     * then 2 sec darkness
     *
     * then memory screen
     */

    setTimeout(
        function () {

            showScene(
                "memoryTransition"
            );


            if (bgMusic) {

                bgMusic.volume =
                    0.12;

            }

        },
        4500
    );

}


/* =====================================================
   MEMORY TRANSITION
===================================================== */

document
    .getElementById("memoryGo")
    .addEventListener(
        "click",
        function () {

            playAudio(
                clickSound,
                0.55
            );

            playAudio(
                whooshSound,
                0.65
            );


            const memoryScreen =
                document.getElementById(
                    "memoryTransition"
                );


            memoryScreen.style.transition =
                "opacity 0.8s ease";


            memoryScreen.style.opacity =
                "0";


            setTimeout(
                function () {

                    /*
                     * Page 5
                     */

                    window.location.href =
                        "page5.html";

                },
                800
            );

        }
    );


/* =====================================================
   FLOATING PARTICLES
===================================================== */

const particleContainer =
    document.getElementById(
        "particles"
    );


function createParticle() {

    if (!particleContainer) {

        return;

    }


    const particle =
        document.createElement(
            "div"
        );


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100
        + "%";


    particle.style.top =
        (80 + Math.random() * 20)
        + "%";


    particle.style.animationDuration =
        (5 + Math.random() * 5)
        + "s";


    particleContainer.appendChild(
        particle
    );


    setTimeout(
        function () {

            particle.remove();

        },
        10000
    );

}


setInterval(
    createParticle,
    1000
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "PAGE 4 READY"
);

console.log(
    "Wake button:",
    !!wakeButton
);

console.log(
    "BGM:",
    !!bgMusic
);

console.log(
    "Click sound:",
    !!clickSound
);

console.log(
    "Whoosh:",
    !!whooshSound
);

console.log(
    "Sparkle:",
    !!sparkleSound
);

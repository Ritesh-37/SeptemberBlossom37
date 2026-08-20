/* ============================================================
   PAGE 4
   PREMIUM ROMANTIC MEMORY EXPERIENCE

   IMPORTANT:
   Q6's fourth option is intentionally isolated here because
   that "never visited" Patna location was not confirmed yet.

   Replace ONLY the text inside Q6_UNVISITED_PLACE.
============================================================ */


/* ============================================================
   AUDIO ENGINE
   No external audio files required.
============================================================ */

let audioContext = null;

let masterGain = null;
let musicGain = null;

let musicRunning = false;
let musicMuted = false;

let musicNodes = [];
let musicTimer = null;


/* ============================================================
   INITIALIZE AUDIO
============================================================ */

function initAudio() {

    if (audioContext) {
        return;
    }

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    audioContext =
        new AudioContextClass();

    masterGain =
        audioContext.createGain();

    musicGain =
        audioContext.createGain();

    masterGain.gain.value = 0.8;

    musicGain.gain.value = 0.045;

    musicGain.connect(masterGain);

    masterGain.connect(
        audioContext.destination
    );
}


/* ============================================================
   RESUME AUDIO
============================================================ */

async function resumeAudio() {

    initAudio();

    if (!audioContext) {
        return;
    }

    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }
}


/* ============================================================
   GENERIC TONE
============================================================ */

function playTone(
    frequency,
    duration = 0.15,
    type = "sine",
    volume = 0.06,
    startDelay = 0
) {

    if (!audioContext || musicMuted) {
        return;
    }

    const now =
        audioContext.currentTime +
        startDelay;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        now
    );

    gain.gain.setValueAtTime(
        0.0001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        now + 0.015
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + duration
    );

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(now);
    oscillator.stop(
        now + duration + 0.03
    );
}


/* ============================================================
   AIRY WAKE TAP
============================================================ */

function wakeTap() {

    resumeAudio();

    playTone(
        540,
        0.08,
        "sine",
        0.035
    );

    playTone(
        760,
        0.13,
        "sine",
        0.018,
        0.035
    );
}


/* ============================================================
   MAGICAL CHIME
============================================================ */

function magicalChime() {

    resumeAudio();

    playTone(
        660,
        0.65,
        "sine",
        0.055
    );

    playTone(
        880,
        0.72,
        "sine",
        0.045,
        0.08
    );

    playTone(
        1320,
        0.85,
        "sine",
        0.025,
        0.18
    );
}


/* ============================================================
   GLASS CHIME
============================================================ */

function glassChime() {

    resumeAudio();

    playTone(
        780,
        0.35,
        "sine",
        0.035
    );

    playTone(
        1040,
        0.48,
        "sine",
        0.028,
        0.08
    );

    playTone(
        1560,
        0.55,
        "sine",
        0.018,
        0.15
    );
}


/* ============================================================
   WRONG ANSWER
============================================================ */

function wrongSound() {

    resumeAudio();

    playTone(
        180,
        0.14,
        "triangle",
        0.045
    );

    playTone(
        130,
        0.18,
        "triangle",
        0.03,
        0.06
    );
}


/* ============================================================
   CORRECT SOUND
============================================================ */

function correctSound() {

    resumeAudio();

    playTone(
        523.25,
        0.22,
        "sine",
        0.04
    );

    playTone(
        659.25,
        0.28,
        "sine",
        0.04,
        0.08
    );

    playTone(
        783.99,
        0.45,
        "sine",
        0.035,
        0.16
    );
}


/* ============================================================
   RISING CHIME
============================================================ */

function risingChime() {

    resumeAudio();

    playTone(
        440,
        0.25,
        "sine",
        0.025
    );

    playTone(
        554.37,
        0.3,
        "sine",
        0.03,
        0.08
    );

    playTone(
        659.25,
        0.38,
        "sine",
        0.04,
        0.16
    );

    playTone(
        880,
        0.55,
        "sine",
        0.035,
        0.25
    );
}


/* ============================================================
   WHOOSH
============================================================ */

function whoosh() {

    if (!audioContext || musicMuted) {
        return;
    }

    const bufferSize =
        audioContext.sampleRate * 0.45;

    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (
        let i = 0;
        i < bufferSize;
        i++
    ) {

        const fade =
            1 - i / bufferSize;

        data[i] =
            (
                Math.random() * 2 - 1
            ) *
            fade *
            0.22;
    }

    const source =
        audioContext.createBufferSource();

    const filter =
        audioContext.createBiquadFilter();

    const gain =
        audioContext.createGain();

    source.buffer = buffer;

    filter.type = "bandpass";

    filter.frequency.setValueAtTime(
        400,
        audioContext.currentTime
    );

    filter.frequency.exponentialRampToValueAtTime(
        2200,
        audioContext.currentTime + 0.35
    );

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.055,
        audioContext.currentTime + 0.08
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.43
    );

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start();
}


/* ============================================================
   PLATE / FOOD SOUND
============================================================ */

function plateSound() {

    resumeAudio();

    playTone(
        360,
        0.08,
        "triangle",
        0.025
    );

    playTone(
        620,
        0.13,
        "sine",
        0.018,
        0.04
    );
}


/* ============================================================
   GLASS CLINK
============================================================ */

function glassClink() {

    resumeAudio();

    playTone(
        1100,
        0.15,
        "sine",
        0.035
    );

    playTone(
        1450,
        0.22,
        "sine",
        0.02,
        0.04
    );
}


/* ============================================================
   DINNER REVEAL SOUND
============================================================ */

function dinnerRevealSound() {

    resumeAudio();

    playTone(
        261.63,
        0.9,
        "sine",
        0.035
    );

    playTone(
        329.63,
        1.1,
        "sine",
        0.03,
        0.15
    );

    playTone(
        392,
        1.25,
        "sine",
        0.025,
        0.3
    );

    playTone(
        523.25,
        1.4,
        "sine",
        0.02,
        0.48
    );
}


/* ============================================================
   ROMANTIC COMPLIMENT SOUND
============================================================ */

function complimentSound() {

    resumeAudio();

    playTone(
        659.25,
        0.35,
        "sine",
        0.028
    );

    playTone(
        783.99,
        0.45,
        "sine",
        0.022,
        0.08
    );
}


/* ============================================================
   CURTAIN SOUND
============================================================ */

function curtainSound() {

    whoosh();

    setTimeout(() => {
        playTone(
            110,
            0.9,
            "sine",
            0.025
        );
    }, 500);
}


/* ============================================================
   FINAL SOUND
============================================================ */

function finalSparkle() {

    resumeAudio();

    playTone(
        783.99,
        0.35,
        "sine",
        0.025
    );

    playTone(
        1046.5,
        0.55,
        "sine",
        0.035,
        0.08
    );

    playTone(
        1568,
        0.7,
        "sine",
        0.025,
        0.17
    );
}


/* ============================================================
   DREAMY BGM
============================================================ */

const wakeChords = [
    [261.63, 329.63, 392],
    [220, 277.18, 329.63],
    [246.94, 311.13, 369.99],
    [196, 246.94, 293.66]
];

const dinnerChords = [
    [220, 261.63, 329.63],
    [174.61, 220, 293.66],
    [196, 246.94, 329.63],
    [164.81, 220, 261.63]
];

let currentMusicMode = "wake";

function startBGM() {

    if (musicRunning) {
        return;
    }

    initAudio();

    if (!audioContext) {
        return;
    }

    musicRunning = true;

    scheduleMusicCycle();
}

function scheduleMusicCycle() {

    if (!musicRunning) {
        return;
    }

    const chords =
        currentMusicMode === "dinner"
            ? dinnerChords
            : wakeChords;

    let chordIndex = 0;

    function playChord() {

        if (!musicRunning) {
            return;
        }

        const chord =
            chords[chordIndex];

        chord.forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();

                oscillator.type =
                    index === 0
                        ? "sine"
                        : "triangle";

                oscillator.frequency.value =
                    frequency;

                const now =
                    audioContext.currentTime;

                gain.gain.setValueAtTime(
                    0.0001,
                    now
                );

                gain.gain.exponentialRampToValueAtTime(
                    index === 0
                        ? 0.022
                        : 0.012,
                    now + 1.1
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    now + 4.8
                );

                oscillator.connect(gain);
                gain.connect(musicGain);

                oscillator.start(now);
                oscillator.stop(now + 5);

                musicNodes.push(
                    oscillator
                );
            }
        );

        /* Soft high piano-like accent */

        const accent =
            chord[1] * 2;

        const accentOsc =
            audioContext.createOscillator();

        const accentGain =
            audioContext.createGain();

        accentOsc.type = "sine";

        accentOsc.frequency.value =
            accent;

        const now =
            audioContext.currentTime;

        accentGain.gain.setValueAtTime(
            0.0001,
            now + 0.4
        );

        accentGain.gain.exponentialRampToValueAtTime(
            currentMusicMode === "dinner"
                ? 0.015
                : 0.009,
            now + 0.65
        );

        accentGain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 1.9
        );

        accentOsc.connect(accentGain);
        accentGain.connect(musicGain);

        accentOsc.start(now + 0.4);
        accentOsc.stop(now + 2);

        musicNodes.push(
            accentOsc
        );

        chordIndex =
            (chordIndex + 1) %
            chords.length;

        musicTimer =
            setTimeout(
                playChord,
                5000
            );
    }

    playChord();
}


/* ============================================================
   CHANGE MUSIC MODE
============================================================ */

function changeMusicMode(mode) {

    currentMusicMode = mode;

    if (!musicRunning) {
        return;
    }

    if (musicGain) {

        const now =
            audioContext.currentTime;

        musicGain.gain.cancelScheduledValues(now);

        musicGain.gain.setValueAtTime(
            musicGain.gain.value,
            now
        );

        musicGain.gain.linearRampToValueAtTime(
            mode === "dinner"
                ? 0.052
                : 0.045,
            now + 2
        );
    }
}


/* ============================================================
   MUTE
============================================================ */

function toggleMusic() {

    initAudio();

    if (!audioContext) {
        return;
    }

    if (musicMuted) {

        musicMuted = false;

        masterGain.gain.setTargetAtTime(
            0.8,
            audioContext.currentTime,
            0.08
        );

        musicButton.classList.remove(
            "paused"
        );

    } else {

        musicMuted = true;

        masterGain.gain.setTargetAtTime(
            0.0001,
            audioContext.currentTime,
            0.08
        );

        musicButton.classList.add(
            "paused"
        );
    }
}


/* ============================================================
   DOM REFERENCES
============================================================ */

const wakeScreen =
    document.getElementById(
        "wakeScreen"
    );

const wakePopupScreen =
    document.getElementById(
        "wakePopupScreen"
    );

const quizScreen =
    document.getElementById(
        "quizScreen"
    );

const dinnerScreen =
    document.getElementById(
        "dinnerScreen"
    );

const finalScreen =
    document.getElementById(
        "finalScreen"
    );

const wakeButton =
    document.getElementById(
        "wakeButton"
    );

const wakeText =
    document.getElementById(
        "wakeText"
    );

const wakeDots =
    document.querySelectorAll(
        ".wake-dot"
    );

const startQuizButton =
    document.getElementById(
        "startQuizButton"
    );

const wonderBackground =
    document.getElementById(
        "wonderBackground"
    );

const memoryNumber =
    document.getElementById(
        "memoryNumber"
    );

const wonderName =
    document.getElementById(
        "wonderName"
    );

const questionText =
    document.getElementById(
        "questionText"
    );

const answers =
    document.getElementById(
        "answers"
    );

const memoryCaption =
    document.getElementById(
        "memoryCaption"
    );

const nextQuestionButton =
    document.getElementById(
        "nextQuestionButton"
    );

const progressFill =
    document.getElementById(
        "progressFill"
    );

const infoButton =
    document.getElementById(
        "infoButton"
    );

const infoPopup =
    document.getElementById(
        "infoPopup"
    );

const closeInfoButton =
    document.getElementById(
        "closeInfoButton"
    );

const infoTitle =
    document.getElementById(
        "infoTitle"
    );

const infoText =
    document.getElementById(
        "infoText"
    );

const dinnerRoom =
    document.querySelector(
        ".dinner-room"
    );

const sitButton =
    document.getElementById(
        "sitButton"
    );

const foodButton =
    document.getElementById(
        "foodButton"
    );

const food =
    document.getElementById(
        "food"
    );

const complimentBox =
    document.getElementById(
        "complimentBox"
    );

const complimentText =
    document.getElementById(
        "complimentText"
    );

const curtainLayer =
    document.getElementById(
        "curtainLayer"
    );

const danceButton =
    document.getElementById(
        "danceButton"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const toast =
    document.getElementById(
        "toast"
    );

const transitionLayer =
    document.getElementById(
        "transitionLayer"
    );


/* ============================================================
   QUESTION DATA
============================================================ */

const Q6_UNVISITED_PLACE =
    "[YOUR CONFIRMED NEVER-VISITED PLACE]";


const questions = [

    {
        number: "01",

        name: "GREAT WALL OF CHINA",

        image:
            "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85",

        question:
            "What year was Ritesh born?",

        options: [
            "2000",
            "2001",
            "2002",
            "2003"
        ],

        correct: 1,

        info:
            "The Great Wall stretches across the historic landscapes of China and remains one of the most recognisable landmarks on Earth."
    },


    {
        number: "02",

        name: "PETRA",

        image:
            "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=2000&q=85",

        question:
            "What was Tisha wearing when you first met at Patna Railway Station?",

        options: [
            "Black top, blue jeans & white heels",
            "Brown top, black jeans & white heels",
            "Brown top, blue jeans & white heels",
            "White top, blue jeans & black heels"
        ],

        correct: 2,

        caption:
            "Brown top. Blue jeans. White heels.<br><em>And I still remember...</em> ♡",

        info:
            "Petra, famous for its rose-coloured stone architecture, is one of the most remarkable archaeological sites in the world."
    },


    {
        number: "03",

        name: "COLOSSEUM",

        image:
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2000&q=85",

        question:
            "What bouquet did Ritesh bring when you first met?",

        options: [
            "Lilies",
            "Red roses",
            "White roses",
            "White & pink roses"
        ],

        correct: 3,

        caption:
            "White & pink roses...<br><em>I remember that day too.</em> ♡",

        info:
            "Rome's Colosseum has stood as an icon of the ancient world for nearly two thousand years."
    },


    {
        number: "04",

        name: "MACHU PICCHU",

        image:
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2000&q=85",

        question:
            "Which combination did you two actually eat together?",

        options: [
            "Litti, Lassi, Tiramisu & Biryani",
            "Litti, Lassi, Tiramisu, Biryani & Momos",
            "Litti, Coffee, Pizza & Biryani",
            "Lassi, Pasta, Tiramisu & Momos"
        ],

        correct: 1,

        caption:
            "Yep... you remembered the food too. 😏",

        info:
            "Machu Picchu sits high in the Andes and is one of the most extraordinary surviving sites of the Inca civilisation."
    },


    {
        number: "05",

        name: "CHRIST THE REDEEMER",

        image:
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2000&q=85",

        question:
            "When Ritesh was pursuing his Master's in Electrical Engineering at IIT ISM, what was the name of his hostel?",

        options: [
            "Diamond Hostel",
            "Ruby Hostel",
            "Emerald Hostel",
            "Sapphire Hostel"
        ],

        correct: 3,

        caption:
            "Sapphire Hostel.<br><em>That's a pretty specific memory...</em> ♡",

        info:
            "Christ the Redeemer overlooks Rio de Janeiro from the summit of Mount Corcovado."
    },


    {
        number: "06",

        name: "CHICHÉN ITZÁ",

        image:
            "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=2000&q=85",

        question:
            "Which of these places did you two visit together during your time in Patna?",

        options: [
            "Sabyata Dwar",
            "Science City",
            "Hanuman Mandir",
            Q6_UNVISITED_PLACE
        ],

        /*
            The confirmed shared Patna places from the memory
            are Sabyata Dwar, Science City, Hanuman Mandir
            and Marine Drive.

            Until the fourth never-visited place is confirmed,
            the correct shared-memory answer is Hanuman Mandir.
        */

        correct: 2,

        caption:
            "Another one you remembered. ✦",

        info:
            "Chichén Itzá was a major Maya city and is now one of the most celebrated archaeological sites in Mexico."
    },


    {
        number: "07",

        name: "TAJ MAHAL",

        image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85",

        question:
            "One last memory before you reach me... ♡<br><br>When was our first kiss?",

        options: [
            "12th July",
            "13th July",
            "14th July",
            "15th July"
        ],

        correct: 1,

        caption:
            "You remembered. ♡",

        info:
            "The Taj Mahal is one of the world's most enduring symbols of love, built in white marble beside the Yamuna River."
    }

];


/* ============================================================
   STATE
============================================================ */

let wakeTaps = 0;

let currentQuestion = 0;

let questionAnswered = false;

let foodClicks = 0;

let dinnerStarted = false;


/* ============================================================
   SCREEN HELPERS
============================================================ */

function showScreen(screen) {

    [
        wakeScreen,
        wakePopupScreen,
        quizScreen,
        dinnerScreen,
        finalScreen
    ].forEach(
        item => {

            item.classList.remove(
                "active"
            );

            item.classList.add(
                "hidden"
            );
        }
    );

    screen.classList.remove(
        "hidden"
    );

    requestAnimationFrame(
        () => {
            screen.classList.add(
                "active"
            );
        }
    );
}


/* ============================================================
   GLOBAL PARTICLES
============================================================ */

function createParticle() {

    const particle =
        document.createElement("span");

    particle.className =
        "global-particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.top =
        70 + Math.random() * 30 + "%";

    particle.style.setProperty(
        "--drift",
        `${(Math.random() * 80) - 40}px`
    );

    particle.style.animationDuration =
        `${5 + Math.random() * 6}s`;

    document
        .getElementById("particleLayer")
        .appendChild(particle);

    setTimeout(
        () => particle.remove(),
        12000
    );
}

setInterval(
    createParticle,
    700
);


/* ============================================================
   TOAST
============================================================ */

let toastTimer;

function showToast(message) {

    clearTimeout(toastTimer);

    toast.innerHTML =
        message;

    toast.classList.add(
        "show"
    );

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            2200
        );
}


/* ============================================================
   WAKE-UP
============================================================ */

wakeButton.addEventListener(
    "click",
    async () => {

        await resumeAudio();

        if (!musicRunning) {
            startBGM();
        }

        if (wakeTaps >= 5) {
            return;
        }

        wakeTaps++;

        wakeTap();

        const progress =
            wakeTaps / 5;

        const textOpacity =
            Math.max(
                0,
                0.85 - progress * 0.85
            );

        wakeText.style.color =
            `rgba(248,238,225,${textOpacity})`;

        wakeText.style.transform =
            `scale(${1 + progress * 0.025})`;

        wakeDots.forEach(
            (dot, index) => {

                if (index < wakeTaps) {

                    dot.classList.add(
                        "active"
                    );

                } else {

                    dot.classList.remove(
                        "active"
                    );
                }
            }
        );

        const background =
            document.querySelector(
                ".wake-background"
            );

        background.style.filter =
            `blur(${Math.max(0, 4 - wakeTaps * 0.8)}px)`;

        background.style.transform =
            `scale(${Math.max(1.01, 1.06 - wakeTaps * 0.01)})`;

        if (wakeTaps === 5) {

            magicalChime();

            wakeText.style.opacity = "0";

            setTimeout(
                () => {

                    showScreen(
                        wakePopupScreen
                    );

                    glassChime();

                },
                750
            );
        }
    }
);


/* ============================================================
   START QUIZ
============================================================ */

startQuizButton.addEventListener(
    "click",
    async () => {

        await resumeAudio();

        whoosh();

        setTimeout(
            () => {

                showScreen(
                    quizScreen
                );

                quizScreen.classList.add(
                    "quiz-screen-active"
                );

                loadQuestion(
                    0
                );

            },
            550
        );
    }
);


/* ============================================================
   LOAD QUESTION
============================================================ */

function loadQuestion(index) {

    currentQuestion =
        index;

    questionAnswered =
        false;

    const data =
        questions[index];

    memoryNumber.textContent =
        data.number;

    wonderName.textContent =
        data.name;

    questionText.innerHTML =
        data.question;

    wonderBackground.style.opacity =
        "0";

    wonderBackground.style.filter =
        "blur(8px) saturate(0.5)";

    wonderBackground.style.transform =
        "scale(1.13)";

    setTimeout(
        () => {

            wonderBackground.style.backgroundImage =
                `url("${data.image}")`;

            wonderBackground.style.opacity =
                "1";

            wonderBackground.style.filter =
                "blur(0) saturate(0.82)";

            wonderBackground.style.transform =
                "scale(1.02)";

        },
        350
    );

    answers.innerHTML =
        "";

    memoryCaption.innerHTML =
        "";

    memoryCaption.classList.remove(
        "show"
    );

    data.options.forEach(
        (option, optionIndex) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "answer-button";

            button.innerHTML =
                option;

            button.dataset.index =
                optionIndex;

            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        optionIndex,
                        button
                    );

                }
            );

            answers.appendChild(
                button
            );
        }
    );

    nextQuestionButton.classList.add(
        "locked"
    );

    nextQuestionButton.classList.remove(
        "unlocked"
    );

    progressFill.style.width =
        `${((index + 1) / 7) * 100}%`;

    if (index === 6) {

        quizScreen.style.setProperty(
            "--taj-mode",
            "1"
        );

    } else {

        quizScreen.style.setProperty(
            "--taj-mode",
            "0"
        );
    }
}


/* ============================================================
   SELECT ANSWER
============================================================ */

function selectAnswer(
    selectedIndex,
    button
) {

    if (questionAnswered) {
        return;
    }

    const data =
        questions[currentQuestion];

    if (
        selectedIndex !==
        data.correct
    ) {

        button.classList.add(
            "wrong"
        );

        wrongSound();

        setTimeout(
            () => {
                button.classList.remove(
                    "wrong"
                );
            },
            500
        );

        return;
    }


    /* ========================================================
       CORRECT
    ======================================================== */

    questionAnswered =
        true;

    button.classList.add(
        "correct"
    );

    answers
        .querySelectorAll(
            ".answer-button"
        )
        .forEach(
            item => {

                if (
                    item !== button
                ) {
                    item.classList.add(
                        "disabled"
                    );
                }

            }
        );

    correctSound();

    createSparkleBurst(
        button
    );

    if (data.caption) {

        setTimeout(
            () => {

                memoryCaption.innerHTML =
                    data.caption;

                memoryCaption.classList.add(
                    "show"
                );

            },
            300
        );
    }

    nextQuestionButton.classList.remove(
        "locked"
    );

    nextQuestionButton.classList.add(
        "unlocked"
    );

    risingChime();


    if (currentQuestion === 6) {

        setTimeout(
            () => {

                wonderBackground.style.filter =
                    "blur(0) saturate(1) brightness(1.12)";

            },
            400
        );
    }
}


/* ============================================================
   SPARKLE BURST
============================================================ */

function createSparkleBurst(
    element
) {

    const rect =
        element.getBoundingClientRect();

    const symbols =
        ["✦", "✧", "✦", "✧", "✦", "✧"];

    symbols.forEach(
        (symbol, index) => {

            const sparkle =
                document.createElement(
                    "span"
                );

            sparkle.className =
                "answer-sparkle";

            sparkle.textContent =
                symbol;

            sparkle.style.left =
                `${rect.left + rect.width / 2}px`;

            sparkle.style.top =
                `${rect.top + rect.height / 2}px`;

            sparkle.style.setProperty(
                "--x",
                `${Math.cos(index) * (35 + Math.random() * 40)}px`
            );

            sparkle.style.setProperty(
                "--y",
                `${Math.sin(index) * (35 + Math.random() * 40)}px`
            );

            document.body.appendChild(
                sparkle
            );

            setTimeout(
                () => sparkle.remove(),
                1000
            );
        }
    );
}


/* ============================================================
   NEXT QUESTION
============================================================ */

nextQuestionButton.addEventListener(
    "click",
    () => {

        if (!questionAnswered) {
            return;
        }

        whoosh();

        nextQuestionButton.classList.add(
            "locked"
        );

        if (
            currentQuestion <
            questions.length - 1
        ) {

            transitionLayer.classList.add(
                "show"
            );

            setTimeout(
                () => {

                    loadQuestion(
                        currentQuestion + 1
                    );

                    transitionLayer.classList.remove(
                        "show"
                    );

                },
                650
            );

        } else {

            transitionLayer.classList.add(
                "show"
            );

            setTimeout(
                () => {

                    showDinner();

                    transitionLayer.classList.remove(
                        "show"
                    );

                },
                950
            );
        }
    }
);


/* ============================================================
   INFO BUTTON
============================================================ */

infoButton.addEventListener(
    "click",
    () => {

        const data =
            questions[currentQuestion];

        infoTitle.textContent =
            data.name
                .toLowerCase()
                .replace(/\b\w/g, char =>
                    char.toUpperCase()
                );

        infoText.textContent =
            data.info;

        infoPopup.classList.remove(
            "hidden"
        );

        glassChime();
    }
);


closeInfoButton.addEventListener(
    "click",
    () => {

        infoPopup.classList.add(
            "hidden"
        );
    }
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        () => {

            infoPopup.classList.add(
                "hidden"
            );
        }
    );


/* ============================================================
   INFO BUTTON PERIODIC ATTENTION
============================================================ */

setInterval(
    () => {

        if (
            quizScreen.classList.contains(
                "active"
            ) &&
            infoPopup.classList.contains(
                "hidden"
            )
        ) {

            infoButton.classList.add(
                "attention"
            );

            setTimeout(
                () => {

                    infoButton.classList.remove(
                        "attention"
                    );

                },
                800
            );
        }

    },
    6500
);


/* ============================================================
   DINNER REVEAL
============================================================ */

function showDinner() {

    changeMusicMode(
        "dinner"
    );

    showScreen(
        dinnerScreen
    );

    dinnerRevealSound();

    setTimeout(
        () => {

            dinnerRoom.classList.add(
                "sitting-ready"
            );

        },
        500
    );
}


/* ============================================================
   SIT WITH ME
============================================================ */

sitButton.addEventListener(
    "click",
    async () => {

        if (dinnerStarted) {
            return;
        }

        dinnerStarted =
            true;

        await resumeAudio();

        whoosh();

        dinnerRoom.classList.add(
            "sitting"
        );

        setTimeout(
            () => {

                playTone(
                    160,
                    0.25,
                    "triangle",
                    0.018
                );

            },
            650
        );

        setTimeout(
            () => {

                showToast(
                    "Dinner is served..."
                );

            },
            1200
        );
    }
);


/* ============================================================
   FOOD INTERACTION
============================================================ */

foodButton.addEventListener(
    "click",
    () => {

        if (!dinnerStarted) {
            return;
        }

        if (foodClicks >= 5) {
            return;
        }

        foodClicks++;

        plateSound();

        food.className =
            `food eaten-${foodClicks}`;

        const compliments = [

            "That red dress looks absolutely beautiful on you...",

            "Although... I think you make the dress look even better.",

            "And honestly... you look breathtaking tonight.",

            "But you know what I love most? It's not just how beautiful you are... it's the person you are. Your personality, your energy, the way you make everything feel alive.",

            "Alright sweetheart... let's finish the food. ♡"

        ];

        showCompliment(
            compliments[
                foodClicks - 1
            ]
        );

        complimentSound();


        if (foodClicks === 4) {

            changeMusicVolumeTemporarily();

        }


        if (foodClicks === 5) {

            glassClink();

            setTimeout(
                () => {

                    foodButton.style.display =
                        "none";

                    setTimeout(
                        beginCurtainClosing,
                        2600
                    );

                },
                900
            );
        }
    }
);


/* ============================================================
   COMPLIMENT DISPLAY
============================================================ */

function showCompliment(
    text
) {

    complimentText.textContent =
        "";

    complimentBox.classList.add(
        "show"
    );

    let index = 0;

    const speed =
        text.length > 130
            ? 18
            : 28;

    complimentText.classList.add(
        "typewriter"
    );

    const timer =
        setInterval(
            () => {

                complimentText.textContent =
                    text.slice(
                        0,
                        index
                    );

                index++;

                if (
                    index >
                    text.length
                ) {

                    clearInterval(
                        timer
                    );

                    complimentText.classList.remove(
                        "typewriter"
                    );
                }

            },
            speed
        );
}


/* ============================================================
   TEMPORARY MUSIC LIFT
============================================================ */

function changeMusicVolumeTemporarily() {

    if (
        !audioContext ||
        !musicGain
    ) {
        return;
    }

    const now =
        audioContext.currentTime;

    musicGain.gain.cancelScheduledValues(
        now
    );

    musicGain.gain.linearRampToValueAtTime(
        0.07,
        now + 0.5
    );

    musicGain.gain.linearRampToValueAtTime(
        0.052,
        now + 2.5
    );
}


/* ============================================================
   CURTAIN CLOSING
============================================================ */

function beginCurtainClosing() {

    complimentBox.classList.remove(
        "show"
    );

    curtainLayer.classList.add(
        "active"
    );

    curtainSound();

    if (
        audioContext &&
        musicGain
    ) {

        musicGain.gain.linearRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 2
        );
    }

    setTimeout(
        () => {

            showFinalScreen();

        },
        1900
    );
}


/* ============================================================
   FINAL SCREEN
============================================================ */

function showFinalScreen() {

    curtainLayer.classList.remove(
        "active"
    );

    changeMusicMode(
        "wake"
    );

    showScreen(
        finalScreen
    );

    finalSparkle();

    setTimeout(
        () => {

            createFinalParticles();

        },
        500
    );
}


/* ============================================================
   FINAL PARTICLES
============================================================ */

function createFinalParticles() {

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(
            () => {

                const particle =
                    document.createElement(
                        "span"
                    );

                particle.className =
                    "global-particle";

                particle.style.left =
                    `${20 + Math.random() * 60}%`;

                particle.style.top =
                    `${55 + Math.random() * 35}%`;

                particle.style.setProperty(
                    "--drift",
                    `${(Math.random() * 100) - 50}px`
                );

                particle.style.animationDuration =
                    `${4 + Math.random() * 5}s`;

                document
                    .getElementById(
                        "particleLayer"
                    )
                    .appendChild(
                        particle
                    );

            },
            i * 180
        );
    }
}


/* ============================================================
   PAGE 5
============================================================ */

danceButton.addEventListener(
    "click",
    async () => {

        await resumeAudio();

        whoosh();

        transitionLayer.classList.add(
            "show"
        );

        setTimeout(
            () => {

                window.location.href =
                    "page5.html";

            },
            800
        );
    }
);


/* ============================================================
   MUSIC BUTTON
============================================================ */

musicButton.addEventListener(
    "click",
    async () => {

        await resumeAudio();

        toggleMusic();
    }
);


/* ============================================================
   FIRST USER INTERACTION
   Helps browsers unlock Web Audio.
============================================================ */

document.addEventListener(
    "pointerdown",
    () => {

        resumeAudio();

    },
    {
        once: true
    }
);


/* ============================================================
   PRELOAD WONDER IMAGES
============================================================ */

questions.forEach(
    question => {

        const image =
            new Image();

        image.src =
            question.image;
    }
);


/* ============================================================
   INITIAL STATE
============================================================ */

showScreen(
    wakeScreen
);

console.log(
    "Page 4 loaded successfully."
);

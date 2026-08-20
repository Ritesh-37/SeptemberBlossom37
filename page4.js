/* ==========================================================
   PAGE 4
   COMPLETE JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       ELEMENTS
    ====================================================== */

    const wakeScreen =
        document.getElementById("wakeScreen");

    const wakeButton =
        document.getElementById("wakeButton");

    const wakeProgress =
        document.getElementById("wakeProgress");

    const wakePopup =
        document.getElementById("wakePopup");

    const startMemoryButton =
        document.getElementById("startMemoryButton");

    const wonderScreen =
        document.getElementById("wonderScreen");

    const wonderBackground =
        document.getElementById("wonderBackground");

    const questionNumber =
        document.getElementById("questionNumber");

    const questionCategory =
        document.getElementById("questionCategory");

    const questionText =
        document.getElementById("questionText");

    const answerOptions =
        document.getElementById("answerOptions");

    const answerMessage =
        document.getElementById("answerMessage");

    const nextQuestionButton =
        document.getElementById("nextQuestionButton");

    const wonderSymbol =
        document.getElementById("wonderSymbol");

    const infoButton =
        document.getElementById("infoButton");

    const infoPopup =
        document.getElementById("infoPopup");

    const closeInfoButton =
        document.getElementById("closeInfoButton");

    const infoWonderName =
        document.getElementById("infoWonderName");

    const infoTitle =
        document.getElementById("infoTitle");

    const infoText =
        document.getElementById("infoText");

    const dinnerScreen =
        document.getElementById("dinnerScreen");

    const sitButton =
        document.getElementById("sitButton");

    const foodButton =
        document.getElementById("foodButton");

    const food =
        document.getElementById("food");

    const complimentBox =
        document.getElementById("complimentBox");

    const complimentText =
        document.getElementById("complimentText");

    const dinnerComplete =
        document.getElementById("dinnerComplete");

    const curtainScreen =
        document.getElementById("curtainScreen");

    const danceScreen =
        document.getElementById("danceScreen");

    const danceButton =
        document.getElementById("danceButton");


    /* ======================================================
       AUDIO ENGINE
    ====================================================== */

    let audioContext = null;

    let masterGain = null;

    let musicGain = null;

    let musicNodes = [];

    let musicTimer = null;

    let audioStarted = false;


    function initializeAudio() {

        if (audioContext) {

            if (
                audioContext.state ===
                "suspended"
            ) {
                audioContext.resume();
            }

            return;
        }


        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        audioContext =
            new AudioContext();


        masterGain =
            audioContext.createGain();

        masterGain.gain.value = 0.8;

        masterGain.connect(
            audioContext.destination
        );


        musicGain =
            audioContext.createGain();

        musicGain.gain.value = 0;

        musicGain.connect(
            masterGain
        );


        audioStarted = true;

    }


    function resumeAudio() {

        if (
            audioContext &&
            audioContext.state ===
            "suspended"
        ) {
            audioContext.resume();
        }

    }


    /* ======================================================
       GENERIC TONE
    ====================================================== */

    function playTone(
        frequency,
        duration = 0.2,
        type = "sine",
        volume = 0.05,
        delay = 0
    ) {

        if (!audioContext) {
            return;
        }


        const now =
            audioContext.currentTime +
            delay;


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
            now + 0.025
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


    /* ======================================================
       WAKE TAP
    ====================================================== */

    function playWakeTap() {

        playTone(
            560,
            0.18,
            "sine",
            0.045
        );

        playTone(
            760,
            0.22,
            "sine",
            0.025,
            0.04
        );

    }


    /* ======================================================
       MAGICAL CHIME
    ====================================================== */

    function playChime() {

        const notes = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];


        notes.forEach(
            (note, index) => {

                playTone(
                    note,
                    0.8,
                    "sine",
                    0.055,
                    index * 0.09
                );

            }
        );

    }


    /* ======================================================
       WRONG SOUND
    ====================================================== */

    function playWrong() {

        playTone(
            190,
            0.14,
            "triangle",
            0.035
        );

        playTone(
            145,
            0.2,
            "triangle",
            0.025,
            0.08
        );

    }


    /* ======================================================
       CORRECT SOUND
    ====================================================== */

    function playCorrect() {

        playTone(
            659.25,
            0.28,
            "sine",
            0.045
        );

        playTone(
            783.99,
            0.4,
            "sine",
            0.045,
            0.08
        );

        playTone(
            1046.50,
            0.6,
            "sine",
            0.035,
            0.16
        );

    }


    /* ======================================================
       WHOOSH
    ====================================================== */

    function playWhoosh() {

        if (!audioContext) {
            return;
        }


        const now =
            audioContext.currentTime;


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type = "sine";


        oscillator.frequency.setValueAtTime(
            180,
            now
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            950,
            now + 0.45
        );


        gain.gain.setValueAtTime(
            0.0001,
            now
        );


        gain.gain.exponentialRampToValueAtTime(
            0.06,
            now + 0.12
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.5
        );


        oscillator.connect(gain);

        gain.connect(masterGain);


        oscillator.start(now);

        oscillator.stop(
            now + 0.55
        );

    }


    /* ======================================================
       PLATE SOUND
    ====================================================== */

    function playPlate() {

        playTone(
            720,
            0.12,
            "triangle",
            0.025
        );

        playTone(
            970,
            0.16,
            "sine",
            0.018,
            0.04
        );

    }


    /* ======================================================
       SOFT ROMANTIC CHIME
    ====================================================== */

    function playRomanticChime() {

        playTone(
            392,
            0.45,
            "sine",
            0.035
        );

        playTone(
            523.25,
            0.65,
            "sine",
            0.04,
            0.12
        );

        playTone(
            659.25,
            0.8,
            "sine",
            0.035,
            0.24
        );

    }


    /* ======================================================
       DINNER REVEAL SOUND
    ====================================================== */

    function playReveal() {

        const notes = [
            261.63,
            329.63,
            392,
            523.25,
            659.25
        ];


        notes.forEach(
            (note, index) => {

                playTone(
                    note,
                    1.3,
                    "sine",
                    0.035,
                    index * 0.13
                );

            }
        );

    }


    /* ======================================================
       BGM
       DREAMY ROMANTIC SYNTH
    ====================================================== */

    function createDreamBGM() {

        if (!audioContext) {
            return;
        }


        stopMusic();


        musicGain.gain.cancelScheduledValues(
            audioContext.currentTime
        );


        musicGain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        musicGain.gain.exponentialRampToValueAtTime(
            0.055,
            audioContext.currentTime + 5
        );


        const bassNotes = [
            130.81,
            146.83,
            110,
            123.47
        ];


        let index = 0;


        function playLoopNote() {

            if (!audioContext) {
                return;
            }


            const now =
                audioContext.currentTime;


            const note =
                bassNotes[index % bassNotes.length];


            const oscillator =
                audioContext.createOscillator();


            const gain =
                audioContext.createGain();


            oscillator.type = "sine";

            oscillator.frequency.value =
                note;


            gain.gain.setValueAtTime(
                0.0001,
                now
            );


            gain.gain.exponentialRampToValueAtTime(
                0.035,
                now + 0.4
            );


            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 3.2
            );


            oscillator.connect(gain);

            gain.connect(musicGain);


            oscillator.start(now);

            oscillator.stop(
                now + 3.3
            );


            musicNodes.push(
                oscillator
            );


            index++;


            musicTimer =
                setTimeout(
                    playLoopNote,
                    3100
                );

        }


        playLoopNote();


        /* soft high notes */

        const melody = [
            261.63,
            329.63,
            392,
            329.63,
            293.66,
            349.23,
            440,
            349.23
        ];


        let melodyIndex = 0;


        function playMelody() {

            if (!audioContext) {
                return;
            }


            const now =
                audioContext.currentTime;


            const osc =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            osc.type = "triangle";

            osc.frequency.value =
                melody[
                    melodyIndex %
                    melody.length
                ];


            gain.gain.setValueAtTime(
                0.0001,
                now
            );


            gain.gain.exponentialRampToValueAtTime(
                0.012,
                now + 0.3
            );


            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 1.8
            );


            osc.connect(gain);

            gain.connect(musicGain);


            osc.start(now);

            osc.stop(
                now + 1.9
            );


            musicNodes.push(osc);


            melodyIndex++;


            setTimeout(
                playMelody,
                1900
            );

        }


        playMelody();

    }


    /* ======================================================
       DINNER BGM
    ====================================================== */

    function createDinnerBGM() {

        if (!audioContext) {
            return;
        }


        stopMusic();


        musicGain.gain.cancelScheduledValues(
            audioContext.currentTime
        );


        musicGain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        musicGain.gain.exponentialRampToValueAtTime(
            0.06,
            audioContext.currentTime + 4
        );


        const chords = [

            [261.63, 329.63, 392],

            [220, 277.18, 329.63],

            [174.61, 220, 261.63],

            [196, 246.94, 293.66]

        ];


        let chordIndex = 0;


        function playChord() {

            if (!audioContext) {
                return;
            }


            const now =
                audioContext.currentTime;


            const chord =
                chords[
                    chordIndex %
                    chords.length
                ];


            chord.forEach(
                (frequency) => {

                    const osc =
                        audioContext.createOscillator();

                    const gain =
                        audioContext.createGain();


                    osc.type = "sine";

                    osc.frequency.value =
                        frequency;


                    gain.gain.setValueAtTime(
                        0.0001,
                        now
                    );


                    gain.gain.exponentialRampToValueAtTime(
                        0.012,
                        now + 0.5
                    );


                    gain.gain.exponentialRampToValueAtTime(
                        0.0001,
                        now + 4.3
                    );


                    osc.connect(gain);

                    gain.connect(musicGain);


                    osc.start(now);

                    osc.stop(
                        now + 4.4
                    );


                    musicNodes.push(osc);

                }
            );


            chordIndex++;


            musicTimer =
                setTimeout(
                    playChord,
                    4200
                );

        }


        playChord();

    }


    /* ======================================================
       STOP MUSIC
    ====================================================== */

    function stopMusic() {

        if (musicTimer) {

            clearTimeout(
                musicTimer
            );

            musicTimer = null;

        }


        musicNodes.forEach(
            (node) => {

                try {
                    node.stop();
                } catch (e) {}

            }
        );


        musicNodes = [];

    }


    /* ======================================================
       FADE MUSIC
    ====================================================== */

    function fadeMusic(
        targetVolume,
        duration = 1
    ) {

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


        musicGain.gain.setValueAtTime(
            Math.max(
                0.0001,
                musicGain.gain.value
            ),
            now
        );


        musicGain.gain.exponentialRampToValueAtTime(
            Math.max(
                0.0001,
                targetVolume
            ),
            now + duration
        );

    }


    /* ======================================================
       WAKE-UP
    ====================================================== */

    let wakeCount = 0;

    const totalWakeTaps = 5;


    wakeButton.addEventListener(
        "click",
        () => {

            initializeAudio();

            resumeAudio();


            wakeCount++;


            if (
                wakeCount <
                totalWakeTaps
            ) {

                playWakeTap();


                const opacity =
                    0.12 +
                    wakeCount * 0.16;


                const blur =
                    Math.max(
                        0,
                        2 -
                        wakeCount * 0.5
                    );


                wakeScreen.style.opacity =
                    opacity;


                wakeScreen.style.filter =
                    `blur(${blur}px)`;


                wakeProgress.textContent =
                    `${wakeCount} / 5`;


                wakeButton.style.opacity =
                    1 -
                    wakeCount * 0.16;


                return;
            }


            /* fifth tap */

            playChime();


            wakeScreen.style.opacity =
                "1";


            wakeScreen.style.filter =
                "blur(0)";


            wakeButton.style.opacity =
                "0";


            wakeProgress.style.opacity =
                "0";


            /* Start dreamy BGM */

            createDreamBGM();


            setTimeout(
                () => {

                    wakeScreen.classList.add(
                        "hidden"
                    );

                    wakePopup.classList.add(
                        "show"
                    );

                },
                900
            );

        }
    );


    /* ======================================================
       START MEMORY QUIZ
    ====================================================== */

    startMemoryButton.addEventListener(
        "click",
        () => {

            initializeAudio();

            resumeAudio();

            playWhoosh();

            wakePopup.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    startQuiz();

                },
                600
            );

        }
    );


    /* ======================================================
       QUIZ DATA
    ====================================================== */

    const questions = [

        {
            wonder:
                "Great Wall of China",

            symbol:
                "✦",

            category:
                "MEMORY 01",

            background:
                "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2200&q=85",

            question:
                "What year was Ritesh born?",

            options: [
                "2000",
                "2001",
                "2002",
                "2003"
            ],

            correct: 1,

            message:
                "2001... You remembered. ✦",

            infoTitle:
                "A Wonder of the World",

            infoText:
                "The Great Wall stretches across the Chinese landscape, built and rebuilt across centuries. Tonight, it becomes the first stop in our little journey through memory."

        },


        {
            wonder:
                "Petra",

            symbol:
                "✧",

            category:
                "MEMORY 02",

            background:
                "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2200&q=85",

            question:
                "What was Tisha wearing when you first met at Patna Railway Station?",

            options: [
                "Black top, blue jeans & white heels",
                "Brown top, black jeans & white heels",
                "Brown top, blue jeans & white heels",
                "White top, blue jeans & black heels"
            ],

            correct: 2,

            message:
                "Brown top. Blue jeans. White heels. And I still remember... ♡",

            infoTitle:
                "Petra",

            infoText:
                "Carved into rose-coloured sandstone, Petra has watched countless stories unfold around it. This one is about remembering the very first details of ours."

        },


        {
            wonder:
                "Colosseum",

            symbol:
                "✦",

            category:
                "MEMORY 03",

            background:
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2200&q=85",

            question:
                "What bouquet did Ritesh bring when you first met?",

            options: [
                "Lilies",
                "Red roses",
                "White roses",
                "White & pink roses"
            ],

            correct: 3,

            message:
                "White & pink roses... I remember that day too. ♡",

            infoTitle:
                "The Colosseum",

            infoText:
                "An ancient Roman landmark surrounded by stories of its own. Somehow, even a place this old feels fitting for a memory that still feels so fresh."

        },


        {
            wonder:
                "Machu Picchu",

            symbol:
                "✧",

            category:
                "MEMORY 04",

            background:
                "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2200&q=85",

            question:
                "Which combination did you two actually eat together?",

            options: [
                "Litti, Lassi, Tiramisu & Biryani",
                "Litti, Lassi, Tiramisu, Biryani & Momos",
                "Litti, Coffee, Pizza & Biryani",
                "Lassi, Pasta, Tiramisu & Momos"
            ],

            correct: 1,

            message:
                "Yep... you remembered the food too. 😏",

            infoTitle:
                "Machu Picchu",

            infoText:
                "High in the Andes, Machu Picchu feels almost dreamlike. A perfect place for a question about memories that are a little more playful."

        },


        {
            wonder:
                "Christ the Redeemer",

            symbol:
                "✦",

            category:
                "MEMORY 05",

            background:
                "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2200&q=85",

            question:
                "When Ritesh was pursuing his Master's in Electrical Engineering at IIT ISM, what was the name of his hostel?",

            options: [
                "Diamond Hostel",
                "Ruby Hostel",
                "Emerald Hostel",
                "Sapphire Hostel"
            ],

            correct: 3,

            message:
                "Sapphire Hostel. That's a pretty specific memory... ♡",

            infoTitle:
                "Christ the Redeemer",

            infoText:
                "Standing above Rio de Janeiro, Christ the Redeemer overlooks an entire city. This question, though, looks a little closer to home."

        },


        {
            wonder:
                "Chichén Itzá",

            symbol:
                "✧",

            category:
                "MEMORY 06",

            background:
                "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=2200&q=85",

            question:
                "Which of these places did you two visit together during your time in Patna?",

            options: [
                "Sabyata Dwar",
                "Science City",
                "Hanuman Mandir",
                "PATNA NEVER-VISITED LOCATION — CHANGE THIS"
            ],

            /*
             * IMPORTANT:
             * Change only the number below after
             * you confirm the actual answer.
             *
             * 0 = A
             * 1 = B
             * 2 = C
             * 3 = D
             */

            correct: 0,

            message:
                "Another one you remembered. ✦",

            infoTitle:
                "Chichén Itzá",

            infoText:
                "One of the most recognizable archaeological sites in Mexico. Another beautiful backdrop for one of the small memories that belongs only to you two."

        },


        {
            wonder:
                "Taj Mahal",

            symbol:
                "♡",

            category:
                "MEMORY 07",

            background:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2200&q=85",

            question:
                "When was our first kiss?",

            options: [
                "12th July",
                "13th July",
                "14th July",
                "15th July"
            ],

            correct: 1,

            message:
                "You remembered. ♡",

            infoTitle:
                "The Taj Mahal",

            infoText:
                "The final memory. Slow down for this one."

        }

    ];


    /* ======================================================
       QUIZ STATE
    ====================================================== */

    let currentQuestion = 0;

    let questionAnswered = false;


    /* ======================================================
       START QUIZ
    ====================================================== */

    function startQuiz() {

        wonderScreen.classList.remove(
            "hidden"
        );


        setTimeout(
            () => {

                loadQuestion(
                    currentQuestion
                );

            },
            100
        );

    }


    /* ======================================================
       LOAD QUESTION
    ====================================================== */

    function loadQuestion(index) {

        const data =
            questions[index];


        questionAnswered = false;


        nextQuestionButton.disabled =
            true;


        nextQuestionButton.classList.remove(
            "unlocked"
        );


        nextQuestionButton.classList.add(
            "locked"
        );


        answerMessage.classList.remove(
            "show"
        );


        answerMessage.textContent =
            "";


        questionNumber.textContent =
            String(index + 1)
                .padStart(2, "0");


        questionCategory.textContent =
            data.category;


        questionText.textContent =
            data.question;


        wonderSymbol.textContent =
            data.symbol;


        wonderBackground.style.backgroundImage =
            `url("${data.background}")`;


        infoWonderName.textContent =
            data.wonder.toUpperCase();


        infoTitle.textContent =
            data.infoTitle;


        infoText.textContent =
            data.infoText;


        renderOptions(
            data
        );


        if (
            index === 6
        ) {

            fadeMusic(
                0.025,
                2
            );

        } else {

            fadeMusic(
                0.055,
                2
            );

        }


        /* periodically nudge info button */

        setTimeout(
            () => {

                infoButton.classList.add(
                    "attention"
                );

                setTimeout(
                    () => {

                        infoButton.classList.remove(
                            "attention"
                        );

                    },
                    600
                );

            },
            5000
        );

    }


    /* ======================================================
       RENDER ANSWERS
    ====================================================== */

    function renderOptions(data) {

        answerOptions.innerHTML =
            "";


        data.options.forEach(
            (option, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "answer-button";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => {

                        selectAnswer(
                            button,
                            index
                        );

                    }
                );


                answerOptions.appendChild(
                    button
                );

            }
        );

    }


    /* ======================================================
       ANSWER
    ====================================================== */

    function selectAnswer(
        button,
        selectedIndex
    ) {

        if (
            questionAnswered
        ) {
            return;
        }


        initializeAudio();

        resumeAudio();


        const data =
            questions[
                currentQuestion
            ];


        if (
            selectedIndex !==
            data.correct
        ) {

            playWrong();


            button.classList.remove(
                "wrong"
            );


            void button.offsetWidth;


            button.classList.add(
                "wrong"
            );


            answerMessage.textContent =
                "Not quite... try again.";


            answerMessage.classList.add(
                "show"
            );


            setTimeout(
                () => {

                    answerMessage.classList.remove(
                        "show"
                    );

                },
                1200
            );


            return;
        }


        /* correct */

        questionAnswered =
            true;


        playCorrect();


        button.classList.add(
            "correct"
        );


        const allButtons =
            answerOptions.querySelectorAll(
                ".answer-button"
            );


        allButtons.forEach(
            (otherButton) => {

                if (
                    otherButton !==
                    button
                ) {

                    otherButton.style.opacity =
                        "0.38";

                }

            }
        );


        answerMessage.textContent =
            data.message;


        answerMessage.classList.add(
            "show"
        );


        createSparkles(
            button
        );


        unlockArrow();

    }


    /* ======================================================
       SPARKLE BURST
    ====================================================== */

    function createSparkles(
        element
    ) {

        const rect =
            element.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const sparkle =
                document.createElement(
                    "div"
                );


            sparkle.className =
                "answer-sparkle";


            sparkle.textContent =
                i % 2 === 0
                    ? "✦"
                    : "✧";


            sparkle.style.left =
                `${centerX}px`;


            sparkle.style.top =
                `${centerY}px`;


            sparkle.style.setProperty(
                "--sx",
                `${(Math.random() - 0.5) * 150}px`
            );


            sparkle.style.setProperty(
                "--sy",
                `${(Math.random() - 0.5) * 100}px`
            );


            document.body.appendChild(
                sparkle
            );


            setTimeout(
                () => {

                    sparkle.remove();

                },
                1000
            );

        }

    }


    /* ======================================================
       UNLOCK ARROW
    ====================================================== */

    function unlockArrow() {

        nextQuestionButton.disabled =
            false;


        nextQuestionButton.classList.remove(
            "locked"
        );


        nextQuestionButton.classList.add(
            "unlocked"
        );


        playChime();

    }


    /* ======================================================
       NEXT QUESTION
    ====================================================== */

    nextQuestionButton.addEventListener(
        "click",
        () => {

            if (
                !questionAnswered
            ) {
                return;
            }


            playWhoosh();


            nextQuestionButton.style.transform =
                "translateX(10px) scale(0.94)";


            setTimeout(
                () => {

                    nextQuestionButton.style.transform =
                        "";


                    if (
                        currentQuestion <
                        questions.length - 1
                    ) {

                        transitionToNextQuestion();

                    } else {

                        finishQuiz();

                    }

                },
                400
            );

        }
    );


    /* ======================================================
       WONDER TRANSITION
    ====================================================== */

    function transitionToNextQuestion() {

        wonderScreen.style.opacity =
            "0";


        wonderBackground.style.filter =
            "blur(5px)";


        wonderBackground.style.transform =
            "scale(1.12)";


        setTimeout(
            () => {

                currentQuestion++;


                wonderBackground.style.filter =
                    "blur(0)";


                wonderBackground.style.transform =
                    "scale(1.05)";


                loadQuestion(
                    currentQuestion
                );


                wonderScreen.style.opacity =
                    "1";


            },
            750
        );

    }


    /* ======================================================
       FINISH QUIZ
    ====================================================== */

    function finishQuiz() {

        playChime();


        wonderScreen.style.opacity =
            "0";


        setTimeout(
            () => {

                wonderScreen.classList.add(
                    "hidden"
                );


                fadeMusic(
                    0,
                    1.2
                );


                setTimeout(
                    () => {

                        startDinner();

                    },
                    700
                );

            },
            900
        );

    }


    /* ======================================================
       INFO BUTTON
    ====================================================== */

    infoButton.addEventListener(
        "click",
        () => {

            initializeAudio();

            playTone(
                720,
                0.16,
                "sine",
                0.025
            );


            infoPopup.classList.add(
                "show"
            );

        }
    );


    closeInfoButton.addEventListener(
        "click",
        () => {

            infoPopup.classList.remove(
                "show"
            );

        }
    );


    infoPopup.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                infoPopup
            ) {

                infoPopup.classList.remove(
                    "show"
                );

            }

        }
    );


    /* ======================================================
       DINNER START
    ====================================================== */

    function startDinner() {

        dinnerScreen.classList.remove(
            "hidden"
        );


        playReveal();


        createDinnerBGM();


        setTimeout(
            () => {

                dinnerScreen.classList.add(
                    "visible"
                );

            },
            100
        );


        /* Let the scene breathe first */

        setTimeout(
            () => {

                sitButton.style.opacity =
                    "1";

            },
            2000
        );

    }


    /* ======================================================
       SIT DOWN
    ====================================================== */

    let sitting =
        false;


    sitButton.addEventListener(
        "click",
        () => {

            if (sitting) {
                return;
            }


            sitting = true;


            initializeAudio();

            playTone(
                190,
                0.18,
                "triangle",
                0.025
            );


            dinnerScreen.classList.add(
                "sitting"
            );


            setTimeout(
                () => {

                    foodButton.style.opacity =
                        "1";

                },
                1200
            );

        }
    );


    /* ======================================================
       FOOD / COMPLIMENTS
    ====================================================== */

    const compliments = [

        "That red dress looks absolutely beautiful on you...",

        "Although... I think you make the dress look even better.",

        "And honestly... you look breathtaking tonight.",

        "But you know what I love most? It's not just how beautiful you are... it's the person you are. Your personality, your energy, the way you make everything feel alive.",

        "Alright sweetheart... let's finish the food. ❤️"

    ];


    let foodClicks =
        0;


    foodButton.addEventListener(
        "click",
        () => {

            if (
                !sitting ||
                foodClicks >= 5
            ) {
                return;
            }


            initializeAudio();

            resumeAudio();


            playPlate();


            const pieces =
                food.querySelectorAll(
                    ".food-piece"
                );


            if (
                pieces[foodClicks]
            ) {

                pieces[
                    foodClicks
                ].classList.add(
                    "eaten"
                );

            }


            foodClicks++;


            showCompliment(
                compliments[
                    foodClicks - 1
                ]
            );


            if (
                foodClicks === 5
            ) {

                foodButton.classList.add(
                    "finished"
                );


                setTimeout(
                    () => {

                        dinnerComplete.classList.add(
                            "show"
                        );


                        playRomanticChime();


                        setTimeout(
                            () => {

                                dinnerComplete.classList.remove(
                                    "show"
                                );


                                beginCurtains();

                            },
                            2600
                        );

                    },
                    1300
                );

            }

        }
    );


    /* ======================================================
       SHOW COMPLIMENT
    ====================================================== */

    function showCompliment(
        text
    ) {

        complimentText.textContent =
            "";


        complimentBox.classList.remove(
            "show"
        );


        setTimeout(
            () => {

                complimentBox.classList.add(
                    "show"
                );


                typeText(
                    complimentText,
                    text,
                    24
                );

            },
            100
        );


        setTimeout(
            () => {

                if (
                    foodClicks <
                    4
                ) {

                    complimentBox.classList.remove(
                        "show"
                    );

                }

            },
            foodClicks === 4
                ? 7000
                : 3000
        );

    }


    /* ======================================================
       TYPEWRITER
    ====================================================== */

    function typeText(
        element,
        text,
        speed
    ) {

        let index = 0;


        element.textContent =
            "";


        function write() {

            if (
                index >=
                text.length
            ) {
                return;
            }


            element.textContent +=
                text.charAt(index);


            index++;


            setTimeout(
                write,
                speed
            );

        }


        write();

    }


    /* ======================================================
       CURTAIN CLOSING
    ====================================================== */

    function beginCurtains() {

        fadeMusic(
            0.01,
            3
        );


        curtainScreen.classList.remove(
            "hidden"
        );


        playWhoosh();


        setTimeout(
            () => {

                curtainScreen.classList.add(
                    "closing"
                );

            },
            300
        );


        setTimeout(
            () => {

                fadeMusic(
                    0,
                    2
                );


                setTimeout(
                    () => {

                        curtainScreen.classList.add(
                            "hidden"
                        );


                        showDanceScreen();

                    },
                    1000
                );

            },
            3300
        );

    }


    /* ======================================================
       DANCE SCREEN
    ====================================================== */

    function showDanceScreen() {

        danceScreen.classList.remove(
            "hidden"
        );


        setTimeout(
            () => {

                danceScreen.classList.add(
                    "visible"
                );


                playChime();

            },
            100
        );

    }


    /* ======================================================
       NEXT PAGE
    ====================================================== */

    danceButton.addEventListener(
        "click",
        () => {

            initializeAudio();

            playWhoosh();


            danceButton.disabled =
                true;


            danceScreen.style.opacity =
                "0";


            /*
             * PAGE 5
             *
             * Make sure the next page
             * is named page5.html.
             */

            setTimeout(
                () => {

                    window.location.href =
                        "page5.html";

                },
                900
            );

        }
    );


    /* ======================================================
       GLOBAL FIRST TOUCH AUDIO UNLOCK
       IMPORTANT FOR ANDROID / CHROME
    ====================================================== */

    document.addEventListener(
        "touchstart",
        () => {

            initializeAudio();

            resumeAudio();

        },
        {
            once: true,
            passive: true
        }
    );


    document.addEventListener(
        "pointerdown",
        () => {

            initializeAudio();

            resumeAudio();

        },
        {
            once: true
        }
    );


    /* ======================================================
       INITIAL SAFETY STATE
    ====================================================== */

    if (wakeScreen) {

        wakeScreen.style.opacity =
            "0.12";

        wakeScreen.style.filter =
            "blur(2px)";

    }


    if (foodButton) {

        foodButton.style.opacity =
            "0";

    }


    if (sitButton) {

        sitButton.style.opacity =
            "0";

    }

});

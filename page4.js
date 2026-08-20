/* =====================================================
   PAGE 4 — MIDNIGHT
   STORY + AUDIO + INTERACTIONS
   ===================================================== */


/* =====================================================
   HELPERS
   ===================================================== */

const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

const $ = id =>
    document.getElementById(id);


let currentScene = "partyScene";


function showScene(id) {

    document.querySelectorAll(".scene")
        .forEach(scene => {
            scene.classList.remove("active");
        });

    const target = $(id);

    if (target) {
        target.classList.add("active");
        currentScene = id;
    }
}


/* =====================================================
   AUDIO ENGINE
   ===================================================== */

let audioContext = null;
let masterGain = null;
let musicGain = null;

let musicStarted = false;


function initializeAudio() {

    if (audioContext) {

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        return;
    }


    audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();


    masterGain =
        audioContext.createGain();

    musicGain =
        audioContext.createGain();


    masterGain.gain.value = 0.48;

    /*
       MUCH LOUDER THAN THE PREVIOUS VERSION
       so the BGM is actually noticeable.
    */

    musicGain.gain.value = 0.22;


    musicGain.connect(masterGain);

    masterGain.connect(
        audioContext.destination
    );


    audioContext.resume();

    startMidnightMusic();
}


/* =====================================================
   TONE
   ===================================================== */

function playTone(
    frequency,
    duration = 0.2,
    type = "sine",
    volume = 0.06,
    delay = 0,
    destination = masterGain
) {

    if (!audioContext) return;


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        audioContext.currentTime + delay
    );


    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime + delay
    );


    gain.gain.exponentialRampToValueAtTime(
        volume,
        audioContext.currentTime +
        delay +
        0.025
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime +
        delay +
        duration
    );


    oscillator.connect(gain);

    gain.connect(destination);


    oscillator.start(
        audioContext.currentTime + delay
    );


    oscillator.stop(
        audioContext.currentTime +
        delay +
        duration +
        0.05
    );
}


/* =====================================================
   CLICK
   ===================================================== */

function clickSound() {

    playTone(
        620,
        0.07,
        "sine",
        0.035
    );

    playTone(
        920,
        0.05,
        "sine",
        0.022,
        0.025
    );
}


/* =====================================================
   MESSAGE SOUND
   ===================================================== */

function messageSound(isTisha) {

    if (isTisha) {

        playTone(
            520,
            0.12,
            "sine",
            0.05
        );

        playTone(
            690,
            0.12,
            "sine",
            0.035,
            0.07
        );

    } else {

        playTone(
            650,
            0.12,
            "sine",
            0.045
        );

    }
}


/* =====================================================
   WHOOSH
   ===================================================== */

function whooshSound() {

    if (!audioContext) return;


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";


    oscillator.frequency.setValueAtTime(
        180,
        audioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        900,
        audioContext.currentTime + 0.4
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
        audioContext.currentTime + 0.45
    );


    oscillator.connect(gain);

    gain.connect(masterGain);


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.5
    );
}


/* =====================================================
   KISS SOUND
   ===================================================== */

function kissSound() {

    if (!audioContext) return;


    const duration = 0.24;

    const bufferSize =
        audioContext.sampleRate *
        duration;


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

        data[i] =
            (Math.random() * 2 - 1) *
            Math.exp(
                -i /
                (bufferSize * 0.16)
            );
    }


    const source =
        audioContext.createBufferSource();

    const filter =
        audioContext.createBiquadFilter();

    const gain =
        audioContext.createGain();


    filter.type = "bandpass";

    filter.frequency.value = 1300;

    filter.Q.value = 0.8;


    gain.gain.value = 0.045;


    source.buffer = buffer;


    source.connect(filter);

    filter.connect(gain);

    gain.connect(masterGain);


    source.start();
}


/* =====================================================
   PLAYFUL PAT / TEASING SOUND
   ===================================================== */

function playfulPatSound() {

    playTone(
        170,
        0.07,
        "triangle",
        0.055
    );

    playTone(
        105,
        0.09,
        "sine",
        0.035,
        0.035
    );
}


/* =====================================================
   BED SOUND
   ===================================================== */

function bedSound() {

    playTone(
        90,
        0.18,
        "sine",
        0.04
    );

    playTone(
        65,
        0.2,
        "sine",
        0.028,
        0.08
    );
}


/* =====================================================
   CUDDLE SOUND
   ===================================================== */

function cuddleSound() {

    playTone(
        330,
        0.35,
        "sine",
        0.035
    );

    playTone(
        440,
        0.45,
        "sine",
        0.025,
        0.1
    );
}


/* =====================================================
   ROMANTIC MIDNIGHT BGM
   ===================================================== */

function startMidnightMusic() {

    if (musicStarted) return;

    musicStarted = true;


    /*
       Chord progression:

       Am → F → C → G

       Soft romantic midnight atmosphere.
    */

    const chords = [

        [220.00, 261.63, 329.63],

        [174.61, 220.00, 261.63],

        [261.63, 329.63, 392.00],

        [196.00, 246.94, 293.66]

    ];


    let chordIndex = 0;


    function playChord() {

        if (!audioContext) return;


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
                        ? "triangle"
                        : "sine";


                oscillator.frequency.value =
                    frequency;


                gain.gain.setValueAtTime(
                    0.0001,
                    audioContext.currentTime
                );


                gain.gain.exponentialRampToValueAtTime(
                    index === 0
                        ? 0.045
                        : 0.028,

                    audioContext.currentTime + 0.8
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.0001,

                    audioContext.currentTime + 4.8
                );


                oscillator.connect(gain);

                gain.connect(musicGain);


                oscillator.start();

                oscillator.stop(
                    audioContext.currentTime + 5
                );

            }
        );


        chordIndex =
            (chordIndex + 1) %
            chords.length;


        setTimeout(
            playChord,
            4800
        );
    }


    playChord();


    /*
       Soft upper melody.
    */

    const melody = [

        440.00,
        493.88,
        523.25,
        493.88,

        392.00,
        440.00,
        493.88,
        440.00

    ];


    let melodyIndex = 0;


    function playMelody() {

        if (!audioContext) return;


        playTone(
            melody[melodyIndex],
            1.8,
            "sine",
            0.028,
            0,
            musicGain
        );


        melodyIndex =
            (melodyIndex + 1) %
            melody.length;


        setTimeout(
            playMelody,
            2400
        );
    }


    setTimeout(
        playMelody,
        900
    );
}


/* =====================================================
   FIRST INTERACTION UNLOCKS AUDIO
   ===================================================== */

document.addEventListener(
    "pointerdown",
    () => {

        initializeAudio();

    },
    {
        once: true
    }
);


/* =====================================================
   PARTICLES
   ===================================================== */

const particleContainer =
    $("particles");


for (let i = 0; i < 28; i++) {

    const particle =
        document.createElement("span");

    particle.className =
        "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 12) + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particleContainer.appendChild(
        particle
    );
}


/* =====================================================
   PARTY STORY
   ===================================================== */

const partyMessages = [

    "Okay guys... party's over! 🎉",

    "Come on everyone... time to go home! 👋",

    "Everyone's finally gone... 🌙",

    "Which means...",

    "I can finally have some me time with my babyyy. ♡"

];


let partyIndex = 1;

let partyLocked = false;


const partyText =
    $("partyStoryText");


partyText.textContent =
    partyMessages[0];


function showPartyMessage() {

    if (partyLocked) return;

    partyLocked = true;

    initializeAudio();

    clickSound();


    partyText.style.opacity = "0";


    setTimeout(() => {

        partyText.textContent =
            partyMessages[partyIndex];

        partyText.style.opacity =
            "1";


        partyIndex++;


        setTimeout(() => {

            partyLocked = false;

        }, 500);


        if (
            partyIndex >=
            partyMessages.length
        ) {

            setTimeout(() => {

                partyLocked = true;

                whooshSound();

                showScene(
                    "blackScene"
                );

                startBlackStory();

            }, 1400);
        }

    }, 400);
}


/* =====================================================
   BLACK STORY
   ===================================================== */

const blackMessages = [

    "The party was finally over.",

    "Tisha was completely dizzy after the party.",

    "So Ritesh picked her up in his arms...",

    "...and gently laid her down on his bedroom bed.",

    "But the night wasn't over yet."

];


let blackIndex = 0;

let blackLocked = false;


const blackText =
    $("blackStoryText");


function startBlackStory() {

    blackIndex = 0;

    blackText.style.fontSize =
        "clamp(20px,4vw,29px)";

    blackText.style.color =
        "rgba(255,255,255,.9)";

    blackText.textContent = "";

    blackLocked = false;
}


function showBlackMessage() {

    if (blackLocked) return;

    blackLocked = true;

    clickSound();


    blackText.style.opacity =
        "0";


    setTimeout(() => {

        blackText.textContent =
            blackMessages[blackIndex];

        blackText.style.opacity =
            "1";


        blackIndex++;


        /*
           IMPORTANT:

           No immediate "What happens next?"
           message.

           We wait until the user actually
           taps again.
        */

        setTimeout(() => {

            blackLocked = false;

        }, 1000);

    }, 600);
}


/* =====================================================
   BEDROOM
   ===================================================== */

function openBedroom() {

    clickSound();

    whooshSound();

    showScene(
        "bedroomIntro"
    );
}


/* =====================================================
   CHAT DATA
   ===================================================== */

const chatData = [

    {
        type: "system",
        text: "Tisha is awake... 🌙"
    },

    {
        type: "system",
        text: "She finds herself in Ritesh's bed... ♡"
    },

    {
        type: "system",
        text: "But he's nowhere beside her... 😤"
    },

    {
        type: "tisha",
        text: "Ritesshhhhhhhhhh 😩♡"
    },

    {
        type: "ritesh",
        text: "Yesssss love!!!! 🥹♡"
    },

    {
        type: "tisha",
        text: "Where are you? 👀"
    },

    {
        type: "ritesh",
        text: "I'm in the washroom... Changing clothessssss... 😂"
    },

    {
        type: "tisha",
        text: "I don't care. 😤"
    },

    {
        type: "tisha",
        text: "Come here... 🥺"
    },

    {
        type: "tisha",
        text: "Kiss me... 💋"
    },

    {
        type: "tisha",
        text: "Love me... ♡"
    },

    {
        type: "tisha",
        text: "Cuddle me... 🤗"
    },

    {
        type: "tisha",
        text: "Come fasttttttt!!!! 😭♡"
    },

    {
        type: "ritesh",
        text: "Areee baba, cominggggg! 😂♡"
    },

    {
        type: "ritesh",
        text: "Wait for meee... 🏃‍♂️💨"
    }

];


const messages =
    $("messages");

const typing =
    $("typing");


async function showTyping() {

    typing.classList.add(
        "active"
    );

    await wait(900);

    typing.classList.remove(
        "active"
    );
}


function addChatMessage(data) {

    const bubble =
        document.createElement(
            "div"
        );


    bubble.classList.add(
        "message",
        data.type
    );


    if (
        data.type === "tisha" ||
        data.type === "ritesh"
    ) {

        const name =
            document.createElement(
                "span"
            );

        name.className =
            "message-name";

        name.textContent =
            data.type === "tisha"
                ? "Tisha"
                : "Ritesh";

        bubble.appendChild(
            name
        );
    }


    const text =
        document.createElement(
            "span"
        );


    text.textContent =
        data.text;


    bubble.appendChild(
        text
    );


    messages.appendChild(
        bubble
    );


    messages.scrollTop =
        messages.scrollHeight;


    if (
        data.type === "tisha" ||
        data.type === "ritesh"
    ) {

        messageSound(
            data.type === "tisha"
        );

    } else {

        clickSound();

    }
}


let chatStarted = false;


async function startChat() {

    if (chatStarted) return;

    chatStarted = true;


    showScene(
        "chatScene"
    );


    await wait(800);


    for (
        let i = 0;
        i < chatData.length;
        i++
    ) {

        const data =
            chatData[i];


        if (
            data.type === "tisha" ||
            data.type === "ritesh"
        ) {

            await showTyping();

        } else {

            await wait(500);
        }


        addChatMessage(
            data
        );


        await wait(
            data.type === "system"
                ? 800
                : 650
        );
    }


    await wait(900);


    startKissScene();
}


/* =====================================================
   KISS PARTICLES
   ===================================================== */

function createKissParticles() {

    const container =
        $("kissParticles");


    container.innerHTML = "";


    const symbols = [
        "💋",
        "♡",
        "♥",
        "💋",
        "♡"
    ];


    symbols.forEach(
        (symbol, index) => {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "kiss-particle";


            particle.textContent =
                symbol;


            particle.style.left =
                (
                    35 +
                    Math.random() * 30
                ) + "%";


            particle.style.top =
                (
                    38 +
                    Math.random() * 15
                ) + "%";


            particle.style.animationDelay =
                (index * 0.28) + "s";


            container.appendChild(
                particle
            );

        }
    );
}


/* =====================================================
   KISS SCENE
   ===================================================== */

async function startKissScene() {

    whooshSound();


    showScene(
        "kissScene"
    );


    await wait(700);


    const content =
        document.querySelector(
            ".kiss-content"
        );


    content.classList.add(
        "kiss-scene-active"
    );


    await wait(1100);


    /*
       Kiss begins.
    */

    kissSound();

    createKissParticles();


    await wait(3000);


    /*
       Kiss animation finishes.
    */

    playfulPatSound();


    content.classList.add(
        "tease-visible"
    );


    await wait(1200);


    content.classList.add(
        "reaction-visible"
    );


    await wait(1800);


    startCuddleScene();
}


/* =====================================================
   CUDDLE SCENE
   ===================================================== */

function startCuddleScene() {

    whooshSound();

    bedSound();

    showScene(
        "cuddleScene"
    );


    setTimeout(() => {

        cuddleSound();

    }, 700);
}


/* =====================================================
   CUDDLE TAP INTERACTION
   ===================================================== */

const cuddleScene =
    $("cuddleScene");

let cuddleStage = 0;


function advanceCuddle() {

    if (
        cuddleStage >= 4
    ) {
        return;
    }


    cuddleStage++;


    cuddleScene.classList.remove(
        "cuddle-stage-1",
        "cuddle-stage-2",
        "cuddle-stage-3",
        "cuddle-stage-4"
    );


    cuddleScene.classList.add(
        "cuddle-stage-" +
        cuddleStage
    );


    clickSound();


    if (
        cuddleStage === 1
    ) {

        cuddleSound();

    }


    if (
        cuddleStage === 2
    ) {

        cuddleSound();

    }


    if (
        cuddleStage === 3
    ) {

        cuddleSound();

    }


    if (
        cuddleStage === 4
    ) {

        cuddleSound();

        $("cuddleTapText")
            .textContent =
            "♡ Completely together ♡";

    }
}


cuddleScene.addEventListener(
    "click",
    event => {

        /*
           Don't trigger cuddle movement
           when buttons are clicked.
        */

        if (
            event.target.closest("button") ||
            event.target.closest(".cuddle-choices")
        ) {
            return;
        }


        if (
            cuddleStage < 4
        ) {

            advanceCuddle();

        }

    }
);


/* =====================================================
   CUDDLE CHOICES
   ===================================================== */

const cuddleButtons =
    document.querySelectorAll(
        "#cuddleChoices button"
    );


const cuddleResponse =
    $("cuddleResponse");


const continueLove =
    $("continueLove");


cuddleButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                clickSound();


                const choice =
                    button.dataset.choice;


                if (
                    choice === "closer"
                ) {

                    cuddleResponse.textContent =
                        "She snuggled even closer into his arms. 🤗♡";

                }


                if (
                    choice === "kiss"
                ) {

                    kissSound();

                    cuddleResponse.textContent =
                        "One more little kiss... because apparently one wasn't enough. 💋♡";

                }


                if (
                    choice === "stay"
                ) {

                    cuddleResponse.textContent =
                        "Neither of them said anything. They just stayed there together. ☾♡";

                }


                continueLove.style.display =
                    "block";

            }
        );

    }
);


/* =====================================================
   PHONE EASTER EGG
   ===================================================== */

const hiddenPhone =
    $("hiddenPhone");

const phonePopup =
    $("phonePopup");

const closePhone =
    $("closePhone");


hiddenPhone.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        clickSound();

        phonePopup.classList.add(
            "show"
        );

    }
);


closePhone.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        phonePopup.classList.remove(
            "show"
        );

    }
);


/* =====================================================
   LOVE QUESTION
   ===================================================== */

continueLove.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        clickSound();

        whooshSound();

        showScene(
            "loveQuestionScene"
        );

    }
);


/* =====================================================
   NEXT PAGE
   ===================================================== */

$("nextPage").addEventListener(
    "click",
    event => {

        event.stopPropagation();

        clickSound();

        /*
           Change ONLY this filename if
           your next page uses another name.
        */

        window.location.href =
            "page5.html";

    }
);


/* =====================================================
   GLOBAL TAP STORY
   ===================================================== */

document.addEventListener(
    "click",
    event => {

        /*
           Buttons and special interactive
           elements are ignored here.
        */

        if (
            event.target.closest("button") ||
            event.target.closest(".chat-box") ||
            event.target.closest("#hiddenPhone") ||
            event.target.closest(".cuddle-bed")
        ) {
            return;
        }


        /* PARTY */

        if (
            currentScene ===
            "partyScene"
        ) {

            showPartyMessage();

        }


        /* BLACK STORY */

        else if (
            currentScene ===
            "blackScene"
        ) {

            /*
               The important fix:

               "What happens next?"
               is NOT automatically shown.

               After the final sentence,
               the next tap moves directly
               to the bedroom.
            */

            if (
                blackIndex >=
                blackMessages.length
            ) {

                openBedroom();

            } else {

                showBlackMessage();

            }

        }


        /* BEDROOM */

        else if (
            currentScene ===
            "bedroomIntro"
        ) {

            startChat();

        }

    }
);


/* =====================================================
   INITIALIZATION
   ===================================================== */

window.addEventListener(
    "load",
    () => {

        partyText.textContent =
            partyMessages[0];

        partyIndex = 1;

    }
);

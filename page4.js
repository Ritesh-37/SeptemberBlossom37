/* =====================================================
   PAGE 4 — MIDNIGHT
   AUDIO + STORY + INTERACTIONS
   ===================================================== */


/* =====================================================
   BASIC HELPERS
   ===================================================== */

const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));


const $ = id =>
    document.getElementById(id);


let currentScene = "partyScene";

function showScene(id) {

    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    const target = $(id);

    if (target) {
        target.classList.add("active");
        currentScene = id;
    }
}


/* =====================================================
   WEB AUDIO ENGINE
   No audio files required.
   ===================================================== */

let audioContext = null;
let masterGain = null;
let musicGain = null;
let musicStarted = false;


function initializeAudio() {

    if (audioContext) return;

    audioContext =
        new (window.AudioContext ||
             window.webkitAudioContext)();

    masterGain =
        audioContext.createGain();

    musicGain =
        audioContext.createGain();

    masterGain.gain.value = 0.45;
    musicGain.gain.value = 0.055;

    musicGain.connect(masterGain);
    masterGain.connect(audioContext.destination);

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    startMidnightMusic();
}


/* =====================================================
   SIMPLE SYNTH
   ===================================================== */

function playTone(
    frequency,
    duration = 0.2,
    type = "sine",
    volume = 0.06,
    delay = 0
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
        audioContext.currentTime + delay + 0.025
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + delay + duration
    );

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(
        audioContext.currentTime + delay
    );

    oscillator.stop(
        audioContext.currentTime + delay + duration + 0.05
    );
}


/* =====================================================
   SOFT CLICK
   ===================================================== */

function clickSound() {

    playTone(
        620,
        0.07,
        "sine",
        0.025
    );

    playTone(
        920,
        0.05,
        "sine",
        0.015,
        0.025
    );
}


/* =====================================================
   MESSAGE SOUND
   ===================================================== */

function messageSound(isTisha) {

    if (isTisha) {

        playTone(
            500,
            0.12,
            "sine",
            0.035
        );

    } else {

        playTone(
            650,
            0.12,
            "sine",
            0.035
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
        220,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        700,
        audioContext.currentTime + 0.35
    );

    gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.045,
        audioContext.currentTime + 0.08
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.4
    );

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.45
    );
}


/* =====================================================
   KISS SOUND
   ===================================================== */

function kissSound() {

    if (!audioContext) return;

    const bufferSize =
        audioContext.sampleRate * 0.18;

    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {

        data[i] =
            (Math.random() * 2 - 1) *
            Math.exp(-i / (bufferSize * 0.16));
    }

    const source =
        audioContext.createBufferSource();

    const filter =
        audioContext.createBiquadFilter();

    const gain =
        audioContext.createGain();

    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.7;

    gain.gain.value = 0.025;

    source.buffer = buffer;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    source.start();
}


/* =====================================================
   PLAYFUL TAP / PAT SOUND
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
   SOFT BED SOUND
   ===================================================== */

function bedSound() {

    playTone(
        90,
        0.18,
        "sine",
        0.035
    );

    playTone(
        65,
        0.2,
        "sine",
        0.025,
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
        0.025
    );

    playTone(
        440,
        0.45,
        "sine",
        0.018,
        0.1
    );
}


/* =====================================================
   ROMANTIC MIDNIGHT BGM
   Generated entirely in JS
   ===================================================== */

function startMidnightMusic() {

    if (musicStarted || !audioContext) return;

    musicStarted = true;

    const notes = [
        261.63,
        329.63,
        392.00,
        329.63,
        293.66,
        349.23,
        440.00,
        349.23
    ];

    let index = 0;

    function playNextNote() {

        if (!audioContext) return;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            notes[index];

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.025,
            audioContext.currentTime + 0.5
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 2.6
        );

        oscillator.connect(gain);
        gain.connect(musicGain);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 2.7
        );

        index =
            (index + 1) % notes.length;

        setTimeout(
            playNextNote,
            2600
        );
    }

    playNextNote();


    /* soft lower pad */

    function playPad() {

        if (!audioContext) return;

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "triangle";

        oscillator.frequency.value =
            130.81;

        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.012,
            audioContext.currentTime + 1
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 7
        );

        oscillator.connect(gain);
        gain.connect(musicGain);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 7.2
        );

        setTimeout(
            playPad,
            7000
        );
    }

    playPad();
}


/* =====================================================
   UNLOCK AUDIO ON FIRST TOUCH
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

    "Okay guys... party's over! 😂",

    "Come on everyone... time to go home!",

    "Everyone's finally gone...",

    "Which means...",

    "I can finally have some me time with my babyyy. ❤️"

];

let partyIndex = 0;

const partyText =
    $("partyStoryText");


let partyLocked = false;


function showPartyMessage() {

    if (partyLocked) return;

    partyLocked = true;

    clickSound();

    partyText.style.opacity = "0";

    setTimeout(() => {

        partyText.textContent =
            partyMessages[partyIndex];

        partyText.style.opacity = "1";

        partyIndex++;

        partyLocked = false;

        if (partyIndex >= partyMessages.length) {

            setTimeout(() => {

                partyLocked = true;

                whooshSound();

                showScene("blackScene");

                startBlackStory();

            }, 700);

        }

    }, 350);

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

const blackText =
    $("blackStoryText");


let blackLocked = false;


function showBlackMessage() {

    if (blackLocked) return;

    blackLocked = true;

    clickSound();

    blackText.style.opacity = "0";

    setTimeout(() => {

        blackText.textContent =
            blackMessages[blackIndex];

        blackText.style.transition =
            "opacity 1s ease";

        blackText.style.opacity = "1";

        blackIndex++;

        blackLocked = false;

        if (blackIndex >= blackMessages.length) {

            setTimeout(() => {

                blackText.textContent =
                    "What happens next...?";

                blackText.style.fontSize =
                    "clamp(25px,6vw,42px)";

                blackText.style.color =
                    "#fff1f6";

                blackLocked = false;

            }, 900);

        }

    }, 500);
}


/* =====================================================
   BEDROOM
   ===================================================== */

function openBedroom() {

    clickSound();

    whooshSound();

    showScene("bedroomIntro");
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
        text: "She finds herself in Ritesh's bed..."
    },

    {
        type: "system",
        text: "But he's nowhere beside her. 😤"
    },

    {
        type: "tisha",
        text: "Ritesshhhhhhhhhh 😩❤️"
    },

    {
        type: "ritesh",
        text: "Yesssss love!!!! ❤️"
    },

    {
        type: "tisha",
        text: "Where are you?"
    },

    {
        type: "ritesh",
        text: "I'm changing love."
    },

    {
        type: "tisha",
        text: "I don't care. 😤"
    },

    {
        type: "tisha",
        text: "Come here..."
    },

    {
        type: "tisha",
        text: "Kiss me... ❤️"
    },

    {
        type: "tisha",
        text: "Love me..."
    },

    {
        type: "tisha",
        text: "Cuddle me... 🤗"
    },

    {
        type: "tisha",
        text: "Come fasttttttt!!!! 😭❤️"
    },

    {
        type: "ritesh",
        text: "Okay okayyy 😂❤️"
    },

    {
        type: "ritesh",
        text: "Cominggggg! 🏃‍♂️❤️"
    }

];


const messages =
    $("messages");

const typing =
    $("typing");


async function showTyping() {

    typing.classList.add("active");

    await wait(900);

    typing.classList.remove("active");
}


function addChatMessage(data) {

    const bubble =
        document.createElement("div");

    bubble.classList.add(
        "message",
        data.type
    );

    if (
        data.type === "tisha" ||
        data.type === "ritesh"
    ) {

        const name =
            document.createElement("span");

        name.className =
            "message-name";

        name.textContent =
            data.type === "tisha"
                ? "Tisha"
                : "Ritesh";

        bubble.appendChild(name);
    }

    const text =
        document.createElement("span");

    text.textContent =
        data.text;

    bubble.appendChild(text);

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

    showScene("chatScene");

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

        addChatMessage(data);

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
   KISS SCENE
   ===================================================== */

async function startKissScene() {

    whooshSound();

    showScene("kissScene");

    await wait(700);

    const content =
        document.querySelector(
            ".kiss-content"
        );

    content.classList.add(
        "kiss-scene-active"
    );

    await wait(1200);

    kissSound();

    await wait(1200);

    const kissMark =
        $("kissMark");

    kissMark.style.left = "50%";
    kissMark.style.top = "46%";

    await wait(1200);

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

    showScene("cuddleScene");

    setTimeout(() => {

        cuddleSound();

    }, 800);
}


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


cuddleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            clickSound();

            const choice =
                button.dataset.choice;

            if (choice === "closer") {

                cuddleResponse.textContent =
                    "She snuggled even closer into his arms. 🤗❤️";

            }

            if (choice === "kiss") {

                kissSound();

                cuddleResponse.textContent =
                    "One more little kiss... because apparently one wasn't enough. 💋❤️";

            }

            if (choice === "stay") {

                cuddleResponse.textContent =
                    "Neither of them said anything. They just stayed there together. 🌙❤️";

            }

            continueLove.style.display =
                "block";
        }
    );

});


/* =====================================================
   HIDDEN PHONE
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
    () => {

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
    () => {

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
    () => {

        clickSound();

        /*
         * CHANGE THIS IF YOUR NEXT PAGE
         * HAS A DIFFERENT FILE NAME.
         */

        window.location.href =
            "page5.html";

    }
);


/* =====================================================
   GLOBAL TAP STORY CONTROL
   ===================================================== */

document.addEventListener(
    "click",
    event => {

        /*
         * Ignore clicks on buttons and
         * interactive elements.
         */

        if (
            event.target.closest("button") ||
            event.target.closest(".chat-box") ||
            event.target.closest("#hiddenPhone")
        ) {
            return;
        }


        if (
            currentScene === "partyScene"
        ) {

            showPartyMessage();

        }

        else if (
            currentScene === "blackScene"
        ) {

            /*
             * Once the final black-story
             * message has been displayed,
             * tapping opens bedroom.
             */

            if (
                blackIndex >= blackMessages.length
            ) {

                openBedroom();

            } else {

                showBlackMessage();

            }

        }

        else if (
            currentScene === "bedroomIntro"
        ) {

            startChat();

        }

    }
);


/* =====================================================
   INITIAL STATE
   ===================================================== */

window.addEventListener(
    "load",
    () => {

        partyText.textContent =
            partyMessages[0];

        partyIndex = 1;

        /*
         * First tap starts audio and
         * advances the story.
         */

        initializeAudio();

    }
);

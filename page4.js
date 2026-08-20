/* =====================================================
   PAGE 4
   MIDNIGHT STORY ENGINE
===================================================== */


/* =====================================================
   HELPERS
===================================================== */

const $ = id => document.getElementById(id);

const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));


let currentScene = "partyScene";

function showScene(id) {

    document.querySelectorAll(".scene")
        .forEach(scene =>
            scene.classList.remove("active")
        );

    $(id).classList.add("active");

    currentScene = id;
}


/* =====================================================
   AUDIO ENGINE
===================================================== */

let audio = null;
let master = null;
let music = null;

let audioReady = false;


function initAudio() {

    if (audioReady) return;

    audio =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    master =
        audio.createGain();

    music =
        audio.createGain();

    master.gain.value = 0.65;

    music.gain.value = 0.13;

    music.connect(master);

    master.connect(
        audio.destination
    );

    audio.resume();

    audioReady = true;

    startMusic();
}


/* =====================================================
   MUSIC
===================================================== */

function createMusicNote(
    frequency,
    duration,
    volume
) {

    if (!audio) return;

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        audio.currentTime + .5
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + duration
    );

    oscillator.connect(gain);

    gain.connect(music);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + duration
    );
}


/*
   Romantic progression:

   Am → F → C → G
*/

const musicChords = [

    [220, 261.63, 329.63],

    [174.61, 220, 261.63],

    [130.81, 164.81, 196],

    [196, 246.94, 293.66]

];

let musicIndex = 0;


function startMusic() {

    function chord() {

        const current =
            musicChords[musicIndex];

        current.forEach(
            (note, index) => {

                createMusicNote(
                    note,
                    4.2,
                    index === 0
                        ? .055
                        : .035
                );

            }
        );

        musicIndex =
            (musicIndex + 1)
            % musicChords.length;

        setTimeout(
            chord,
            4000
        );
    }

    chord();
}


/* =====================================================
   EFFECT SOUNDS
===================================================== */

function tone(
    frequency,
    duration,
    volume,
    type = "sine"
) {

    if (!audio) return;

    const osc =
        audio.createOscillator();

    const gain =
        audio.createGain();

    osc.type = type;

    osc.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        audio.currentTime + .02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + duration
    );

    osc.connect(gain);

    gain.connect(master);

    osc.start();

    osc.stop(
        audio.currentTime +
        duration +
        .05
    );
}


function tapSound() {

    tone(
        650,
        .08,
        .035
    );

    setTimeout(
        () =>
            tone(
                900,
                .06,
                .018
            ),
        35
    );
}


function messageSound() {

    tone(
        520,
        .12,
        .035
    );

    setTimeout(
        () =>
            tone(
                760,
                .1,
                .025
            ),
        70
    );
}


function transitionSound() {

    if (!audio) return;

    tone(
        180,
        .3,
        .03
    );

    setTimeout(
        () =>
            tone(
                420,
                .4,
                .025
            ),
        100
    );
}


/* =====================================================
   KISS SOUND
===================================================== */

function kissSound() {

    if (!audio) return;

    const length =
        audio.sampleRate * .2;

    const buffer =
        audio.createBuffer(
            1,
            length,
            audio.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (
        let i = 0;
        i < length;
        i++
    ) {

        data[i] =
            (
                Math.random() * 2 - 1
            )
            *
            Math.exp(
                -i / (length * .13)
            );
    }

    const source =
        audio.createBufferSource();

    const filter =
        audio.createBiquadFilter();

    const gain =
        audio.createGain();

    filter.type = "bandpass";

    filter.frequency.value =
        1400;

    filter.Q.value =
        .8;

    gain.gain.value =
        .055;

    source.buffer =
        buffer;

    source
        .connect(filter)
        .connect(gain)
        .connect(master);

    source.start();
}


/* =====================================================
   PLAYFUL PAT SOUND
===================================================== */

function playfulSound() {

    tone(
        140,
        .09,
        .06,
        "triangle"
    );

    setTimeout(
        () =>
            tone(
                100,
                .12,
                .035
            ),
        40
    );
}


/* =====================================================
   BED / CUDDLE SOUND
===================================================== */

function bedSound() {

    tone(
        75,
        .25,
        .035
    );

    setTimeout(
        () =>
            tone(
                110,
                .25,
                .02
            ),
        80
    );
}


/* =====================================================
   FIRST TAP UNLOCKS AUDIO
===================================================== */

document.addEventListener(
    "pointerdown",
    () => {

        initAudio();

    },
    {
        once: true
    }
);


/* =====================================================
   STARS
===================================================== */

const starContainer =
    $("stars");

for (
    let i = 0;
    i < 35;
    i++
) {

    const star =
        document.createElement("span");

    star.className =
        "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 5 + "s";

    starContainer.appendChild(
        star
    );
}


/* =====================================================
   PARTY STORY
===================================================== */

const partyLines = [

    "Come on guys... the party's over! 🎉",

    "Time to go home, everyone! 😂",

    "Everyone's finally gone...",

    "Which means...",

    "I can finally have some me time with my babyyy... ♥"

];

let partyIndex = 0;

$("partyText").textContent =
    partyLines[0];

partyIndex = 1;


function nextPartyLine() {

    tapSound();

    if (
        partyIndex <
        partyLines.length
    ) {

        $("partyText").style.animation =
            "none";

        void $("partyText").offsetWidth;

        $("partyText").textContent =
            partyLines[partyIndex];

        $("partyText").style.animation =
            "textAppear .8s ease";

        partyIndex++;

        return;
    }

    transitionSound();

    showScene(
        "blackScene"
    );

    startBlackScene();
}


/* =====================================================
   BLACK STORY
===================================================== */

const blackLines = [

    "The party was finally over.",

    "Tisha was completely dizzy after the party.",

    "So Ritesh picked her up in his arms...",

    "...and gently laid her down on his bed.",

    "The house was finally quiet.",

    "And for the first time tonight...",

    "it was just the two of them.",

    "What happens next...?"

];

let blackIndex = 0;

let blackFinished = false;


function startBlackScene() {

    $("blackText").textContent =
        blackLines[0];

    blackIndex = 1;

    blackFinished = false;
}


function nextBlackLine() {

    tapSound();

    if (
        blackIndex <
        blackLines.length
    ) {

        $("blackText").style.animation =
            "none";

        void $("blackText").offsetWidth;

        $("blackText").textContent =
            blackLines[blackIndex];

        $("blackText").style.animation =
            "textAppear .8s ease";

        blackIndex++;

        return;
    }

    /*
       IMPORTANT:

       Nothing automatically happens here.

       She must tap AGAIN.
    */

    if (!blackFinished) {

        blackFinished = true;

        return;
    }

    transitionSound();

    showScene(
        "bedroomScene"
    );
}


/* =====================================================
   CHAT
===================================================== */

const chat = [

    {
        type: "system",
        text: "Tisha wakes up... 🌙"
    },

    {
        type: "system",
        text: "She looks around and realizes she's in his bed."
    },

    {
        type: "system",
        text: "Then she notices something very important..."
    },

    {
        type: "tisha",
        text: "RITESSHHHHHHHHHH 😤♥"
    },

    {
        type: "ritesh",
        text: "Yessssss love!!!! 😭♥"
    },

    {
        type: "tisha",
        text: "Where are youuuuu? 🥺"
    },

    {
        type: "ritesh",
        text: "I'm in the washroom... Changing clothessssss... 😭😂"
    },

    {
        type: "tisha",
        text: "I don't careeee. 😤"
    },

    {
        type: "tisha",
        text: "Come here right nowwwww. 🥺♥"
    },

    {
        type: "tisha",
        text: "Kiss me. 💋"
    },

    {
        type: "tisha",
        text: "Love me. ♥"
    },

    {
        type: "tisha",
        text: "Cuddle me. 🤗"
    },

    {
        type: "tisha",
        text: "Come fasttttttttttt!!!! 😭♥"
    },

    {
        type: "ritesh",
        text: "Okay okayyyyyy 😂"
    },

    {
        type: "ritesh",
        text: "I'm cominggggggg! 🏃‍♂️💨♥"
    }

];


let chatIndex = 0;

let chatStarted = false;


async function startChat() {

    if (chatStarted) return;

    chatStarted = true;

    showScene(
        "chatScene"
    );

    await wait(600);

    showNextChat();
}


async function showNextChat() {

    if (
        chatIndex >=
        chat.length
    ) {

        await wait(500);

        startKissScene();

        return;
    }

    const data =
        chat[chatIndex];

    if (
        data.type ===
        "tisha" ||
        data.type ===
        "ritesh"
    ) {

        $("typing").classList.add(
            "active"
        );

        await wait(650);

        $("typing").classList.remove(
            "active"
        );
    }

    const bubble =
        document.createElement("div");

    bubble.className =
        `message ${data.type}`;

    if (
        data.type === "tisha" ||
        data.type === "ritesh"
    ) {

        const name =
            document.createElement(
                "span"
            );

        name.className =
            "name";

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

    $("messages").appendChild(
        bubble
    );

    messageSound();

    $("messages").scrollTop =
        $("messages").scrollHeight;

    chatIndex++;
}


/* =====================================================
   KISS
===================================================== */

let kissStarted = false;


async function startKissScene() {

    if (kissStarted) return;

    kissStarted = true;

    transitionSound();

    showScene(
        "kissScene"
    );

    await wait(700);

    /*
       Boy and girl visibly move
       toward each other.
    */

    $("kissCouple")
        .classList.add(
            "kissApproach"
        );

    await wait(1300);

    kissSound();

    createKissParticles();

    /*
       Keep kiss effects for 3 seconds.
    */

    await wait(3000);

    $("kissCouple")
        .classList.remove(
            "kissApproach"
        );

    await wait(500);

    playfulSound();

    $("kissScene")
        .classList.add(
            "teaseVisible"
        );

    await wait(1000);

    $("kissScene")
        .classList.add(
            "reactionVisible"
        );

    await wait(1500);

    startCuddleScene();
}


/* =====================================================
   CSS KISS EMOJIS
===================================================== */

function createKissParticles() {

    const container =
        $("kissParticles");

    container.innerHTML = "";

    const symbols = [
        "💋",
        "♥",
        "♡",
        "😘",
        "💋",
        "♥",
        "♡",
        "💋"
    ];

    symbols.forEach(
        (symbol, index) => {

            const kiss =
                document.createElement(
                    "span"
                );

            kiss.className =
                "kissEmoji";

            kiss.textContent =
                symbol;

            kiss.style.left =
                (35 +
                 Math.random() * 30)
                + "%";

            kiss.style.top =
                (40 +
                 Math.random() * 12)
                + "%";

            kiss.style.setProperty(
                "--x",
                (
                    Math.random() * 160
                    - 80
                ).toFixed(0)
            );

            kiss.style.animationDelay =
                (
                    index * .12
                ) + "s";

            container.appendChild(
                kiss
            );

        }
    );
}


/* =====================================================
   CUDDLE
===================================================== */

let cuddleStage = 0;


function startCuddleScene() {

    transitionSound();

    bedSound();

    showScene(
        "cuddleScene"
    );

    cuddleStage = 0;

    $("cuddleScene")
        .className =
        "scene active";

    updateCuddle();
}


function updateCuddle() {

    $("cuddleScene")
        .classList.remove(
            "cuddleStage1",
            "cuddleStage2",
            "cuddleStage3",
            "cuddleStage4"
        );

    if (cuddleStage > 0) {

        $("cuddleScene")
            .classList.add(
                `cuddleStage${cuddleStage}`
            );
    }

    const dots =
        document.querySelectorAll(
            "#cuddleProgress span"
        );

    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index <
                cuddleStage
            );

        }
    );


    if (cuddleStage === 0) {

        $("cuddleMessage").textContent =
            "Tap to move closer...";

    }

    if (cuddleStage === 1) {

        $("cuddleMessage").textContent =
            "A little closer... 🤍";

    }

    if (cuddleStage === 2) {

        $("cuddleMessage").textContent =
            "Closer... 🤗";

    }

    if (cuddleStage === 3) {

        $("cuddleMessage").textContent =
            "Almost there... ♥";

    }

    if (cuddleStage === 4) {

        $("cuddleMessage").textContent =
            "Exactly where they wanted to be. 🌙♥";

    }
}


/* =====================================================
   GLOBAL TAP
===================================================== */

document.addEventListener(
    "pointerup",
    event => {

        /*
           Don't interfere with the final
           button.
        */

        if (
            event.target.closest("button")
        ) {
            return;
        }


        /* PARTY */

        if (
            currentScene ===
            "partyScene"
        ) {

            nextPartyLine();

            return;
        }


        /* BLACK */

        if (
            currentScene ===
            "blackScene"
        ) {

            nextBlackLine();

            return;
        }


        /* BEDROOM */

        if (
            currentScene ===
            "bedroomScene"
        ) {

            startChat();

            return;
        }


        /* CHAT */

        if (
            currentScene ===
            "chatScene"
        ) {

            showNextChat();

            return;
        }


        /* CUDDLE */

        if (
            currentScene ===
            "cuddleScene"
        ) {

            if (
                cuddleStage <
                4
            ) {

                cuddleStage++;

                cuddleSound();

                updateCuddle();

            } else {

                transitionSound();

                showScene(
                    "loveScene"
                );
            }

            return;
        }

    }
);


/* =====================================================
   PAGE 5
===================================================== */

$("page5Button")
    .addEventListener(
        "click",
        () => {

            tapSound();

            /*
               Change filename if needed.
            */

            window.location.href =
                "page5.html";

        }
    );

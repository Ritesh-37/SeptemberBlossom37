/* =========================================
   PAGE 4 - MIDNIGHT STORY
   ========================================= */


/* =========================================
   HELPER
   ========================================= */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================
   SCENE SWITCHING
   ========================================= */

function showScene(sceneId) {

    document.querySelectorAll(".scene").forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(sceneId);

    if (target) {
        target.classList.add("active");
    }
}


/* =========================================
   PARTY POPUPS
   ========================================= */

const partyMessages = [

    "Okay guys... party's over! 😂",

    "Come on everyone... time to go home!",

    "Everyone's finally gone...",

    "Which means...",

    "I can finally have some me time with my babyyy. ❤️"

];


const partyText = document.getElementById("partyText");


async function startPartyEnding() {

    for (let i = 0; i < partyMessages.length; i++) {

        partyText.style.opacity = "0";

        await wait(500);

        partyText.textContent = partyMessages[i];

        partyText.style.transition = "opacity 0.7s ease";
        partyText.style.opacity = "1";

        await wait(
            i === partyMessages.length - 1
                ? 2500
                : 2200
        );
    }

    await wait(500);

    showScene("blackScene");

    startBlackStory();
}


/* =========================================
   BLACK SCREEN STORY
   ========================================= */

const blackText = document.getElementById("blackText");
const blackContinue = document.getElementById("blackContinue");

const blackMessages = [

    "The party was finally over.",

    "Tisha was completely dizzy after the party.",

    "So Ritesh picked her up in his arms...",

    "...and gently laid her down on his bedroom bed.",

    "But the night wasn't over yet."

];


async function startBlackStory() {

    for (let i = 0; i < blackMessages.length; i++) {

        blackText.style.opacity = "0";

        await wait(500);

        blackText.textContent = blackMessages[i];

        blackText.style.transition = "opacity 1s ease";
        blackText.style.opacity = "1";

        await wait(2200);
    }

    blackContinue.style.opacity = "1";
    blackContinue.style.pointerEvents = "auto";
}


/* =========================================
   CONTINUE TO BEDROOM
   ========================================= */

blackContinue.addEventListener("click", () => {

    blackContinue.style.opacity = "0";
    blackContinue.style.pointerEvents = "none";

    showScene("bedroomScene");

    startMidnightScene();

});


/* =========================================
   MIDNIGHT CHAT
   ========================================= */

const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");
const runButton = document.getElementById("runButton");


const chatData = [

    {
        sender: "system",
        text: "Tisha wakes up... 🌙"
    },

    {
        sender: "system",
        text: "She finds herself in Ritesh's bed..."
    },

    {
        sender: "system",
        text: "But he's nowhere beside her. 😤"
    },

    {
        sender: "tisha",
        text: "Ritesshhhhhhhhhh 😩❤️"
    },

    {
        sender: "ritesh",
        text: "Yesssss love!!!! ❤️"
    },

    {
        sender: "tisha",
        text: "Where are you?"
    },

    {
        sender: "ritesh",
        text: "I'm changing love."
    },

    {
        sender: "tisha",
        text: "I don't care. 😤"
    },

    {
        sender: "tisha",
        text: "Come here..."
    },

    {
        sender: "tisha",
        text: "Kiss me... ❤️"
    },

    {
        sender: "tisha",
        text: "Love me..."
    },

    {
        sender: "tisha",
        text: "Cuddle me... 🤗"
    },

    {
        sender: "tisha",
        text: "Come fasttttttt!!!! 😭❤️"
    },

    {
        sender: "ritesh",
        text: "Okay okayyy 😂❤️"
    },

    {
        sender: "ritesh",
        text: "Cominggggg!"
    }

];


/* =========================================
   ADD MESSAGE
   ========================================= */

function addMessage(message) {

    const bubble = document.createElement("div");

    bubble.classList.add("message");

    if (message.sender === "tisha") {
        bubble.classList.add("tisha");
    }

    else if (message.sender === "ritesh") {
        bubble.classList.add("ritesh");
    }

    else {
        bubble.classList.add("system-message");

        bubble.style.alignSelf = "center";
        bubble.style.maxWidth = "90%";
        bubble.style.background = "transparent";
        bubble.style.border = "none";
        bubble.style.color = "rgba(255,255,255,0.45)";
        bubble.style.textAlign = "center";
        bubble.style.fontSize = "12px";
        bubble.style.fontStyle = "italic";
    }


    if (
        message.sender === "tisha" ||
        message.sender === "ritesh"
    ) {

        const name = document.createElement("span");

        name.classList.add("message-name");

        name.textContent =
            message.sender === "tisha"
                ? "Tisha"
                : "Ritesh";

        bubble.appendChild(name);

    }


    const text = document.createElement("span");

    text.textContent = message.text;

    bubble.appendChild(text);

    chatMessages.appendChild(bubble);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================================
   TYPING EFFECT
   ========================================= */

async function showTyping() {

    typingIndicator.classList.add("active");

    await wait(1000);

    typingIndicator.classList.remove("active");
}


/* =========================================
   PLAY CHAT
   ========================================= */

async function startMidnightScene() {

    await wait(1500);

    for (let i = 0; i < chatData.length; i++) {

        const message = chatData[i];

        if (
            message.sender === "tisha" ||
            message.sender === "ritesh"
        ) {

            await showTyping();

        }

        else {

            await wait(800);

        }

        addMessage(message);

        await wait(
            message.sender === "system"
                ? 1000
                : 700
        );
    }

    runButton.classList.add("show");
}


/* =========================================
   RUN TO HER BUTTON
   ========================================= */

runButton.addEventListener("click", async () => {

    runButton.classList.remove("show");

    addMessage({
        sender: "system",
        text: "Ritesh couldn't keep his baby waiting... ❤️"
    });

    await wait(1500);

    showScene("endingScene");

});


/* =========================================
   NEXT PAGE
   ========================================= */

const nextPageButton =
    document.getElementById("nextPageButton");


nextPageButton.addEventListener("click", () => {

    /*
        CHANGE THIS TO THE FILE NAME
        OF YOUR NEXT PAGE.

        Example:
        window.location.href = "page5.html";
    */

    window.location.href = "page5.html";

});


/* =========================================
   START PAGE
   ========================================= */

window.addEventListener("load", () => {

    startPartyEnding();

});

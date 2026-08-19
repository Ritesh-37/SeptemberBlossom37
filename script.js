document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================== */

    const loadingScreen = document.getElementById("loading-screen");

    const giftScreen = document.getElementById("gift-screen");
    const entranceScreen = document.getElementById("entrance-screen");
    const passwordScreen = document.getElementById("password-screen");

    const envelope = document.getElementById("envelope");
    const openGiftButton = document.getElementById("open-gift-btn");

    const curiousButton = document.getElementById("curious-btn");

    const passwordInput = document.getElementById("password-input");
    const unlockButton = document.getElementById("unlock-btn");

    const wrongPopup = document.getElementById("wrong-popup");
    const tryAgainButton = document.getElementById("try-again-btn");

    const successPopup = document.getElementById("success-popup");
    const continueButton = document.getElementById("continue-btn");

    const backgroundMusic = document.getElementById("background-music");
    const musicControl = document.getElementById("music-control");

    const passwordHint = document.getElementById("password-hint");


    /* =========================================
       PASSWORD
    ========================================== */

    const correctPassword = "0309";


    /* =========================================
       INITIAL LOADING
    ========================================== */

    setTimeout(function () {

        loadingScreen.classList.add("hide");

    }, 1400);


    /* =========================================
       SHOW SCREEN
    ========================================== */

    function showScreen(screenToShow) {

        const screens = [
            giftScreen,
            entranceScreen,
            passwordScreen
        ];

        screens.forEach(function (screen) {
            screen.classList.remove("active");
        });

        setTimeout(function () {

            screenToShow.classList.add("active");

        }, 150);

    }


    /* =========================================
       MUSIC
    ========================================== */

    function startMusic() {

        if (!backgroundMusic) {
            return;
        }

        backgroundMusic.volume = 0.35;

        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(function () {

                    musicControl.classList.add("visible");
                    musicControl.classList.remove("muted");

                })
                .catch(function () {

                    musicControl.classList.add("visible");
                    musicControl.classList.add("muted");

                });

        }
    }


    musicControl.addEventListener("click", function () {

        if (backgroundMusic.paused) {

            backgroundMusic.play();

            musicControl.classList.remove("muted");

        } else {

            backgroundMusic.pause();

            musicControl.classList.add("muted");

        }

    });


    /* =========================================
       OPEN ENVELOPE
    ========================================== */

    function openGift() {

        if (envelope.classList.contains("opening")) {
            return;
        }

        envelope.classList.add("opening");

        openGiftButton.disabled = true;

        setTimeout(function () {

            showScreen(entranceScreen);

        }, 850);

    }


    openGiftButton.addEventListener("click", openGift);

    envelope.addEventListener("click", openGift);


    /* =========================================
       ENTER MAIN SURPRISE
    ========================================== */

    curiousButton.addEventListener("click", function () {

        showScreen(passwordScreen);

        setTimeout(function () {

            passwordInput.focus();

        }, 700);

    });


    /* =========================================
       PASSWORD CHECK
    ========================================== */

    function checkPassword() {

        const enteredPassword = passwordInput.value.trim();

        passwordHint.textContent = "";

        if (enteredPassword === correctPassword) {

            unlockButton.disabled = true;

            unlockButton.textContent = "CHECKING... 👀";

            passwordInput.classList.add("unlock-success");

            setTimeout(function () {

                unlockButton.textContent = "✓ IT'S HER! ❤️";

            }, 600);

            setTimeout(function () {

                startMusic();

                successPopup.classList.add("show");

            }, 1100);

        } else {

            passwordInput.value = "";

            wrongPopup.classList.add("show");

        }

    }


    unlockButton.addEventListener("click", checkPassword);


    /* =========================================
       ENTER KEY
    ========================================== */

    passwordInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    });


    /* =========================================
       ONLY ALLOW NUMBERS
    ========================================== */

    passwordInput.addEventListener("input", function () {

        passwordInput.value =
            passwordInput.value.replace(/\D/g, "");

    });


    /* =========================================
       TRY AGAIN
    ========================================== */

    tryAgainButton.addEventListener("click", function () {

        wrongPopup.classList.remove("show");

        setTimeout(function () {

            passwordInput.focus();

        }, 300);

    });


    /* =========================================
       CONTINUE TO PAGE 2
    ========================================== */

    continueButton.addEventListener("click", function () {

        successPopup.classList.remove("show");

        /*
         * Page 2 will replace this temporary
         * action when we build the next page.
         */

        setTimeout(function () {

            alert(
                "Page 2 will be connected here next! ❤️"
            );

            passwordScreen.classList.add("active");

        }, 500);

    });


    /* =========================================
       CLOSE POPUPS BY CLICKING OUTSIDE
    ========================================== */

    wrongPopup.addEventListener("click", function (event) {

        if (event.target === wrongPopup) {

            wrongPopup.classList.remove("show");

        }

    });


    successPopup.addEventListener("click", function (event) {

        if (event.target === successPopup) {

            successPopup.classList.remove("show");

        }

    });

});

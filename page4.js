<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#09050b">

    <title>Midnight With You</title>

    <link rel="stylesheet" href="page4.css">
</head>

<body>

    <main id="app">

        <!-- Background -->
        <div class="stars" aria-hidden="true">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>·</span>
            <span>✦</span>
            <span>·</span>
            <span>✧</span>
            <span>✦</span>
            <span>·</span>
            <span>✧</span>
            <span>✦</span>
        </div>

        <!-- Music -->
        <button id="musicBtn" class="music-btn" type="button">
            ♫
        </button>

        <!-- Invisible tap area -->
        <button
            id="tapLayer"
            class="tap-layer"
            type="button"
            aria-label="Continue">
        </button>

        <!-- Story popup -->
        <section id="story" class="story-card hidden">

            <div id="storyEmoji" class="story-emoji">
                🌙
            </div>

            <p id="storyText"></p>

        </section>


        <!-- Black screen / disclaimer -->
        <section id="disclaimer" class="full-screen hidden">

            <div class="disclaimer-card">

                <div class="tiny-label">
                    MIDNIGHT • 12:00 AM
                </div>

                <h2>
                    What happened next?
                </h2>

                <p>
                    Tisha was completely dizzy after the party.
                    Ritesh carefully picked her up, carried her to
                    his bedroom and laid her down comfortably on the bed. 🌙
                </p>

                <button
                    id="bedroomBtn"
                    class="primary-btn"
                    type="button">
                    Continue
                </button>

            </div>

        </section>


        <!-- Bedroom -->
        <section id="bedroom" class="scene hidden">

            <div class="moon"></div>

            <div class="window">
                <div class="window-frame vertical"></div>
                <div class="window-frame horizontal"></div>
            </div>

            <div class="bedroom-caption">
                A little later that night… 🌙
            </div>

            <div class="bed">

                <div class="headboard"></div>

                <div class="pillow pillow-one"></div>
                <div class="pillow pillow-two"></div>

                <div class="blanket"></div>

            </div>


            <div id="tisha" class="person person-girl">
                <div class="head">
                    👩🏻
                </div>

                <div class="body"></div>
            </div>


            <div id="ritesh" class="person person-boy">
                <div class="head">
                    👨🏻
                </div>

                <div class="body"></div>
            </div>

        </section>


        <!-- Midnight chat -->
        <section id="chatSection" class="chat-section hidden">

            <div class="chat-top">

                <div class="profile-dot">
                    🌙
                </div>

                <div>
                    <strong>
                        Midnight
                    </strong>

                    <span>
                        just you two ✨
                    </span>
                </div>

            </div>


            <div id="chatMessages" class="chat-messages"></div>

            <button
                id="chatNext"
                class="chat-next hidden"
                type="button">
                Continue
            </button>

        </section>


        <!-- Kiss -->
        <section id="kissScene" class="action-scene hidden">

            <div class="scene-title">
                He ran to her… 💗
            </div>


            <div class="action-stage">

                <div class="character boy-character">

                    <div class="char-head">
                        👨🏻
                    </div>

                    <div class="char-body boy-shirt"></div>

                </div>


                <div class="character girl-character">

                    <div class="char-head">
                        👩🏻
                    </div>

                    <div class="char-body girl-dress"></div>

                </div>


                <div class="kiss-cloud"></div>

                <div class="kiss-lips">
                    💋
                </div>

            </div>


            <p class="action-caption">
                He ran to her and planted a sweet kiss. 💋
            </p>


            <button
                id="kissNext"
                class="primary-btn"
                type="button">
                Come closer…
            </button>

        </section>


        <!-- Playful scene -->
        <section id="teaseScene" class="action-scene hidden">

            <div class="scene-title">
                And then… 😏
            </div>


            <div class="tease-stage">

                <div class="character tease-boy">

                    <div class="char-head">
                        👨🏻
                    </div>

                    <div class="char-body boy-shirt"></div>

                </div>


                <div class="character tease-girl">

                    <div class="char-head">
                        👩🏻
                    </div>

                    <div class="char-body girl-dress"></div>

                </div>


                <div id="teaseHand" class="tease-hand">
                    🤚
                </div>


                <div id="teaseSparkles" class="tease-sparkles">
                    ✨ ✦ ✨
                </div>

            </div>


            <p class="action-caption">
                A playful little tap… and she couldn't stop laughing. 😂💗
            </p>


            <button
                id="teaseNext"
                class="primary-btn"
                type="button">
                Now cuddle… 🫶
            </button>

        </section>


        <!-- Cuddling -->
        <section id="cuddleScene" class="action-scene hidden">

            <div class="scene-title">
                Come here, love… 🫶
            </div>


            <div id="cuddleStage" class="cuddle-stage">

                <div class="cuddle-person cuddle-boy">

                    <div class="char-head">
                        👨🏻
                    </div>

                    <div class="char-body boy-shirt"></div>

                </div>


                <div class="cuddle-person cuddle-girl">

                    <div class="char-head">
                        👩🏻
                    </div>

                    <div class="char-body girl-dress"></div>

                </div>


                <div class="cuddle-heart">
                    ♡
                </div>

            </div>


            <p id="cuddleText" class="action-caption">
                She moves a little closer… 💗
            </p>


            <button
                id="cuddleBtn"
                class="primary-btn"
                type="button">
                Cuddle closer 🫶
            </button>

        </section>


        <!-- Final question -->
        <section id="loveScene" class="love-scene hidden">

            <div class="love-glow">
                ♥
            </div>


            <div class="love-card">

                <div class="tiny-label">
                    JUST US
                </div>


                <h1>
                    Do you love me?
                </h1>


                <p>
                    Look me in the eyes and answer honestly. 🥺💗
                </p>


                <div class="love-buttons">

                    <button
                        id="yesBtn"
                        class="primary-btn"
                        type="button">
                        Yes, Ritesh. 💗
                    </button>


                    <button
                        id="moreBtn"
                        class="secondary-btn"
                        type="button">
                        Ask me how much… ✨
                    </button>

                </div>


                <div
                    id="loveAnswer"
                    class="love-answer hidden">

                    <strong>
                        How much?
                    </strong>

                    <p>
                        More than all the stars outside this window. 🌌
                        More than I could ever put into words. ❤️
                    </p>


                    <button
                        id="finishBtn"
                        class="primary-btn"
                        type="button">
                        Keep this moment… 🌙
                    </button>

                </div>

            </div>

        </section>

    </main>


    <script src="page4.js"></script>

</body>
</html>

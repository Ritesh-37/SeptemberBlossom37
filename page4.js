document.addEventListener("DOMContentLoaded", function () {

    const wakeButton = document.getElementById("wakeButton");
    const introScene = document.getElementById("introScene");
    const teaseScene = document.getElementById("teaseScene");

    console.log("PAGE 4 JS LOADED");
    console.log("Wake button:", wakeButton);
    console.log("Intro:", introScene);
    console.log("Tease:", teaseScene);

    wakeButton.addEventListener("click", function () {

        alert("WAKE UP CLICK IS WORKING!");

        introScene.classList.remove("active");
        introScene.classList.add("hidden");

        teaseScene.classList.remove("hidden");
        teaseScene.classList.add("active");

    });

});

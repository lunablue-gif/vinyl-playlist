const vinyl = document.getElementById("vinyl");
const arm = document.getElementById("arm");
const audio = document.getElementById("audio");
const volumeKnob = document.getElementById("volumeKnob");
const songKnob = document.getElementById("songKnob");
const background = document.getElementById("background");
const cover = document.getElementById("cover");

let playing = false;
let volume = 0.5;
let songIndex = 0;
let volumeRotation = 0;
let songRotation = 0;

const songs = [
    { src: "songs/song1.mp3", cover: "assets/song1.png" },
    { src: "songs/song2.mp3", cover: "assets/song2.png" },
    { src: "songs/song3.mp3", cover: "assets/song3.png" },
    { src: "songs/song4.mp3", cover: "assets/song4.png" },
    { src: "songs/song5.mp3", cover: "assets/song5.png" },
    { src: "songs/song6.mp3", cover: "assets/song6.png" },
    { src: "songs/song7.mp3", cover: "assets/song7.png" },
    { src: "songs/song8.mp3", cover: "assets/song8.png" },
    { src: "songs/song9.mp3", cover: "assets/song9.png" },

];

function playSong() {
    audio.src = songs[songIndex].src;
    audio.volume = volume;
    audio.play();
    vinyl.style.animation = "spin 3s linear infinite";
    arm.style.transform = "rotate(20deg)";

    // Change background image dynamically
    background.style.background = `url('${songs[songIndex].cover}') no-repeat center`;
    background.style.backgroundSize = "cover";

    // Change vinyl cover image dynamically
    cover.style.background = `url('${songs[songIndex].cover}') no-repeat center`;
    cover.style.backgroundSize = "cover";
}

function pauseSong() {
    audio.pause();
    vinyl.style.animation = "none";
    arm.style.transform = "rotate(0deg)";
}

arm.addEventListener("click", () => {
    if (!playing) {
        playSong();
    } else {
        pauseSong();
    }
    playing = !playing;
});

function handleKnobClick(event, knobType) {
    event.preventDefault();

    if (knobType === "volume") {
        if (event.button === 2) {
            volume = Math.min(1, volume + 0.1);
            volumeRotation += 15;
        } else if (event.button === 0) {
            volume = Math.max(0, volume - 0.1);
            volumeRotation -= 15;
        }
        audio.volume = volume;
        volumeKnob.style.transform = `rotate(${volumeRotation}deg)`;
    } else if (knobType === "song") {
        if (event.button === 2) {
            songIndex = (songIndex + 1) % songs.length;
            songRotation += 15;
        } else if (event.button === 0) {
            songIndex = (songIndex - 1 + songs.length) % songs.length;
            songRotation -= 15;
        }
        if (playing) playSong();
        songKnob.style.transform = `rotate(${songRotation}deg)`;
    }
}

volumeKnob.addEventListener("mousedown", (e) => handleKnobClick(e, "volume"));
songKnob.addEventListener("mousedown", (e) => handleKnobClick(e, "song"));

volumeKnob.addEventListener("contextmenu", (e) => e.preventDefault());
songKnob.addEventListener("contextmenu", (e) => e.preventDefault());

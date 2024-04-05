const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
pipBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 400000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));



function show1() {
    Swal.fire({
        title: "ari lasso",
        text: "Dewa 19 sering menampilkan vokalis tamu seperti Ari Lasso",
        imageUrl: "./assets/image/arilasso.jpg",
        imageWidth: 250,
        imageHeight: 400,
        imageAlt: "Custom image"
      });
}
function show2() {
    Swal.fire({
        title: "once",
        text: "Dewa 19 sering menampilkan vokalis tamu seperti once",
        imageUrl: "./assets/image/once.jpg",
        imageWidth: 250,
        imageHeight: 400,
        imageAlt: "Custom image"
      });
}
function show3() {
    Swal.fire({
        title: "virzha",
        text: "Dewa 19 sering menampilkan vokalis tamu seperti virzha",
        imageUrl: "./assets/image/virzha.jpg",
        imageWidth: 250,
        imageHeight: 400,
        imageAlt: "Custom image"
      });
}


let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImage = document.querySelector(".song-img");
let songTitle = document.querySelector("h2");
let songDescription = document.querySelector("p");

// Daftar lagu
let songs = [
    { title: "Tak akan ada cinta yang lain",description:"dewa 19", image: "./assets/image/giphy.gif", src: "./assets/music/Dewa 19 - Tak Kan Ada Cinta yang Lain _ Official Lyric Video.mp3" },
    { title: "Munajat cinta",description:"dewa 19", image: "./assets/image/sad2.gif", src: "./assets/music/The Rock - Munajat Cinta (Official Music Video).mp3" },
 
];

let currentSongIndex = 0;

// Fungsi untuk memutar lagu
function playSong() {
    let currentSong = songs[currentSongIndex];
    song.src = currentSong.src;
    songTitle.textContent = currentSong.title;
    songDescription.textContent = currentSong.description;
    songImage.src = currentSong.image;
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Fungsi untuk berikutnya
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
}

// Fungsi untuk sebelumnya
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
}

// Memperbarui nilai progress saat lagu dimuat
song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

// Memperbarui nilai progress saat lagu berubah waktu
song.ontimeupdate = function() {
    progress.value = song.currentTime;
}

// Memainkan atau menjeda lagu saat ikon kontrol diklik
function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Memainkan lagu dari posisi progress yang dipilih
progress.oninput = function() {
    song.currentTime = progress.value;
}

// Memutar lagu berikutnya saat lagu saat ini selesai
song.onended = function() {
    nextSong();
}
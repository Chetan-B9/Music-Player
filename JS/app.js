let musicName = document.querySelector(".title_container h2");
let Audio = document.getElementById("audio");
const buttonIcon = document.querySelector(".play i");
const button_status = document.querySelector(".play");
const progresBar = document.querySelector(".progress_bar");
const timeline = document.querySelector("#timeline");
const image = document.querySelector(".image_container img");
const iframe = document.querySelector(".image_container iframe");
const firstWindow = document.querySelector(".selector");
const music_player = document.querySelector(".music_player");

// variables for loop operations
const loop = document.getElementById("notInLoop");
let Loop = false;

// timeline variables
const currentTime = document.querySelector(".audio_time p:nth-child(1)");
const duration = document.querySelector(".audio_time p:nth-child(2)");
const fileName = [];
let index = 0;

// function to get music folder from the local device
async function selectFolder() {
  try {
    const directoryHandle = await window.showDirectoryPicker();

    for await (const entry of directoryHandle) {
      if (entry[0].match(".mp3") || entry[0].match(".wav")) {
        fileName.push(entry[0]);
      }
    }

    if (fileName.length > 0) {
      firstWindow.style.display = "none";
      music_player.style.display = "flex";
    }

    Audio.src = `./Music/${fileName[index]}`;
    musicName.textContent = fileName[index];
  } catch (error) {
    console.log("Error : ", error);
  }
}

// function for play and pause operation
const playAudio = () => {
  if (button_status.className === "play") {
    button_status.className = "pause";
    Audio.play();
    currentTime.innerHTML = Audio.currentTime;
    buttonIcon.className = "fa-solid fa-pause";
    image.style.display = "none";
    iframe.style.display = "block";

    visualizer_function();
  } else {
    button_status.className = "play";
    Audio.pause();
    buttonIcon.className = "fa-solid fa-play";
    image.style.display = "block";
    iframe.style.display = "none";
  }
};

Audio.ontimeupdate = () => {
  // Timeline updatation
  let moveLine = (Audio.currentTime / Audio.duration) * 100;
  timeline.style.width = `${Math.floor(moveLine)}%`;

  // current time calculation
  var currentMinutes = Math.floor(Audio.currentTime / 60);
  var currentSeconds = Math.floor(Audio.currentTime % 60);
  let CurrentTime = `${currentMinutes}:${currentSeconds}`;

  // calculating total length of the music
  let minutes = Math.floor(Audio.duration / 60);
  let seconds = Math.floor(Audio.duration % 60);
  let Duration = `${minutes}:${seconds}`;

  currentSeconds < 10
    ? (currentTime.innerHTML = `${currentMinutes}:0${currentSeconds}`)
    : (currentTime.innerHTML = CurrentTime);
  duration.innerHTML = Duration;

  if (Loop === true) {
    // if user on the repeat music button, then this condition will be execute
    setTimeout(() => {
      if (
        (currentMinutes === minutes && currentSeconds === seconds) ||
        (minutes === NaN && seconds === NaN)
      ) {
        Audio.play();
      }
    }, 1000);
    loop.id = "inLoop";
    loop.style.color = "#9400FF";
  } else {
    // if user off the repeate option then this condition will be execute
    if (
      (currentMinutes === minutes && currentSeconds === seconds) ||
      (minutes === NaN && seconds === NaN)
    ) {
      nextSong();
    }

    loop.id = "notInLoop";
    loop.style.color = "#27005D";
  }
};

// function to control the progresBar
progresBar.addEventListener("click", (event) => {
  let startTimeWith = (event.offsetX / 304) * Audio.duration;
  Audio.currentTime = startTimeWith;
});

// function to change the music to the next one
function nextSong() {
  index++;
  if (index > fileName.length - 1) {
    index = 0;
  }
  Audio.src = `./Music/${fileName[index]}`;
  musicName.textContent = fileName[index];
  Audio.play();
}

// function to change the music to previews one
function previousSong() {
  index--;
  if (index < 0) {
    index = fileName.length - 1;
  }
  Audio.src = `./Music/${fileName[index]}`;
  musicName.textContent = fileName[index];
  Audio.play();
}

// function to stuck the music in loop
const loopControl = () => {
  Loop === false ? (Loop = true) : (Loop = false);
};

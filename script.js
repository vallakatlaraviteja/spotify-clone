function playAll(songnumber) {
  var audioElement = document.getElementById("song");
  var playBtn = document.getElementById("play-pause");
  var songFileName = `music/${songnumber}.mp3`;
  var currentRow = document.getElementById(`song${songnumber}`);

  
  document
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("playing"));

  if (
    audioElement.getAttribute("src") == songFileName &&
    !audioElement.paused
  ) {
    audioElement.pause();
    playBtn.innerHTML = '<img src="images/play-button.svg">';
  } else {
    audioElement.setAttribute("src", songFileName);
    audioElement.play();
    playBtn.innerHTML = '<img src="images/pause-button.svg">';

    currentRow.classList.add("playing");

    audioElement.ontimeupdate = function () {
      updateTime(currentRow, audioElement);
    };
  }
}

function playaudio() {
  var audio = document.getElementById("song");
  var playBtn = document.getElementById("play-pause");

  if (!audio.getAttribute("src") || audio.getAttribute("src") === "") {
    playAll(1);
  } else {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '<img src="images/pause-button.svg">';
    } else {
      audio.pause();
      playBtn.innerHTML = '<img src="images/play-button.svg">';
    }
  }
}

function updateTime(currentRow, audioElement) {
  var duration = currentRow.querySelector("td:last-child");
  var remaining = audioElement.duration - audioElement.currentTime;

  var minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  var seconds = Math.floor(remaining % 60)
    .toString()
    .padStart(2, "0");

  duration.textContent = `${minutes}:${seconds}`;
}

function playAll(songnumber) {
    var audioElement = document.getElementById("song");
    var playBtn = document.getElementById("play-pause");
    var songFileName = `music/${songnumber}.mp3`;
    var currentRow = document.getElementById(`song${songnumber}`);

    // Remove highlight from all rows before adding to current
    document.querySelectorAll("tr").forEach(row => row.classList.remove("playing"));

    // If same song is playing, pause it
    if (audioElement.getAttribute("src") == songFileName && !audioElement.paused) {
        audioElement.pause();
        playBtn.innerHTML = '<img src="images/play-button.svg">';
    } else {
        audioElement.setAttribute("src", songFileName);
        audioElement.play();
        playBtn.innerHTML = '<img src="images/pause-button.svg">';
        
        // Highlight the current row
        currentRow.classList.add("playing");

        // Update time while song is playing
        audioElement.ontimeupdate = function() {
            updateTime(currentRow, audioElement);
        };
    }
}

function playaudio() {
    var audio = document.getElementById("song");
    var playBtn = document.getElementById("play-pause");

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<img src="images/pause-button.svg">';
    } else {
        audio.pause();
        playBtn.innerHTML = '<img src="images/play-button.svg">';
    }
}

// Function to update time dynamically
function updateTime(currentRow, audioElement) {
    var duration = currentRow.querySelector("td:last-child");
    var remaining = audioElement.duration - audioElement.currentTime;

    var minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
    var seconds = Math.floor(remaining % 60).toString().padStart(2, "0");

    duration.textContent = `${minutes}:${seconds}`;
}

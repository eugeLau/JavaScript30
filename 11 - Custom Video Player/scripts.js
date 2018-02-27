// Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build our functions

function togglePlay() {
    // there is only a pause property in video no play
    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    //OR you can use Ternanry operator. A 1st argument is a comparison argument, the second is the result upon a true comparison, and the 3rd is the result up on a false comparison 
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    // console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    //parseFloat will convert it into a real data
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    // console.log(this.value);
    // console.log(this.name);
    video[this.name] = this.value; 
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; 
}

function scrub(e) {
    console.log(e);
    //offseWidth is the width of the progress bar
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up the event listners
video.addEventListener('click', togglePlay);
//when the video is played updateButton
video.addEventListener('play', updateButton);
//when the video is paused updateButton
video.addEventListener('pause', updateButton);
//update time event on the progress bar
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);

//if mousedown is true it'll runn scrub, if false then stop at mousedown
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

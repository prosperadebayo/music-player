const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music   = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const time = document.getElementById('current-time');
const durationTime = document.getElementById('duration');


//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jancito'
    },
    {
        name: 'jacinto-2',
        displayName: 'Merry',
        artist: 'Jancito'
    },
    {
        name: 'jacinto-3',
        displayName: 'Art',
        artist: 'Dave'
    },
    {
        name: 'metric-1',
        displayName: 'Peace Of Mind',
        artist: 'Noir'
    }
]

// Check if music is playing
let isPlaying = false;

// play music

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title','pause' )
    music.play();
}

// pause music 
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','play' )
    music.pause();
}
// add event to music and the execution context is the tenary operator
// after an event is isplaying value would be 
playBtn.addEventListener('click', ()=> ( isPlaying ? pauseMusic() : playMusic()));


// Update DOM

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}
// 
let songIndex = 0;
// prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex])
    playMusic()

}
// Next Song
function nextSong(){
     songIndex++;
    if(songIndex > songs.length-1 ){
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playMusic()

}

// On Load - Select First Song
loadSong(songs[songIndex])

//Update Progress Bar and Time 
function updateProgressBar(e){
    if(isPlaying){
        // Destruction currentTime and duration from proto (e)
      const {currentTime , duration} = e.srcElement
    //   Update Progress bar Width
    const progressPercentage = (currentTime/duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    // to calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    //Delaying swithing duration Element to avoid NaN 
    if(durationSeconds){
        durationTime.textContent = `${durationMinutes}:${durationSeconds}`
    }



    //   Update Progress bar Width
    // to calculate display for duration
    const timeMinutes = Math.floor(currentTime / 60);
    let timeSeconds = Math.floor(currentTime % 60);
    if (timeSeconds < 10) {
        timeSeconds = `0${timeSeconds}`;
    }
    time.textContent = `${timeMinutes}:${timeSeconds}`
}
}
// set Progress Bar
function setProgressBar(e){
    console.log(e)
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;    
}
// Event Listeners
nextBtn.addEventListener('click', nextSong )
music.addEventListener('ended', nextSong)
prevBtn.addEventListener("click", prevSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)

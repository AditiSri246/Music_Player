let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

// creating an audio element
let track = document.createElement('audio');

// All songs list
let all_song = [
    {
        path : "Songs/Namo_Namo.mp3",
        name: "Namo Namo",
        img : "Images/Namo_Namo.jpeg",
        singer : "Amit Trivedi"
    },
    {
        path : "Songs/O_Maahi.mp3",
        name: "O Maahi",
        img : "Images/O_Maahi.jpeg",
        singer : "Arijit Singh"
    },
    {
        path : "Songs/Pehle_Bhi_Main.mp3",
        name: "Pehle Bhi Main",
        img : "Images/Pehle_Bhi_Main.jpeg",
        singer : "Vishal Mishra"
    },
    {
        path : "Songs/Ram_Aaenge.mp3",
        name: "Ram Aaenge",
        img : "Images/Ram_Aaenge.jpeg",
        singer : "Vishal Mishra"
    },
    {
        path : "Songs/Tere_Hawale.mp3",
        name: "Tere Hawale",
        img : "Images/Tere_Hawale.jpeg",
        singer : "Arijit Singh"
    }
];

// All Function


// Function load the track 
function load_track(index_no)
{
    clearInterval(timer);
    reset_slider();
    track.src = all_song[index_no].path;
    title.innerHTML = all_song[index_no].name;
    track_image.src = all_song[index_no].img;
    artist.innerHTML = all_song[index_no].singer;
    track.load();
    present.innerHTML = index_no + 1;
    total.innerHTML = all_song.length;
    timer = setInterval(range_slider, 10000);
}

load_track(index_no);

// mute function 
function mute_sound()
{
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

// reset song slider 
function reset_slider()
{
    slider.value = 0;
}

// play/pause button function
function just_play()
{
    if(playing_song == false)
    {
        playsong();
    }
    else
    {
        pausesong();
    }
}

// play song function 
function playsong()
{
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

// pause song function 
function pausesong()
{
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

// next song button
function next_song()
{
    if(index_no < all_song.length - 1)
    {
        index_no++;
    }
    else
    {
        index_no = 0;
    }
    load_track(index_no);
    playsong();
}

// previous song button
function previous_song()
{
    if(index_no > 0)
    {
        index_no--;
    }
    else
    {
        index_no = all_song.length - 1;
    }
    load_track(index_no);
    playsong();
}

// autoplay button 
function autoplay_switch()
{
    if(autoplay == 1)
    {
        autoplay = 0;
        auto_play.style.background = "rgba(255, 255, 255, 0.1)";
    }
    else
    {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

// change volume 
function volume_change()
{
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change slider 
function change_duration()
{
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider()
{
    let position = 0;

    // update slider position 
    if(!isNaN(track.duration))
    {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    // following will run if the song is over 
    if(track.ended)
    {
        play.innerHTML = '<i class="fa fa-play"></i>';
        if(autoplay == 1)
        {
            index_no = (index_no + 1) % (all_song.length);
            load_track(index_no);
            playsong();
        }
    }
}
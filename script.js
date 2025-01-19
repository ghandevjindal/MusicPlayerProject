const songs = [
    {
        "id": 1,
        "name": "Shape Of You",
        "artist": "Ed Sheeran",
        "img": "shape_of_you.jpg",
        "genre": "Pop",
        "source": "Shape_Of_You.mp3",    
    },
    {
        "id": 2,
        "name": "All Of Me",
        "artist": "Adele",
        "img": "all_of_me.jpg",
        "genre": "Pop",
        "source": "All_Of_Me.mp3",    
    },
    {
        "id": 3,
        "name": "Someone Like You",
        "artist": "Adele",
        "img": "someone_like_you.jpg",
        "genre": "Pop",
        "source": "Someone_Like_You.mp3",    
    },
    {
        "id": 4,
        "name": "Wonderwall",
        "artist": "Oasis",
        "img": "wonderwall.jpg",
        "genre": "Rock",
        "source": "Wonderwall.mp3",    
    },
    {
        "id": 5,
        "name": "Sugar",
        "artist": "Maroon",
        "img": "sugar.jpg",
        "genre": "Hip Hop",
        "source": "Sugar.mp3",    
    },
    {
        "id": 6,
        "name": "Locked Away",
        "artist": "R. City",
        "img": "locked_away.jpg",
        "genre": "Hip Hop",
        "source": "Locked_Away.mp3",    
    },
];

function toggleTheme(){
    const toggle = document.getElementById('theme-toggle');
    const toggleText = document.querySelector('.toggle-text');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            document.body.classList.add('dark-theme');
            toggleText.textContent = 'Light';
        } else {
            document.body.classList.remove('dark-theme');
            toggleText.textContent = 'Dark';
        }
    });
}
toggleTheme();

const genreSelect = document.getElementById('genre-select');
const songList = document.getElementById('song-list');
function showSongs(genre) {
    songList.innerHTML = '';
    const filteredSongs = genre === 'All' ? songs : songs.filter(song => song.genre === genre);

    filteredSongs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        
        songItem.innerHTML = `
            <span class="song-name">${song.name}</span>-<span class="song-artist">${song.artist}</span>`;
        songList.appendChild(songItem);
    });
    selectCurrentSong(genre);
}
showSongs('All');
genreSelect.addEventListener('change', (e) => {
    const selectedGenre = e.target.value;
    showSongs(selectedGenre);
});

function renderCurrentSong(index) {
    const song = songs[index];
    document.getElementById('song-image').src = song.img;
    document.getElementById('song-name').textContent = song.name;
    document.getElementById('song-artist').textContent = song.artist;
    
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = song.source;
}

function changeSong(direction) {
    if (direction === 'prev') {
        currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;
    } else if (direction === 'next') {
        currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1;
    }
    renderCurrentSong(currentSongIndex);
}

function selectCurrentSong(genre){
    document.querySelectorAll('.song-item').forEach((songItem, index) => {
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            if(genre == "Hip Hop"){
                renderCurrentSong(currentSongIndex+4);
            }
            else if(genre == "Rock"){
                renderCurrentSong(currentSongIndex+3);
            }
            else{
                renderCurrentSong(currentSongIndex);
            }            
        });
    });
}

let currentSongIndex = 0; 
renderCurrentSong(currentSongIndex);

let allplaylists = {};
let selectedPlaylist = null;

function createPlaylist() {
    const playlist_name = document.getElementById("input_playlist");
    const addbtn = document.getElementById('create_playlist_btn');
    
    addbtn.addEventListener('click', function() {
        const all_playlist_div = document.getElementById('all_playlists');
        const playlist_div = document.createElement('div');
        playlist_div.classList.add('playlist-item');
        playlist_div.textContent = playlist_name.value;
        allplaylists[playlist_name.value] = [];
        all_playlist_div.appendChild(playlist_div);
        
        addPlaylistEventListeners();
    });
}

function addPlaylistEventListeners() {
    let myplaylists = document.getElementsByClassName('playlist-item');
    for (let i = 0; i < myplaylists.length; i++) {
        myplaylists[i].id = `playlist${i}`;
        myplaylists[i].addEventListener('click', function() {
            selectedPlaylist = myplaylists[i].textContent;
            updateCurrentPlaylist();
        });
    }
}

function updateCurrentPlaylist() {
    const currentPlaylistDiv = document.getElementById('current_playlist');
    currentPlaylistDiv.innerHTML = `<h3>Current Playlist: ${selectedPlaylist}</h3>`;
    
    if (selectedPlaylist && allplaylists[selectedPlaylist]) {
        allplaylists[selectedPlaylist].forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <span>${song.name}</span>-<span>${song.artist}</span>
                <button class="delete-btn" onclick="deleteSongFromPlaylist('${selectedPlaylist}', ${index})">Delete</button>
            `;
            currentPlaylistDiv.appendChild(songItem);
        });
    }
}

function addToPlaylist() {
    if (!selectedPlaylist) {
        alert('Please select a playlist first!');
        return;
    }
    const song = songs[currentSongIndex];
    if (allplaylists[selectedPlaylist].some(existingSong => existingSong.id === song.id)) {
        alert('This song is already in the playlist!');
        return;
    }
    allplaylists[selectedPlaylist].push(song);
    updateCurrentPlaylist();
}

function deleteSongFromPlaylist(playlistName, songIndex) {
    allplaylists[playlistName].splice(songIndex, 1);
    updateCurrentPlaylist();
}


document.getElementById('add-to-playlist').addEventListener('click', addToPlaylist);
createPlaylist();


// Song Search
const songSearchInput = document.getElementById('song-search-input');
songSearchInput.addEventListener('input', function() {
    const query = songSearchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    showSongsFromSearch(filteredSongs);
});

function showSongsFromSearch(filteredSongs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';

    filteredSongs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        
        songItem.innerHTML = `
            <span class="song-name">${song.name}</span>-<span class="song-artist">${song.artist}</span>`;
        songList.appendChild(songItem);
        
        songItem.addEventListener('click', () => {
            currentSongIndex = songs.findIndex(s => s.id === song.id);
            renderCurrentSong(currentSongIndex);
        });
    });
}

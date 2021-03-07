function showSongs() {
 
  const songName = document.querySelector(".song-name");
  const api = "https://api.lyrics.ovh/suggest/";
  fetch(`${api} ${songName.value}`)
    .then(res => res.json())
    .then(info => { 
      const songContent = document.querySelector(".search-result")
      const song = info.data;
      songContent.innerHTML = " ";
      console.log(song)
      const data = song.slice(0,10)
      for (let i = 0; i < data.length; i++) {
      const titleSong = song[i].title;
      const albumTitle = song[i].artist.name;
      const img = song[i].artist.picture_small;
      const div = document.createElement("div");
      div.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
      <div class="col-md-9">
      <img class="song-img" src=${img}>
        <h3 class="lyrics-name">${titleSong}</h3>
        <p class="author lead">Album by
          <span class="album-title">${albumTitle}</span></p>
      </div>
      <div class="col-md-3 text-md-right text-center">
        <button onclick="lyricsDetails('${albumTitle}','${titleSong}',event)" class="btn btn-success">Get Lyrics</button>
      </div>
    </div>`
    songContent.appendChild(div)
      } 
    })
}
function lyricsDetails(artist, title,event) {
  const lyricContainer = event.target.parentNode.parentNode;
  const lyricAppendDiv = document.createElement("div")
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
      .then(data => {
      if(data.error){
        lyricAppendDiv.innerHTML =`
        <div class="lyrics-content text-center">
        <button class="btn go-back">&lsaquo;</button>
        <h2 class="text-success mb-4">${artist} - ${title}</h2>
        <pre class="text-white">
        "OOps! Lyrics Not found 😞 "
        </pre>
        </div>`
      }
      else { 
        lyricAppendDiv.innerHTML =`
        <div class="lyrics-content text-center">
        <h2 class="text-success mb-4">${artist} - ${title}</h2>
        <pre class="text-white">
        ${data.lyrics}
        </pre>
        <button class="btn go-back">&lsaquo;</button>
        </div>`;
      }
        lyricContainer.appendChild(lyricAppendDiv)
     
    })
}
document.querySelector(".song-content").style.display = "none";
    const songName = document.querySelector(".song-name");
    const search = document.querySelector(".search-btn");
    const lyricsName = document.querySelectorAll(".lyrics-name");
    const authorName = document.querySelectorAll(".album-title");
    const api = "https://api.lyrics.ovh/suggest/";
    const lyricApi = "https://api.lyrics.ovh/v1/";

    search.addEventListener("click", function () {
      document.querySelector(".song-content").style.display = "block"
      fetch(`${api} ${songName.value}`)
        .then(res => res.json())
        .then(info => {
          const song = info.data
          console.log(song)
          for (let i = 0; i < 10; i++) {
            var titleSong = song[i].title
            lyricsName[i].innerText = titleSong
            var albumTitle = song[i].artist.name
            authorName[i].innerText = albumTitle
          }
        })

    })
    function lyricsDetails(event) {
      const lyricData = document.querySelector(".single-lyrics")
      const getArtist = event.target.parentNode.parentNode.children[0].lastElementChild.lastChild.innerText;
      const artist = getArtist.split(" ").join("")
      const getTitle = event.target.parentNode.parentNode.children[0].childNodes[1].innerText;
      const title = getTitle.split(" ").join("")
      fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            alert("not found")
          }
          else {
            lyricData.innerText = data.lyrics
          }
         
        })
    }
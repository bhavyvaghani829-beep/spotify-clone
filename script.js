let currsong = new Audio("https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/song2.mp3");
let currentSongIndex = 1;
let currentCollection = null; // Track which collection is playing

const stoms = (seconds) => {
  const m = Math.floor(seconds / 60);
  const r = Math.floor(seconds % 60);

  const fm = String(m).padStart(2, '0');
  const fr = String(r).padStart(2, '0');

  return `${fm}:${fr}`;
}

async function main() {

  let songCollections = {
    dhurandhar: {
      1: {
        name: "Ishq",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Aakhri Ishq Dhurandhar The Revenge 320 Kbps.mp3"
      },
      2: {
        name: "Destiny Mann Atkeya",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Destiny Mann Atkeya Dhurandhar The Revenge 320 Kbps.mp3"
      },
      3: {
        name: "Hum Pyaar Karne Wale",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Hum Pyaar Karne Wale Dhurandhar The Revenge 320 Kbps.mp3"
      },
      4: {
        name: "Main Aur Tu",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Main Aur Tu Dhurandhar The Revenge 320 Kbps.mp3"
      },
      5: {
        name: "Phir se",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Phir Se Dhurandhar The Revenge 320 Kbps.mp3"
      }
    },
    sultan: {
      1: {
        name: "Baby ko Bass Pasand Hai",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Baby Ko Bass Pasand Hai Sultan 320 Kbps.mp3"
      },
      2: {
        name: "440 Volt",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/440 Volt Sultan 320 Kbps.mp3"
      },
      3: {
        name: "Bulleya",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Bulleya Sultan 320 Kbps.mp3"
      },
      4: {
        name: "Jag Ghoomeya",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Jag Ghoomeya Sultan 320 Kbps.mp3"
      },
      5: {
        name: "Sultan",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Sultan Sukhwinder Singh 320 Kbps.mp3"
      },
      6: {
        name: "Tuk Tuk",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Tuk Tuk Sultan 320 Kbps.mp3"
      }
    },
    pavazhamalli: {
      1: {
        name: "Pavazha Malli",
        url: "https://raw.githubusercontent.com/bhavyvaghani829-beep/music-library/main/Pavazha Malli Sai Abhyankkar 320 Kbps.mp3"
      }
    }
  }

  const lib_show = () => {
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", (event) => {
        const allClasses = card.classList;
        const otherClass = Array.from(allClasses).filter(c => c !== "card")[0];
        show_allsongs(otherClass);
        currentCollection = otherClass; // Set current collection
        currentSongIndex = 1; // Reset song index
      });
    });
  }

  function show_allsongs(className) {
    const songData = songCollections[className];

    if (!songData) {
      console.error(`No songs found for class: ${className}`);
      return;
    }

    let songul = document.querySelector(".songlist ul");
    songul.innerHTML = ""; // Clear previous songs
    let a = 1;

    for (const k in songData) {
      if (!Object.hasOwn(songData, k)) continue;

      const e = songData[k];
      if (a == 1) {
        songul.innerHTML = ` <li data-url="${e.url}">
          <img class="invert" src="spotify/img/music.svg" alt="">
          <div class="info first">${e.name}</div>
          <div class="playnow">
            <div>playnow</div>
            <img src="spotify/img/play.svg" class="invert" alt="">
          </div>
        </li>`
        a++;
      } else {
        songul.innerHTML += ` <li data-url="${e.url}">
          <img class="invert" src="spotify/img/music.svg" alt="">
          <div class="info">${e.name}</div>
          <div class="playnow">
            <div>playnow</div>
            <img src="spotify/img/play.svg" class="invert" alt="">
          </div>
        </li>`
      }
    }

    // Call play function after songs are loaded
    play();
  }

  const playmusic = (s, pause = false) => {
    const allLis = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
    currentSongIndex = allLis.indexOf(s) + 1;

    if (pause) {
      currsong.play();
      document.getElementById("play").src = "spotify/img/pause.svg"
      document.querySelector(".songinfo").innerHTML = `${document.querySelector(".first").innerHTML}`
    }
    currsong.src = s.dataset.url;
    currsong.play();
    document.getElementById("play").src = "spotify/img/pause.svg"
    document.querySelector(".songinfo").innerHTML = `${s.querySelector(".info").innerHTML}`
  }

  const play_pause = () => {
    document.getElementById("play").addEventListener("click", () => {
      if (currsong.paused) {
        currsong.play();
        document.getElementById("play").src = "spotify/img/pause.svg"
        if (document.querySelector(".songinfo").innerHTML === "") {
          document.querySelector(".songinfo").innerHTML = `${document.querySelector(".first").innerHTML}`
        }
      } else {
        currsong.pause();
        document.getElementById("play").src = "spotify/img/play.svg"
      }
    })
  }

  // ✅ FIX: Use event delegation to avoid duplicate listeners
  const play = () => {
    const songlist = document.querySelector(".songlist ul");
    
    // Remove old listeners by cloning
    const newSonglist = songlist.cloneNode(true);
    songlist.parentNode.replaceChild(newSonglist, songlist);
    
    // Add new listener using event delegation (one listener for all)
    document.querySelector(".songlist ul").addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li) {
        playmusic(li);
      }
    });
  }

  const seekbar = () => {
    currsong.addEventListener("timeupdate", () => {
      document.querySelector(".songtime").innerHTML = `${stoms(currsong.currentTime)}/${stoms(currsong.duration)}`
      document.querySelector(".circle").style.left = (currsong.currentTime / currsong.duration) * 100 + "%"
    })
  }

  const jump = () => {
    document.querySelector(".seekbar").addEventListener("click", e => {
      let per = e.offsetX / e.target.getBoundingClientRect().width * 100
      document.querySelector(".circle").style.left = per + "%"
      currsong.currentTime = (currsong.duration * per) / 100;
    })
  }

  // ==================== NEXT BUTTON ====================
  const playNext = () => {
    document.getElementById("next").addEventListener("click", () => {
      if (!currentCollection) return;

      const currentCollectionData = songCollections[currentCollection];
      const totalSongs = Object.keys(currentCollectionData).length;

      // Move to next song
      if (currentSongIndex < totalSongs) {
        currentSongIndex++;
      } else {
        currentSongIndex = 1; // Loop back to first song
      }

      // Find the corresponding li element and play it
      const allLis = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
      const nextLi = allLis[currentSongIndex - 1];

      playmusic(nextLi);
    })
  }

  // ==================== PREVIOUS BUTTON ====================
  const playPrevious = () => {
    document.getElementById("pre").addEventListener("click", () => {
      if (!currentCollection) return;

      const currentCollectionData = songCollections[currentCollection];
      const totalSongs = Object.keys(currentCollectionData).length;

      // Move to previous song
      if (currentSongIndex > 1) {
        currentSongIndex--;
      } else {
        currentSongIndex = totalSongs; // Loop to last song
      }

      // Find the corresponding li element and play it
      const allLis = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
      const prevLi = allLis[currentSongIndex - 1];

      playmusic(prevLi);
    })
  }

  // Hamburger menu
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
  })

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
  })

  // ✅ FIX: Correct volume control syntax
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", e => {
    currsong.volume = parseInt(e.target.value) / 100;
  })

  // Initialize all functions
  show_allsongs("dhurandhar");
  lib_show();
  play_pause();
  playNext();
  playPrevious();
  seekbar();
  jump();
}

main();
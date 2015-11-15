var songList = [];
var songIdArr = [];
var done = false;
var player;
function addSong()
{
    var songTitle = document.getElementById("favSongTitle").value;
    var songLink = document.getElementById("favSongLink").value;

    songList.push(songTitle);


    var songId = songLink.substring(songLink.search("=")+1, songLink.length);

    //Remove the input from the text field
    document.getElementById("formFavSongTitle").reset();
    document.getElementById("formFavSongLink").reset();

    if(songList.length == 1){
        setSong(songId);
    }
    else songIdArr.push(songId);
    
    refreshTable();
}

function refreshTable () 
{
    var row = document.getElementById("table").rows;
    var cell = row[songList.length + 1].cells;

    cell[1].innerHTML = songList[songList.length-1];

    row = document.getElementById("table").insertRow(-1);
    row.insertCell(0).innerHTML = songList.length+1;
    cell = row.insertCell(1);
    
}

function setSong(songId)
{
    document.getElementById("player").src = "https://www.youtube.com/embed/" + songId + "?rel=0&autoplay=1";

}

var tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
    events: {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange
    }
});      
}

function onPlayerReady(event) {
        event.target.playVideo();
      }


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = false;
        }
    else {
         setSong(songIdArr[0]);
         songIdArr.shift();
         done=true;
    }
}
function stopVideo() {
    player.stopVideo();
}

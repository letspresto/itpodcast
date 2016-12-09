var song;

function preload(){
  song = loadSound('intro.mp3');
}


function setup(){
  var cnv = createCanvas(windowWidth,600);
  // cnv.mouseClicked(togglePlay);
  cnv.parent('sketch-holder');

  fft = new p5.FFT();
  song.amp(0.2);
  song.play();
}

function draw(){
  background(255, 255, 255);

  var waveform = fft.waveform();
  //console.log(waveform);
  
  beginShape();
  stroke(255,202,144);
  fill(25,202,144);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 100, waveform.length/2, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  //text('click to play/pause', 400, 10);

}

// function togglePlay() {
//   if (song.isPlaying()) {
//     song.pause();
//     console.log("paused")
//   } else {
//     song.loop();
//     console.log("playing")
//   }
// }
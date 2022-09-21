function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelloaded);
}
function draw(){
  image(video,0 ,0 ,300,300);
classifier.classify(video, gotresult);
}
function modelloaded(){
  console.log("modelo cargado");
}
var resultado_previo = '';
function gotresult(error, results) {
  if (error) { console.error(error); } else {
    if((results[0].confidence > 0.5) && (resultado_previo != results[0].label)){
      console.log(results);
      resultado_previo = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'El objeto detectado es - '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("Objeto_nombre").innerHTML = results[0].label;
      document.getElementById("Precision_nombre").innerHTML = results[0].confidence.toFixed(3);
    }}}
status = "";
object = [];
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(400, 400);
    video.hide();
}
function start(){
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    //status = document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_to_detect = document.getElementById("inputbox").value;
    console.log(object_to_detect);
    // value - Value
}
function modelLoaded(){
    console.log("model loaded");
    status =true;
}                
function draw(){
    image(video, 0, 0, 400, 400);

    if(status != ""){
        objectdetector.detect(video, gotResults)
        for(i=0; i<object.length; i++){
//why can't we write comma or colin instead of the semicolon
// because we mean to end the sentence as semicolon works like a full stop in js
            document.getElementById("status").innerHTML ="Status : object is detected";
            fill("#FF0000");
            accuracy_percent = floor(object[i].confidence * 100);
            console.log(accuracy_percent);
            text(object[i].label + " " + accuracy_percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == object_to_detect){
                document.getElementById("status").innerHTML = object_to_detect + " found ";
                video.stop();
                synth = window.speechSynthesis;
                text_to_speak = new SpeechSynthesisUtterance(object_to_detect + " found");
                synth.speak(text_to_speak);
            }
            else{
                document.getElementById("status").innerHTML = object_to_detect + " not found ";
            }
        }
    }
}       

function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    object = results;

}
}

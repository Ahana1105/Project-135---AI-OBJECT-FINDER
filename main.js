objects= [];
object_status="";

function preload() {
  
}

function setup() {
   canvas =  createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380)
   video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (object_status != "") {
        objectDetector.detect(video, gotResult);

        for (i=0; i< objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            fill("#008080");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#008080");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if (object_name == objects[i].label) {
                video.stop();
                document.getElementById("object_status").innerHTML = object_name + " Found!";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name +"Found!");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found!";
            }
        }
    }

}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById('object_input').value;
    
    
}

function modelLoaded() {
    console.log('model loaded');
    object_status= true;
}

function gotResult(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }

}
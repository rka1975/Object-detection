status1 = "";
img = "";
objects=[];


function preload(){
    

}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();



    objectDetector = ml5.objectDetector("cococssd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are: " + objects.length; 

            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
        
    }

    objectDetector.detect(video, gotResult);

}

function modelLoaded(){
    console.log("Model is loaded!");
    status1 = true;
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects = results;
}


var song="";
status="";
objects=[];

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="detectingobjects";
}

function modelloaded(){
    console.log("model is loaded");
    status=true;
   
}

function getresults(error,results){
    if(error){consoles.log(error);}
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        objectdetector.detect(video,getresults);
        for(i=0;i<objects.length;i++){
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="status=objectdetected";
            
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("numberofobjects").innerHTML= "baby found";
                song.stop();
                
            }

            else{
                document.getElementById("numberofobjects").innerHTML= "baby not found";
                song.play();
            }
        
    }

    }

}
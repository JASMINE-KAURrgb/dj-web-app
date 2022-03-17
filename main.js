var peterpan="";
var harry="";
var leftwristx=0;
var leftwristy=0;
var rightwristx=0;
var rightwristy=0;
var song="";
var scoreleftwrist=0;
var scorerightwrist=0;

function preload(){
    peterpan=loadSound("peterpan.mp3");
    harry=loadSound("harrypotter.mp3");
}

function draw(){
    image(video,0,0,600,500);
    peterpan_status=peterpan.isPlaying();
    harry_status=harry.isPlaying();
    fill('hotpink');
    stroke('black');
 if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,40);
        harry.stop();
        if(peterpan_status==false){
        peterpan.play();
        document.getElementById("songg").innerHTML="Playing Peterpan Song";
 }}
 if(scorerightwrist>0.2){
        fill('purple');
        stroke('red');
        circle(rightwristx,rightwristy,40);
        peterpan.stop();
        if(harry_status==false){
        harry.play();
        document.getElementById("songg").innerHTML="Playing Harry Potter Theme Song";
    }}
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(450,200);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length>0){
       console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("Score left wrist= "+scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+" leftwristy="+leftwristy);
        scorerightwrist=results[0].pose.keypoints[10].score;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx+" rightwristy="+rightwristy);
    }
}

function modelLoaded(){
    console.log("posenet is initialized");
}

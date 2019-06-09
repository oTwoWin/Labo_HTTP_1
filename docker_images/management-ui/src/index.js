var express = require('express');
var app = express();
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
app.use(express.static("../web_sources"));


global.currentContainers=[];
global.currentImages=[];


app.get('/', function(req,res){
    
});

app.get('/create', function(req,res){
    const { exec } = require('child_process');

    cmd = 'docker run -d ' +  req.query.options + ' --name ' + req.query.name + ' ' + req.query.imagename;
    exec(cmd);     
});

app.get('/stopAll', function(req,res){
    docker.listContainers(function (err, containers) {
      containers.forEach(function (containerInfo) {
        docker.getContainer(containerInfo.Id).stop();
      });
    });
});

app.get('/stop', function(req,res){
        docker.getContainer(req.query.id).stop();
});

app.get('/start', function(req,res){
        docker.getContainer(req.query.id).start(function (err, data) {
            console.log(req.query.id);
        });
});

app.get('/delete', function(req,res){
        docker.getContainer(req.query.id).remove();
});

function updateContainers(){
    currentContainers=[];
    docker.listContainers({ all: true },function (err, containers) {
      containers.forEach(function (containerInfo) {
        currentContainers.push(containerInfo);
      });
    });
    //console.log(currentContainers);
}

function updateImages(){
    currentImages=[];
    docker.listImages({ all: true },function (err, containers) {
      containers.forEach(function (containerInfo) {
        //console.log(containerInfo);
        currentImages.push(containerInfo);
        //console.log(listImages.Id);
      });
    });
    console.log(currentImages);
}

app.get('/getContainers', function(req,res){
        res.send(JSON.stringify(currentContainers));
        return currentContainers;
});

app.get('/getImages', function(req,res){
        res.send(JSON.stringify(currentImages));
        return currentImages;
});

setInterval(updateContainers,1000);
setInterval(updateImages,1000);

app.listen(2000, function(){
   console.log('Accepting HTTP requests on port 2000.');
});



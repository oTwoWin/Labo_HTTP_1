
  $(function(){
	console.log("Getting containers...");
	
	function getContainers(){
		$.getJSON("/getContainers", function( containers ){
		var message = "No containers";
        var message = "";
        console.log(containers);
        for(var i = 0; i < containers.length; i++){

            
		    message += "<div class=\"col-xl-3 col-md-6 mb-4\">";
            message += "<div class=\"card border-left-warning shadow h-100 py-2\">";
            message += "<div class=\"card-body\">";
            message += "<div class=\"row no-gutters align-items-center\">";
            message += "<div class=\"col mr-2\">";
            message += "<div class=\"h5 mb-0 font-weight-bold text-gray-800\">Name : " + containers[i]["Names"][0].substr(1)+"</div>";
            message += "<div class=\"h5 mb-0 font-weight-bold text-gray-800\">Image : " + containers[i]["Image"]+"</div>";
            message += "<div class=\"h5 mb-0 font-weight-bold text-gray-800\">ID Container : " + containers[i]["Id"].substr(0,9)+"</div>";
            message += "<div class=\"h5 mb-0 font-weight-bold text-gray-800\">IP : " + containers[i]["NetworkSettings"]["Networks"]["bridge"]["IPAddress"]+"</div>";
            if(containers[i]["State"] == "running"){
                message += '<a href="/stop/?id='+containers[i]["Id"] + '" class="btn btn-warning btn-icon-split">';
                message += '<span class="icon text-white-50"><i class="fas fa-exclamation-triangle"></i></span></span class="text">Arrêter</span></a>';            
            }else{
                message += '<a href="/start/?id='+containers[i]["Id"] + '" class="btn btn-success btn-icon-split">';
                message += '<span class="icon text-white-50"><i class="fas fa-exclamation-triangle"></i></span></span class="text">Démarrer</span></a>';
                message += '<a href="/delete/?id='+ containers[i]["Id"] + '" class="btn btn-danger btn-icon-split">';
                message += '<span class="icon text-white-50"><i class="fas fa-exclamation-triangle"></i></span></span class="text">Supprimer</span></a>';
            }
            message += "</div></div></div></div></div>";
		}		
        document.getElementById("containers-docker").innerHTML = message;
	});
	};
	getContainers();
	setInterval( getContainers, 2000);
});
  $(function(){
	console.log("Getting images...");
	
	function getImages(){
		$.getJSON("/getImages", function( images ){
		var message = "No images";
        var message = "";
        for(var i = 0; i < images.length; i++){
			if(images[i]["RepoTags"][0]){
				var tmp = '<option value='+images[i]["RepoTags"][0]+'>'+ images[i]["RepoTags"][0]+'</option>';
				console.log(tmp);
				if(images[i]["RepoTags"][0] != '<none>:<none>'){
					message += tmp;
				}
			}
		}		
        document.getElementById("images-docker").innerHTML = message;
	});
	};
	getImages();
});

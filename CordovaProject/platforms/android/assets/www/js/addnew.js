document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
		//alert(fileSys.name);
		fileSys.root.getDirectory("lightning",{create: true, exclusive: false}, function(dir){
			//alert("Created dir "+dir.name);
		},
		function(error){
			alert("Error creating directory "+ fileErrorCode(error.code));
		});
	});
}


function usersubmit(){
	
	var name = document.getElementById('name').value;
	var msg = document.getElementById('message').value;	

	//Store the values in the database

	if(name==''||msg=='')
	{
		document.getElementById('error_msg').innerHTML = '*All field are required';
	}
	else
	{
		var localStorage = window.localStorage;

		localStorage.setItem(name,msg);

		window.location = '../index.html';
	}
}

// function movePic(imageData){ 
// 	alert(imageData);
//     window.resolveLocalFileSystemURI("file://"+imageData, resolveOnSuccess, resOnError); 
// } 

function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "lightning";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    alert('inside');
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    alert("successMove");
}

function resOnError(error) {
    alert(error.code);
}



document.getElementById('image-upload').addEventListener("click", cameraTakePicture);

function cameraTakePicture(){
	navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI 
    });  
   
    function onSuccess(imageData) { 
    	alert(imageData);
    	var myimgdata = encodeImageUri(imageData);
    	document.getElementById('user_img').style.display = 'block';
      var image = document.getElementById('user_img'); 
      image.src = myimgdata; 
      window.resolveLocalFileSystemURI(imageData, resolveOnSuccess, resOnError); 
      //movePic(imageData);
    }  
   
    function onFail(message) { 
      alert('Failed because: ' + message); 
    } 
}

function encodeImageUri(imageUri)
{
     var c=document.createElement('canvas');
     var ctx=c.getContext("2d");
     var img=new Image();
     img.onload = function(){
       c.width=this.width;
       c.height=this.height;
       ctx.drawImage(img, 0,0);
     };
     img.src=imageUri;
     var dataURL = c.toDataURL("image/jpg");
     return dataURL;
}
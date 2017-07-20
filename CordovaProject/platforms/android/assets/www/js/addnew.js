
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

		//localStorage.setItem(key, value);

		localStorage.setItem(name,msg);

		// console.log(localStorage.key(0));
		// console.log(localStorage.getItem('Chetan'));

		window.location = '../index.html';
	}
}


document.getElementById('image-upload').addEventListener("click", cameraTakePicture);

function cameraTakePicture(){
	navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50, 
      destinationType: Camera.DestinationType.DATA_URL 
    });  
   
    function onSuccess(imageData) { 
    	document.getElementById('user_img').style.display = 'block';
      var image = document.getElementById('user_img'); 
      image.src = "data:image/jpeg;base64," + imageData; 
      movePic();
    }  
   
    function onFail(message) { 
      alert('Failed because: ' + message); 
    } 
}

function movePic(file){ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "EasyPacking";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
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
    //I do my insert with "entry.fullPath" as for the path
    alert("Success");
}

function resOnError(error) {
    alert(error.code);
}
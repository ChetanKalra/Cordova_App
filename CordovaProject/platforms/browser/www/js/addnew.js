document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(cordova.file.dataDirectory);
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
      allowEdit: true,
      destinationType: Camera.DestinationType.DATA_URL 
    });  
   
    function onSuccess(imageData) { 
    	document.getElementById('user_img').style.display = 'block';
      var image = document.getElementById('user_img'); 
      image.src = "data:image/jpeg;base64," + imageData; 
    }  
   
    function onFail(message) { 
      alert('Failed because: ' + message); 
    } 
}


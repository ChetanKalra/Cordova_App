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

function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}


function savebase64AsImageFile(folderpath,filename,content,contentType){
    var DataBlob = b64toBlob(content,contentType);
    
    window.resolveLocalFileSystemURL(folderpath, function(dir) {

    dir.getFile(filename, {create:true}, function(file) {
            alert("File created succesfully.");
            file.createWriter(function(fileWriter) {
                fileWriter.write(DataBlob);
            }, function(){
                alert('Unable to save file in path '+ folderpath);
            });
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

    var contentType = "image/png";
      // The path where the file will be saved
    var folderpath = "file:///storage/emulated/0/";

    var filename = name+".png";

    savebase64AsImageFile(folderpath,filename,DataURL,contentType);
    
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
      image.src = "data:image/png;base64," + imageData; 
      
      DataURL = imageData;

     

      // savebase64AsImageFile(folderpath,filename,imageData,contentType);
    }  
   
    function onFail(message) { 
      alert('Failed because: ' + message); 
    } 
}
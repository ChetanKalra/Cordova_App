var localStorage = window.localStorage;

function displayall()
{
    var i = 0;

    for(key in localStorage)
    {
        var msg = localStorage.getItem(key);
        document.getElementById('deviceready').innerHTML += `<a href="links/description.html?key=`+i+`"><div class="info row no-gutters">
                    <div class="col-3 align-self-center img-div">
                        <img src="file:///storage/emulated/0/`+localStorage.key(i)+`.png" class="custom-img" />
                    </div>
                    <div class="col-9 des-div align-self-center">
                        <h5 class="des-name">`+localStorage.key(i)+`</h5>
                        <p class="des-msg">`+msg+`</p>
                    </div>
                </div></a>`;

        i++;
    }
}

displayall();

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
   e.preventDefault();
   navigator.app.exitApp();
}
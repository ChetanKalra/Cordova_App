var url_string = window.location.href;
var url = new URL(url_string);
var key = url.searchParams.get("key");
console.log(key);

var name = localStorage.key(key);
var msg = localStorage.getItem(name);



	document.getElementById('deviceready').innerHTML += `<div class="description-name">
                    <h5 onclick="" class="add-new-text">`+name+`</h5>
                </div>
                    
                <div class="description-p">
                    <p>`+msg+`</p>
                </div>`;
